

use hdk::{
	self,
	entry_definition::ValidatingEntryType,
	error::ZomeApiResult,
};

use hdk::holochain_core_types::{
	error::HolochainError,
	json::JsonString,
	hash::HashString,
	entry::Entry,
	entry::entry_type::EntryType,
	dna::zome::entry_types::Sharing,
	cas::content::Address,
};


use serde_json;
use std::convert::TryFrom;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct PersonaSpec {
	pub name: String
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Persona {
	name: String,
	hash: HashString,
	fields: Vec<PersonaField> // use &vec if there is a lot of data or it gets copied frequently
}


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct PersonaField {
	name: String,
	data: String
}

pub fn persona_definition() -> ValidatingEntryType {
	entry!(
        name: "persona",
        description: "A grouping of data about a user",
        sharing: Sharing::Public,
        native_type: PersonaSpec,

        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |_persona: PersonaSpec, _ctx: hdk::ValidationData| {
        	Ok(())
        },

        links: [
            to!(
                "personaField",
                tag: "fields",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            )
        ]
	)
}

pub fn field_definition() -> ValidatingEntryType {
	entry!(
        name: "personaField",
        description: "A single piece of data that is attached to a persona",
        sharing: Sharing::Public,
        native_type: PersonaField,

        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |_persona: PersonaField, _ctx: hdk::ValidationData| {
        	Ok(())
        }
	)
}

/*==========================================
=            public fn handlers            =
==========================================*/

pub fn handle_create_persona(spec: PersonaSpec) -> JsonString {
	match create_persona(spec) {
		Ok(result) => result,
		Err(hdk_err) => hdk_err.into()
	}
}

fn create_persona(spec: PersonaSpec) -> ZomeApiResult<JsonString> {
	let anchor_entry = Entry::new(EntryType::App("vault_anchor".into()), json!("personas"));
	let persona_entry = Entry::new(EntryType::App("persona".into()), spec);

	let anchor_address = hdk::commit_entry(&anchor_entry)?;
	let persona_address = hdk::commit_entry(&persona_entry)?;
	hdk::link_entries(&anchor_address, &persona_address, "personas")?;

	Ok(json!({"address": persona_address}).into())
}



pub fn handle_get_personas() -> JsonString {
	let anchor_address = hdk::commit_entry(
		&Entry::new(EntryType::App("vault_anchor".into()), json!("personas"))
	).expect("Could not commit anchor");

	let get_links_results: ZomeApiResult<GetLinksLoadResult> = get_links_and_load(&anchor_address, "personas");
	match get_links_results {
		Ok(result) => {
			let personas: Vec<Persona> = result.iter().map(|elem| {
				let spec = PersonaSpec::try_from(elem.entry.value().clone()).unwrap();
				Persona{
					name: spec.name.to_owned(),
					hash: elem.address.to_owned(),
					fields: get_fields(&elem.address).unwrap_or(Vec::new())
				}
			}).collect();
			json!({"personas": personas}).into()
		},
        Err(hdk_error) => hdk_error.into(),
	}
}


pub fn handle_add_field(persona_address: HashString, field: PersonaField) -> JsonString {
	let persona_field_entry = Entry::new(EntryType::App("personaField".into()), field);
	match hdk::commit_entry(&persona_field_entry) {
		Ok(field_addr) => {
			match hdk::link_entries(&persona_address, &field_addr, "fields") {
				Ok(_) => json!({"success" : true}).into(),
				Err(hdk_error) => json!({"error" : hdk_error}).into() // rewrite to not return a boolean as this loses error information
			}
		},
		Err(hdk_error) => json!({"error" : hdk_error}).into()
	}

}

pub fn handle_delete_field(persona_address: HashString, field_name: String) -> JsonString {
	let mut fields_deleted: u32 = 0;
	match hdk::get_links(&persona_address, "fields") {
		Ok(result) => {
			for field_addr in result.addresses().iter() {
				let get_result = hdk::get_entry(field_addr.to_owned()).unwrap().unwrap().value().clone();
				let field = PersonaField::try_from(get_result.clone()).unwrap();
				if field.name == field_name {
					fields_deleted+=1;
					// remove entry not yet available
					// hdk::remove_entry()
				}
			}
			json!({"fields_deleted" : fields_deleted}).into()
		},
		Err(hdk_error) => json!({"error" : hdk_error}).into()
	}
}

/*=====  End of public fn handlers  ======*/




fn get_fields(persona_address: &HashString) -> ZomeApiResult<Vec<PersonaField>> {
	get_links_and_load(persona_address, "fields")
		.map(|result: GetLinksLoadResult| {
			result.iter().map(|elem| {
				PersonaField::try_from(elem.entry.value().clone()).unwrap()
			}).collect()
		})
}


// #[derive(Serialize, Deserialize, Debug)]
struct GetLinksLoadElement {
	address: HashString,
	entry: Entry
}

type GetLinksLoadResult = Vec<GetLinksLoadElement>;



fn get_links_and_load<S: Into<String>>(
    base: &HashString, 
    tag: S
) -> ZomeApiResult<GetLinksLoadResult>  {
	hdk::get_links(base, tag)
		.map(|result| {
			result.addresses().iter()
				.map(|address| {
					hdk::get_entry(address.to_owned())
						.map(|entry: Option<Entry>| {
							GetLinksLoadElement{
								address: address.to_owned(),
								entry: entry.unwrap()
							}
						})
						.ok()
				})
				.filter_map(|elem| elem)
				.collect()
		})
}
