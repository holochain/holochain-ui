#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;
use hdk::{
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    hash::HashString,
    cas::content::Address,
};

mod anchor;
mod message;
mod channel;
mod member;
mod init;
mod utils;
mod test_data;


define_zome! {

	entries: [
		message::message_definition(),
    	channel::public_channel_definition(),
    	channel::direct_channel_definition(),
        channel::subject_anchor_definition(),
        member::profile_definition(),
        anchor::anchor_definition()
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
				outputs: |result: ZomeApiResult<()>|,
				handler: init::handle_init
			}
			create_channel: {
				inputs: |name: String, description: String, initial_members: Vec<Address>, public: bool|,
				outputs: |result: ZomeApiResult<Address>|,
				handler: channel::handlers::handle_create_channel
			}
			get_my_channels: {
				inputs: | |,
				outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<channel::Channel>>|,
				handler: channel::handlers::handle_get_my_channels
			}
            get_all_members: {
				inputs: | |,
				outputs: |result: ZomeApiResult<Vec<member::Member>>|,
				handler: member::handlers::handle_get_all_members
			}
			get_members: {
				inputs: |channel_address: HashString|,
				outputs: |result: ZomeApiResult<Vec<member::Member>>|,
				handler: channel::handlers::handle_get_members
			}
			add_members: {
				inputs: |channel_address: HashString, members: Vec<Address>|,
				outputs: |result: ZomeApiResult<()>|,
				handler: channel::handlers::handle_add_members
			}
			post_message: {
				inputs: |channel_address: HashString, message: message::MessageSpec, subjects: Vec<String>|,
				outputs: |result: ZomeApiResult<()>|,
				handler: channel::handlers::handle_post_message
			}
			get_messages: {
				inputs: |address: HashString|,
				outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<message::Message>>|,
				handler: channel::handlers::handle_get_messages
			}
            get_subjects: {
                inputs: |channel_address: HashString|,
                outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<channel::Subject>>|,
                handler: channel::handlers::handle_get_subjects
            }
			get_profile: {
				inputs: |member_id: Address|,
				outputs: |result: ZomeApiResult<member::StoreProfile>|,
				handler: member::handlers::handle_get_profile
			}
		}
	}
 }