import { connect } from "react-redux";
import Tickets, { StateProps } from "./Tickets";
import TicketActions from "../../reducers/TicketReducers";
import { State } from '../../reducers';

const mapStateToProps = ({ tickets }: State): StateProps => {
  return {
    tickets: tickets.data,
    selected: tickets.selected,
    fetching: tickets.fetching,
    error: tickets.error
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getTicketsRequest: () => dispatch(TicketActions.getTicketsRequest()),
  selectTicket: (id: number) => dispatch(TicketActions.selectTicket(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
