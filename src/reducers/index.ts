// <reference types="@types/webpack-env" />
import { combineReducers } from "redux";
import root from "../sagas";
import configureStore from "./CreateStore";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({

});

export interface State {

}

export default () => {
  let { store } = configureStore(reducers, root);
  return store;
};
