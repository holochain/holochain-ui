
use hdk::{
    AGENT_ADDRESS,
    holochain_core_types::{
        entry::{entry_type::AppEntryType, AppEntryValue, Entry},
        json::{RawString},
        cas::content::Address,
    },
    error::{
        ZomeApiResult,
        ZomeApiError
    }
};

use crate::member::{
    StoreProfile
};


pub fn handle_get_profile(_member_id: Address) -> ZomeApiResult<StoreProfile> {
    Err(ZomeApiError::Internal("zome function not implemented".to_string()))
}

pub fn get_my_member_id() -> Address {
    Address::from(AGENT_ADDRESS.to_string())
}

pub fn handle_get_all_members() -> ZomeApiResult<Vec<Address>> {
    let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
    );
    let anchor_address = hdk::entry_address(&anchor_entry)?;

    let all_member_ids = hdk::get_links(&anchor_address, "member_tag").map(|links| {
        links.addresses().iter().map(|addr| {
            addr.clone()
        }).collect()
    })?;

    Ok(all_member_ids)
}