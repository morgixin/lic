import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import { connect } from "react-redux";
import { getEntries } from "../actions/obsActions";
import PropTypes from "prop-types";

class Entries extends Component {
  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getEntries();
  }

  rows = () => {
    const { entries } = this.props.entry;

    const listEntries = entries
      .sort((a, b) => {
        // return a.hora_leitura.localeCompare(b.hora_leitura);
        return a.hora_leitura < b.hora_leitura
          ? -1
          : a.hora_leitura > b.hora_leitura
          ? 1
          : 0;
      })
      // .filter((entry) => entry.hora_leitura != Date.now())
      .slice(entries.length - 6, entries.length - 1)
      .map((entry) => (
        <tr key={entry._id}>
          <td>
            {new Intl.DateTimeFormat("pt-BR", {
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(entry.hora_leitura))}
          </td>
          <td>
            {entry.temp_ar}/{entry.temp_max}/{entry.temp_min} ºC
          </td>
          <td>
            {entry.umid_rel} / {entry.umid_min}%
          </td>
          <td>{entry.chuva_ac_dia} mm</td>
          <td>
            {entry.inten_vento} km/h {entry.direc_vento}
          </td>
          <td>{entry.pressao_atm} hPa</td>
          <td>{entry.rad_solar} W/m2</td>
        </tr>
      ));

    return listEntries.sort(() => -1);
  };

  render() {
    return (
      <Container>
        <Table className="main-table-week">
          <thead>
            <tr className="table-title-simple">
              <th>Data</th>
              <th>Temp Ar/Máx/Min</th>
              <th>Umidade Rel/Mín</th>
              <th>Chuva Acumulada 24h</th>
              <th>Vento</th>
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

export default connect(mapStateToProps, { getEntries })(Entries);
