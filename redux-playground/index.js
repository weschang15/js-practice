const redux = require("redux");
const createStore = redux.createStore;

// Setting up default state
const INITIAL_STATE = {
  counter: 0
};

// Create basic reducer to handle incoming state changes
const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INC_COUNTER":
      return Object.assign({}, state, {
        counter: state.counter + 1
      });
    case "ADD_COUNTER":
      return Object.assign({}, state, {
        counter: state.counter + 10
      });
    default:
      return state;
  }
};

// Create state container (store)
const store = createStore(rootReducer);
console.log(store.getState());

// Create state subscriptions - this is triggered whenever an action is dispatched (whenever the state is updated)
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

// Dispatching an action which triggers a state change
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", payload: 10 });
console.log(store.getState());
