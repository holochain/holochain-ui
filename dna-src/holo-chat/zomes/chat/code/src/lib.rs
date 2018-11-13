#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    holochain_core_types::hash::HashString,
    holochain_core_types::entry::Entry,
    holochain_core_types::entry_type::EntryType,
};


mod message;
mod channel;
mod member;
mod utils;

define_zome! {

	entries: [
		message::message_definition(),
    	channel::public_channel_definition(),
    	channel::direct_channel_definition(),
		member::member_id_definition()
	]

    genesis: || {
		hdk::commit_entry(&Entry::new(EntryType::App("member".into()), member::Member{id: "glibglob".into()}))
			.map(|_| ())
			.map_err(|_| "Could not commit member".into())
    }

	functions: {
		main (Public) {
			create_channel: {
				inputs: |name: String, description: String, initial_members: Vec<member::Member>, public: bool|,
				outputs: |result: JsonString|,
				handler: channel::handle_create_channel
			}
			get_my_channels: {
				inputs: | |,
				outputs: |result: JsonString|,
				handler: channel::handle_get_my_channels
			}
			get_members: {
				inputs: |channel_address: HashString|,
				outputs: |result: JsonString|,
				handler: channel::handle_get_members
			}
			add_members: {
				inputs: |channel_address: HashString, members: Vec<member::Member>|,
				outputs: |result: JsonString|,
				handler: channel::handle_add_members
			}
			post_message: {
				inputs: |channel_address: HashString, message: message::Message|,
				outputs: |result: JsonString|,
				handler: channel::handle_post_message
			}
			get_messages: {
				inputs: |channel_address: HashString, min_count: u32|,
				outputs: |result: JsonString|,
				handler: channel::handle_get_messages
			}
			get_profile: {
				inputs: |member_id: member::Member|,
				outputs: |result: JsonString|,
				handler: member::handle_get_profile
			}
		}
	}
 }
