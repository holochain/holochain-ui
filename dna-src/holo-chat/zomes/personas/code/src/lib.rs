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
    dna::entry_types::Sharing,
    json::RawString,
    cas::content::Address,
};

pub mod persona;
pub mod utils;

 define_zome! {

	entries: [
		persona::persona_definition(),
        persona::field_definition(),
		entry!(
			name: "persona_anchor",
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
                    "persona",
                    tag: "personas",

                    validation_package: || {
                        hdk::ValidationPackageDefinition::Entry
                    },

                    validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                        Ok(())
                    }
                )
            ]
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
    			outputs: |result: ZomeApiResult<Address>|,
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
            get_field: {
                inputs: |persona_address: HashString, field_name: String|,
                outputs: |result: ZomeApiResult<RawString>|,
                handler: persona::handlers::handle_get_field
            }
    	}
    }
 }
