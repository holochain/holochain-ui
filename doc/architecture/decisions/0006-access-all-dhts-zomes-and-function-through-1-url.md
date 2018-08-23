# 6. Access all DHTs Zomes and Function through 1 URL

Date: 2018-07-10

## Status

Accepted

## Context

See 004. Using bridging we can access the zome and functions of any DHT.

## Decision

Create a new Middleware module based on hcMiddleware and add a new parameter to the Middleware and Redux action for the bridge hash called "service" and change the Send call to use a single URL /fn/holochain/callBridgedFunction.
Change parameter "namespace" to "zome" and "fnName" to "function".

Create a zome "holochain" and function "callBridgedFunction" that uses the Name of the service to retrieve the DNA hash to bridge to the service and then call the zome and function.

## Consequences
