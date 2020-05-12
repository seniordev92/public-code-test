// This is for the devscreens
import apisauce, { ApiResponse } from 'apisauce';

import { Ticket } from '../reducers/TicketReducers';

const baseUrl = "https://raw.githubusercontent.com/Tapify/public-code-test/master/web-ui-test/";

export interface TicketApi {
  getList: () => Promise<ApiResponse<Ticket[]>>;
}

const tickets = (baseURL: string = baseUrl): TicketApi => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 100000
  });
  const getList = () => api.get<Ticket[]>('/tickets.json');
  return {
    getList,
  };
};

export default {
  tickets,
};
