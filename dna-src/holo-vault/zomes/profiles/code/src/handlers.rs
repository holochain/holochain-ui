use hdk::holochain_core_types::entry::Entry;
use hdk::holochain_core_types::entry_type::EntryType;

use hdk::holochain_core_types::json::JsonString;
use hdk::error::ZomeApiResult;
use crate::profile;
extern crate serde_json;
use hdk::holochain_core_types::hash::HashString;
use std::convert::TryFrom;


pub fn handle_register_app(spec: profile::ProfileSpec) -> JsonString {
    match (
		hdk::commit_entry(&Entry::new(EntryType::App("profile".into()), spec)),
		hdk::commit_entry(&Entry::new(EntryType::App("anchor".into()), json!("profiles")))
	) {
		(Ok(profile_address),Ok(anchor_address)) => {
			match hdk::link_entries(&anchor_address, &profile_address, "") {
				Ok(_) => json!({"success": true}).into(),
				Err(hdk_error) => json!({"success": false}).into(),
			}
		},
		_ => json!({"success": false}).into(),
	}
}

pub fn handle_get_profiles() -> JsonString { // array of profiles

	match get_profiles() {
		Ok(result) => {
			json!({"profiles": result}).into()
		},
        Err(hdk_error) => hdk_error.into(),
	}
}

pub fn handle_create_mapping(mapping: profile::ProfileMapping) -> JsonString {
	let mut maps_created = 0u32;
	let profiles: Vec<profile::Profile> = get_profiles().unwrap();

	profiles.iter()
		.filter(|profile| profile.sourceDNA == mapping.retrieverDNA)
		.for_each(|profile| {
			profile.fields.iter()
				.filter(|field| field.name == mapping.profileFieldName)
				.for_each(|field| {

					let new_field = field.new_with_mapping(Some(profile::FieldMapping {
						personaAddress: mapping.personaAddress.to_owned(),
						personaFieldName: mapping.personaFieldName.to_owned()
					}));

					hdk::commit_entry(&Entry::new(EntryType::App("field_mapping".into()), json!(new_field)))
						.and_then(|result| {
							hdk::link_entries(&profile.hash, &result, "field_mappings")
						})
						.and_then(|_| {
							maps_created += 1;
							Ok(())
						});

				});
		});

	json!({"maps_created": maps_created}).into()
}



pub fn handle_retrieve(_retriever_dna: HashString, _profile_field: String) -> JsonString {
	json!({}).into()
}


fn get_profiles() -> ZomeApiResult<Vec<profile::Profile>> {
	let anchor_address = hdk::commit_entry(&Entry::new(EntryType::App("anchor".into()), json!("profiles"))).expect("Could not commit anchor");

	get_links_and_load(&anchor_address, "")
		.map(|result| {
			result.iter().map(|elem| {

				let prof = profile::ProfileSpec::try_from(elem.entry.value().clone()).unwrap();
				// merge spec fields and mapped fields to return a mapping where provided
				let mapped_fields = get_mapped_profile_fields(&elem.address).unwrap();

				let fields: Vec<profile::ProfileField> = prof.fields.iter().map(|field_spec| {
					let matching_maps: Vec<profile::ProfileField> = mapped_fields.iter().filter(|mapped_field| {
						mapped_field.name == field_spec.name
					}).cloned().collect();
					if matching_maps.len() > 0 {
						matching_maps[0].clone() // return the first if there are multiple mappings for the same fieldSpec
					} else {
						profile::ProfileField::from_spec(field_spec.clone(), None)
					}
				}).collect();

				profile::Profile::from_spec(
					prof, 
					elem.address.to_owned(), 
					fields,
				)

			}).collect()
		})
}

fn get_mapped_profile_fields(profile_address: &HashString) -> ZomeApiResult<Vec<profile::ProfileField>> {
	get_links_and_load(profile_address, "field_mappings")
		.map(|results| {
			results.iter().map(|get_links_result| {
				profile::ProfileField::try_from(get_links_result.entry.value().clone()).unwrap()
		}).collect()
	})		
}



// #[derive(Serialize, Deserialize, Debug)]
struct GetLinksLoadElement {
	address: HashString,
	entry: Entry
}

type GetLinksLoadResult = Vec<GetLinksLoadElement>;



fn get_links_and_load<S: Into<String>>(
    base: &HashString, 
    tag: S
) -> ZomeApiResult<GetLinksLoadResult>  {
	hdk::get_links(base, tag)
		.map(|result| {
			result.iter()
				.map(|address| {
					hdk::get_entry(address.to_owned())
						.map(|entry: Option<Entry>| {
							GetLinksLoadElement{
								address: address.to_owned(),
								entry: entry.unwrap()
							}
						})
						.ok()
				})
				.filter_map(|elem| elem)
				.collect()
		})
}
