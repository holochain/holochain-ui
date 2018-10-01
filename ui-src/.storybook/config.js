import { configure } from "@storybook/react";
import { setAddon, addDecorator } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";
import { withKnobs, select } from "@storybook/addon-knobs/react";
import { configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './test'

enzymeConfigure({ adapter: new Adapter() });
addDecorator(withKnobs);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.(stories).(tsx|ts|js|jsx)$/);
function loadStories() {
  require("./welcomeStory");
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
