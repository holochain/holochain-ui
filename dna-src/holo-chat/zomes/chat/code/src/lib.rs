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
use hdk::holochain_core_types::hash::HashString;
use hdk::holochain_core_types::json::JsonString;

mod message;
mod channel;
mod member;

define_zome! {

	entries: [
		message::message_definition(),
    channel::public_channel_definition(),
    channel::direct_channel_definition()
	]

    genesis: || {
		Ok(())
    }

    functions: {
    }
 }
