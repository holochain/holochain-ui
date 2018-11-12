use hdk::{
    self, 
    entry_definition::ValidatingEntryType,
    holochain_dna::zome::entry_types::Sharing,
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
    holochain_core_types::hash::HashString,
    holochain_core_types::entry::Entry,
    holochain_core_types::entry_type::EntryType,
    error::ZomeApiResult,
    error::ZomeApiError,
};

// #[derive(Serialize, Deserialize, Debug)]
pub struct GetLinksLoadElement {
	pub address: HashString,
	pub entry: Entry
}

pub type GetLinksLoadResult = Vec<GetLinksLoadElement>;



pub fn get_links_and_load<S: Into<String>>(
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

pub fn link_entries_bidir<S: Into<String>>(a: &HashString, b: &HashString, tag_a_b: &str, tag_b_a: S) -> Result<(), ZomeApiError> {
    hdk::link_entries(a, b, tag_a_b)?;
    hdk::link_entries(b, a, tag_b_a)?;
    Ok(())
}