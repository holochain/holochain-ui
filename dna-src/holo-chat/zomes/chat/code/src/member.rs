use std::convert::TryFrom;
use hdk::{
    self,
    AGENT_ADDRESS,
    entry_definition::ValidatingEntryType,
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    hash::HashString,
    entry::Entry,
    dna::zome::entry_types::Sharing,
    entry::entry_type::EntryType,
    cas::content::Address,
};

use super::utils;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Member {
    pub id: String,
    pub profile : Option<StoreProfile>
}

impl Member {
    pub fn hash(&self) -> HashString {
        hdk::entry_address(
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

pub fn handle_get_profile(member_id: Member) -> JsonString {
    json!({}).into()
}

pub fn handle_get_all_members() -> JsonString {
    match get_all_members() {
        Ok(result) => result.into(),
        Err(hdk_err) => hdk_err.into()
    }
}

pub fn get_my_member_id() -> Member {
    return Member{id: "wollum".into(), profile:None} // placeholder until vault is linkable
}

fn get_all_members() -> ZomeApiResult<Vec<Member>> {
    let anchor_entry = Entry::new(EntryType::App("anchor".into()), json!("member_directory"));
    let anchor_address = hdk::entry_address(&anchor_entry)?;
    utils::get_links_and_load(&anchor_address, "member_tag").map(|results| {
        results.iter().map(|get_links_result| {
                let mut member = Member::try_from(get_links_result.entry.value().clone()).unwrap();
                member.profile = get_profile(member.clone()).unwrap();
                member
        }).collect::<Vec<Member>>()
    })
    // Now get the profile for each member. handle, email, avatar & timezone stored in DHT
    // Name & Life Force stored in Vault and retrieved asynch from  the UI once UI has the memberId.
}

fn get_profile(member:Member) -> ZomeApiResult<Option<StoreProfile>>
{
    let links = utils::get_links_and_load(&member.hash(), "profile").map(|results| {
        results.iter().map(|get_links_result| {
                StoreProfile::try_from(get_links_result.entry.value().clone()).ok()
        }).collect::<Vec<Option<StoreProfile>>>()
    })?;
    Ok(links.into_iter().next().unwrap_or(None))
}

// pub fn get_profile_spec() -> holovault::ProfileSpec {
//     profile::ProfileSpec {
//         name: "Holo Chat".into(),
//         sourceDNA: hdk::DNA_HASH.into(),
//         fields: vec!(
//         ),
//     };
// }
