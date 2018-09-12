#!/bin/bash
AGENTID=$1
PORTOFFSET=$2
BOOSTRAPSERVER=$3

hcadmin init $AGENTID
hcadmin join . base
hcadmin join ./services/holo-chat chat

jq ".DHTPort = $((6283 + $PORTOFFSET))" ~/.holochain/base/config.json | sponge ~/.holochain/base/config.json
jq ".BootstrapServer = \"$BOOSTRAPSERVER\"" ~/.holochain/base/config.json | sponge ~/.holochain/base/config.json

jq ".DHTPort = $((7283 + $PORTOFFSET))" ~/.holochain/chat/config.json | sponge ~/.holochain/chat/config.json
jq ".BootstrapServer = \"$BOOSTRAPSERVER\"" ~/.holochain/chat/config.json | sponge ~/.holochain/chat/config.json

hcadmin bridge base chat genesis

hcd base $((4141+$PORTOFFSET)) &
hcd chat $((5141+$PORTOFFSET)) &