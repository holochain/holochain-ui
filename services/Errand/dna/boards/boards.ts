// TODO : Built for only one board for now

// -----------------------------------------------------------------
//  The Public Function
// -----------------------------------------------------------------
// TEMP : Created to make a dummy board as an anchor for the ver1
function newBoard({ title, label }) {
  debug("Board Generated " + title)
  //const uuid = uuidGenerator();
  const board = { title, label };
  commit("board", board);
}

function newLane({ id, title, lable }): Hash {
  //const uuid: string = uuidGenerator();
  const uuid: string = id;
  const lane = { uuid, title, lable }
  const hash: string = commit("lane", lane);
  //TEMP :  add to pregenerated Board
  const BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
  commit("lane_link", { Links: [{ Base: BOARD_HASH, Link: hash, Tag: "lane_tag" }] });
  return hash;
}

function getLanes(): GetLinksResponse[] {
  //TEMP :  add to pregenerated Board
  const BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
  const lanes = getLinks(BOARD_HASH, "lane_tag", { Load: true });
  // let lane_entry = lanes.map((lane) => {
  //   return lane.Entry;
  // });
  // debug(`getLanes: ` + JSON.stringify(lanes));
  return lanes;
}

function getLaneHash(lane_id: string): Hash {
  const lanes: GetLinksResponse[] = getLanes();
  let filtered = lanes.filter((lane) => {
    return lane.Entry.uuid == lane_id;
  });
  // debug("getLaneHash" + filtered)
  return filtered[0].Hash;
}

function newCard({ id, title, description, lane_id }) {
  debug("Adding New Card: "+id)
  const uuid: string = id;
  const lane_hash = getLaneHash(lane_id);
  // const uuid = uuidGenerator();
  const card = { title, description, uuid };
  const hash = commit("card", card);
  const card_link_hash = commit("card_link", { Links: [{ Base: lane_hash, Link: hash, Tag: "card_tag" }] });
  return card_link_hash;
}

function moveCard({cardId,sourceLaneId,targetLaneId}){
  debug("Updating Card "+cardId);
  const new_lane_hash=getLaneHash(targetLaneId);
  const card_hash=deleteCard({card_id:cardId,lane_id:sourceLaneId});
  // DELETE OLD Link && MAKE new Link
  commit("card_link",{Links: [
  {Base: new_lane_hash,Link: card_hash,Tag: "card_tag"}
  ]});
}

function deleteCard({card_id,lane_id}){
  debug("Deleting Card: "+card_id);
  // : GET card Hash
  const old_lane_hash=getLaneHash(lane_id);
  // debug("old_lane_hash"+old_lane_hash)
  const card_hash=getCardHash({card_id:card_id,lane_hash:old_lane_hash});
  // DELETE OLD Link && MAKE new Link
  // debug("card_hash"+card_hash);
  commit("card_link",{Links: [
  {Base: old_lane_hash,Link: card_hash,Tag: "card_tag",LinkAction: HC.LinkAction.Del}
  ]});
  return card_hash;
}

function getCards(lane_hash: Hash) {
  // debug("LANE_HASH"+lane_hash)
  const card_list = getLaneCard(lane_hash);
  const card_data = [];
  let i = 0;
  card_list.map((card) => {
    card_data[i] = {
      "id": card.Entry.uuid,
      "title": card.Entry.title,
      "description": card.Entry.description,
      "lable": card.Entry.lable
    }
    i++;
  });
  // debug("card_data: " + JSON.stringify(card_data));
  return card_data;
}

function getLaneCard( lane_hash:Hash){
  const card_list = getLinks(lane_hash, "card_tag", { Load: true ,StatusMask: HC.Status.Live })
  return card_list;
}

function getCardHash({card_id,lane_hash}){
  const card_list=getLaneCard(lane_hash);
  let filtered = card_list.filter((card) => {
    return card.Entry.uuid == card_id;
  });
  // debug("getCardHash" + filtered[0].Hash)
  return filtered[0].Hash;
}


function getBoardState() {
  // const BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
  const lanes: GetLinksResponse[] = getLanes();
  let data: any = {board:{ lanes: [] }}
  let i=0;
  lanes.forEach((lane) => {
    data.board.lanes[i] = {
      id: lane.Entry.uuid,
      title: lane.Entry.title,
      lable: lane.Entry.lable,
      cards: getCards(lane.Hash)
    }
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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// -----------------------------------------------------------------
//  The Genesis Function
// -----------------------------------------------------------------

function genesis() {
  newBoard({ title: "First_Board", label: "" })
  testGenesisFunction();
  return true;
}

function testGenesisFunction(){

  newLane({id:"LANE_ID_1",title:"Lane_TITLE_1",lable:"Lane_Lable_1"});
  newCard({"id":"Card_ID_11","title": "Card_Title_11","description": "Description of the First card 11","lane_id": "LANE_ID_1"})
  newCard({"id":"Card_ID_12","title": "Card_Title_12","description": "Description of the First card 12","lane_id": "LANE_ID_1"})
  newCard({"id":"Card_ID_13","title": "Card_Title_13","description": "Description of the First card 13","lane_id": "LANE_ID_1"})

  newLane({id:"LANE_ID_2",title:"Lane_TITLE_2",lable:"Lane_Lable_2"});
  newCard({"id":"Card_ID_21","title": "Card_Title_21","description": "Description of the First card 21","lane_id": "LANE_ID_2"})
  newCard({"id":"Card_ID_22","title": "Card_Title_22","description": "Description of the First card 22","lane_id": "LANE_ID_2"})
  newCard({"id":"Card_ID_23","title": "Card_Title_23","description": "Description of the First card 23","lane_id": "LANE_ID_2"})

}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
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

function validateLink(entryName: any, baseHash: any, links: any, pkg: any, sources: any): boolean {
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

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true;
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  switch (entryName) {
    case "":
      return false;
    default:
      return false;
  }
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean {
  switch (entryName) {
    case "lane_link":
      return true;
    case "card_link":
      return true;
    default:
      return false;
  } }

function validatePutPkg(entryName) { return null; }

function validateModPkg(entryName) { return null; }

function validateDelPkg(entryName) { return null; }

function validateLinkPkg(entryName) { return null; }
