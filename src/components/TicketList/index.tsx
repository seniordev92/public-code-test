import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Image } from 'semantic-ui-react';
import moment from 'moment';

import StatusMark from '../Status';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  width: 380px;
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
    color: #8b8b8b !important;
  }
  :focus {
    -webkit-tap-highlight-color: transparent !important;
    background-color: transparent !important;
  }
`;

const SearchIcon = styled.i`
  width: 24px !important;
  color: #8b8b8b;
`;

const TableWrapper = styled.div`
  &&& {
    margin-top: 10px;
    height: calc(100vh - 90px);
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 13px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0px;
    background: #212121;
  }
  &::-webkit-scrollbar-thumb {
    background: #3e3e3e !important;
    border-radius: 0px;
  }
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

const Row = styled(Table.Row)`
  background-color: ${props => (props.selected ? '#414141' : 'transparent')};
`;
const Cell = styled(Table.Cell)`
  &&& {
    color: #cccccc;
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
  tickets: Ticket[];
  onSelect: (id: number) => void;
}

const TicketList = ({ tickets, onSelect }: Props) => {
  const [selectedTicket, setSelectedTicket] = useState(-1);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {}, [tickets]);

  useEffect(() => {
    if (!searchKey) {
      setFilteredTickets(tickets);
    }
    const result = tickets.filter(ticket => {
      const name = ticket.asset.name.toLowerCase();
      return name.indexOf(searchKey.toLowerCase()) >= 0;
    });
    setFilteredTickets(result);
  }, [tickets, searchKey]);
  const onClickTicket = (ticketId: number) => {
    setSelectedTicket(ticketId);
    onSelect(ticketId);
  };
  return (
    <Container>
      <SearchContainer className='ui action left icon input'>
        <SearchInput
          type='text'
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
        <SearchIcon aria-hidden='true' className='search icon'></SearchIcon>
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
            {filteredTickets.map(ticket => {
              const {
                reportedTime,
                asset: { name },
                owner: { avatar },
                ticketId,
                status,
              } = ticket;
              return (
                <Row
                  key={ticketId}
                  onClick={() => onClickTicket(ticketId)}
                  selected={selectedTicket === ticketId}
                >
                  <Cell>
                    <Avatar src={avatar} avatar />
                  </Cell>
                  <Cell>
                    {moment(reportedTime, 'YYYY-MM-DDThh:mm:ss').format(
                      'DD/MM/YY HH:mm'
                    )}
                  </Cell>
                  <Cell>{name}</Cell>
                  <Cell>
                    <StatusMark status={status} />
                  </Cell>
                </Row>
              );
            })}
          </Table.Body>
        </TicketsTable>
      </TableWrapper>
    </Container>
  );
};

export default TicketList;
