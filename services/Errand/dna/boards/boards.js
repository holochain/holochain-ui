// TODO : Built for only one board for now
// -----------------------------------------------------------------
//  The Public Function
// -----------------------------------------------------------------
// TEMP : Created to make a dummy board as an anchor for the ver1
function newBoard(_a) {
    var title = _a.title, label = _a.label;
    debug("Board Generated " + title);
    //const uuid = uuidGenerator();
    var board = { title: title, label: label };
    commit("board", board);
}
function newLane(_a) {
    var id = _a.id, title = _a.title, lable = _a.lable;
    //const uuid: string = uuidGenerator();
    var uuid = id;
    var lane = { uuid: uuid, title: title, lable: lable };
    var hash = commit("lane", lane);
    //TEMP :  add to pregenerated Board
    var BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
    commit("lane_link", { Links: [{ Base: BOARD_HASH, Link: hash, Tag: "lane_tag" }] });
    return hash;
}
function getLanes() {
    //TEMP :  add to pregenerated Board
    var BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
    var lanes = getLinks(BOARD_HASH, "lane_tag", { Load: true });
    // let lane_entry = lanes.map((lane) => {
    //   return lane.Entry;
    // });
    // debug(`getLanes: ` + JSON.stringify(lanes));
    return lanes;
}
function getLaneHash(lane_id) {
    var lanes = getLanes();
    var filtered = lanes.filter(function (lane) {
        return lane.Entry.uuid == lane_id;
    });
    // debug("getLaneHash" + filtered)
    return filtered[0].Hash;
}
function newCard(_a) {
    var id = _a.id, title = _a.title, description = _a.description, lane_id = _a.lane_id;
    debug("Adding New Card: " + id);
    var uuid = id;
    var lane_hash = getLaneHash(lane_id);
    // const uuid = uuidGenerator();
    var card = { title: title, description: description, uuid: uuid };
    var hash = commit("card", card);
    var card_link_hash = commit("card_link", { Links: [{ Base: lane_hash, Link: hash, Tag: "card_tag" }] });
    return card_link_hash;
}
function moveCard(_a) {
    var cardId = _a.cardId, sourceLaneId = _a.sourceLaneId, targetLaneId = _a.targetLaneId;
    debug("Updating Card " + cardId);
    var new_lane_hash = getLaneHash(targetLaneId);
    var card_hash = deleteCard({ card_id: cardId, lane_id: sourceLaneId });
    // DELETE OLD Link && MAKE new Link
    commit("card_link", { Links: [
            { Base: new_lane_hash, Link: card_hash, Tag: "card_tag" }
        ] });
}
function deleteCard(_a) {
    var card_id = _a.card_id, lane_id = _a.lane_id;
    debug("Deleting Card: " + card_id);
    // : GET card Hash
    var old_lane_hash = getLaneHash(lane_id);
    // debug("old_lane_hash"+old_lane_hash)
    var card_hash = getCardHash({ card_id: card_id, lane_hash: old_lane_hash });
    // DELETE OLD Link && MAKE new Link
    // debug("card_hash"+card_hash);
    commit("card_link", { Links: [
            { Base: old_lane_hash, Link: card_hash, Tag: "card_tag", LinkAction: HC.LinkAction.Del }
        ] });
    return card_hash;
}
function getCards(lane_hash) {
    // debug("LANE_HASH"+lane_hash)
    var card_list = getLaneCard(lane_hash);
    var card_data = [];
    var i = 0;
    card_list.map(function (card) {
        card_data[i] = {
            "id": card.Entry.uuid,
            "title": card.Entry.title,
            "description": card.Entry.description,
            "lable": card.Entry.lable
        };
        i++;
    });
    // debug("card_data: " + JSON.stringify(card_data));
    return card_data;
}
function getLaneCard(lane_hash) {
    var card_list = getLinks(lane_hash, "card_tag", { Load: true, StatusMask: HC.Status.Live });
    return card_list;
}
function getCardHash(_a) {
    var card_id = _a.card_id, lane_hash = _a.lane_hash;
    var card_list = getLaneCard(lane_hash);
    var filtered = card_list.filter(function (card) {
        return card.Entry.uuid == card_id;
    });
    // debug("getCardHash" + filtered[0].Hash)
    return filtered[0].Hash;
}
function getBoardState() {
    // const BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
    var lanes = getLanes();
    var data = { board: { lanes: [] } };
    var i = 0;
    lanes.forEach(function (lane) {
        data.board.lanes[i] = {
            id: lane.Entry.uuid,
            title: lane.Entry.title,
            lable: lane.Entry.lable,
            cards: getCards(lane.Hash)
        };
        i++;
    });
    // debug("Board State:" + JSON.stringify(data))
    return data;
}
//------------------------------
// Helper Functions
//------------------------------
//Generates new UUID ()
function uuidGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// -----------------------------------------------------------------
//  The Genesis Function
// -----------------------------------------------------------------
function genesis() {
    newBoard({ title: "First_Board", label: "" });
    testGenesisFunction();
    return true;
}
function testGenesisFunction() {
    newLane({ id: "LANE_ID_1", title: "Lane_TITLE_1", lable: "Lane_Lable_1" });
    newCard({ "id": "Card_ID_11", "title": "Card_Title_11", "description": "Description of the First card 11", "lane_id": "LANE_ID_1" });
    newCard({ "id": "Card_ID_12", "title": "Card_Title_12", "description": "Description of the First card 12", "lane_id": "LANE_ID_1" });
    newCard({ "id": "Card_ID_13", "title": "Card_Title_13", "description": "Description of the First card 13", "lane_id": "LANE_ID_1" });
    newLane({ id: "LANE_ID_2", title: "Lane_TITLE_2", lable: "Lane_Lable_2" });
    newCard({ "id": "Card_ID_21", "title": "Card_Title_21", "description": "Description of the First card 21", "lane_id": "LANE_ID_2" });
    newCard({ "id": "Card_ID_22", "title": "Card_Title_22", "description": "Description of the First card 22", "lane_id": "LANE_ID_2" });
    newCard({ "id": "Card_ID_23", "title": "Card_Title_23", "description": "Description of the First card 23", "lane_id": "LANE_ID_2" });
}
// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------
function validateCommit(entryName, entry, header, pkg, sources) {
    // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    return validate(entryName, entry, header, pkg, sources);
}
function validate(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        case "board":
            return true;
        case "lane":
            return true;
        case "lane_link":
            return true;
        case "card":
            return true;
        case "card_link":
            return true;
        default:
            return false;
    }
}
function validateLink(entryName, baseHash, links, pkg, sources) {
    //debug("entryName: "+entryName+" baseHash: "+ baseHash+" links: "+ links+" sources: "+ sources);
    switch (entryName) {
        case "lane_link":
            return true;
        case "card_link":
            return true;
        default:
            return false;
    }
}
function validatePut(entryName, entry, header, pkg, sources) {
    return true;
}
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    switch (entryName) {
        case "":
            return false;
        default:
            return false;
    }
}
function validateDel(entryName, hash, pkg, sources) {
    switch (entryName) {
        case "lane_link":
            return true;
        case "card_link":
            return true;
        default:
            return false;
    }
}
function validatePutPkg(entryName) { return null; }
function validateModPkg(entryName) { return null; }
function validateDelPkg(entryName) { return null; }
function validateLinkPkg(entryName) { return null; }
