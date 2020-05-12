import React, { useEffect } from 'react';
import styled from 'styled-components';

import TicketList from '../../components/TicketList';
import TicketDetail from '../../components/TicketDetail';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  padding: 0 10px;
`
const Title = styled.h3`
  margin: 7px 0px !important;
  color: #adadaa;
  border-bottom: 3px solid #723ae8;
  padding: 5px;
`;

const Content = styled.div`
  display: flex;
  margin: 11px 0;
`;
export interface StateProps {
  tickets: Ticket[],
  selected?: Ticket,
  fetching: boolean,
  error?: any
}

interface DispatchProps {
  getTicketsRequest: () => void
}

const Tickets = ({
  getTicketsRequest,
  tickets,
  selected
}: StateProps & DispatchProps) => {
  useEffect(() => {
    getTicketsRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Title>Tickets</Title>
      <Content>
        <TicketList tickets={tickets}/>
        <TicketDetail ticket={selected}/>
      </Content>
    </Container>
  );
}

export default Tickets;
