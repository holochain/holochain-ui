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
    entry::entry_type::EntryType
};

use super::member;
use super::message;
use super::utils;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Channel {
    pub name: String,
    pub description: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Subject {
    pub name: String,
    pub channel_address: HashString,
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

pub fn subject_anchor_definition() -> ValidatingEntryType {
    entry!(
        name: "subject",
        description: "A way messages within a channel are grouped",
        sharing: Sharing::Public,
        native_type: Subject,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_subject: Subject, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}


/*=============================================
=            Public Zome functions            =
=============================================*/

pub fn handle_create_channel(
    name: String,
    description: String,
    initial_members: Vec<member::Member>,
    public: bool,
) -> JsonString {

    let channel = Channel{name, description};

    let entry = match public {
        true => Entry::new(EntryType::App("public_channel".into()), channel),
        false => Entry::new(EntryType::App("direct_channel".into()), channel)
    };

    // good candidate for bundle when that is working
    hdk::commit_entry(&entry)
        .and_then(|channel_addr| { // link all the new members (including the creator) bi-directionally
            utils::link_entries_bidir(&member::get_my_member_id().hash(), &channel_addr, "member_of", "has_member")
                .and_then(|_| {
                    initial_members.iter().map(|member| {
                        utils::link_entries_bidir(&member.hash(), &channel_addr, "member_of", "has_member")
                    }).collect()
                })?;
            Ok(channel_addr)
        })
        .map(|channel_addr|{
            json!({"address": channel_addr}).into()
        })
        .unwrap_or_else(|hdk_err|{hdk_err.into()})
}

pub fn handle_get_my_channels() -> JsonString {
    match get_my_channels() {
        Ok(result) => result.into(),
        Err(hdk_err) => hdk_err.into()
    }
}

pub fn handle_get_members(channel_address: HashString) -> JsonString {
    match get_members(&channel_address) {
        Ok(result) => result.into(),
        Err(hdk_err) => hdk_err.into()
    }
}

pub fn handle_add_members(channel_address: HashString, members: Vec<member::Member>) -> JsonString {
    members.iter().map(|member| {
        utils::link_entries_bidir(&member.hash(), &channel_address, "member_of", "has_member")
    }).collect::<Result<Vec<_>,_>>().map(|_|{
        json!({"success": true}).into()
    }).unwrap_or_else(|hdk_err|{
        hdk_err.into()
    })
}

pub fn handle_get_messages(channel_address: HashString, min_count: u32) -> JsonString {
    match get_messages(&channel_address) {
        Ok(result) => result.into(),
        Err(hdk_err) => hdk_err.into()
    }
}

pub fn handle_post_message(channel_address: HashString, message: message::Message, subjects: Vec<String>) -> JsonString {
    match post_message(&channel_address, message, subjects) {
        Ok(()) => json!({"success": true}).into(),
        Err(hdk_err) => hdk_err.into()
    }
}

pub fn handle_get_subjects(channel_address: HashString) -> JsonString {
    match get_subjects(&channel_address) {
        Ok(subjects) => subjects.into(),
        Err(hdk_err) => hdk_err.into(),
    }
}

/*=====  End of Public Zome functions  ======*/


fn get_my_channels() -> ZomeApiResult<Vec<Channel>> {
    utils::get_links_and_load(&member::get_my_member_id().hash(), "member_of").map(|results| {
        results.iter().map(|get_links_result| {
                Channel::try_from(get_links_result.entry.value().clone()).unwrap()
        }).collect()
    })
}

fn get_members(channel_address: &HashString) -> ZomeApiResult<Vec<member::Member>> {
    utils::get_links_and_load(channel_address, "has_member").map(|results| {
        results.iter().map(|get_links_result| {
                member::Member::try_from(get_links_result.entry.value().clone()).unwrap()
        }).collect()
    })
}

fn get_messages(channel_address: &HashString) -> ZomeApiResult<Vec<message::Message>> {
    utils::get_links_and_load(channel_address, "message_in").map(|results| {
        results.iter().map(|get_links_result| {
                message::Message::try_from(get_links_result.entry.value().clone()).unwrap()
        }).collect()
    })
}


fn post_message(channel_address: &HashString, message: message::Message, subjects: Vec<String>) -> ZomeApiResult<()> {
    let message_addr = hdk::commit_entry(&Entry::new(EntryType::App("message".into()), message))?;
    // link to the channel
    hdk::link_entries(&channel_address, &message_addr, "message_in")?;  

    subjects.iter().map(|subject| -> ZomeApiResult<()> {
        let subject_entry = Entry::new(
            EntryType::App("subject".into()), 
            Subject{name: subject.to_owned(), channel_address: channel_address.clone()});

        let subject_address = hdk::commit_entry(&subject_entry)?;
        hdk::link_entries(&channel_address, &subject_address, "subject_in")?;
        hdk::link_entries(&subject_address, &message_addr, "message_in")?;
        Ok(())
    }).collect::<ZomeApiResult<()>>()?;

    Ok(())
}


fn get_subjects(channel_address: &HashString) -> ZomeApiResult<Vec<String>> {
    utils::get_links_and_load(channel_address, "subject_in").map(|results| {
        results.iter().map(|get_links_result| {
                Subject::try_from(get_links_result.entry.value().clone()).unwrap().name
        }).collect()
    })
}

