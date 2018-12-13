
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

    // on app startup link the agent to the directory every time
    // this will only make a difference on the first call
	link_agent_to_directory()?;

    let agent_profile_entry = Entry::App(
        AppEntryType::from("chat_profile"),
        AppEntryValue::from(member::StoreProfile{handle: "Phil".into(), email: "philip.beadle@holo.host".into(), avatar: "".into(), timezone:"ADT".into()})
    );

    let agent_profile_address = hdk::commit_entry(&agent_profile_entry)?;

    hdk::link_entries(&AGENT_ADDRESS, &agent_profile_address, "profile")?;

	Ok(())
 }


fn link_agent_to_directory() -> ZomeApiResult<()> {
    let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
    );
    let anchor_address = hdk::commit_entry(&anchor_entry)?;

    
    hdk::link_entries(&anchor_address, &AGENT_ADDRESS, "member_tag")?;

    Ok(())
}
