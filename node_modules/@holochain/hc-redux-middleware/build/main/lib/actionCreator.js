"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
/**
 *
 * Function that creates action creators for holochain calls
 * The actions it creates are thunks rather than traditional actions
 * so the redux-thunk middleware must be applied.
 *
 */
exports.createHolochainAsyncAction = (happ, zome, capability, func) => {
    const callString = `${happ}/${zome}/${capability}/${func}`;
    const action = typesafe_actions_1.createAsyncAction(callString, callString + '_SUCCESS', callString + '_FAILURE')();
    const newAction = action;
    // the action creators that are produced
    newAction.create = (params) => {
        return {
            type: callString,
            meta: {
                holochainAction: true,
                callString
            },
            payload: params
        };
    };
    return newAction;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uQ3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYWN0aW9uQ3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUFvRDtBQUVwRDs7Ozs7O0dBTUc7QUFDVSxRQUFBLDBCQUEwQixHQUFHLENBQ3hDLElBQVksRUFDWixJQUFZLEVBQ1osVUFBa0IsRUFDbEIsSUFBWSxFQUNaLEVBQUU7SUFFRixNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLElBQUksRUFBRSxDQUFBO0lBRTFELE1BQU0sTUFBTSxHQUFHLG9DQUFpQixDQUM5QixVQUFVLEVBQ1YsVUFBVSxHQUFHLFVBQVUsRUFDdkIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxFQUNNLENBQUE7SUFFaEMsTUFBTSxTQUFTLEdBQUcsTUFHaEIsQ0FBQTtJQUVGLHdDQUF3QztJQUN4QyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBaUIsRUFBRSxFQUFFO1FBQ3ZDLE9BQU87WUFDTCxJQUFJLEVBQUUsVUFBVTtZQUNoQixJQUFJLEVBQUU7Z0JBQ0osZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLFVBQVU7YUFDWDtZQUNELE9BQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUE7SUFDSCxDQUFDLENBQUE7SUFFRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDLENBQUEifQ==