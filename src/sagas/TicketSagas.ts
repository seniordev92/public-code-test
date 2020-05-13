import { AnyAction } from 'redux';
import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ApiResponse } from 'apisauce';

import TicketActions from '../reducers/TicketReducers';
import { TicketApi } from '../services/Api';

import type { Ticket } from '../reducers/TicketReducers';

export function* getTickets(api: TicketApi, action: AnyAction): SagaIterator {
  try {
    const response: ApiResponse<Ticket[]> = yield call(api.getList);
    if (response.ok) {
      yield put(TicketActions.getTicketsSuccess(response.data));
    } else {
      alert('Login Failed');
      yield put(TicketActions.getTicketsFailure(response.data));
    }
  } catch (error) {}
}
