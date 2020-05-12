import { AnyAction } from 'redux';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export interface Ticket {
  ticketId: number;
  number: string;
  lastUpdatedTime: string;
  "owner": {
    "userId": 2,
    "firstName": "Bruce",
    "lastName": "Wayne",
    "avatar": "https://raw.githubusercontent.com/Tapify/public-code-test/master/web-ui-test/bruceWayne.png",
    "specialities": [
      "Woodworking"
    ]
  },
  reportedTime: string,
  status: "assigned" | "completed" | "unassigned",
  "description": "Ticket description",
  "asset": {
    "assetId": 1,
    "name": "Sign",
    "geoCode": "137",
    "kmFrom": 7,
    "kmTo": 20
  }
}

/* ------------- Types and Action Creators ------------- */
interface TicketActionsCreators {
  getTicketsRequest: (email: string, password: string) => AnyAction;
  getTicketsSuccess: (data?: Ticket[]) => AnyAction;
  getTicketsFailure: (error: any) => AnyAction;
}

interface TicketActionsTypes {
  GET_TICKETS_REQUEST: string;
  GET_TICKETS_SUCCESS: string;
  GET_TICKETS_FAILURE: string;
}
export interface TicketState {
  token?: string,
  fetching: boolean,
  error?: any
}

const { Types, Creators } = createActions<TicketActionsTypes, TicketActionsCreators>({
  getTicketsRequest: [],
  getTicketsSuccess: ['data'],
  getTicketsFailure: ['error'],
});

export const TicketTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable<TicketState>({
  token: undefined,
  fetching: false,
  error: null
});

/* ------------- Selectors ------------- */
export const TicketSelectors = {
  getToken: (state: TicketState) => state.token
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state: Immutable.ImmutableObject<TicketState>) => state.merge({ fetching: true });

// successful api lookup
export const success = (state: Immutable.ImmutableObject<TicketState>, action: AnyAction) => {
  const { data } = action;
  return state.merge({
    fetching: false,
    error: null,
    token: data,
  } as TicketState);
};

// Something went wrong somewhere.
export const failure = (state: Immutable.ImmutableObject<TicketState>, action: AnyAction) => {
  const { error } = action;
  return state.merge({ fetching: false, error });
};

// //Logout successful
// export const logoutSuccess = state => {
//   Utils.ClearAsyncStorage(false);
//   return state.merge(INITIAL_STATE);
// };

/* ------------- Hookup Reducers To Types ------------- */

export const ticketReducer = createReducer(INITIAL_STATE, {
  [Types.GET_TICKETS_REQUEST]: request,
  [Types.GET_TICKETS_SUCCESS]: success,
  [Types.GET_TICKETS_FAILURE]: failure,
});
