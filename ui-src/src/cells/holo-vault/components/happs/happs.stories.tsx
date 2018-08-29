import * as React from "react";

import { storiesOf } from "@storybook/react";
import { wInfo } from "../../../../utils";
import Happs from './happs'
import {installedHapps} from '../../../../happs/installed'

(storiesOf("components/Happs", module) as any).addWithJSX(
  "List of hApps",
  wInfo(`

  ### Notes

  This is a list of installed hApps

  ### Usage
  ~~~js
  <Button
    label={'Enroll'}
    disabled={false}
    onClick={() => alert('hello there')}
  />
  ~~~`)(() => (
    <Happs happs={{installedHapps}}/>
  ))
);
