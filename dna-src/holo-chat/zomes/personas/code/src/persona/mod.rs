use hdk::{
    self,
    entry_definition::ValidatingEntryType,
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
};

use hdk::holochain_core_types::{
    dna::entry_types::Sharing,
    cas::content::Address,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct PersonaSpec {
	pub name: String
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Persona {
	name: String,
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
            hdk::ValidationPackageDefinition::Entry
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
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_persona: PersonaField, _ctx: hdk::ValidationData| {
        	Ok(())
        }
	)
}