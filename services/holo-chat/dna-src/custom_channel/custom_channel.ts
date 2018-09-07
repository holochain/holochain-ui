//------------------------------
// Public Functions
//------------------------------
import {Channel, ChannelSpec} from '../types/channel'
import {Message, MessageSpec} from '../types/message'
import {Identity, IdentitySpec} from '../types/identity'

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

  let channel: Channel = {
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
    } catch (e) {
      debug(e)
      return e
    }
    commit("member_to_channel_link", { Links: [{ Base: member, Link: channelHash, Tag: "my_channels" }] });
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
    return my_channels.map((channel) => { return channel.Entry });
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
  const {channelHash} = payload
  let members: any;
  try {
    members = getLinks(channelHash, "channel_members", { Load: true });
    return members.map((elem) => {
      return {
        hash: elem.Hash,
        ...getIdentity(elem.Hash)
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


/*======================================
=            Identity Stuff            =
======================================*/
// TODO: Move to own zome 

function whoami(): holochain.Hash {
  return App.Key.Hash;
}

function getIdentity(keyHash: holochain.Hash): Identity {
  return getLinks(keyHash, 'identity', {Load: true}).map((elem) => {
    return elem.Entry;
  })[0]
}

function setIdentity(identity: IdentitySpec): boolean {
  // mark any old identites as deleted
  const currentIdentity = getIdentity(App.Key.Hash)
  if(currentIdentity) {
    update('identity', identity, makeHash('identity', currentIdentity))
  } else {
    const idHash = commit('identity', identity);
    commit('identity_links', { Links: [ { Base: App.Key.Hash, Link: idHash, Tag: 'identity' } ] })
  }
  
  return true;
}

/*=====  End of Identity Stuff  ======*/


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




/*==================================
=            Validation            =
==================================*/

function genesis() {
  addTestData();
  setIdentity({handle: App.Agent.String, avatar: ''});
  // link hash to root on genesis
  commit('identity_links', { Links: [ { Base: App.DNA.Hash, Link: App.Key.Hash, Tag: 'directory' } ] })
  return true;
}

function bridgeGenesis(side, dna, appData) {
  return true;
}

// Check if the pub_hash is a member of the
function isValidAdmin(base_hash: string, entry_source: string): boolean {
  debug("Checking if Agent is an Admin..");
  //Checking if the Creator is trying to add people to the channel
  let source: any;
  try {
    source = get(base_hash, { GetMask: HC.GetMask.Sources });
  } catch (e) {
    return false;
  }
  //Added the creater of the channel as a member of the channel
  if (JSON.stringify(source) === JSON.stringify(entry_source)) {
    //debug("Adding Channel Creator as a member of the channel")
    return true;
  }
  //Checking to see if members are trying to add new members to the channel
  let members: any;
  try {
    members = getLinks(base_hash, "channel_members", { Load: true });
  } catch (e) {
    debug("Channels Dosnt Exist " + e);
    return false;
  }
  let access: boolean = members.some((member) => {
    return member.Hash == entry_source
  });
  return access;
}
// Check to validate if the same user that created the message is modifying the message
function isValidModifier(replaces: string, sources: any): boolean {
  let old_message: any;
  try {
    old_message = get(replaces)
  } catch (e) {
    debug("ERROR: isValidModifier() " + e)
  }
  if (old_message.author == sources[0])
    return true;
  else
    return false;
}
function validateCommit(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true
  // switch (entryName) {
  //   case "custom_channel_uuid":
  //     return true;
  //   case "custom_channel_details":
  //     return true;
  //   case "custom_channel_link":
  //     return true;
  //   case "channel_to_member_link":
  //     return isValidAdmin(entry.Links[0].Base, sources);
  //   case "member_to_channel_link":
  //     //isValidAdmin(entry);
  //     return true;
  //   case "message":
  //     return true;
  //   case "message_link":
  //     return true;
  //   case "identity":
  //     return true;
  //   case "identity_links":
  //     return true;
  //   default:
  //     return false;
  // }
}

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true;
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return true
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean {
  return true;
}

function validateLink(entryName: any, baseHash: any, links: any, pkg: any, sources: any): boolean {
  //debug("entryName: "+entryName+" baseHash: "+ baseHash+" links: "+ links+" sources: "+ sources);
  switch (entryName) {
    case "custom_channel_link":
      return true;
    case "channel_to_member_link":
      return true;
    case "member_to_channel_link":
      return true;
    case "message_link":
      return true;
    case "identity_links":
      return true;
    default:
      return false;
  }
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
