// Holochain actions
/*=============================================
=            Action Exports
=============================================*/
export const namespace = "boards";

export const GET_BOARD_STATE = "getBoardState";
export const ADD_CARD = "newCard";
export const ADD_LANE = "newLane";
export const MOVE_CARD = "moveCard";
export const DELETE_CARD = "deleteCard";

/*=============================================
=            Action Definitions
=============================================*/
/*======== Board State Management =========*/
//returns the board info only (as json)
export function getBoardState() {
  return {
    type: GET_BOARD_STATE,
    meta: {
      isHc: true,
      namespace: namespace,
    }
  }
}

/*======== Card State Management =========*/
export function addCard(card_info, lane_id) {
  console.log("card_info inside actions", card_info, lane_id);
  const data={
    id: card_info.id,
    title: card_info.title,
    description: card_info.description,
    lane_id: lane_id
  };
  return {
    type: ADD_CARD,
    meta: {
      isHc: true,
      namespace: namespace,
      data: data
    }
  }
}

//card should change lanes id
export function moveCard(cardId, sourceLaneId, targetLaneId) {
  return {
    type: MOVE_CARD,
    meta: {
      isHc: true,
      namespace: namespace,
      data: {cardId, sourceLaneId, targetLaneId},
    }
  }
}

//
export function deleteCard(card_id,lane_id) {
  return {
    type: DELETE_CARD,
    meta: {
      isHc: true,
      namespace: namespace,
      data: {card_id:card_id,lane_id:lane_id},
    }
  }
}
