use hdk::holochain_core_types::error::HolochainError;
use hdk::holochain_core_types::json::JsonString;
use hdk::holochain_core_types::hash::HashString;
use hdk::{
    self, 
    entry_definition::ValidatingEntryType,
    holochain_dna::zome::entry_types::Sharing,
};

use super::member;


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Channel {
    pub name: String,
    pub description: String,
}


pub fn public_channel_definition() -> ValidatingEntryType {
    entry!(
        name: "public_channel",
        description: "A channel of which anyone can become a member and post",
        sharing: Sharing::Public,
        native_type: Channel,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_channel: Channel, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

pub fn direct_channel_definition() -> ValidatingEntryType {
    entry!(
        name: "direct_channel",
        description: "A channel to which new members can only be added at creation",
        sharing: Sharing::Public,
        native_type: Channel,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_channel: Channel, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}


pub fn handle_create_channel(
    name: String,
    parentAddress: HashString,
    initial_members: Vec<member::MemberId>,
    public: bool,
) -> JsonString {
    json!({}).into()
}

pub fn handle_get_my_channels() -> JsonString {
    json!({}).into()
}

pub fn handle_get_members(channel_address: HashString) -> JsonString {
    json!({}).into()
}

pub fn handle_add_members(channel_address: HashString) -> JsonString {
    json!({}).into()
}

pub fn handle_get_message(channel_address: HashString, min_count: u32) -> JsonString {
    json!({}).into()
}

pub fn handle_post_message() -> JsonString {
    json!({}).into()
}