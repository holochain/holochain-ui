use core::convert::TryFrom;

use hdk::holochain_core_types::json::JsonString;
use hdk::holochain_core_types::error::HolochainError;
use hdk::{
    AGENT_ADDRESS,
    AGENT_ID_STR,
    DNA_HASH,
    error::{ZomeApiResult, ZomeApiError},
};

use hdk::holochain_core_types::{
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    json::RawString,
    cas::content::Address,
};

use crate::member;

pub fn handle_init() -> ZomeApiResult<()> {

    hdk::debug(AGENT_ADDRESS.to_string())?;

    // if the agent already contains a StoreProfile then we are done! Let them start the app
    if member::handlers::handle_get_profile(AGENT_ADDRESS.to_string().into()).is_ok() {
        return Ok(())
    }

    // if that failed we need to set them up
    // register_with_vault()?;

    // This will fail until the user has actually opened vault and completed the required fields
    // upon failing the UI should redirect to the vault form
    // create_profile_from_vault()?;
    create_temp_profile()?;
    
    // if we got to here this means the profile was successfully created from vault so we
    // link the agent to the directory and proceed!
    link_agent_to_directory()?;
	Ok(())
 }


fn link_agent_to_directory() -> ZomeApiResult<()> {
    let anchor_entry = Entry::App(
        AppEntryType::from("anchor"),
        AppEntryValue::from(RawString::from("member_directory")),
    );
    let anchor_address = hdk::commit_entry(&anchor_entry)?;

    
    hdk::link_entries(&anchor_address, &AGENT_ADDRESS, "member_tag")?;

    Ok(())
}

fn register_with_vault() -> ZomeApiResult<()> {


    // let spec = RegisterCallStruct{
    //     spec: ProfileSpec{
    //         name: "holo-chat".into(),
    //         sourceDNA: DNA_HASH.to_string().into(),
    //         fields: vec!(
    //             ProfileFieldSpec{
    //                 name: "handle".into(),
    //                 displayName: "Handle".into(),
    //                 description: "How other users will see you".into(),
    //                 schema: "".into(),
    //                 usage: UsageType::STORE,
    //                 required: true
    //             },
    //             ProfileFieldSpec{
    //                 name: "email".into(),
    //                 displayName: "Email".into(),
    //                 description: "A way to be contacted outside of holo-chat".into(),
    //                 schema: "".into(),
    //                 usage: UsageType::STORE,
    //                 required: false
    //             },
    //             ProfileFieldSpec{
    //                 name: "timezone".into(),
    //                 displayName: "Time Zone".into(),
    //                 description: "Your local timezone. Used by AOP for scheduling".into(),
    //                 schema: "".into(),
    //                 usage: UsageType::STORE,
    //                 required: false
    //             }
    //         )
    //     }
    // };

    // hdk::call("profiles", "main", "register_app", spec.into())?;
    // // also create a default persona
    // hdk::call("personas", "main", "create_persona", 
    //     CreatePersonaCallStruct::new(AGENT_ID_STR.to_string().into()).into())?;
    Ok(())
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
struct CallResult {
    ok: bool,
    error: Option<String>,
    value: String
}


fn create_temp_profile() -> ZomeApiResult<()> {
    let agent_profile_entry = Entry::App(
        AppEntryType::from("chat_profile"),
        AppEntryValue::from(member::StoreProfile{
            handle: AGENT_ID_STR.to_string(),
            email: "dummy@email".into(), 
            avatar: "".into(), 
            timezone:"GMT".into()
        })
    );

    let agent_profile_address = hdk::commit_entry(&agent_profile_entry)?;

    hdk::link_entries(&AGENT_ADDRESS, &agent_profile_address, "profile")?;
    Ok(())
}


fn create_profile_from_vault() -> ZomeApiResult<()> {
    let dna_hash = DNA_HASH.to_string();

    let maybe_get_handle_result = hdk::call(hdk::THIS_INSTANCE, "profiles", "main", "fake token", "retrieve", 
        json!({"retriever_DNA": dna_hash, "profile_field": "handle"}).into())?;
    let get_handle_result = CallResult::try_from(maybe_get_handle_result)?;

    if !get_handle_result.ok {
        return Err(ZomeApiError::Internal("Could not call Vault".into()))
    }

    let response_json: serde_json::Value = serde_json::from_str(&get_handle_result.value).unwrap();

    match response_json["Ok"].clone() {
        serde_json::Value::String(handle) => {
            let agent_profile_entry = Entry::App(
                AppEntryType::from("chat_profile"),
                AppEntryValue::from(member::StoreProfile{
                    handle: handle.to_string(),
                    email: "dummy@email".into(), 
                    avatar: "".into(), 
                    timezone:"GMT".into()
                })
            );

            let agent_profile_address = hdk::commit_entry(&agent_profile_entry)?;

            hdk::link_entries(&AGENT_ADDRESS, &agent_profile_address, "profile")?;
            Ok(())
        },
        _ => Err(ZomeApiError::Internal("Could not retrieve handle from vault".into()))
    }



}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct ProfileSpec {
    pub name: String,
    pub sourceDNA: Address,
    pub fields: Vec<ProfileFieldSpec>
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct ProfileFieldSpec {
    pub name: String,
    pub displayName: String,
    pub required: bool,
    pub description: String,
    pub usage: UsageType,
    pub schema: String
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub enum UsageType {
    STORE,
    DISPLAY
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
struct RegisterCallStruct {
    spec: ProfileSpec
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
struct CreatePersonaCallStruct {
    spec: PersonaSpec
}

impl CreatePersonaCallStruct {
    pub fn new(name: String)-> CreatePersonaCallStruct {
        CreatePersonaCallStruct {
            spec: PersonaSpec {
                name: name
            }
        }
    }
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct PersonaSpec {
    pub name: String
}
