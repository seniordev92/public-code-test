import { AnyAction } from 'redux';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string,
  specialities: string[]
}

interface Asset {
  assetId: number,
  name: string,
  geoCode: string,
  kmFrom: number,
  kmTo: number
}

export interface Ticket {
  ticketId: number;
  number: string;
  lastUpdatedTime: string;
  owner: User,
  reportedTime: string,
  status: "assigned" | "completed" | "unassigned",
  description: string,
  asset: Asset
}

/* ------------- Types and Action Creators ------------- */
interface TicketActionsCreators {
  getTicketsRequest: () => AnyAction;
  getTicketsSuccess: (data?: Ticket[]) => AnyAction;
  getTicketsFailure: (error: any) => AnyAction;
}

interface TicketActionsTypes {
  GET_TICKETS_REQUEST: string;
  GET_TICKETS_SUCCESS: string;
  GET_TICKETS_FAILURE: string;
}
export interface TicketState {
  data: Ticket[],
  selected?: Ticket,
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
  data: [],
  fetching: false,
  error: null
});

/* ------------- Selectors ------------- */
export const TicketSelectors = {
  getTickets: (state: TicketState) => state.data
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
    data,
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
