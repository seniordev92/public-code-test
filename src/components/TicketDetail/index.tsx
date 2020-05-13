import React from 'react';
import styled from 'styled-components';
import { Image, Card, Feed } from 'semantic-ui-react';
import moment from 'moment';

import UserInfo from './UserInfo';
import StatusMark from '../Status';

import type { Ticket } from '../../reducers/TicketReducers';

const Container = styled.div`
  &&& {
    width: 990px;
  }
  background-color: #323232;
  height: 710px;
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

const TicketCard = styled(Card)`
  &&& {
    width: 100%;
    background-color: transparent;
    box-shadow: 0 1px 3px 0 #2C2C2C, 0 0 0 2px #2C2C2C;
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
  width: 50px;
  height: 22px;
  border: 1px solid #212121;
  border-radius: 4px;
  text-align: center;
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
    const { number, reportedTime, status, description, owner, asset } = ticket;
    console.log('Nala', ticket);
    const { name, geoCode, kmFrom, kmTo } = asset
    // const { }
    mainView = (
      <div>
        <div>
          <div>TICKET NO. <span>{number}</span></div>
          <div>LAST UPDATED <span>{number}</span></div>
        </div>
        <TicketCard>
          <CardHeader header="Owner" />
          <UserInfo user={owner}/>
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
                    <div style={{display: 'flex', flexDirection:"row"}}>
                      <Location>{kmFrom}</Location>
                      <Location>{kmTo}</Location>
                    </div>
                    {/* {specialities.join(',').toUpperCase()} */}
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
