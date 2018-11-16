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
    holochain_dna::zome::entry_types::Sharing,
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
		member::member_id_definition(),
        entry!(
			name: "anchor",
	        description: "",
	        sharing: Sharing::Public,
	        native_type: String,

	        validation_package: || {
	            hdk::ValidationPackageDefinition::Entry
	        },

	        validation: |name: String, _ctx: hdk::ValidationData| {
	        	Ok(())
	        }
		)
	]

    genesis: || {
        {
            let anchor_entry = Entry::new(EntryType::App("anchor".into()), json!("member_directory"));
    		let member_entry1 = Entry::new(EntryType::App("member".into()), member::Member{id: "glibglob".into()});

            let anchor_address = hdk::commit_entry(&anchor_entry).map_err(|_| "anchor not committed")?;
            let member_address1 = hdk::commit_entry(&member_entry1).map_err(|_| "member not committed")?;

            hdk::link_entries(&anchor_address, &member_address1, "member_tag").map_err(|_| "member not linked to anchor")?;
            Ok(())
        }
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
            get_all_members: {
				inputs: | |,
				outputs: |result: JsonString|,
				handler: member::handle_get_all_members
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
