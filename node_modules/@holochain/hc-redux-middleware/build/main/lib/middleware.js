"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.holochainMiddleware = (hcWc) => store => {
    // stuff here has the same life as the store!
    // this is how we persist a websocket connection
    const connectPromise = hcWc.then(({ call }) => {
        store.dispatch({ type: 'HOLOCHAIN_WEBSOCKET_CONNECTED' });
        return call;
    });
    return next => (action) => {
        if (action.meta && action.meta.holochainAction && action.meta.callString) {
            next(action); // resend the original action so the UI can change based on requests
            return connectPromise.then(call => {
                return call(action.meta.callString)(action.payload)
                    .then((stringResult) => {
                    const result = JSON.parse(stringResult);
                    if (result.Err !== undefined) { // holochain error
                        store.dispatch({
                            type: action.type + '_FAILURE',
                            payload: Error(result.Err)
                        });
                        return Error(result.Err);
                    }
                    else if (result.Ok !== undefined) { // holochain Ok
                        store.dispatch({
                            type: action.type + '_SUCCESS',
                            payload: result.Ok
                        });
                        return result.Ok;
                    }
                    else { // unknown. Return raw result as success
                        store.dispatch({
                            type: action.type + '_SUCCESS',
                            payload: result
                        });
                        return result;
                    }
                })
                    .catch((err) => {
                    store.dispatch({
                        type: action.type + '_FAILURE',
                        payload: err.toString()
                    });
                    return err;
                });
            });
        }
        else {
            return next(action);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFhLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxJQUF3QixFQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNuRiw2Q0FBNkM7SUFDN0MsZ0RBQWdEO0lBRWhELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSwrQkFBK0IsRUFBRSxDQUFDLENBQUE7UUFDekQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQWlCLEVBQUUsRUFBRTtRQUNuQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsb0VBQW9FO1lBRWpGLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO3FCQUNoRCxJQUFJLENBQUMsQ0FBQyxZQUFvQixFQUFFLEVBQUU7b0JBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7b0JBRXZDLElBQUksTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUUsRUFBRSxrQkFBa0I7d0JBQ2hELEtBQUssQ0FBQyxRQUFRLENBQUM7NEJBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVTs0QkFDOUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO3lCQUMzQixDQUFDLENBQUE7d0JBQ0YsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUN6Qjt5QkFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFLEVBQUUsZUFBZTt3QkFDbkQsS0FBSyxDQUFDLFFBQVEsQ0FBQzs0QkFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVOzRCQUM5QixPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUU7eUJBQ25CLENBQUMsQ0FBQTt3QkFDRixPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUE7cUJBQ2pCO3lCQUFNLEVBQWtCLHdDQUF3Qzt3QkFDL0QsS0FBSyxDQUFDLFFBQVEsQ0FBQzs0QkFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVOzRCQUM5QixPQUFPLEVBQUUsTUFBTTt5QkFDaEIsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sTUFBTSxDQUFBO3FCQUNkO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRTtvQkFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQzt3QkFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVO3dCQUM5QixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRTtxQkFDeEIsQ0FBQyxDQUFBO29CQUNGLE9BQU8sR0FBRyxDQUFBO2dCQUNaLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDcEI7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==