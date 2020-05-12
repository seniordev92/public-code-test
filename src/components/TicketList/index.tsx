import React from 'react';
import styled from 'styled-components';
import { Table, Image } from 'semantic-ui-react'

import moment from 'moment';

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
  background-color: transparent !important;
`;

const SearchIcon = styled.i`
  color: #8b8b8b;
  width: 24px !important;
`;

const TableWrapper = styled.div`
  height: 674px;
  overflow-y: scroll;
  margin: 10px 0 !important;
`;
const TicketsTable = styled(Table)`
  background-color: #323232 !important;
  font-size: 9px !important;
  padding: 0 15px;
`;

const HeaderCell = styled(Table.HeaderCell)`
  background-color: #323232 !important;
  color: #717070 !important;
  padding: 9px 0 !important;
  border-color: #212121 !important;
`;


const Cell = styled(Table.Cell)`
  color: #CCCCCC !important;
  padding: 6px 0 !important;
  font-size: 12px;
  border-color: #212121 !important;
`;

const Avatar = styled(Image)`
  width: 29px !important;
  height: 29px !important;
`;

const Status = styled.div`
  color: ${props => props.color};
  width: 50px;
  height: 22px;
  border: 1px solid #212121;
  border-radius: 4px;
  text-align: center;
`
interface Props {
  tickets: Ticket[]
}

const TicketList = ({ tickets }: Props) => {
  return (
    <Container>
      <SearchContainer className="ui action left icon input">
        <SearchInput type="text" />
        <SearchIcon aria-hidden="true" className="search icon"></SearchIcon>
      </SearchContainer>
      <TableWrapper>
        <TicketsTable singleLine>
          <Table.Header>
            <Table.Row>
              <HeaderCell style={{width: 48}}>OWNER</HeaderCell>
              <HeaderCell style={{width: 93}}>REPORTED</HeaderCell>
              <HeaderCell style={{width: 145}}>ASSET</HeaderCell>
              <HeaderCell>STATUS</HeaderCell>
            </Table.Row>
          </Table.Header>
          {
            tickets.map(ticket => {
              const {
                reportedTime,
                asset: { name },
                owner: { avatar },
                ticketId,
                status
              } = ticket;
              let statusText: string;
              let statusColor: string;
              switch (status) {
                case 'assigned':
                  statusText = 'ASD';
                  statusColor = '#edb41c';
                  break;
                case 'completed':
                  statusText = 'COM';
                  statusColor = '#0fa540';
                  break;
                case 'unassigned':
                default:
                  statusText = 'UNA';
                  statusColor = '#626262';
                  break;
              }
              return (
                <Table.Body key={ticketId}>
                  <Table.Row>
                    <Cell>
                      <Avatar src={avatar} avatar />
                    </Cell>
                    <Cell>{moment(reportedTime, "YYYY-MM-DDThh:mm:ss").format("DD/MM/YY hh:mm")}</Cell>
                    <Cell>{name}</Cell>
                    <Cell>
                      <Status color={statusColor}>
                        {statusText}
                      </Status>
                    </Cell>
                  </Table.Row>
                </Table.Body>
              )
            })
          }
        </TicketsTable>
      </TableWrapper>
    </Container>
  )
};

export default TicketList;
