
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    json::RawString,
};

use crate::test_data;
use crate::member;

pub fn handle_init() -> ZomeApiResult<()> {

	let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
	);

	let anchor_address = hdk::commit_entry(&anchor_entry)?;

	for profile in test_data::get_test_profiles().iter() {
	    let member_entry = Entry::App(
	    	AppEntryType::from("member"),
	    	AppEntryValue::from(member::Member{id: profile.to_owned().handle.into(), profile:None})
	    );

	    let profile_entry = Entry::App(
	    	AppEntryType::from("profile"),
	    	AppEntryValue::from(member::StoreProfile{handle: profile.to_owned().handle.into(), email: profile.to_owned().email.into(), avatar: profile.to_owned().avatar.into(), timezone:profile.to_owned().timezone.into()})
	    );


	    let member_address = hdk::commit_entry(&member_entry)?;
	    let profile_address = hdk::commit_entry(&profile_entry)?;

	    hdk::link_entries(&anchor_address, &member_address, "member_tag")?;
	    hdk::link_entries(&member_address, &profile_address, "profile")?;
	}
	Ok(())
 }
