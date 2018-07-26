# 5. Personas and Profiles in separate DHT

Date: 2018-07-09

## Status

Accepted

## Context

The concept of a personal vault of data that is shared at the Agent's discretion is at the heart of Holochain. Personal information such as Profiles is an example of this data.

## Decision

Create a DHT called holo-vault to store personal data in private entries in the source chain. The DHT can be used in future to backup data to other nodes controlled by the Agent.

## Consequences
