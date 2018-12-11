/**
 *
 * Function that creates action creators for holochain calls
 * The actions it creates are thunks rather than traditional actions
 * so the redux-thunk middleware must be applied.
 *
 */
export declare const createHolochainAsyncAction: <ParamType, ReturnType_1>(happ: string, zome: string, capability: string, func: string) => import("typesafe-actions/dist/create-async-action").AsyncActionBuilder<string, string, string, ParamType, ReturnType_1, Error> & {
    create: (param: ParamType) => any;
    sig: (param: ParamType) => Promise<{
        payload: ReturnType_1;
    }>;
};
