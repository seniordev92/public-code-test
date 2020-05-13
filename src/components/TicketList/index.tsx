import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Image } from 'semantic-ui-react'
import moment from 'moment';

import StatusMark from '../Status';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  width: 380px;
  height: 710px;
`;

const SearchContainer = styled.div`
  height: 25px;
  width: 100%;
  border: 1px solid #3e3e3e;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  &&& {
    background-color: transparent;
  }
`;

const SearchIcon = styled.i`
  &&& {
    width: 24px;
  }
  color: #8b8b8b;
`;

const TableWrapper = styled.div`
  &&& {
    margin: 10px 0;
  }
  height: 674px;
  overflow-y: scroll;
`;
const TicketsTable = styled(Table)`
  &&& {
    background-color: #323232;
    font-size: 9px;
  }
  padding: 0 15px;
`;

const HeaderCell = styled(Table.HeaderCell)`
  &&& {
    background-color: #323232;
    border-color: #212121;
    color: #717070;
    padding: 9px 0;
  }
`;

const Cell = styled(Table.Cell)`
  &&& {
    color: #CCCCCC;
    border-color: #212121;
    padding: 6px 0;
  }
  font-size: 12px;
`;

const Avatar = styled(Image)`
  &&& {
    width: 29px;
    height: 29px;
  }
`;


interface Props {
  tickets: Ticket[],
  onSelect: (id: number) => void
}

const TicketList = ({ tickets, onSelect }: Props) => {
  const [selectedTicket, setSelectedTicket] = useState(-1);
  const onClickTicket = (ticketId: number) => {
    setSelectedTicket(ticketId);
    onSelect(ticketId);
  }
  return (
    <Container>
      <SearchContainer className="ui action left icon input">
        <SearchInput type="text" />
        <SearchIcon aria-hidden="true" className="search icon"></SearchIcon>
      </SearchContainer>
      <TableWrapper>
        <TicketsTable singleLine selectable>
          <Table.Header>
            <Table.Row>
              <HeaderCell style={{ width: 48 }}>OWNER</HeaderCell>
              <HeaderCell style={{ width: 93 }}>REPORTED</HeaderCell>
              <HeaderCell style={{ width: 145 }}>ASSET</HeaderCell>
              <HeaderCell>STATUS</HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              tickets.map(ticket => {
                const {
                  reportedTime,
                  asset: { name },
                  owner: { avatar },
                  ticketId,
                  status
                } = ticket;

                return (
                  <Table.Row key={ticketId} onClick={() => onClickTicket(ticketId)}>
                    <Cell>
                      <Avatar src={avatar} avatar />
                    </Cell>
                    <Cell>{moment(reportedTime, "YYYY-MM-DDThh:mm:ss").format("DD/MM/YY HH:mm")}</Cell>
                    <Cell>{name}</Cell>
                    <Cell>
                      <StatusMark status={status} />
                    </Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </TicketsTable>
      </TableWrapper>
    </Container>
  )
};

export default TicketList;
