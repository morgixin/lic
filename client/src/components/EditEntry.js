import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateEntry } from "../actions/obsActions";
import { getEntries } from "../actions/obsActions";
import { Container, Table } from "reactstrap";

export class EditEntry extends Component {
  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getEntries();
  }

  rows = () => {
    console.log("oi");
    const { entries } = this.props.entry;

    const listEntries = entries
      .sort((a, b) => {
        return a.hora_leitura < b.hora_leitura
          ? -1
          : a.hora_leitura > b.hora_leitura
          ? 1
          : 0;
      })
      .map((entry) => (
        <tr key={entry._id}>
          <td contentEditable="true">
            {new Intl.DateTimeFormat("pt-BR", {
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(entry.hora_leitura))}
          </td>
          <td contentEditable="true">{entry.temp_ar}</td>
          <td contentEditable="true">{entry.temp_max}</td>
          <td contentEditable="true">{entry.temp_min}</td>
          <td contentEditable="true">{entry.umid_rel}</td>
          <td contentEditable="true">{entry.umid_min}</td>
          <td contentEditable="true">{entry.chuva_ac_dia} </td>
          <td contentEditable="true">{entry.inten_vento}</td>
          <td contentEditable="true">{entry.direc_vento}</td>
          <td contentEditable="true">{entry.pressao_atm}</td>
          <td contentEditable="true">{entry.rad_solar}</td>
        </tr>
      ));

    return listEntries.sort(() => -1);
  };

  render() {
    return (
      <Container>
        <Table className="mt-3">
          <thead>
            <tr className="title-simple">
              <th>Data</th>
              <th>Temp Ar</th>
              <th>Máx</th>
              <th>Min</th>
              <th>Umidade Rel</th>
              <th>Umidade Mín</th>
              <th>Chuva Ac. 24h</th>
              <th>Vento Intensidade</th>
              <th>Direção</th>
              <th>Pressão</th>
              <th>Radiação Solar</th>
            </tr>
          </thead>
          <tbody>{this.rows()}</tbody>
        </Table>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { updateEntry, getEntries })(EditEntry);
