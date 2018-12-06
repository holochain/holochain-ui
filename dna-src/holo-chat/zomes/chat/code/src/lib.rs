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

use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    hash::HashString,
    entry::Entry,
    dna::zome::entry_types::Sharing,
    entry::entry_type::EntryType,
    cas::content::Address,
    json::JsonString,
};


mod message;
mod channel;
mod member;
mod utils;
mod test_data;

use crate::member::{
    StoreProfile
};

define_zome! {

	entries: [
		message::message_definition(),
    	channel::public_channel_definition(),
    	channel::direct_channel_definition(),
        channel::subject_anchor_definition(),
		member::member_id_definition(),
        member::profile_definition(),
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
	        },

	        links: [
	        	to!(
	        		"member",
	        		tag: "member_tag",

	                validation_package: || {
	                    hdk::ValidationPackageDefinition::Entry
	                },

	                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
	                    Ok(())
	                }
	        	)
	        ]
		)
	]

    genesis: || {
        {
    		Ok(())
        }
    }

	functions: {
		main (Public) {
			init: {
				inputs: | |,
				outputs: |result: JsonString|,
				handler: handle_init
			}
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
				inputs: |channel_address: HashString, message: message::MessageSpec, subjects: Vec<String>|,
				outputs: |result: JsonString|,
				handler: channel::handle_post_message
			}
			get_messages: {
				inputs: |address: HashString|,
				outputs: |result: JsonString|,
				handler: channel::handle_get_messages
			}
            get_subjects: {
                inputs: |channel_address: HashString|,
                outputs: |result: JsonString|,
                handler: channel::handle_get_subjects
            }
			get_profile: {
				inputs: |member_id: member::Member|,
				outputs: |result: JsonString|,
				handler: member::handle_get_profile
			}
		}
	}
 }


 fn handle_init() -> JsonString {
    match run_init() {
    	Ok(()) => json!({"success": true}).into(),
    	Err(hdk_err) => hdk_err.into()
    }
 }

 fn run_init() -> ZomeApiResult<()> {
	let anchor_entry = Entry::new(EntryType::App("anchor".into()), json!("member_directory"));
	let anchor_address = hdk::commit_entry(&anchor_entry)?;

	for profile in test_data::get_test_profiles().iter() {
	    let member_entry = Entry::new(EntryType::App("member".into()), member::Member{id: profile.to_owned().handle.into(), profile:None});
	    let profile_entry = Entry::new(EntryType::App("chat_profile".into()), member::StoreProfile{handle: profile.to_owned().handle.into(), email: profile.to_owned().email.into(), avatar: profile.to_owned().avatar.into(), timezone:profile.to_owned().timezone.into()});

	    let member_address = hdk::commit_entry(&member_entry)?;
	    let profile_address = hdk::commit_entry(&profile_entry)?;

	    hdk::link_entries(&anchor_address, &member_address, "member_tag")?;
	    hdk::link_entries(&member_address, &profile_address, "profile")?;
	}
	Ok(())
 }
