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

use hdk::holochain_core_types::{
    hash::HashString,
    dna::zome::entry_types::Sharing,
};

pub mod persona;


 define_zome! {

	entries: [
		persona::persona_definition(),
        persona::field_definition(),
		entry!(
			name: "anchor",
	        description: "",
	        sharing: Sharing::Public,
	        native_type: String,

	        validation_package: || {
	            hdk::ValidationPackageDefinition::ChainFull
	        },

	        validation: |name: String, _ctx: hdk::ValidationData| {
	        	Ok(())
	        }
		)
	]

    genesis: || {
        {
            let default_persona_spec = persona::PersonaSpec {
                name: "Default".into()
            };
            
            hdk::call("personas", "main", "create_persona", json!({"spec": default_persona_spec}).into());
            Ok(())
        }
    }

    functions: {

    	main (Public) {
    		create_persona: {
    			inputs: |spec: persona::PersonaSpec|,
    			outputs: |personaAddress: JsonString|,
    			handler: persona::handle_create_persona
    		}
    		get_personas: {
    			inputs: | |,
    			outputs: |personas: JsonString|,
    			handler: persona::handle_get_personas
    		}
            add_field: {
                inputs: |persona_address: HashString, field: persona::PersonaField|,
                outputs: |success: JsonString|,
                handler: persona::handle_add_field
            }
            delete_field: {
                inputs: |persona_address: HashString, field_name: String|,
                outputs: |deleted_fields: JsonString|,
                handler: persona::handle_delete_field
            }
    	}
    }
 }
