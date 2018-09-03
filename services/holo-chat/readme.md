# holochat

[![Build Status](https://travis-ci.org/Holochain/holochat.svg?branch=master)](https://travis-ci.org/Holochain/holochat)
[![Code Status](https://img.shields.io/badge/Code-Pre--Alpha-orange.svg)](https://github.com/Holochain/holochat#feature-roadmap-and-current-progress)
[![In Progress](https://img.shields.io/waffle/label/Holochain/holochat/in%20progress.svg)](http://waffle.io/Holochain/holochat)
[![Gitter](https://badges.gitter.im/metacurrency/holochain.svg)](https://gitter.im/metacurrency/holochain?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

***Multi-room P2P chat on holochain**

**[Code Status:](https://github.com/metacurrency/holochain/milestones?direction=asc&sort=completeness&state=all)** Pre-alpha. Not for production use. This application has not been audited for any security validation.

## Docker

```
  TARGETDIR=$(pwd) docker-compose up

```
Now you can open browsers to
```
  http://localhost:3142 - Bootstrap
  http://localhost:3141 - Holochat
  http://localhost:4141 - Holochat
  http://localhost:5141 - Holochat
```

## Installation native

Prerequiste: [Install holochain](https://github.com/metacurrency/holochain/#installation) on your machine.
You can install holochat very simply with this:

``` shell
hcdev init -cloneExample=holochat

```

## Usage

To do a test run of holochat simply type

``` shell
cd holochat
hcdev web
```
you should see something like:

``` shell
Copying chain to: /home/bootstrap/.holochaindev
...
Serving holochain with DNA hash:QmdFv5XcG6YZgMYQ9hPJfn6xkhMhDK99rjiHJHH9zorUad on port:4141
```
Then simply point your browser to http://localhost:4141 access the holochat UI.

### Tests
To run all the stand alone tests:

``` shell
hcdev test
```

Currently there is one scenario test:

#### backnforth
``` shell
hcdev -mdns=true scenario backnforth
```
This test spins up two nodes `person1` and `person` and tests that they can send messages back and forth

``` shell
hcdev -mdns=true -debug scenario backnforth
```

### Run e2e tests
```
  cd ui-automation
  yarn test
```

## Feature Roadmap and Current Progress


## Contribute
We welcome pull requests and issue tickets.  Find us on [gitter](https://gitter.im/metacurrency/holochain) to chat.

Contributors to this project are expected to follow our [development protocols & practices](https://github.com/metacurrency/holochain/wiki/Development-Protocols).

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, et. al.)

This program is free software: you can redistribute it and/or modify it under the terms of the license provided in the LICENSE file (GPLv3).  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

**Note:** We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.
