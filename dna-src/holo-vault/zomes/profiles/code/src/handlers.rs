use hdk::error::ZomeApiResult;
use hdk::serde::de::DeserializeOwned;
use crate::profile;
extern crate serde_json;
use hdk::holochain_core_types::hash::HashString;


pub fn handle_register_app(spec: profile::ProfileSpec) -> bool {
    match (
		hdk::commit_entry("profile", json!(spec)),
		hdk::commit_entry("anchor", json!("profiles"))
	) {
		(Ok(profile_address),Ok(anchor_address)) => {
			match hdk::link_entries(&anchor_address, &profile_address, "") {
				Ok(_) => true,
				Err(_) => false,
			}
		},
		_ => false,
	}
}

pub fn handle_get_profiles() -> serde_json::Value { // array of profiles
	let anchor_address = hdk::commit_entry("anchor", json!("profiles")).expect("Could not commit anchor");

	let get_links_results: ZomeApiResult<GetLinksLoadResult<profile::ProfileSpec>> = get_links_and_load(&anchor_address, "");
	match get_links_results {
		Ok(result) => {
			let profiles: Vec<profile::Profile> = result.iter().map(|elem| { // add code to loads fields etc

				// merge spec fields and mapped fields to return a mapping where provided
				let mapped_fields: Vec<profile::ProfileField> = serde_json::from_value(
					handle_get_profile_fields(elem.address.to_owned()).get("fields").unwrap().to_owned()
				).unwrap();

				let fields: Vec<profile::ProfileField> = elem.entry.fields.iter().map(|field_spec| {
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
					elem.entry.clone(), 
					elem.address.to_owned(), 
					fields
				)
			}).collect();
			json!({"profiles": profiles})
		},
        Err(hdk_error) => hdk_error.to_json(),
	}
}

pub fn handle_create_mapping(mapping: profile::ProfileMapping) -> u32 {
	let mut maps_created = 0u32;
	let profiles: Vec<profile::Profile> = serde_json::from_value(
		handle_get_profiles().get("profiles").unwrap().to_owned()
	).unwrap();

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

					hdk::commit_entry("field_mapping", json!(new_field))
						.and_then(|result| {
							hdk::link_entries(&profile.hash, &result, "field_mappings")
						})
						.and_then(|_| {
							maps_created += 1;
							Ok(())
						});

				});
		});

	maps_created
}

pub fn handle_get_profile_fields(profile_address: HashString) -> serde_json::Value { // array of profileFields
	json!({"fields": []})
}



pub fn handle_retrieve(retriever_DNA: HashString, profile_field: String) -> serde_json::Value {
	json!({})
}




// #[derive(Serialize, Deserialize, Debug)]
struct GetLinksLoadElement<T> {
	address: HashString,
	entry: T
}

type GetLinksLoadResult<T> = Vec<GetLinksLoadElement<T>>;



fn get_links_and_load<T, S: Into<String>>(
    base: &HashString, 
    tag: S
) -> ZomeApiResult<GetLinksLoadResult<T>> where T: DeserializeOwned {
	hdk::get_links(base, tag)
		.map(|result| {
			result.links.iter()
				.map(|address| {
					hdk::get_entry(address.to_owned())
						.map(|entry: Option<T>| {
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
