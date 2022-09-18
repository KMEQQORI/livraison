import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./src/reducers";
import MainLayout from "./src/Layouts/MainLayout";

const store = createStore(reducer, applyMiddleware(thunk));

export default () => (
  <Provider store={store}>
    <MainLayout />
  </Provider>
);
