# 2. Use React Redux and Material UI

Date: 2018-07-09

## Status

Accepted

## Context

We need to choose a UI framework to build our Holochain UI with. Philip Beadle has done extensive work using React, Redux and Material UI that makes it straight forward to build good looking well engineered solutions. This choice also enables a composable architecture so we can add more "modules" and give the community a base solution to build their own "modules" on.

## Decision

Use latest releases of React Redux and Material UI. Set the dependencies in the  pacakge.json file to latest to ensure we keep up to date and fix any issues regarding versioning immediately the build fails.

## Consequences

Limits the number of developers to those who are familiar with React Redux and Material UI, however that is a large number.
