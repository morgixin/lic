import React, { Component } from "react";
import { Table } from "reactstrap";
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
        <tr key={entry._id} align="center">
          <td>
            {new Intl.DateTimeFormat("pt-BR", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(entry.hora_leitura))}
          </td>
          <td>
            {new Intl.DateTimeFormat("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(entry.hora_leitura))}
          </td>
          <td>{entry.temp_max}</td>
          <td>{entry.temp_min}</td>
          <td>{entry.umid_min}</td>
          <td>{entry.chuva_ac_dia} </td>
          <td>{entry.inten_vento}</td>
          <td>{entry.direc_vento}</td>
          <td>{entry.pressao_atm}</td>
          <td>{entry.rad_solar}</td>
        </tr>
      ));

    return listEntries.sort(() => -1);
  };

  render() {
    return (
      <div>
        <p style={{ color: "gray" }}>Últimas observações</p>
        <Table className="main-table-week" striped bordered responsive>
          <thead>
            <tr
              className="title-simple"
              align="center"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <th colSpan="2">Data</th>
              <th colSpan="2">Temperatura (ºC)</th>
              <th colSpan="1">Umidade Rel (%)</th>
              <th colSpan="1">Chuva (mm)</th>
              <th colSpan="2">Vento (km/h)</th>
              <th colSpan="1">Pressão</th>
              <th colSpan="1">Radiação Solar</th>
            </tr>
            <tr className="title-simple table-sm" align="center">
              <td>Dia</td>
              <td>Hora</td>
              <td>Máx</td>
              <td>Mín</td>
              <td>Mín</td>
              <td>24h</td>
              <td>Força</td>
              <td>Direção</td>
              <td>hPa</td>
              <td>W/m²</td>
            </tr>
          </thead>
          <tbody className="table-sm" style={{ maxHeight: "180px" }}>
            {this.rows()}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { getEntries })(Entries);
