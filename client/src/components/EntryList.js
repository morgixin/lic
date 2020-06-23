import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEntries } from "../actions/obsActions";
import PropTypes from "prop-types";

export class Entries extends Component {
  state = {};

  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getEntries();
  }

  rows = () => {
    const entries = this.props.entry;

    return entries.map((entry) => (
      <Container className="entry-list">
        <ListGroupItem>
          {/* {new Intl.DateTimeFormat("pt-BR", {
            month: "long",
            day: "2-digit",
          }).format(entry.hora_leitura)} */}
          {entry.hora_leitura.toLocaleDateString()}
        </ListGroupItem>
        <ListGroupItem>
          {Number(entry.temp_max)}/{Number(entry.temp_min)}ºC
        </ListGroupItem>
        <ListGroupItem>
          {Number(entry.umid_rel)}/{entry.Number(entry.umid_min)}%
        </ListGroupItem>
        <ListGroupItem>{Number(entry.chuva_ac_dia)}mm</ListGroupItem>
        <ListGroupItem>
          {Number(entry.inten_vento)}km/h
          {entry.direc_vento}
        </ListGroupItem>
        <ListGroupItem>{Number(entry.pressao_atm)}hPa</ListGroupItem>
        <ListGroupItem>{Number(entry.rad_solar)}W/m2</ListGroupItem>
      </Container>
    ));
  };

  render() {
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="entries-list">
            {this.rows}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { getEntries })(Entries);
