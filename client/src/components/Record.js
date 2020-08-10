import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEntries } from "../actions/obsActions";
import { Table } from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import editPic from "../assets/images/pencil.png";

export class Record extends Component {
  state = {
    redirect: false,
  };

  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  redirectHandler = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };

  renderRedirect() {
    if (this.state.redirect)
      return <Redirect exact to={{ pathname: "/editar/" }} />;
  }

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
      .map((entry) => (
        <tr key={entry._id} align="center">
          <td>
            <Link to={`/editar/${entry._id}`}>
              <img src={editPic} style={{ height: "1rem" }} alt="Editar" />
            </Link>
          </td>
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
          <td>{entry.tempo_presente}</td>
          <td>{entry.nome_usuario}</td>
          {/* <td>{entry.mat_usuario}</td> */}
        </tr>
      ));

    return listEntries.sort(() => -1);
  };

  render() {
    return (
      <div>
        <Table className="table-limit-scroll mt-3 table-sm" striped responsive>
          <thead>
            <tr
              className="title-simple"
              align="center"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <th colSpan="1"></th>
              <th colSpan="2">Data</th>
              <th colSpan="2">Temperatura (ºC)</th>
              <th colSpan="1">Umidade Relativa (%)</th>
              <th colSpan="1">Chuva (mm)</th>
              <th colSpan="2">Vento (km/h)</th>
              <th colSpan="1">Pressão</th>
              <th colSpan="1">Radiação Solar</th>
              <th colSpan="1">Tempo Presente</th>
              <th colSpan="1">Usuário</th>
            </tr>
            <tr className="title-simple" align="center">
              <td> </td>
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
              <td> </td>
              <td>Nome</td>
              {/* <td>Matrícula</td> */}
            </tr>
          </thead>
          <tbody>{this.rows()}</tbody>
        </Table>
        {this.renderRedirect()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  entry: state.entry,
  users: state.auth,
});

export default connect(mapStateToProps, { getEntries })(Record);
