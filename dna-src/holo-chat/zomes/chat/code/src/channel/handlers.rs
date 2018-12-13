
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    hash::HashString,
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    cas::content::Address,
};

use crate::channel::{
    Channel,
    Subject,
};

use crate::member::{
    handlers::get_my_member_id
};
use crate::utils;
use crate::message;
use crate::member;

pub fn handle_create_channel(
    name: String,
    description: String,
    initial_members: Vec<Address>,
    public: bool,
) -> ZomeApiResult<Address> {

    let channel = Channel{name, description, public};

    let entry = match public {
        true => Entry::App(
            AppEntryType::from("public_channel"),
            AppEntryValue::from(channel)
        ),
        false => Entry::App(
            AppEntryType::from("direct_channel"),
            AppEntryValue::from(channel)
        )
    };

    let channel_address = hdk::commit_entry(&entry)?;
    utils::link_entries_bidir(&get_my_member_id(), &channel_address, "member_of", "has_member")?;
    
    for member in initial_members {
        utils::link_entries_bidir(&member, &channel_address, "member_of", "has_member")?;
    }
    Ok(channel_address)
}

pub fn handle_add_members(channel_address: HashString, members: Vec<Address>) -> ZomeApiResult<()> {
    for member in members {
        utils::link_entries_bidir(&member, &channel_address, "member_of", "has_member")?;
    }
    Ok(())
}


pub fn handle_get_my_channels() -> ZomeApiResult<utils::GetLinksLoadResult<Channel>> {
    utils::get_links_and_load_type(&get_my_member_id(), "member_of")
}


pub fn handle_get_members(address: HashString) -> ZomeApiResult<Vec<member::Member>> {
    let all_member_ids = hdk::get_links(&address, "has_member").map(|links| {
        links.addresses().iter().map(|addr| {
            let profile = member::handlers::handle_get_profile(addr.to_owned()).unwrap();
            member::Member{
                address: addr.clone(),
                profile: profile
            }
        }).collect()
    })?;

    Ok(all_member_ids)
}



pub fn handle_get_messages(address: HashString) -> ZomeApiResult<utils::GetLinksLoadResult<message::Message>> {
    utils::get_links_and_load_type(&address, "message_in")
}

pub fn handle_get_subjects(address: HashString) -> ZomeApiResult<utils::GetLinksLoadResult<Subject>> {
    utils::get_links_and_load_type(&address, "channel_subject")
}


pub fn handle_post_message(channel_address: HashString, message_spec: message::MessageSpec, subjects: Vec<String>) -> ZomeApiResult<()> {
    
    let message = message::Message::from_spec(
        &message_spec, 
        &"test author".to_string(), 
        &"test timestamp".to_string());

    let message_entry = Entry::App(
        AppEntryType::from("message"),
        AppEntryValue::from(message)
    );

    let message_addr = hdk::commit_entry(&message_entry)?;

    hdk::link_entries(&channel_address, &message_addr, "message_in")?;

    for subject in subjects {
        let subject_entry = Entry::App(
            AppEntryType::from("subject"),
            AppEntryValue::from(Subject{name: subject.to_owned(), channel_address: channel_address.clone()})
        );
        let subject_address = hdk::commit_entry(&subject_entry)?;
        hdk::link_entries(&subject_address, &message_addr, "message_in")?;
        hdk::link_entries(&channel_address, &subject_address, "channel_subject")?;
    }

    Ok(())
}



