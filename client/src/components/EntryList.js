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
        return a.hora_leitura < b.hora_leitura
          ? -1
          : a.hora_leitura > b.hora_leitura
          ? 1
          : 0;
      })
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
            {entry.temp_ar} / {entry.temp_max} / {entry.temp_min}
          </td>
          <td>
            {entry.umid_rel} / {entry.umid_min}
          </td>
          <td>{entry.chuva_ac_dia} </td>
          <td>
            {entry.inten_vento} {entry.direc_vento}
          </td>
          <td>{entry.pressao_atm}</td>
          <td>{entry.rad_solar}</td>
        </tr>
      ));

    return listEntries.sort(() => -1);
  };

  render() {
    return (
      <Container>
        <Table className="main-table-week">
          <thead>
            <tr className="title-simple">
              <th>Data</th>
              <th>Temp Ar/Máx/Min ºC</th>
              <th>Umidade Rel/Mín %</th>
              <th>Chuva Ac. 24h mm</th>
              <th>Vento km/h</th>
              <th>Pressão hPa</th>
              <th>Radiação Solar W/m2</th>
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
