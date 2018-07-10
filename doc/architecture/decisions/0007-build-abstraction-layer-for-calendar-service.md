# 7. Build Abstraction Layer for Calendar Service

Date: 2018-07-10

## Status

Accepted

## Context

We are interacting with Google Calendar in the first releases, in future we wish to integrate with other calendar services.

## Decision

Any interactions with the calendar service should go through an abstraction layer so we are not tied to any one provider.

## Consequences

Slightly more code.
