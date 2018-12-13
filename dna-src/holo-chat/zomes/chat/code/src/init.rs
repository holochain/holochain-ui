
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

    // on app startup link the agent to the directory every time
    // this will only make a difference on the first call
	link_agent_to_directory()?;

    // also register the app with vault.
    // Right now this is calling between zomes but later 
    // will call over the bridge. This just lets vault know that chat exists
    register_with_vault()?;

    // 
    link_profile_to_agent()?;

    
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

fn link_profile_to_agent() -> ZomeApiResult<()> {
    let agent_profile_entry = Entry::App(
        AppEntryType::from("chat_profile"),
        AppEntryValue::from(member::StoreProfile{handle: "Phil".into(), email: "philip.beadle@holo.host".into(), avatar: "".into(), timezone:"ADT".into()})
    );

    let agent_profile_address = hdk::commit_entry(&agent_profile_entry)?;

    hdk::link_entries(&AGENT_ADDRESS, &agent_profile_address, "profile")?;

    Ok(())
}
