import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEntries } from "../actions/obsActions";
import PropTypes from "prop-types";

export class Entries extends Component {
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
          <TransitionGroup className="entries-list">
            {entries.map(({ _id, hora_leitura }) => (
              <CSSTransition key={_id} timeout={250} classNames="fade">
                <ListGroupItem>{hora_leitura}</ListGroupItem>
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

export default connect(mapStateToProps, { getEntries })(Entries);
