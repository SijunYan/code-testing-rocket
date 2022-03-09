import { createStore, combineReducers, compose } from "redux";

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === "development";

// Actions
const storeCapsules = (data) => {
  return {
    type: "STORE_CAPSULES",
    payload: data,
  };
};
const storeLandingPad = (data) => {
  return {
    type: "STORE_LADINGPAD",
    payload: data,
  };
};

export const actions = { storeCapsules, storeLandingPad };

//Reducers
const reducers = {
  capsules: (oldState = [], action) => {
    switch (action.type) {
      case "STORE_CAPSULES":
        oldState = [];
        oldState.push(action.payload);
        return oldState;
      default:
        return oldState;
    }
  },
  landingPads: (oldState = [], action) => {
    switch (action.type) {
      case "STORE_LADINGPAD":
        oldState.push(action.payload);
        return oldState;
      default:
        return oldState;
    }
  },
};

export const slices = combineReducers({ ...reducers });

const composeEnhancers =
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : compose;

const store = createStore(slices, composeEnhancers());

export default store;
