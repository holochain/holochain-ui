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

            let hc1_spec = profile::ProfileSpec {
                name: "Holo Chat - Holo Team".into(),
                sourceDNA: "HOLOCHAT1DNA".into(),
                fields: vec!(
                    profile::ProfileFieldSpec {
                        name: "handle".into(),
                        displayName: "Handle".into(),
                        description: "How you are referenced in chat".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::STORE,
                    },
                    profile::ProfileFieldSpec {
                        name: "firstName".into(),
                        displayName: "First Name".into(),
                        description: "Used when others search for you".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::DISPLAY,
                    }
                ),

            };

            let hc2_spec = profile::ProfileSpec {
                name: "Holo Chat - Melbourne DJs".into(),
                sourceDNA: "HOLOCHAT2DNA".into(),
                fields: vec!(
                    profile::ProfileFieldSpec {
                        name: "handle".into(),
                        displayName: "Handle".into(),
                        description: "How you are referenced in chat".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::STORE,
                    },
                    profile::ProfileFieldSpec {
                        name: "firstName".into(),
                        displayName: "First Name".into(),
                        description: "Used when others search for you".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::DISPLAY,
                    }
                ),

            };

			let hc3_spec = profile::ProfileSpec {
                name: "Errand - Holo Team".into(),
                sourceDNA: "HOLOCHAT3DNA".into(),
                fields: vec!(
                    profile::ProfileFieldSpec {
                        name: "handle".into(),
                        displayName: "Handle".into(),
                        description: "How you are referenced in chat".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::STORE,
                    },
                    profile::ProfileFieldSpec {
                        name: "firstName".into(),
                        displayName: "First Name".into(),
                        description: "Used when others search for you".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::DISPLAY,
                    },
                    profile::ProfileFieldSpec {
                        name: "lastName".into(),
                        displayName: "Last Name".into(),
                        description: "Used when others search for you".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::DISPLAY,
                    },
                    profile::ProfileFieldSpec {
                        name: "location".into(),
                        displayName: "Location".into(),
                        description: "Helps with setting up meetings".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::DISPLAY,
                    },
					profile::ProfileFieldSpec {
                        name: "role".into(),
                        displayName: "Role".into(),
                        description: "Gives context on your core responsibilies".into(),
                        required: true,
                        schema: "{}".into(),
                        usage: profile::UsageType::DISPLAY,
                    }
                ),

            };

            hdk::call("profiles", "main", "register_app", json!({"spec": hc1_spec}).into());
            hdk::call("profiles", "main", "register_app", json!({"spec": hc2_spec}).into());
			hdk::call("profiles", "main", "register_app", json!({"spec": hc3_spec}).into());
			Ok(())
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
