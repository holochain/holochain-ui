
use hdk::serde::de::DeserializeOwned;
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::hash::HashString;
use hdk::{
	self, 
	entry_definition::ValidatingEntryType,
	holochain_dna::zome::entry_types::Sharing,
};

use serde_json;

#[derive(Serialize, Deserialize, Debug)]
pub struct PersonaSpec {
	name: String
}

#[derive(Serialize, Debug)]
pub struct Persona {
	name: String,
	hash: HashString,
	fields: Vec<PersonaField> // use &vec if there is a lot of data or it gets copied frequently
}


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PersonaField {
	name: String,
	data: serde_json::Value
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
        }
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

pub fn handle_create_persona(spec: PersonaSpec) -> serde_json::Value {
	match (
		hdk::commit_entry("persona", json!(spec)),
		hdk::commit_entry("anchor", json!("personas"))
	) {
		(Ok(persona_address),Ok(anchor_address)) => {
			match hdk::link_entries(&anchor_address, &persona_address, "personas") {
				Ok(_) => json!({"address": persona_address}),
				Err(hdk_error) => hdk_error.to_json(),
			}
		},
		(Err(err1), Err(_)) => err1.to_json(),
		(Ok(_), Err(err2)) => err2.to_json(),
		(Err(err1), Ok(_)) => err1.to_json(),
	}
}




pub fn handle_get_personas() -> serde_json::Value {
	let anchor_address = hdk::commit_entry("anchor", json!("personas")).expect("Could not commit anchor");

	let get_links_results: ZomeApiResult<GetLinksLoadResult<PersonaSpec>> = get_links_and_load(&anchor_address, "personas");
	match get_links_results {
		Ok(result) => {
			let personas: Vec<Persona> = result.iter().map(|elem| {
				Persona{
					name: elem.entry.name.to_owned(),
					hash: elem.address.to_owned(),
					fields: get_fields(&elem.address).unwrap_or(Vec::new())
				}
			}).collect();
			json!({"personas": personas})
		},
        Err(hdk_error) => hdk_error.to_json(),
	}
}


pub fn handle_add_field(persona_address: HashString, field: PersonaField) -> bool {
	match hdk::commit_entry("personaField", json!(field)) {
		Ok(field_addr) => {
			match hdk::link_entries(&persona_address, &field_addr, "fields") {
				Ok(_) => true,
				Err(_hdk_error) => false // rewrite to not return a boolean as this loses error information
			}
		},
		Err(_hdk_error) => false
	}

}

pub fn handle_delete_field(persona_address: HashString, field_name: String) -> u32 {
	let mut fields_deleted: u32 = 0;
	match hdk::get_links(&persona_address, "fields") {
		Ok(result) => {
			for field_addr in result.links.iter() {
				let field: PersonaField = hdk::get_entry(field_addr.to_owned()).unwrap().unwrap();
				if field.name == field_name {
					fields_deleted+=1;
					// remove entry not yet available
					// hdk::remove_entry()
				}
			}
			fields_deleted
		},
		Err(_hdk_error) => 0
	}
}

/*=====  End of public fn handlers  ======*/




fn get_fields(persona_address: &HashString) -> ZomeApiResult<Vec<PersonaField>> {
	get_links_and_load(persona_address, "fields")
		.map(|result: GetLinksLoadResult<PersonaField>| {
			result.iter().map(|elem| {
				elem.entry.clone()
			}).collect()
		})
}


// #[derive(Serialize, Deserialize, Debug)]
struct GetLinksLoadElement<T> {
	address: HashString,
	entry: T
}

type GetLinksLoadResult<T> = Vec<GetLinksLoadElement<T>>;



fn get_links_and_load<T, S: Into<String>>(
    base: &HashString, 
    tag: S
) -> ZomeApiResult<GetLinksLoadResult<T>> where T: DeserializeOwned {
	hdk::get_links(base, tag)
		.map(|result| {
			result.links.iter()
				.map(|address| {
					hdk::get_entry(address.to_owned())
						.map(|entry: Option<T>| {
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
