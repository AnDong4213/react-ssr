import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

// const store = createStore(reducer, applyMiddleware(thunk));
// export default store;

export default function createStoreInstance(preloadedState = {}) {
  return createStore(reducer, preloadedState, applyMiddleware(thunk));
}
