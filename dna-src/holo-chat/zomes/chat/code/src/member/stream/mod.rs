use hdk::{
    self,
    entry_definition::ValidatingEntryType,
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
};

use hdk::holochain_core_types::{
    hash::HashString,
    dna::entry_types::Sharing,
    cas::content::Address,
};


pub mod handlers;


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Stream {
    pub name: String,
    pub description: String,
    pub public: bool
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Subject {
    pub name: String,
    pub stream_address: HashString,
}




pub fn public_stream_definition() -> ValidatingEntryType {
    entry!(
        name: "public_stream",
        description: "A stream of which anyone can become a member and post",
        sharing: Sharing::Public,
        native_type: Stream,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_stream: Stream, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            to!(
                "%agent_id",
                tag: "has_member",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "member_of",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            to!(
                "subject",
                tag: "stream_subject",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            to!(
                "message",
                tag: "message_in",

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

pub fn direct_stream_definition() -> ValidatingEntryType {
    entry!(
        name: "direct_stream",
        description: "A stream to which new members can only be added at creation",
        sharing: Sharing::Public,
        native_type: Stream,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_stream: Stream, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            to!(
                "%agent_id",
                tag: "has_member",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "member_of",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            to!(
                "subject",
                tag: "stream_subject",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            to!(
                "message",
                tag: "message_in",

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

pub fn subject_anchor_definition() -> ValidatingEntryType {
    entry!(
        name: "subject",
        description: "A way messages within a stream are grouped",
        sharing: Sharing::Public,
        native_type: Subject,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_subject: Subject, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            to!(
                "message",
                tag: "message_in",

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
