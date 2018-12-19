use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    hash::HashString,
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    cas::content::Address,
};

use crate::event::{
    Event
};

// use crate::utils;

pub fn handle_save_event(since:String, until:String) -> ZomeApiResult<Address> {
	let event = Event{since, until};
	let entry = Entry::App(
		AppEntryType::from("event"),
		AppEntryValue::from(event)
		);
	hdk::debug(&entry);
    let event_address = hdk::commit_entry(&entry)?;
	hdk::debug(&event_address);
    // hdk::link_entries(&AGENT_ADDRESS, &event_address, "event")?;
    Ok(event_address)
}

// pub fn handle_get_events(hash : HashString) -> ZomeApiResult<GetLinksLoadResult<Entry>> {
// 	let get_links_result = hdk::get_links(&hash,"event")?;
//
// 	Ok(get_links_result.addresses()
// 		.iter()
// 		.map(|address| {
// 			hdk::get_entry(address.to_owned())
// 			.map(|entry: Option<Entry>| {
// 				GetLinksLoadElement{
// 					address: address.to_owned(),
// 					entry: entry.unwrap()
// 				}
// 			})
// 		})
// 		.filter_map(Result::ok)
// 		.collect())
// }
