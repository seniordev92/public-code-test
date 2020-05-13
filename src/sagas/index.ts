import { all, takeLatest } from "redux-saga/effects";

import API from '../services/Api';

/* ------------- Types ------------- */
import { TicketTypes } from "../reducers/TicketReducers";

/* ------------- Sagas ------------- */
import { getTickets } from "./TicketSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const ticketApi = API.tickets();

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(TicketTypes.GET_TICKETS_REQUEST, getTickets, ticketApi),
  ]);
}
