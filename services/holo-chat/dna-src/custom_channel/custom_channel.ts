//------------------------------
// Public Functions
//------------------------------

export = 0;
let module = {}


type message = any;
type updateMessageType = any;
type UUID = string;

/*=============================================
=            Public Zome Functions            =
=============================================*/

/**
 * Creates a channel with members
 * @param  {holochain.Hash[]} - Array of public key hashes of members to add to channel
 * @return {UUID} - Channel UUID
 */
function createCustomChannel(payload: {members: holochain.Hash[]}): UUID {
  const {members} = payload
  members.push(App.Key.Hash)
  let uuid: string = uuidGenerator();
  var custom_channel_details: any = {
    name: uuid
  }
  debug("Your Channel UUID: " + uuid);
  let uuid_hash = commit("custom_channel_uuid", uuid);
  //debug("uuid_hash: " + uuid_hash);
  commit("custom_channel_link", { Links: [{ Base: App.DNA.Hash, Link: uuid_hash, Tag: "channel_uuid" }] });

  let details_hash = commit("custom_channel_details", custom_channel_details);
  //debug("details_hash: " + details_hash);
  commit("custom_channel_link", { Links: [{ Base: uuid_hash, Link: details_hash, Tag: "channel_details" }] });

  addMembers({uuid, members});

  return uuid;
}



//TODO : Test for non creator of the channel adding a member in the channel
/**
 * Add members to an existing channel
 * @param  {UUID} - Channel UUID
 * @param  {holochain.Hash[]} - Array of members to add
 * @return {boolean} - Returns true if successful otherwise returns an error
 */
function addMembers(payload: {uuid: UUID, members: holochain.Hash[]}): boolean | holochain.HolochainError {
  const {uuid, members} = payload
  let uuid_hash: string = makeHash("custom_channel_uuid", uuid);
  members.forEach((member) => {
    try {
      commit("channel_to_member_link", { Links: [{ Base: uuid_hash, Link: member, Tag: "channel_members" }] });
    } catch (e) {
      debug(e)
      return e
    }
    commit("member_to_channel_link", { Links: [{ Base: member, Link: uuid_hash, Tag: "my_channels" }] });
  });
  return true;
}



/**
 * Get the channels this user is a member of
 * @return {Array<any>} - Array of channel specs for channels this user is a member of
 */
function getMyChannels(): Array<any> | holochain.HolochainError {
  let my_channels: any;
  try {
    my_channels = getLinks(App.Key.Hash, "my_channels", { Load: true });
  } catch (e) {
    return e;
  }
  debug("My Channel Chats : " + JSON.stringify(my_channels));
  return my_channels.map((channel) => { return channel.Entry });
}



/**
 * Retrieve the members of a channel given its UUID
 * @param  {UUID} - Channel UUID
 * @return {string[]} - Array of key hashes of members in channel
 */
function getMembers(payload: {uuid: UUID}): holochain.Hash[] | holochain.HolochainError {
  const {uuid} = payload
  let members: any;
  try {
    members = getLinks(makeHash("custom_channel_uuid", uuid), "channel_members", { Load: true });
  } catch (e) {
    return e;
  }
  debug("Members for " + uuid + ": " + JSON.stringify(members));
  return members;
}

/**
 * Get the details of a channel given its UUID
 * @param  {UUID} - Channel UUID
 * @return {string[]} - TODO: Write spec for channel details
 */
function getChannelDetails(payload: {uuid: UUID}): string[] {
  const {uuid} = payload
  let details: any;
  try {
    details = getLinks(makeHash("custom_channel_uuid", uuid), "channel_details", { Load: true });
  } catch (e) {
    return e;
  }
  debug("Channel Details for " + uuid + ": " + JSON.stringify(details));
  return details;
}

/**
 * Post a message to a channel
 * @param  {message} - message object to post
 * @return {holochain.Hash} - Returns the hash of the message if successful or an error
 */
function postMessage(payload: message): holochain.Hash | holochain.HolochainError {
  debug(payload)
  payload.message.timestamp = new Date();
  payload.message.author = App.Key.Hash;
  debug(payload.message)

  let hash: holochain.Hash;
  try {
    hash = commit("message", payload.message);
    commit("message_link", { Links: [{ Base: makeHash("custom_channel_uuid", payload.uuid), Link: hash, Tag: "messages" }] });
  } catch (e) {
    return e;
  }
  return hash;
}


/**
 * Get all the messages from a channel given its UUID
 * @param  {UUID} - Channel UUID
 * @return {Array<holochain.GetLinksResponse>} - Array of messages
 */
function getMessages(payload: {uuid: UUID}): Array<holochain.GetLinksResponse> | holochain.HolochainError {
  const {uuid} = payload
  let messages;
  try {
    let messages = getLinks(makeHash("custom_channel_uuid", uuid), "messages", { Load: true });
    debug("Messages : " + JSON.stringify(messages))
    return messages;
  } catch (e) {
    debug("ERROR: " + e);
    return e;
  }

}

/**
 * Updates an already posted message
 * @param  {updateMessageType} - Message update object
 * @return {holochain.Hash} - Returns the hash of the new message or an error
 */
function updateMessage(payload: updateMessageType): holochain.Hash | holochain.HolochainError {
  debug(payload);
  payload.new_message.timestamp = new Date();
  payload.new_message.author = App.Key.Hash;
  let hash: holochain.Hash = update("message", payload.new_message, payload.old_hash);
  return hash;
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

/*=====  End of Private Functions  ======*/




/*==================================
=            Validation            =
==================================*/

function genesis() {
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
  debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  switch (entryName) {
    case "custom_channel_uuid":
      return true;
    case "custom_channel_details":
      return true;
    case "custom_channel_link":
      return true;
    case "channel_to_member_link":
      return isValidAdmin(entry.Links[0].Base, sources);
    case "member_to_channel_link":
      //isValidAdmin(entry);
      return true;
    case "message":
      return true;
    case "message_link":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true;
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  switch (entryName) {
    case "message":
      return isValidModifier(replaces, sources);
    default:
      return false;
  }
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean {
  return false;
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
