use crate::member::StoreProfile;

pub fn get_test_profiles() -> Vec<StoreProfile> {
	return vec![
		StoreProfile {email:"micah.jefferson@holo.host".to_string(),handle:"micah.jefferson".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
		StoreProfile {email:"jeanmrussell@holo.host".to_string(),handle:"jeanmrussell".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
		StoreProfile {email:"ccxxoo@holo.host".to_string(),handle:"ccxxoo".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
		StoreProfile {email:"artbrock@holo.host".to_string(),handle:"artbrock".to_string(),avatar:"".to_string(),timezone:"UTC".to_string()},
		StoreProfile {email:"willem.olding@holo.host".to_string(),handle:"wollum".to_string(),avatar:"".to_string(),timezone:"AEDT".to_string()}
	];
}
