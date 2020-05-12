import React from 'react';
import styled from 'styled-components';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  background-color: #323232;
  width: 990px;
  height: 710px;
  margin-left: 10px
`;


interface Props {
  ticket?: Ticket
}
const TicketDetail = ({ ticket }: Props) => {
  return <Container />
};

export default TicketDetail;
