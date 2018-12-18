
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
    StoreProfile,
    Member
};
use crate::utils;


pub fn handle_get_profile(member_id: Address) -> ZomeApiResult<StoreProfile> {    
    let results: utils::GetLinksLoadResult<StoreProfile> = utils::get_links_and_load_type(&member_id, "profile")?;
    results.iter().next().map(|elem| elem.entry.clone()).ok_or(ZomeApiError::Internal("No profile found".into()))
}

pub fn get_my_member_id() -> Address {
    Address::from(AGENT_ADDRESS.to_string())
}

pub fn handle_get_all_members() -> ZomeApiResult<Vec<Member>> {
    let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
    );
    let anchor_address = hdk::entry_address(&anchor_entry)?;

    let all_member_ids = hdk::get_links(&anchor_address, "member_tag")?;

    all_member_ids.addresses().iter().map(|addr| {
        let profile = handle_get_profile(addr.to_owned())?;
        Ok(Member{
            address: addr.clone(),
            profile: profile
        })
    }).collect()
}