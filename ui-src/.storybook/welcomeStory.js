import React from "react";

import { storiesOf } from "@storybook/react";
import { wInfo } from "./utils";
import holoVault from './holoVault.md'

storiesOf("Welcome", module).addWithJSX(
  "to your new Holochain🎊",
  wInfo(`
    ## Building Holochain hApps
    **This is how we do it**
    (Processes for getting to a "let's build it" and then building it are coming soon with Errand.)

    1. Write a Story in Storybook for each state of the component
      - eg Add, Edit, List
    1. Write Notes in Mark Down to describing the story.
    1. As you think of things to verify write them down with intentional test names as Specs
      - We aim for [contravariance with tests.]('http://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html')
    1. Update Sketch tab to show new design of UI
      - needs our new Storybook addon coming soon
      - for now we reference the designs through Sketch
    1. Write prototype steps in Cypress
      - Would be cool to finish the loop and generate Sketch prototypes from Cypress.


    ### To use this Storybook

    Explore the tree on the left. We have been building pieces of our overall experience as described above.
  `)(() => <div>This is an example component</div>)
);

storiesOf("HoloChat", module).addWithJSX(
  "More fun while messaging",
  wInfo(`
    A Holochain app (hApp) for awesome Abundance of Presence.

    ![GitHub last commit](https://img.shields.io/github/last-commit/holochain/holochain-ui.svg)
    ![GitHub](https://img.shields.io/github/license/holochain/holochain-ui.svg)

    ### Abundance of Presence
    This app also includes a feature that is part of the dogfooding approach being taken by the Holo(chain) team.

    We all struggle with the ability to schedule time to meet while being a fully distributed team in many timezones. We are proposing a new approach to "Finding Time."

    You can view our [brainstorming Realtimeboard](https://realtimeboard.com/app/board/o9J_kzK8i00=/) and provide feedback by submitting tickets to this repo.

    Check out our [Storybook](https://holochain.github.io/holochain-ui/index.html?selectedKind=HoloVault%2FPersona&selectedStory=New%20Persona&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fnotes%2Fpanel) to test how the components of the app operate. By taking this approach we are sharing the ability for developers to apply these well documented concepts into other holochain apps.

    Previous prototypes:
    [Initial prototype](https://marvelapp.com/31d2c27/)


    ## Built With
    [React](https://reactjs.org/)

    [Redux](https://redux.js.org/)

    TDD ([Test Driven Development](http://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html))
     - [Cypress](https://www.cypress.io/)
     - [Storybook](https://storybook.js.org/)

  `)(() => <div>Image from Sketch</div>)
);

storiesOf("HoloVault", module).addWithJSX(
  "Keep your data private",
  wInfo(holoVault)(() => <div>Image from Sketch</div>)
);
