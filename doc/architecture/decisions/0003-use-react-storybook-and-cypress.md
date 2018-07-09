# 3. Use React Storybook and Cypress

Date: 2018-07-09

## Status

Accepted

## Context

We need a way to make TDD more accessible, a component library for the "modules" we build and a way to run fully integrated tests both in dev mode and on the CI server.

## Decision

Storybook makes it easy to create a component library from each of the UI Components with the additional feature of being able to write State aware Specs which help with the TDD process and provide continuous feedback as part of CI.
Cypress is a UI Automation tool that uses the Electron browser which makes it simple to run locally and on the CI.

## Consequences

Tests are tied to Storybook and Cypress.
