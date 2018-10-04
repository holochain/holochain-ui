# Holochain UI
A Holochain app (hApp) that you can add your own hApps to.

[![Build Status](https://travis-ci.org/holochain/holochain-ui.svg?branch=develop)](https://travis-ci.org/holochain/holochain-ui)
![GitHub last commit](https://img.shields.io/github/last-commit/holochain/holochain-ui.svg)
![GitHub](https://img.shields.io/github/license/holochain/holochain-ui.svg)

## Features
Allows one to bridge different holochain services and manage different personas that provide a way to build unique profiles for whatever hApp will be used.

This app brings together the features of [HoloChat](https://github.com/holochain/holochat) and [HoloVault](https://github.com/holochain/holo-vault) into one extensible user interface.

### Abundance of Presence
This app also includes a feature that is part of the dogfooding approach being taken by the Holo(chain) team.

We all struggle with the ability to schedule time to meet while being a fully distributed team in many timezones. We are proposing a new approach to "Finding Time."

Provide feedback by submitting tickets to this repo.

Check out our [Storybook](https://holochain.github.io/holochain-ui/index.html?selectedKind=HoloVault%2FPersona&selectedStory=New%20Persona&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fnotes%2Fpanel) to test how the components of the app operate. By taking this approach we are sharing the ability for developers to apply these well documented concepts into other holochain apps.

Previous prototypes:
[Initial prototype](https://marvelapp.com/31d2c27/)

## How to use

After install:
- cd dna-src
 - npm install && npm run build
- cd ..
- cd ui-src
 - npm install
 - npm run build


## Built With
[React](https://reactjs.org/)

[Redux](https://redux.js.org/)

TDD ([Test Driven Development](http://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html))
 - [Cypress](https://www.cypress.io/)
 - [Storybook](https://storybook.js.org/)
