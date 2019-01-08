use hdk::holochain_core_types::error::HolochainError;
use hdk::holochain_core_types::json::JsonString;
use hdk::{
    self,
    entry_definition::ValidatingEntryType,
};

use hdk::holochain_core_types::{
    dna::entry_types::Sharing,
};


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Message {
    pub timestamp: u32,
    pub author: String,
    pub message_type: String,
    pub payload: String,
    pub meta: String,
}

impl Message {
    pub fn from_spec(spec: &MessageSpec, author: &String) -> Message {
        return Message{
            message_type: spec.message_type.clone(),
            payload: spec.payload.clone(),
            meta: spec.meta.clone(),
            author: author.to_owned(),
            timestamp: spec.timestamp.clone()
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct MessageSpec {
    pub message_type: String,
    pub timestamp: u32,
    pub payload: String,
    pub meta: String
}

pub fn message_definition() -> ValidatingEntryType {
    entry!(
        name: "message",
        description: "A generic message entry",
        sharing: Sharing::Public,
        native_type: Message,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_message: Message, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}
