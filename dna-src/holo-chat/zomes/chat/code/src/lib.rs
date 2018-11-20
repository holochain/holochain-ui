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

use hdk::{
    holochain_core_types::hash::HashString,
    holochain_core_types::entry::Entry,
    holochain_core_types::entry_type::EntryType,
    holochain_dna::zome::entry_types::Sharing,
};


mod message;
mod channel;
mod member;
mod utils;

use crate::member::{
    StoreProfile
};

define_zome! {

	entries: [
		message::message_definition(),
    	channel::public_channel_definition(),
    	channel::direct_channel_definition(),
		member::member_id_definition(),
        entry!(
			name: "anchor",
	        description: "",
	        sharing: Sharing::Public,
	        native_type: String,

	        validation_package: || {
	            hdk::ValidationPackageDefinition::Entry
	        },

	        validation: |name: String, _ctx: hdk::ValidationData| {
	        	Ok(())
	        }
		)
	]

    genesis: || {
        {
            let anchor_entry = Entry::new(EntryType::App("anchor".into()), json!("member_directory"));
            let anchor_address = hdk::commit_entry(&anchor_entry).map_err(|_| "anchor not committed")?;

            let profiles = vec![
                StoreProfile {email:"aaron_faulkner@holo.host".to_string(),handle:"aaron_faulkner".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"alastairong@holo.host".to_string(),handle:"alastairong".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"anders@holo.host".to_string(),handle:"anders".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"artbrock@holo.host".to_string(),handle:"artbrock".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"austin@holo.host".to_string(),handle:"austin".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"bierlingm@holo.host".to_string(),handle:"bierlingm".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"bifeitang@holo.host".to_string(),handle:"bifeitang".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"ccxxoo@holo.host".to_string(),handle:"ccxxoo".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"charlotte@holo.host".to_string(),handle:"charlotte".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"connorturland@holo.host".to_string(),handle:"connorturland".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"damien@holo.host".to_string(),handle:"damien".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"davor.bijelic@holo.host".to_string(),handle:"davor.bijelic".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"dcatki@holo.host".to_string(),handle:"dcatki".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"emalinus@holo.host".to_string(),handle:"emalinus".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"ferananda@holo.host".to_string(),handle:"ferananda".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"ginnyb@holo.host".to_string(),handle:"ginnyb".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"greg@holo.host".to_string(),handle:"greg".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"holmes@holo.host".to_string(),handle:"holmes".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"holobot@holo.host".to_string(),handle:"holobot".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"hologitlab@holo.host".to_string(),handle:"hologitlab".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"jarodholtz@holo.host".to_string(),handle:"jarodholtz".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"jean-francois@holo.host".to_string(),handle:"jean-francois".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"jeanmrussell@holo.host".to_string(),handle:"jeanmrussell".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"jerbus@holo.host".to_string(),handle:"jerbus".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"jessicaegan@holo.host".to_string(),handle:"jessicaegan".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"jetttech@holo.host".to_string(),handle:"jetttech".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"joel@holo.host".to_string(),handle:"joel".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"katielucas@holo.host".to_string(),handle:"katielucas".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"katieteague@holo.host".to_string(),handle:"katieteague".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"laurelishimayo@holo.host".to_string(),handle:"laurelishimayo".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"lucksus@holo.host".to_string(),handle:"lucksus".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"maackle@holo.host".to_string(),handle:"maackle".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"mamading@holo.host".to_string(),handle:"mamading".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"mary.camacho@holo.host".to_string(),handle:"mary.camacho".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"matthewjosef@holo.host".to_string(),handle:"matthewjosef".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"micah.jefferson@holo.host".to_string(),handle:"micah.jefferson".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"mickki@holo.host".to_string(),handle:"mickki".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"neonphog@holo.host".to_string(),handle:"neonphog".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"pauldaoust@holo.host".to_string(),handle:"pauldaoust".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"philipbeadle@holo.host".to_string(),handle:"philipbeadle".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"pjkundert@holo.host".to_string(),handle:"pjkundert".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"poprox@holo.host".to_string(),handle:"poprox".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"robert.best@holo.host".to_string(),handle:"robert.best".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"samcooley@holo.host".to_string(),handle:"samcooley".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"sami-honeypot@holo.host".to_string(),handle:"sami-honeypot".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"samrose@holo.host".to_string(),handle:"samrose".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"sphinxc0re@holo.host".to_string(),handle:"sphinxc0re".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
                StoreProfile {email:"thedavidmeister@holo.host".to_string(),handle:"thedavidmeister".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()}
            ];

            for profile in profiles.iter() {
                let member_entry = Entry::new(EntryType::App("member".into()), member::Member{id: profile.to_owned().handle.into(),profile:None});
                let profile_entry = Entry::new(EntryType::App("profile".into()), profile.clone());

                let member_address = hdk::commit_entry(&member_entry).map_err(|_| "member not committed").unwrap();
                let profile_address = hdk::commit_entry(&profile_entry).map_err(|_| "profile not committed").unwrap();

                hdk::link_entries(&anchor_address, &member_address, "member_tag").map_err(|_| "member not linked to anchor");
                // hdk::link_entries(&member_address, &profile_address, "profile").map_err(|_| "profile not linked to anchor");

            }

    		Ok(())
        }
    }

	functions: {
		main (Public) {
			create_channel: {
				inputs: |name: String, description: String, initial_members: Vec<member::Member>, public: bool|,
				outputs: |result: JsonString|,
				handler: channel::handle_create_channel
			}
			get_my_channels: {
				inputs: | |,
				outputs: |result: JsonString|,
				handler: channel::handle_get_my_channels
			}
            get_all_members: {
				inputs: | |,
				outputs: |result: JsonString|,
				handler: member::handle_get_all_members
			}
			get_members: {
				inputs: |channel_address: HashString|,
				outputs: |result: JsonString|,
				handler: channel::handle_get_members
			}
			add_members: {
				inputs: |channel_address: HashString, members: Vec<member::Member>|,
				outputs: |result: JsonString|,
				handler: channel::handle_add_members
			}
			post_message: {
				inputs: |channel_address: HashString, message: message::Message|,
				outputs: |result: JsonString|,
				handler: channel::handle_post_message
			}
			get_messages: {
				inputs: |channel_address: HashString, min_count: u32|,
				outputs: |result: JsonString|,
				handler: channel::handle_get_messages
			}
			get_profile: {
				inputs: |member_id: member::Member|,
				outputs: |result: JsonString|,
				handler: member::handle_get_profile
			}
		}
	}
 }
