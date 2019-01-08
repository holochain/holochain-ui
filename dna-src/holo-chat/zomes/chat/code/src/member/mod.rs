
use hdk::entry_definition::ValidatingEntryType;
use hdk::holochain_core_types::{
    json::JsonString,
    error::HolochainError,
    dna::entry_types::Sharing,
    cas::content::Address,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Member {
    pub address: Address,
    pub profile: StoreProfile
}

// This is the full profile that can be requested for a member
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Profile {
    handle: String,
    email: String,
    avatar: String,
    timezone: String,
    name: String,
    life_force: u32,
    role: Option<String>
}

// This is the personal data that chat stores in the DHT
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct StoreProfile {
    pub handle: String,
    pub email: String,
    pub avatar: String,
    pub timezone: String
}

pub fn profile_definition() -> ValidatingEntryType {
    entry!(
        name: "chat_profile",
        description: "The data that chat has about a particular user",
        sharing: Sharing::Public,
        native_type: StoreProfile,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_profile: StoreProfile, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            from!(
                "%agent_id",
                tag: "profile",

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