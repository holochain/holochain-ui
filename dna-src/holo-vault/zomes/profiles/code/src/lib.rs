#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
use hdk::holochain_core_types::hash::HashString;

pub mod profile;
pub mod handlers;

define_zome! {
 	
	entries: [
		profile::profile_definition(),
		profile::field_mapping_definition()
	]

    genesis: || {
        Ok(())
    }

    functions: {
    	main (Public) {
    		register_app: {
    			inputs: |spec: profile::ProfileSpec|,
    			outputs: |success: bool|,
    			handler: handlers::handle_register_app
    		}
    		get_profiles: {
    			inputs: | |,
    			outputs: |profiles: serde_json::Value|,
    			handler: handlers::handle_get_profiles
    		}
            create_mapping: {
                inputs: |mapping: profile::ProfileMapping|,
                outputs: |num_created: u32|,
                handler: handlers::handle_create_mapping
            }
            retrieve: {
                inputs: |retriever_DNA: HashString, profile_field: String|,
                outputs: |profiles: serde_json::Value|,
                handler: handlers::handle_retrieve
            }
    	}
    }
 }