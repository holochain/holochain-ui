use hdk::holochain_core_types::{
    hash::HashString,
    entry::{
    	entry_type::AppEntryType,
    	AppEntryValue,
    	Entry
    },
    error::HolochainError,
    json::JsonString,
    dna::zome::entry_types::Sharing,
    cas::content::Address
};
use hdk::*;
use hdk::entry_definition::ValidatingEntryType;
use hdk::error::ZomeApiResult;

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Event {
    pub since: String,
    pub until: String,
}

pub fn event_definition() -> ValidatingEntryType {
    entry!(
        name: "event",
        description: "event definition",
        sharing: Sharing::Public,
        native_type: Event,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: |_event: Event, _ctx: hdk::ValidationData| {
            Ok(())
        },
        links: [
            to!(
                "member",
                tag: "member_tag",

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
