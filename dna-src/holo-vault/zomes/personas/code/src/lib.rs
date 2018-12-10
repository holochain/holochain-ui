#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

use crate::persona::Persona;
use crate::utils::GetLinksLoadResult;
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    hash::HashString,
    dna::zome::entry_types::Sharing,
    json::RawString,
};

pub mod persona;
pub mod utils;

 define_zome! {

	entries: [
		persona::persona_definition(),
        persona::field_definition(),
		entry!(
			name: "anchor",
	        description: "",
	        sharing: Sharing::Public,
	        native_type: RawString,

	        validation_package: || {
	            hdk::ValidationPackageDefinition::ChainFull
	        },

	        validation: |_name: RawString, _ctx: hdk::ValidationData| {
	        	Ok(())
	        }
		)
	]

    genesis: || {
        {
            Ok(())
        }
    }

    functions: {

    	main (Public) {
    		create_persona: {
    			inputs: |spec: persona::PersonaSpec|,
    			outputs: |result: ZomeApiResult<()>|,
    			handler: persona::handlers::handle_create_persona
    		}
    		get_personas: {
    			inputs: | |,
    			outputs: |personas: ZomeApiResult<GetLinksLoadResult<Persona>>|,
    			handler: persona::handlers::handle_get_personas
    		}
            add_field: {
                inputs: |persona_address: HashString, field: persona::PersonaField|,
                outputs: |result: ZomeApiResult<()>|,
                handler: persona::handlers::handle_add_field
            }
    	}
    }
 }
