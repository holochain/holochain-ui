use hdk::{
    self, 
    entry_definition::ValidatingEntryType,
    holochain_dna::zome::entry_types::Sharing,
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
    holochain_core_types::hash::HashString,
    holochain_core_types::entry::Entry,
    holochain_core_types::entry_type::EntryType,
};

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Member {
    pub id: String
}

impl Member {
    pub fn hash(&self) -> HashString {
        hdk::hash_entry(
            &Entry::new(
                EntryType::App("member".into()), 
                self.to_owned())
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
        }
    )
}

// This is the full profile that can be requested for a member
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Profile {
    handle: String,
    email: String,
    first_name: String,
    last_name: String,
    life_force: u32,
    avatar: String,
    timezone: String,
    role: Option<String>
}

// This is the personal data that chat stores in the DHT
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct StoreProfile {
    handle: String,
    email: String,
    avatar: String,
    timezone: String
}

pub fn profile_definition() -> ValidatingEntryType {
    entry!(
        name: "profile",
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

pub fn handle_get_profile(member_id: Member) -> JsonString {
    json!({}).into()
}

pub fn get_my_member_id() -> Member {
    return Member{id: "glibglob".into()} // placeholder until vault is linkable
}


// pub fn get_profile_spec() -> holovault::ProfileSpec {
//     profile::ProfileSpec {
//         name: "Holo Chat".into(),
//         sourceDNA: hdk::DNA_HASH.into(),
//         fields: vec!(
//         ),
//     };
// }
