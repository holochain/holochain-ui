
use hdk::entry_definition::ValidatingEntryType;
use hdk::holochain_core_types::{
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    cas::content::Address,
    json::JsonString,
    error::HolochainError,
    dna::zome::entry_types::Sharing
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Member {
    pub id: String,
    pub profile : Option<StoreProfile>
}

impl Member {
    pub fn hash(&self) -> Address {
        hdk::entry_address(
            &Entry::App(
                AppEntryType::from("member"),
                AppEntryValue::from(self.to_owned())
            )
        ).unwrap()
    }
}

pub fn member_id_definition() -> ValidatingEntryType {
    entry!(
        name: "member",
        description: "A members unique identifier in the DHT",
        sharing: Sharing::Public,
        native_type: Member,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_member_id: Member, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            to!(
                "chat_profile",
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
        }
    )
}