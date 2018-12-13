
use hdk::{
    AGENT_ADDRESS,
    holochain_core_types::{
        entry::{entry_type::AppEntryType, AppEntryValue, Entry},
        json::{RawString}
    },
    error::{
        ZomeApiResult,
        ZomeApiError
    }
};

use crate::member::{
    Member,
    StoreProfile
};
use crate::utils::{
    get_links_and_load_type,
    GetLinksLoadResult
};


pub fn handle_get_profile(_member_id: Member) -> ZomeApiResult<StoreProfile> {
    Err(ZomeApiError::Internal("zome function not implemented".to_string()))
}

pub fn get_my_member_id() -> Member {
    Member{id: AGENT_ADDRESS.to_string(), profile:None}
}

pub fn handle_get_all_members() -> ZomeApiResult<GetLinksLoadResult<Member>> {
    let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
    );
    let anchor_address = hdk::entry_address(&anchor_entry)?;
    get_links_and_load_type(&anchor_address, "member_tag")
}