
use super::profile;
use hdk;

pub fn populate_specs() {
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
}

