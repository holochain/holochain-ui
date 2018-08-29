import * as React from "react";

import { storiesOf } from "@storybook/react";
import { wInfo } from "../../../../utils";
import Happs from './happs'
import {installedHapps} from '../../../../happs/installed'

(storiesOf("HoloVault/hApps", module) as any).addWithJSX(
  "List of hApps",
  wInfo(`

  ### Notes

  This is a list of installed hApps

  ### Usage
  ~~~js
  <Happs happs={{installedHapps}}/>
  ~~~`)(() => (
    <Happs happs={{installedHapps}}/>
  ))
);
