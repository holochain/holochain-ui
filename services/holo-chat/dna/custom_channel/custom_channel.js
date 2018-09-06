"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var module = {};
/*=============================================
=            Public Zome Functions            =
=============================================*/
/**
 * Creates a channel with members
 * @param  {holochain.Hash[]} - Array of public key hashes of members to add to channel
 * @return {UUID} - Channel UUID
 */
function createCustomChannel(payload) {
    // const {members} = payload
    var members = getLinks(App.DNA.Hash, 'directory', { Load: false }).map(function (elem) { return elem.Hash; });
    // members.push(App.Key.Hash)
    var uuid = uuidGenerator();
    var channel = {
        id: uuid
    };
    debug("Your Channel UUID: " + uuid);
    var uuid_hash = commit("custom_channel_uuid", uuid);
    //debug("uuid_hash: " + uuid_hash);
    commit("custom_channel_link", { Links: [{ Base: App.DNA.Hash, Link: uuid_hash, Tag: "channel_uuid" }] });
    var details_hash = commit("custom_channel_details", channel);
    //debug("details_hash: " + details_hash);
    commit("custom_channel_link", { Links: [{ Base: uuid_hash, Link: details_hash, Tag: "channel_details" }] });
    addMembers({ uuid: uuid, members: members });
    return uuid;
}
//TODO : Test for non creator of the channel adding a member in the channel
/**
 * Add members to an existing channel
 * @param  {UUID} - Channel UUID
 * @param  {holochain.Hash[]} - Array of members to add
 * @return {boolean} - Returns true if successful otherwise returns an error
 */
function addMembers(payload) {
    var uuid = payload.uuid, members = payload.members;
    var uuid_hash = makeHash("custom_channel_uuid", uuid);
    members.forEach(function (member) {
        try {
            commit("channel_to_member_link", { Links: [{ Base: uuid_hash, Link: member, Tag: "channel_members" }] });
        }
        catch (e) {
            debug(e);
            return e;
        }
        commit("member_to_channel_link", { Links: [{ Base: member, Link: uuid_hash, Tag: "my_channels" }] });
    });
    return true;
}
/**
 * Get the channels this user is a member of
 * @return {Array<Channel>} - Array of channel specs for channels this user is a member of
 */
function getMyChannels() {
    var my_channels;
    try {
        my_channels = getLinks(App.Key.Hash, "my_channels", { Load: true });
    }
    catch (e) {
        return e;
    }
    debug("My Channel Chats : " + JSON.stringify(my_channels));
    return my_channels.map(function (channel) { return channel.Entry; });
}
/**
 * Retrieve the members of a channel given its UUID
 * @param  {UUID} - Channel UUID
 * @return {string[]} - Array of key hashes of members in channel
 */
function getMembers(payload) {
    var uuid = payload.uuid;
    var members;
    try {
        // members = getLinks(makeHash("custom_channel_uuid", uuid), "channel_members", { Load: true });
        members = getLinks(App.DNA.Hash, 'directory', { Load: true }); // everyone is a member of all channels for now
        return members.map(function (elem) {
            return __assign({ hash: elem.Hash }, getIdentity(elem.Hash));
        });
    }
    catch (e) {
        return e;
    }
}
/**
 * Post a message to a channel
 * @param  {message} - message object to post
 * @return {holochain.Hash} - Returns the hash of the message if successful or an error
 */
function postMessage(payload) {
    debug(payload);
    payload.timestamp = Date.now();
    payload.author = App.Key.Hash;
    debug(payload);
    var hash;
    try {
        hash = commit("message", payload);
        commit("message_link", { Links: [{ Base: makeHash("custom_channel_uuid", payload.channelId), Link: hash, Tag: "messages" }] });
    }
    catch (e) {
        return e;
    }
    return hash;
}
/**
 * Get all the messages from a channel given its UUID
 * @param  {UUID} - Channel UUID
 * @return {Array<holochain.GetLinksResponse>} - Array of messages
 */
