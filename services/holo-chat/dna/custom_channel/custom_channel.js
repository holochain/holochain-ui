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
 * @param  {ChannelSpec} - Specification of the members to add, name and description of the channel
 * @return {channelHash} - Channel UUID
 */
function createCustomChannel(payload) {
    var members = payload.members;
    members.push(App.Key.Hash);
    var channel = {
        id: uuidGenerator(),
        name: payload.name,
        description: payload.description
    };
    var channelHash = commit("custom_channel", channel);
    commit("custom_channel_link", { Links: [{ Base: App.DNA.Hash, Link: channelHash, Tag: "channel" }] });
    addMembers({ channelHash: channelHash, members: members });
    return channelHash;
}
//TODO : Test for non creator of the channel adding a member in the channel
/**
 * Add members to an existing channel
 * @param  {channelHash} - Channel hash
 * @param  {holochain.Hash[]} - Array of members to add
 * @return {boolean} - Returns true if successful otherwise returns an error
 */
function addMembers(payload) {
    var channelHash = payload.channelHash, members = payload.members;
    members.forEach(function (member) {
        try {
            commit("channel_to_member_link", { Links: [{ Base: channelHash, Link: member, Tag: "channel_members" }] });
        }
        catch (e) {
            debug(e);
            return e;
        }
        commit("member_to_channel_link", { Links: [{ Base: member, Link: channelHash, Tag: "my_channels" }] });
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
        return my_channels.map(function (elem) {
            return {
                name: elem.Entry.name,
                description: elem.Entry.description,
                hash: elem.Hash
            };
        });
    }
    catch (e) {
        debug(e);
        return e;
    }
}
/**
 * Retrieve the members of a channel given its UUID
 * @param  {channelHash} - Channel UUID
 * @return {Array<Identity>} - Array of key hashes of members in channel
 */
function getMembers(payload) {
    var channelHash = payload.channelHash;
    var members;
    try {
        members = getLinks(channelHash, "channel_members", { Load: true });
        return members.map(function (elem) {
            return __assign({ hash: elem.Hash }, call('users', 'getIdentity', elem.Hash));
        });
    }
    catch (e) {
        debug(e);
        return e;
    }
}
/**
 * Post a message to a channel
 * @param  {message} - message object to post
 * @return {holochain.Hash} - Returns the hash of the message if successful or an error
 */
function postMessage(payload) {
    var messageToPost = __assign({}, payload.message, { timestamp: Date.now(), author: App.Key.Hash });
    var hash;
    try {
        hash = commit("message", messageToPost);
        commit("message_link", { Links: [{ Base: payload.channelHash, Link: hash, Tag: "messages" }] });
    }
    catch (e) {
        debug(e);
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
    var channelHash = payload.channelHash;
    try {
        var messages = getLinks(channelHash, "messages", { Load: true });
        return messages.map(function (elem) { return elem.Entry; });
    }
    catch (e) {
        debug(e);
        return e;
    }
}
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
    var channel1 = createCustomChannel({ name: 'Channel 1', description: 'to chat', members: [] });
    postMessage({
        message: {
            content: {
                text: "test message 1 in channel 1"
            }
        },
        channelHash: channel1
    });
    postMessage({
        message: {
            content: {
                text: "test message 2 in channel 1"
            }
        },
        channelHash: channel1
    });
    var channel2 = createCustomChannel({ name: 'Channel 2', description: 'to chat', members: [] });
    postMessage({
        message: {
            content: {
                text: "test message 1 in channel 2"
            }
        },
        channelHash: channel2
    });
    postMessage({
        message: {
            content: {
                text: "test message 2 in channel 2"
            }
        },
        channelHash: channel2
    });
}
/*=====  End of Private Functions  ======*/
/*==================================
=            Validation            =
==================================*/
function genesis() {
    addTestData();
    return true;
}
function bridgeGenesis(side, dna, appData) {
    return true;
}
function validateCommit(entryName, entry, header, pkg, sources) {
    return validate(entryName, entry, header, pkg, sources);
}
function validate(entryName, entry, header, pkg, sources) {
    return true;
}
function validatePut(entryName, entry, header, pkg, sources) {
    return validate(entryName, entry, header, pkg, sources);
}
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    return true;
}
function validateDel(entryName, hash, pkg, sources) {
    return true;
}
function validateLink(entryName, baseHash, links, pkg, sources) {
    return true;
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
