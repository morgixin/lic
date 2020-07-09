import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";
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
          <p style={{ color: "#aaa", fontSize: "smaller" }}>
            {Date(entry.hora_leitura)}
          </p>
          <div className="main-content-section">
            <div className="main-content-subsection">
              <p className="subsection-title">Temperatura do ar</p>
              <div style={{ color: "#ED6440" }} className="subsection-row">
                <p className="subsection-value">{entry.temp_ar}</p>
                <p style={{ marginLeft: "6px" }}> ºC</p>
              </div>
            </div>

            <div className="main-content-subsection">
              <p className="subsection-title">Umidade Relativa</p>
              <div style={{ color: "#76CDCE" }} className="subsection-row">
                <p className="subsection-value">{entry.umid_rel}</p>
                <p style={{ marginLeft: "6px" }}>%</p>
              </div>
            </div>

            <div className="main-content-subsection">
              <p className="subsection-title">Chuva Acumulada 24h</p>
              <div style={{ color: "#72A2ED" }} className="subsection-row">
                <p className="subsection-value">{entry.chuva_ac_dia}</p>
                <p style={{ marginLeft: "6px" }}>mm</p>
              </div>
            </div>

            <div className="main-content-subsection">
              <p className="subsection-title">Vento</p>
              <div style={{ color: "#418ABD" }} className="subsection-row">
                <p className="subsection-value">{entry.inten_vento}</p>
                <p style={{ marginLeft: "6px" }}>km/h {entry.direc_vento}</p>
              </div>
            </div>

            <div className="main-content-subsection">
              <p className="subsection-title">Pressão Atmosférica</p>
              <div style={{ color: "#008000" }} className="subsection-row">
                <p className="subsection-value">{entry.pressao_atm}</p>
                <p style={{ marginLeft: "6px" }}>hPa</p>
              </div>
            </div>

            <div className="main-content-subsection">
              <p className="subsection-title">Radiação Solar Global</p>
              <div style={{ color: "#418ABD" }} className="subsection-row">
                <p className="subsection-value">{entry.rad_solar}</p>
                <p style={{ marginLeft: "6px" }}>W/m2</p>
              </div>
            </div>
          </div>
        </Container>
      ))
      .slice(-1)[0];

    return todayEntry;
  };

  render() {
    return (
      <div>
        <Jumbotron fluid style={{ padding: "12px 0px", maxWidth: "814px" }}>
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
