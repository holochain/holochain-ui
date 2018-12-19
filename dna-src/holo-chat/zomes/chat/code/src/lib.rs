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
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    hash::HashString,
    cas::content::Address,
};

mod anchor;
mod message;
mod stream;
mod member;
mod init;
mod utils;
mod test_data;


define_zome! {

	entries: [
		message::message_definition(),
    	stream::public_stream_definition(),
    	stream::direct_stream_definition(),
        stream::subject_anchor_definition(),
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
			create_stream: {
				inputs: |name: String, description: String, initial_members: Vec<Address>, public: bool|,
				outputs: |result: ZomeApiResult<Address>|,
				handler: stream::handlers::handle_create_stream
			}
			get_my_streams: {
				inputs: | |,
				outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<stream::Stream>>|,
				handler: stream::handlers::handle_get_my_streams
			}
			get_all_public_streams: {
				inputs: | |,
				outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<stream::Stream>>|,
				handler: stream::handlers::handle_get_all_public_streams
			}
            get_all_members: {
				inputs: | |,
				outputs: |result: ZomeApiResult<Vec<member::Member>>|,
				handler: member::handlers::handle_get_all_members
			}
			get_members: {
				inputs: |stream_address: HashString|,
				outputs: |result: ZomeApiResult<Vec<member::Member>>|,
				handler: stream::handlers::handle_get_members
			}
			add_members: {
				inputs: |stream_address: HashString, members: Vec<Address>|,
				outputs: |result: ZomeApiResult<()>|,
				handler: stream::handlers::handle_add_members
			}
			join_stream: {
				inputs: |stream_address: HashString|,
				outputs: |result: ZomeApiResult<()>|,
				handler: stream::handlers::handle_join_stream
			}
			post_message: {
				inputs: |stream_address: HashString, message: message::MessageSpec, subjects: Vec<String>|,
				outputs: |result: ZomeApiResult<()>|,
				handler: stream::handlers::handle_post_message
			}
			get_messages: {
				inputs: |address: HashString|,
				outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<message::Message>>|,
				handler: stream::handlers::handle_get_messages
			}
            get_subjects: {
                inputs: |stream_address: HashString|,
                outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<stream::Subject>>|,
                handler: stream::handlers::handle_get_subjects
            }
			get_profile: {
				inputs: |member_id: Address|,
				outputs: |result: ZomeApiResult<member::StoreProfile>|,
				handler: member::handlers::handle_get_profile
			}
		}
	}
 }
