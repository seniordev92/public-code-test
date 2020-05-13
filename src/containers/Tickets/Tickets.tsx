import React, { useEffect } from 'react';
import styled from 'styled-components';

import TicketList from '../../components/TicketList';
import TicketDetail from '../../components/TicketDetail';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  padding: 0 10px;
`;
const Title = styled.h3`
  &&& {
    margin: 7px 0px;
  }
  color: #adadaa;
  border-bottom: 3px solid #723ae8;
  padding: 5px;
`;

const Content = styled.div`
  display: flex;
  margin: 10px 0;
`;
export interface StateProps {
  tickets: Ticket[];
  selected?: Ticket;
  fetching: boolean;
  error?: any;
}

interface DispatchProps {
  getTicketsRequest: () => void;
  selectTicket: (id: number) => void;
}

const Tickets = ({
  getTicketsRequest,
  selectTicket,
  tickets,
  selected,
}: StateProps & DispatchProps) => {
  useEffect(() => {
    getTicketsRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Title>Tickets</Title>
      <Content>
        <TicketList tickets={tickets} onSelect={selectTicket} />
        <TicketDetail ticket={selected} />
      </Content>
    </Container>
  );
};

export default Tickets;
