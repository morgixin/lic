import React, { Component } from "react";
import { Jumbotron, Container, Table } from "reactstrap";
import { connect } from "react-redux";
import { getEntries } from "../actions/obsActions";
import PropTypes from "prop-types";

export class TodayEntry extends Component {
  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getEntries();
  }

  mainContent = () => {
    const { entries } = this.props.entry;
    // console.log(entries);

    const todayEntry = entries
      .sort((a, b) => {
        return a.hora_leitura < b.hora_leitura
          ? -1
          : a.hora_leitura > b.hora_leitura
          ? 1
          : 0;
      })
      .map((entry) => (
        <Container className="main-content-entry" style={{ padding: "0 8px" }}>
          <p style={{ fontSize: "smaller", color: "#aaa" }}>
            Data do envio:{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              month: "long",
              weekday: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            }).format(new Date(entry.hora_leitura))}
          </p>
          <Table className="main-content-table">
            <thead>
              <tr>
                <th className="subsection-title">Temperatura do ar (ºC)</th>
                <th className="subsection-title">Umidade Relativa (%)</th>
                <th className="subsection-title">Chuva Total 24h (mm)</th>
                <th className="subsection-title">Vento (km/h)</th>
                <th className="subsection-title">Pressão Atmosférica (hPa)</th>
                <th className="subsection-title">
                  Radiação Solar Global (W/m2)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="main-content-subsection">
                  <div style={{ color: "#ED6440" }} className="subsection-row">
                    <p className="subsection-value">{entry.temp_ar}</p>
                  </div>
                </td>

                <td className="main-content-subsection">
                  <div style={{ color: "#76CDCE" }} className="subsection-row">
                    <p className="subsection-value">{entry.umid_rel}</p>
                  </div>
                </td>

                <td className="main-content-subsection">
                  <div style={{ color: "#72A2ED" }} className="subsection-row">
                    <p className="subsection-value">{entry.chuva_ac_dia}</p>
                  </div>
                </td>

                <td className="main-content-subsection">
                  <div style={{ color: "#418ABD" }} className="subsection-row">
                    <p className="subsection-value">{entry.inten_vento}</p>
                    <p
                      className="subsection-value"
                      style={{ marginLeft: "6px" }}
                    >
                      {entry.direc_vento}
                    </p>
                  </div>
                </td>

                <td className="main-content-subsection">
                  <div style={{ color: "#008000" }} className="subsection-row">
                    <p className="subsection-value">{entry.pressao_atm}</p>
                  </div>
                </td>

                <td className="main-content-subsection">
                  <div style={{ color: "#418ABD" }} className="subsection-row">
                    <p className="subsection-value">{entry.rad_solar}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      ))
      .slice(-1)[0];

    return todayEntry;
  };

  render() {
    return (
      <div>
        <Jumbotron fluid style={{ padding: "12px 0px", width: "814px" }}>
          <Container fluid>{this.mainContent()}</Container>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { getEntries })(TodayEntry);