function getMessages(payload) {
    var uuid = payload.uuid;
    var messages;
    try {
        var messages_1 = getLinks(makeHash("custom_channel_uuid", uuid), "messages", { Load: true });
        debug("Messages : " + JSON.stringify(messages_1));
        return messages_1.map(function (elem) { return elem.Entry; });
    }
    catch (e) {
        debug("ERROR: " + e);
        return e;
    }
}
/*======================================
=            Identity Stuff            =
======================================*/
// TODO: Move to own zome 
function whoami() {
    return App.Key.Hash;
}
function getIdentity(keyHash) {
    return getLinks(keyHash, 'identity', { Load: true }).map(function (elem) {
        return elem.Entry;
    })[0];
}
function setIdentity(identity) {
    // mark any old identites as deleted
    var currentIdentity = getIdentity(App.Key.Hash);
    if (currentIdentity) {
        update('identity', identity, makeHash('identity', currentIdentity));
    }
    else {
        var idHash = commit('identity', identity);
        commit('identity_links', { Links: [{ Base: App.Key.Hash, Link: idHash, Tag: 'identity' }] });
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//For Testing
function getKey() {
    return App.Key.Hash;
}
function addTestData() {
    var channel1 = createCustomChannel({ members: [] });
    postMessage({
        channelId: channel1,
        content: {
            text: "test message 1 in channel 1"
        }
    });
    postMessage({
        channelId: channel1,
        content: {
            text: "test message 2 in channel 1"
        }
    });
    var channel2 = createCustomChannel({ members: [] });
    postMessage({
        channelId: channel2,
        content: {
            text: "test message 1 in channel 2"
        }
    });
    postMessage({
        channelId: channel2,
        content: {
            text: "test message 2 in channel 2"
        }
    });
}
/*=====  End of Private Functions  ======*/
/*==================================
=            Validation            =
==================================*/
function genesis() {
    addTestData();
    setIdentity({ handle: App.Agent.String, avatar: '' });
    // link hash to root on genesis
    commit('identity_links', { Links: [{ Base: App.DNA.Hash, Link: App.Key.Hash, Tag: 'directory' }] });
    return true;
}
function bridgeGenesis(side, dna, appData) {
    return true;
}
// Check if the pub_hash is a member of the
function isValidAdmin(base_hash, entry_source) {
    debug("Checking if Agent is an Admin..");
    //Checking if the Creator is trying to add people to the channel
    var source;
    try {
        source = get(base_hash, { GetMask: HC.GetMask.Sources });
    }
    catch (e) {
        return false;
    }
    //Added the creater of the channel as a member of the channel
    if (JSON.stringify(source) === JSON.stringify(entry_source)) {
        //debug("Adding Channel Creator as a member of the channel")
        return true;
    }
    //Checking to see if members are trying to add new members to the channel
    var members;
    try {
        members = getLinks(base_hash, "channel_members", { Load: true });
    }
    catch (e) {
        debug("Channels Dosnt Exist " + e);
        return false;
    }
    var access = members.some(function (member) {
        return member.Hash == entry_source;
    });
    return access;
}
// Check to validate if the same user that created the message is modifying the message
function isValidModifier(replaces, sources) {
    var old_message;
    try {
        old_message = get(replaces);
    }
    catch (e) {
        debug("ERROR: isValidModifier() " + e);
    }
    if (old_message.author == sources[0])
        return true;
    else
        return false;
}
function validateCommit(entryName, entry, header, pkg, sources) {
    // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    return validate(entryName, entry, header, pkg, sources);
}
function validate(entryName, entry, header, pkg, sources) {
    return true;
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
function validatePut(entryName, entry, header, pkg, sources) {
    return true;
}
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    return true;
}
function validateDel(entryName, hash, pkg, sources) {
    return true;
}
function validateLink(entryName, baseHash, links, pkg, sources) {
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
module.exports = 0;
/*=====  End of Validation  ======*/
