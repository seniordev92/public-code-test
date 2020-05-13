import React from 'react';
import styled from 'styled-components';
import type { Status } from '../../reducers/TicketReducers';

const StatusWrapper = styled.div`
  color: ${props => props.color};
  width: 50px;
  height: 22px;
  border: 1px solid #212121;
  border-radius: 4px;
  text-align: center;
`;

interface Props {
  status: Status;
}

const StatusLabel = ({ status }: Props) => {
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
  return <StatusWrapper color={statusColor}>{statusText}</StatusWrapper>;
};

export default StatusLabel;
