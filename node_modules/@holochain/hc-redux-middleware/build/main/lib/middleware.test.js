"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const sinon_1 = __importDefault(require("sinon"));
const middleware_1 = require("./middleware");
const actionCreator_1 = require("./actionCreator");
const mockWebClient = (callResponse) => Promise.resolve({
    call: (callStr) => (params) => {
        return Promise.resolve(JSON.stringify(callResponse));
    },
    close: () => Promise.resolve('closed'),
    ws: null
});
const create = (callResponse) => {
    const store = {
        getState: sinon_1.default.spy(() => ({})),
        dispatch: sinon_1.default.spy()
    };
    const next = sinon_1.default.spy();
    const invoke = (action) => middleware_1.holochainMiddleware(mockWebClient(callResponse))(store)(next)(action);
    return { store, next, invoke };
};
ava_1.default('It passes non-holochain actions to the next reducer', async (t) => {
    let { next, invoke } = create('');
    const nonHolochainAction = { type: 'not-holochain-action' };
    await invoke(nonHolochainAction);
    t.true(next.calledWith(nonHolochainAction));
});
ava_1.default('It passes holochain actions and dispatches new action on success. Ok is unwrapped ', async (t) => {
    let { next, invoke, store } = create({ Ok: 'success' });
    const holochainAction = actionCreator_1.createHolochainAsyncAction('happ', 'zome', 'capability', 'func');
    const result = await invoke(holochainAction.create({}));
    t.deepEqual(result, 'success');
    t.true(next.calledWith(holochainAction.create({})));
    t.true(store.dispatch.calledWith(holochainAction.success('success')));
});
ava_1.default('It passes holochain actions and dispatches new action on holochain error. Err is unwrapped ', async (t) => {
    let { next, invoke, store } = create({ Err: 'fail' });
    const holochainAction = actionCreator_1.createHolochainAsyncAction('happ', 'zome', 'capability', 'func');
    const result = await invoke(holochainAction.create({}));
    t.deepEqual(result, Error('fail'));
    t.true(next.calledWith(holochainAction.create({})));
    t.deepEqual(store.dispatch.lastCall.args[0], holochainAction.failure(Error('fail')));
});
ava_1.default('It passes holochain actions and dispatches new action on success. Raw return is passed directly ', async (t) => {
    let { next, invoke, store } = create({ someField: 'success' });
    const holochainAction = actionCreator_1.createHolochainAsyncAction('happ', 'zome', 'capability', 'func');
    const result = await invoke(holochainAction.create({}));
    t.deepEqual(result, { someField: 'success' });
    t.true(next.calledWith(holochainAction.create({})));
    t.true(store.dispatch.calledWith(holochainAction.success({ someField: 'success' })));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9taWRkbGV3YXJlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIsa0RBQXlCO0FBRXpCLDZDQUFrRDtBQUNsRCxtREFBNEQ7QUFFNUQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxZQUFpQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQzNELElBQUksRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtRQUN6QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFDRCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDdEMsRUFBRSxFQUFFLElBQUk7Q0FDVCxDQUFDLENBQUE7QUFFRixNQUFNLE1BQU0sR0FBRyxDQUFDLFlBQWlCLEVBQUUsRUFBRTtJQUNuQyxNQUFNLEtBQUssR0FBRztRQUNaLFFBQVEsRUFBRSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsUUFBUSxFQUFFLGVBQUssQ0FBQyxHQUFHLEVBQUU7S0FDdEIsQ0FBQTtJQUNELE1BQU0sSUFBSSxHQUFHLGVBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN4QixNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsZ0NBQW1CLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFckcsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUE7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