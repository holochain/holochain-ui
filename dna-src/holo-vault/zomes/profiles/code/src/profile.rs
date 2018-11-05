

use hdk::serde::de::DeserializeOwned;
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::hash::HashString;
use hdk::{
    self, 
    entry_definition::ValidatingEntryType,
    holochain_dna::zome::entry_types::Sharing,
};

use serde_json;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ProfileSpec {
    pub name: String,
    pub sourceDNA: HashString,
    pub fields: Vec<ProfileFieldSpec>
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ProfileFieldSpec {
    pub name: String,
    pub displayName: String,
    pub required: bool,
    pub description: String,
    pub usage: UsageType,
    pub schema: serde_json::Value
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum UsageType {
    STORE,
    DISPLAY
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ProfileMapping {
    pub retrieverDNA: HashString,
    pub profileFieldName: String,
    pub personaAddress: HashString,
    pub personaFieldName: String
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Profile {
    pub name: String,
    pub sourceDNA: HashString,
    pub hash: HashString,
    pub fields: Vec<ProfileField>,
    pub expiry: u32
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct FieldMapping {
    pub personaAddress: HashString,
    pub personaFieldName: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ProfileField {
    pub name: String,
    pub displayName: String,
    pub required: bool,
    pub description: String,
    pub usage: UsageType,
    pub schema: serde_json::Value,
    pub mapping: Option<FieldMapping>
}

pub fn profile_definition() -> ValidatingEntryType {
    entry!(
        name: "profile",
        description: "A data schema provided by a hApp that describes what data it is requiesting and how it will use it",
        sharing: Sharing::Public,
        native_type: ProfileSpec,

        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |_profile: ProfileSpec, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

pub fn field_mapping_definition() -> ValidatingEntryType {
    entry!(
        name: "field_mapping",
        description: "A single piece of data that is attached to a persona",
        sharing: Sharing::Public,
        native_type: ProfileField,

        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |_profile_field: ProfileField, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

impl Profile {
    pub fn from_spec(spec: ProfileSpec, hash: HashString, fields: Vec<ProfileField>) -> Profile {
        Profile {
            fields: fields,
            hash: hash,
            name: spec.name,
            sourceDNA: spec.sourceDNA,
            expiry: 0
        }
    }
}


impl ProfileField {
    pub fn from_spec(spec: ProfileFieldSpec, mapping: Option<FieldMapping>) -> ProfileField {
        ProfileField {
            mapping: mapping,
            name: spec.name,
            description: spec.description,
            displayName: spec.displayName,
            required: spec.required,
            schema: spec.schema,
            usage: spec.usage
        }
    }

    pub fn new_with_mapping(&self, mapping: Option<FieldMapping>) -> ProfileField {
        ProfileField {
            mapping: mapping,
            name: self.name.clone(),
            description: self.description.clone(),
            displayName: self.displayName.clone(),
            required: self.required.clone(),
            schema: self.schema.clone(),
            usage: self.usage.clone()
        }
    }
}
