import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Table } from "reactstrap";
import { connect } from "react-redux";
import { getEntries, deleteEntry } from "../actions/obsActions";
import PropTypes from "prop-types";

export class Observations extends Component {
  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getEntries();
  }

  render() {
    const { entries } = this.props.entry;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="entry-list">
            {entries.map(({ _id, hora_leitura }) => (
              <CSSTransition key={_id} timeout={250} classNames="fade">
                <ListGroupItem></ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  entry: state.entry,
  //   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getEntries, deleteEntry })(
  Observations
);
