'use strict';
function genesis() {
    return true;
}
function callBridgedFunction(bridgeCall) {
    debug(bridgeCall);
    debug('func ' + bridgeCall.func);
    debug('zome ' + bridgeCall.zome);
    debug('data ' + JSON.stringify(bridgeCall.data));
    if (bridgeCall.data === undefined) {
        bridgeCall.data = {};
    }
    var result = call(bridgeCall.zome, bridgeCall.func, bridgeCall.data);
    debug('called ' + bridgeCall.func);
    debug(result);
    return JSON.parse(result);
}
