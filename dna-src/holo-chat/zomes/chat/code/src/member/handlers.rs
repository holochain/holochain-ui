
use hdk::error::{
    ZomeApiResult,
    ZomeApiError
};


use crate::member::{
    Member,
    StoreProfile
};


pub fn handle_get_profile(member_id: Member) -> ZomeApiResult<StoreProfile> {
    Err(ZomeApiError::Internal("not implemented".to_string()))
}

pub fn get_my_member_id() -> Member {
    Member{id: "wollum".into(), profile:None} // placeholder until vault is linkable
}

pub fn handle_get_all_members() -> ZomeApiResult<Vec<Member>> {
    Err(ZomeApiError::Internal("not implemented".to_string()))
}

fn get_profile(member:Member) -> ZomeApiResult<Option<StoreProfile>>
{
    Err(ZomeApiError::Internal("not implemented".to_string()))
}

