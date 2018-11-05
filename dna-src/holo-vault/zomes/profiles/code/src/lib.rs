#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;
use hdk::holochain_core_types::hash::HashString;
use hdk::holochain_core_types::json::JsonString;

pub mod profile;
pub mod handlers;

define_zome! {
 	
	entries: [
		profile::profile_definition(),
		profile::field_mapping_definition()
	]

    genesis: || {
        {

            let test_spec = profile::ProfileSpec {
                name: "holo_chat".into(),
                sourceDNA: "HOLOCHATDNA".into(),
                fields: vec!(
                    profile::ProfileFieldSpec {
                        name: "handle".into(),
                        displayName: "Handle".into(),
                        description: "How a user is referenced in chat".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::STORE,
                    }
                ),

            };
            match hdk::call("profiles", "main", "register_app", json!({"spec": test_spec}).into()) {
                Ok(_) => Ok(()),
                Err(_) => Err("Could not commit profile spec".into()),
            }
        }
    }

    functions: {
    	main (Public) {
    		register_app: {
    			inputs: |spec: profile::ProfileSpec|,
    			outputs: |success: JsonString|,
    			handler: handlers::handle_register_app
    		}
    		get_profiles: {
    			inputs: | |,
    			outputs: |profiles: JsonString|,
    			handler: handlers::handle_get_profiles
    		}
            create_mapping: {
                inputs: |mapping: profile::ProfileMapping|,
                outputs: |num_created: JsonString|,
                handler: handlers::handle_create_mapping
            }
            retrieve: {
                inputs: |retriever_DNA: HashString, profile_field: String|,
                outputs: |profiles: JsonString|,
                handler: handlers::handle_retrieve
            }
    	}
    }
 }