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

Check out our [Storybook](https://holochain.github.io/holochain-ui) to test how the components of the app operate. By taking this approach we are sharing the ability for developers to apply these well documented concepts into other holochain apps.

Previous prototypes:
[Initial prototype](https://marvelapp.com/31d2c27/)


## How to use
[Get Rust set up and install the command line tools and the Holochain container](!https://developer.holochain.org/start.html)

- Clone this repository
  - git clone git@github.com:holochain/holochain-ui.git
- Check you can test the zomes:
  - cd dna-src/holo-chat/test
  - npm install
  - cd ../..
  - cd holo-vault/test
  - npm install
  - cd ../../..
  - npm run hc:test-chat
  - npm run hc:test-vault

If the tests all pass you have setup correctly.

- Build the zomes
  - npm run hc:build-chat
  - npm run hc:build-vault
- Run the container and the web socket interface
  - npm run hc:start

You should get an output like
```
> holochain-ui@1.0.0 hc:start /Users/philipbeadle/holochain/hApps/holochain-ui
> mkdir -p tmp-storage && holochain_container -c ./container-config.toml

Using config path: ./container-config.toml
Successfully loaded 1 instance configurations
Starting all of them...
Starting instance "holo-chat"...
Starting interfaces...
Done
```

Now lets run the UI.
- cd ui-src
- npm install
- npm run start

You should now be able to navigate to http://localhost:3000/holo-chat/ and create a Public Channel.



## Built With
[React](https://reactjs.org/)

[Redux](https://redux.js.org/)

TDD ([Test Driven Development](http://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html))
 - [Cypress](https://www.cypress.io/)
 - [Storybook](https://storybook.js.org/)
