import React from 'react';
import styled from 'styled-components';
import { Image, Card, Feed } from 'semantic-ui-react';
import moment from 'moment';

import UserInfo from './UserInfo';
import StatusMark from '../Status';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  flex: 1;
  background-color: #323232;
  margin-left: 10px;
  padding: 16px;
`;

const EmptyMsg = styled.div`
  width: 100%;
  height: 100%;
  color: #707070;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 11.5px;
`;

const Text = styled.p`
  &&& {
    margin: 9px;
  }
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #5c5b5b;
  font-size: 10px;
  line-height: 9px;
`;

const TicketNumber = styled.span`
  color: #adadaa;
`
const TicketCard = styled(Card)`
  &&& {
    width: 100%;
    background-color: transparent;
    box-shadow: 0 1px 3px 0 #2C2C2C, 0 0 0 2px #2C2C2C;
    margin: 12px 0;
  }
`

const CardHeader = styled(Card.Content)`
  &&& {
    background-color: #2C2C2C;
    padding: 1px 0;
  }
  .header {
    margin: 5px 12px !important;
    color: #d3d3d3 !important;
    font-size: 12px !important;
  }
  height: 27px;
`;

const Content = styled(Feed.Content)`
  &&& {
    padding: 10px;
    margin: 2px 0;
  }
  .date {
    font-size: 11px !important;
    color: #626262 !important;
  }
  .summary {
    font-size: 11px !important;
    color: #9b9b9b !important;
  }
`;

const Location = styled.div`
  &&& {
    color: #9b9b9b;
  }
  width: 68px;
  height: 22px;
  border: 1px solid #212121;
  border-radius: 4px;
  text-align: center;
  margin-right: 3px;
`;

interface Props {
  ticket?: Ticket
}
const TicketDetail = ({ ticket }: Props) => {
  let mainView;
  if (!ticket) {
    mainView = (
      <EmptyMsg>
        <Image src="./assets/icon/icn_close.png" />
        <Text>No ticket selected</Text>
      </EmptyMsg>
    );
  } else {
    const { number, reportedTime, lastUpdatedTime, status, description, owner, asset } = ticket;
    const { name, geoCode, kmFrom, kmTo } = asset
    mainView = (
      <div>
        <Title>
          <div>TICKET NO. <TicketNumber>{number}</TicketNumber></div>
          <div>LAST UPDATED <span>{moment(lastUpdatedTime, "YYYY-MM-DDThh:mm:ss").format("DD/MM/YY HH:mm")}</span></div>
        </Title>
        <TicketCard>
          <CardHeader header="Owner" />
          <UserInfo user={owner} />
        </TicketCard>
        <TicketCard>
          <CardHeader header="Details" />
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Content>
                  <Feed.Date content="Reported" />
                  <Feed.Summary>
                    {moment(reportedTime, "YYYY-MM-DDThh:mm:ss").format("DD/MM/YY HH:mm")}
                  </Feed.Summary>
                </Content>
              </Feed.Event>
              <Feed.Event>
                <Content>
                  <Feed.Date content="Status" />
                  <Feed.Summary>
                    <StatusMark status={status} />
                  </Feed.Summary>
                </Content>
              </Feed.Event>
              <Feed.Event>
                <Content>
                  <Feed.Date content="Description" />
                  <Feed.Summary content={description} />
                </Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </TicketCard>
        <TicketCard>
          <CardHeader header="Asset" />
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Content>
                  <Feed.Date content="Name" />
                  <Feed.Summary content={name} />
                </Content>
              </Feed.Event>
              <Feed.Event>
                <Content>
                  <Feed.Date content="GeoCode" />
                  <Feed.Summary content={geoCode} />
                </Content>
              </Feed.Event>
              <Feed.Event>
                <Content>
                  <Feed.Date content="Location" />
                  <Feed.Summary>
                    <div style={{ display: 'flex', flexDirection: "row" }}>
                      <Location>{kmFrom.toFixed(3)}</Location>
                      <Location>{kmTo.toFixed(3)}</Location>
                    </div>
                  </Feed.Summary>
                </Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </TicketCard>

      </div>
    );
  }
  return (
    <Container>
      {mainView}
    </Container>
  );
};

export default TicketDetail;
