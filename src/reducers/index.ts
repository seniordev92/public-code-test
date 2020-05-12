// <reference types="@types/webpack-env" />
import { combineReducers } from "redux";
import root from "../sagas";
import configureStore from "./CreateStore";
import type { TicketState } from "./TicketReducers";
import { ticketReducer } from "./TicketReducers";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  tickets: ticketReducer,
});

export interface State {
  tickets: TicketState
}

export default () => {
  let { store } = configureStore(reducers, root);
  return store;
};
