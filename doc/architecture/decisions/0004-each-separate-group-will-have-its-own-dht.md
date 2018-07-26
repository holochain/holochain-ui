# 4. Each separate group will have its own DHT

Date: 2018-07-09

## Status

In Review

## Context

Holochain enables many distinct data stores via the DHT. As there is no way to stop people reading the contents of any DHT on their node data must be restricted to those in the DHT. Hence separate networks of agents will be part of different DHTs so that only data that an agent can read is in any of the DHTs stored on that agent.

## Decision

Enable the UI to access any DHTs the agent is part of.
DHTs that can only have one instance such as "holo-vault" and "holo-keys" keep that name. DHTs that can have multiple instances such as a chat or presence are called unique names and that name is the "Name" field in the dna.json file.

## Consequences
