import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { storesReducer } from "./storesReducer";

const rootReducer = combineReducers({
  globalReducer,
  storesReducer,
});

export default rootReducer;
