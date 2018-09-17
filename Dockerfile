FROM holochain/holochain-proto:develop

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list and install dependencies
RUN apt-get update && apt-get install -y curl && apt-get -y autoclean

# nvm enviromnemt variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.10.0

# install nvm
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \ && nvm install $NODE_VERSION \ && nvm alias default $NODE_VERSION \ && nvm use default

# add node and npm to path so the commands area available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN npm -v

# install jq for manipulating json files
RUN apt-get --assume-yes install jq