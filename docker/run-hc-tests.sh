cd /holochain-ui/dna-src/holo-chat/test
npm install
npm link @holochain/holochain-nodejs
cd ..
hc test

cd ../holo-vault/test
npm install
npm link @holochain/holochain-nodejs
cd ..
hc test