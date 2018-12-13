
use hdk::{
    AGENT_ADDRESS,
    DNA_HASH,
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
    json::RawString,
};

use crate::member;
use profiles::profile::{
    ProfileSpec,
    ProfileFieldSpec,
    UsageType,
};

pub fn handle_init() -> ZomeApiResult<()> {
    // if the agent already contains a StoreProfile then we are done! Let them start the app
    if member::handlers::handle_get_profile(AGENT_ADDRESS.to_string().into()).is_ok() {
        return Ok(())
    }

    // if that failed we need to set them up
    register_with_vault()?;

    // This will fail until the user has actually opened vault and completed the required fields
    // upon failing the UI should redirect to the vault form
    create_profile_from_vault()?;
    
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


    let spec = ProfileSpec{
        name: "holo-chat".into(),
        sourceDNA: DNA_HASH.to_string().into(),
        fields: vec!(
            ProfileFieldSpec{
                name: "handle".into(),
                displayName: "Handle".into(),
                description: "How other users will see you".into(),
                schema: "".into(),
                usage: UsageType::STORE,
                required: true
            },
            ProfileFieldSpec{
                name: "email".into(),
                displayName: "Email".into(),
                description: "A way to be contacted outside of holo-chat".into(),
                schema: "".into(),
                usage: UsageType::STORE,
                required: false
            },
            ProfileFieldSpec{
                name: "avatar".into(),
                displayName: "Avatar".into(),
                description: "Will be displayed next to your messages".into(),
                schema: "".into(),
                usage: UsageType::STORE,
                required: false
            },
            ProfileFieldSpec{
                name: "timezone".into(),
                displayName: "Time Zone".into(),
                description: "Your local timezone. Used by AOP for scheduling".into(),
                schema: "".into(),
                usage: UsageType::STORE,
                required: false
            }
        )
    };

    hdk::call("profiles", "main", "register_app", spec.into())?;
    Ok(())
}

fn create_profile_from_vault() -> ZomeApiResult<()> {

    let agent_profile_entry = Entry::App(
        AppEntryType::from("chat_profile"),
        AppEntryValue::from(member::StoreProfile{
            handle: "Phil".into(), 
            email: "philip.beadle@holo.host".into(), 
            avatar: "".into(), 
            timezone:"ADT".into()
        })
    );

    let agent_profile_address = hdk::commit_entry(&agent_profile_entry)?;

    hdk::link_entries(&AGENT_ADDRESS, &agent_profile_address, "profile")?;

    Ok(())
}
