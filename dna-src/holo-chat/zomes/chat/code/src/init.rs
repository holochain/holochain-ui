
use hdk::{
    AGENT_ADDRESS,
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    json::RawString,
};

use crate::member;

pub fn handle_init() -> ZomeApiResult<()> {
	let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
	);
	let anchor_address = hdk::commit_entry(&anchor_entry)?;
    let agent_member_entry = Entry::App(
        AppEntryType::from("member"),
        AppEntryValue::from(member::Member{id: AGENT_ADDRESS.to_string(), profile:None})
    );

    let agent_profile_entry = Entry::App(
        AppEntryType::from("chat_profile"),
        AppEntryValue::from(member::StoreProfile{handle: "Phil".into(), email: "philip.beadle@holo.host".into(), avatar: "".into(), timezone:"ADT".into()})
    );

    let agent_member_address = hdk::commit_entry(&agent_member_entry)?;
    let agent_profile_address = hdk::commit_entry(&agent_profile_entry)?;

    hdk::link_entries(&anchor_address, &agent_member_address, "member_tag")?;
    hdk::link_entries(&agent_member_address, &agent_profile_address, "profile")?;

	Ok(())
 }
