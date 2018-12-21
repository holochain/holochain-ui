use core::convert::TryFrom;
use hdk::AGENT_ADDRESS;

use hdk::holochain_core_types::{
    hash::HashString,
	error::HolochainError,
    json::{JsonString, RawString},
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
};

use crate::utils::{
	GetLinksLoadResult,
	get_links_and_load_type,
};

use crate::profile::{
	Profile,
	ProfileSpec,
	ProfileField,
	MapFieldsResult,
};

use hdk::error::{ZomeApiResult, ZomeApiError};
use crate::profile;
extern crate serde_json;

/*=============================================
=            Public zome functions            =
=============================================*/


pub fn handle_register_app(spec: ProfileSpec) -> ZomeApiResult<()> {

	let persona_entry = Entry::App(
        AppEntryType::from("profile"),
        AppEntryValue::from(spec),
    );
    let anchor_entry = Entry::App(
        AppEntryType::from("profile_anchor"),
        AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
    );

	let profile_address = hdk::commit_entry(&persona_entry)?;
	let anchor_address = hdk::commit_entry(&anchor_entry)?;

	hdk::link_entries(&anchor_address, &profile_address, "profiles")?;

	Ok(())
}


pub fn handle_get_profiles() -> ZomeApiResult<Vec<Profile>> {
	let anchor_entry = Entry::App(
        AppEntryType::from("profile_anchor"),
        AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
    );
	let anchor_address = hdk::commit_entry(&anchor_entry)?;

	let result: GetLinksLoadResult<ProfileSpec> = get_links_and_load_type(&anchor_address, "profiles")?;

	Ok(result.iter().map(|elem| {
		let spec = elem.entry.clone();
		let mapped_fields = get_mapped_profile_fields(&elem.address).unwrap_or(Vec::new());

		let fields: Vec<profile::ProfileField> = spec.fields.iter().map(|field_spec| {

			for matching_map in mapped_fields.iter().filter(|mapped_field| { mapped_field.entry.name == field_spec.name }) {
				return matching_map.entry.clone() // return the first if there are multiple mappings for the same fieldSpec
			}

			profile::ProfileField::from_spec(field_spec.clone(), None)			

		}).collect();

		profile::Profile::from_spec(
			spec, 
			elem.address.to_owned(), 
			fields,
		)

	}).collect())
}


pub fn handle_create_mapping(mapping: profile::ProfileMapping) -> ZomeApiResult<MapFieldsResult> {
	let profiles: Vec<profile::Profile> = handle_get_profiles()?;
	let mut mappings_created = 0;

	for profile in profiles.iter().filter(|profile| profile.sourceDNA == mapping.retrieverDNA) {
		for field in profile.fields.iter().filter(|field| field.name == mapping.profileFieldName) {
			mappings_created += 1;

			let new_field = field.new_with_mapping(Some(profile::FieldMapping {
				personaAddress: mapping.personaAddress.to_owned(),
				personaFieldName: mapping.personaFieldName.to_owned()
			}));

			let field_entry = Entry::App(
		        AppEntryType::from("field_mapping"),
		        AppEntryValue::from(new_field),
		    );
			let field_hash = hdk::commit_entry(&field_entry)?;
			hdk::link_entries(&profile.hash, &field_hash, "field_mappings")?;
		}
	}
	Ok(MapFieldsResult{mappings_created})
}


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
struct GetFieldCallStruct {
	persona_address: HashString,
	field_name: String
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
struct CallResult {
    ok: bool,
    error: Option<String>,
    value: String
}

pub fn handle_retrieve(retriever_dna: HashString, profile_field: String) -> ZomeApiResult<RawString> {

	let profiles: Vec<profile::Profile> = handle_get_profiles()?;

	for profile in profiles.iter().filter(|profile| profile.sourceDNA == retriever_dna) {
		for field in get_mapped_profile_fields(&profile.hash).unwrap().iter().filter(|elem| elem.entry.name == profile_field) {

			match &field.entry.mapping {
				Some(mapping) => {
					let maybe_get_field_result = hdk::call(hdk::THIS_INSTANCE, "personas", "main", "get_field", "fake token", GetFieldCallStruct{
						persona_address: mapping.personaAddress.clone(),
						field_name: mapping.personaFieldName.clone()
					}.into())?;


					let get_field_result = CallResult::try_from(maybe_get_field_result)?;

				    if !get_field_result.ok {
				        return Err(ZomeApiError::Internal("Could not call Vault".into()))
				    }

				    let response_json: serde_json::Value = serde_json::from_str(&get_field_result.value).unwrap();

				    match response_json["Ok"].clone() {
				        serde_json::Value::String(value) => {
				        	return Ok(RawString::from(value))
				        },
				        _ => return Err(ZomeApiError::Internal("Field value could not be retrieved".to_string()))
				    }
				},
				None => {
					return Err(ZomeApiError::Internal("Field not mapped".to_string()))
				}
			}


		}
	}
	Err(ZomeApiError::Internal("Nothing in the vault".to_string()))
}


/*=====  End of Public zome functions  ======*/

fn get_mapped_profile_fields(profile_address: &HashString) -> ZomeApiResult<GetLinksLoadResult<ProfileField>> {
	get_links_and_load_type(profile_address, "field_mappings")
}

