import React from "react";

import { storiesOf } from "@storybook/react";
import { wInfo } from "./utils";

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
