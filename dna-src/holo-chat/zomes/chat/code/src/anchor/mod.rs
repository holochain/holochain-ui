use hdk::entry_definition::ValidatingEntryType;

use hdk::holochain_core_types::{
    dna::zome::entry_types::Sharing,
    cas::content::Address,
    json::RawString,
};


pub fn anchor_definition() -> ValidatingEntryType {
    entry!(
        name: "anchor",
        description: "",
        sharing: Sharing::Public,
        native_type: RawString,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_name: RawString, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            to!(
                "member",
                tag: "member_tag",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            )
        ]
    )
}