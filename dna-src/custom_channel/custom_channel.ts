//------------------------------
// Public Functions
//------------------------------
import {Channel, ChannelSpec} from '../types/channel'
import {Message, MessageSpec} from '../types/message'
import {Identity, IdentitySpec} from '../types/identity'
import { ProfileSpec } from '../vault-types/profile'


export = 0;
let module = {}


/*=============================================
=            Public Zome Functions            =
=============================================*/

/**
 * Creates a channel with members
 * @param  {ChannelSpec} - Specification of the members to add, name and description of the channel
 * @return {channelHash} - Channel UUID
 */
function createCustomChannel(payload: ChannelSpec): holochain.Hash {
  const members = payload.members
  members.push(App.Key.Hash)

  let channel: any = {
    id: uuidGenerator(),
    name: payload.name,
    description: payload.description
  }

  const channelHash = commit("custom_channel", channel);
  commit("custom_channel_link", { Links: [{ Base: App.DNA.Hash, Link: channelHash, Tag: "channel" }] });

  addMembers({channelHash, members});

  return channelHash;
}



//TODO : Test for non creator of the channel adding a member in the channel
/**
 * Add members to an existing channel
 * @param  {channelHash} - Channel hash
 * @param  {holochain.Hash[]} - Array of members to add
 * @return {boolean} - Returns true if successful otherwise returns an error
 */
function addMembers(payload: {channelHash: holochain.Hash, members: Array<holochain.Hash>}): boolean | holochain.HolochainError {
  const {channelHash, members} = payload
  members.forEach((member) => {
    try {
      commit("channel_to_member_link", { Links: [{ Base: channelHash, Link: member, Tag: "channel_members" }] });
      commit("member_to_channel_link", { Links: [{ Base: member, Link: channelHash, Tag: "my_channels" }] });
    } catch (e) {
      debug(e)
      return e
    }
  });
  return true;
}



/**
 * Get the channels this user is a member of
 * @return {Array<Channel>} - Array of channel specs for channels this user is a member of
 */
function getMyChannels(): Array<Channel> | holochain.HolochainError {
  let my_channels: any;
  try {
    my_channels = getLinks(App.Key.Hash, "my_channels", { Load: true });
    return my_channels.map((elem) => { 
      return {
        name: elem.Entry.name,
        description: elem.Entry.description,
        hash: elem.Hash
      }
    });
  } catch (e) {
    debug(e)
    return e;
  }
}



/**
 * Retrieve the members of a channel given its UUID
 * @param  {channelHash} - Channel UUID
 * @return {Array<Identity>} - Array of key hashes of members in channel
 */
function getMembers(payload: {channelHash: holochain.Hash}): Array<Identity> | holochain.HolochainError {
  debug('entering getMembers')
  const {channelHash} = payload
  let members: any;
  try {
    members = getLinks(channelHash, "channel_members", { Load: true });
    return members.map((elem) => {
      return {
        hash: elem.Hash,
        ...JSON.parse(call('users', 'getIdentity', JSON.stringify(elem.Hash)))
      };
    })
  } catch (e) {
    debug(e)
    return e;
  }
}


/**
 * Post a message to a channel
 * @param  {message} - message object to post
 * @return {holochain.Hash} - Returns the hash of the message if successful or an error
 */
function postMessage(payload: {channelHash: holochain.Hash, message: MessageSpec}): holochain.Hash | holochain.HolochainError {
  
  const messageToPost = {
    ...payload.message,
    timestamp: Date.now(),
    author: App.Key.Hash
  }

  let hash: holochain.Hash;
  try {
    hash = commit("message", messageToPost);
    commit("message_link", { Links: [{ Base: payload.channelHash, Link: hash, Tag: "messages" }] });
  } catch (e) {
    debug(e)
    return e;
  }
  return hash;
}


/**
 * Get all the messages from a channel given its UUID
 * @param  {UUID} - Channel UUID
 * @return {Array<holochain.GetLinksResponse>} - Array of messages
 */
function getMessages(payload: {channelHash: holochain.Hash}): Array<Message> | holochain.HolochainError {
  const {channelHash} = payload
  try {
    let messages = getLinks(channelHash, "messages", { Load: true });
    return messages.map((elem) => {return elem.Entry});
  } catch (e) {
    debug(e)
    return e;
  }

}


/*=====  End of Public Zome Functions  ======*/



/*=========================================
=            Private Functions            =
=========================================*/

//Generates new UUID ()
function uuidGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
//For Testing
function getKey() {
  return App.Key.Hash;
}

function addTestData() {
  const channel1 = createCustomChannel({name: 'Channel 1', description: 'to chat', members: []})

  postMessage({
    message: {
      content: {
        text: "test message 1 in channel 1"
      }
    },
    channelHash: channel1
  })

  postMessage({
    message: {
      content: {
        text: "test message 2 in channel 1"
      }
    },
    channelHash: channel1
  })

  const channel2 = createCustomChannel({name: 'Channel 2', description: 'to chat', members: []})
  postMessage({
    message: {
      content: {
        text: "test message 1 in channel 2"
      }
    },
    channelHash: channel2
  })

  postMessage({
    message: {
      content: {
        text: "test message 2 in channel 2"
      }
    },
    channelHash: channel2
  })
}

/*=====  End of Private Functions  ======*/

// This apps profile spec

enum UsageType {
  STORE= 'store',    // The app will store the data in its own DHT
  DISPLAY= 'display' // The app will always bridge to vault when it needs to retreive the data
}

const profileSpec: ProfileSpec = {
  name: "holo-chat",
  sourceDNA: App.DNA.Hash,
  fields: [
    {
      name: 'handle',
      displayName: 'Handle',
      required: true,
      description: 'How other users will see you',
      usage: UsageType.STORE,
      schema: { 
        'type': 'string',  
        'minLength': 3,
        'maxLength': 15
       }
    }
  ]
}


/*==================================
=            Validation            =
==================================*/

function genesis() {
  // Register with holo-vault
  debug('custom_channel: Registering with vault')
  const result = call('profiles', 'registerApp', profileSpec);
  debug('success: ' + JSON.stringify(result))
  return true;
}

function bridgeGenesis(side, dna, appData) {
  return true;
}


function validateCommit(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true
}

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return validate(entryName, entry, header, pkg, sources);
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  return true
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean {
  return true;
}

function validateLink(entryName: any, baseHash: any, links: any, pkg: any, sources: any): boolean {
  return true
}

function validatePutPkg(entryName) {
  return null;
}

function validateModPkg(entryName) {
  return null;
}

function validateDelPkg(entryName) {
  return null;
}

function validateLinkPkg(entryName) {
  return null;
}


/*=====  End of Validation  ======*/
