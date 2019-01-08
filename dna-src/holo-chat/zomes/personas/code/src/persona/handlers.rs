use hdk::AGENT_ADDRESS;
use hdk::error::{ZomeApiResult, ZomeApiError};
use crate::persona::{
    PersonaSpec,
    Persona,
    PersonaField
};
use hdk::holochain_core_types::{
    json::{RawString},
    hash::HashString,
    cas::content::Address,
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
};

use crate::utils::{
    GetLinksLoadResult,
    GetLinksLoadElement,
    get_links_and_load_type
};

/*==========================================
=            public fn handlers            =
==========================================*/

pub fn handle_create_persona(spec: PersonaSpec) -> ZomeApiResult<Address> {

    let persona_entry = Entry::App(
        AppEntryType::from("persona"),
        AppEntryValue::from(spec),
    );
    let anchor_entry = Entry::App(
        AppEntryType::from("persona_anchor"),
        AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
    );

    let persona_address = hdk::commit_entry(&persona_entry)?;
    let anchor_address = hdk::commit_entry(&anchor_entry)?;

    hdk::link_entries(&anchor_address, &persona_address, "personas")?;

    Ok(persona_address)
}




pub fn handle_get_personas() -> ZomeApiResult<GetLinksLoadResult<Persona>> {
    let anchor_address = hdk::commit_entry(
        &Entry::App(
            AppEntryType::from("persona_anchor"),
            AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
        )
    )?;

    let persona_specs: GetLinksLoadResult<PersonaSpec> = get_links_and_load_type(&anchor_address, "personas")?;

    let result = persona_specs.iter().map(|elem| {
        GetLinksLoadElement{
            entry: Persona{
                name: elem.entry.name.to_owned(),
                fields: get_fields(&elem.address).unwrap_or(Vec::new())
            },
            address: elem.address.clone()
        }
    }).collect::<GetLinksLoadResult<Persona>>();

    Ok(result)
}


pub fn handle_add_field(persona_address: HashString, field: PersonaField) -> ZomeApiResult<()> {

    let persona_field_entry = Entry::App(
        AppEntryType::from("personaField"),
        AppEntryValue::from(field),
    );

    let field_address = hdk::commit_entry(&persona_field_entry)?;
    hdk::link_entries(&persona_address, &field_address, "fields")?;
    Ok(())
}

pub fn handle_get_field(persona_address: HashString, field_name: String) -> ZomeApiResult<RawString> {
    let fields = get_fields(&persona_address)?;
    match fields.iter().filter(|field| {field.name == field_name}).next() {
        Some(field) => Ok(field.data.to_owned().into()),
        None => Err(ZomeApiError::Internal("No matching field names".into()))
    }
}


/*=====  End of public fn handlers  ======*/


fn get_fields(persona_address: &HashString) -> ZomeApiResult<Vec<PersonaField>> {
    get_links_and_load_type(persona_address, "fields").map(|result: GetLinksLoadResult<PersonaField>| {
        result.iter().map(|elem| {
            elem.entry.clone()
        }).collect()
    })
}
