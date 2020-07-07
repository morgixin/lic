import React, { Component } from "react";
import { connect } from "react-redux";
import { getEntries } from "../actions/obsActions";
import PropTypes from "prop-types";
import { Jumbotron, Container } from "reactstrap";

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
    const todayDate = new Date();
    const todayEntry = entries.filter(
      (entry) =>
        new Date(entry.hora_leitura).setHours(0, 0, 0, 0) ==
        todayDate.setHours(0, 0, 0, 0)
    );

    return (
      <Container className="main-content-entry">
        <p style={{ color: "#aaa", fontSize: "smaller" }}>
          {Date(todayEntry.hora_leitura)}
        </p>
        <div className="main-content-section">
          <div className="main-content-subsection">
            <p className="section-title">Temperatura do ar</p>
            <div style={{ color: "#ED6440" }}>
              <p className="section-value">{todayEntry.temp_ar}</p>
              <p>ºC</p>
            </div>
          </div>

          <div className="main-content-subsection">
            <p className="section-title">Umidade Relativa</p>
            <div style={{ color: "#76CDCE" }}>
              <p className="section-value">{todayEntry.umid_rel}</p>
              <p>%</p>
            </div>
          </div>

          <div className="main-content-subsection">
            <p className="section-title">Chuva Acumulada 24h</p>
            <div style={{ color: "#72A2ED" }}>
              <p className="section-value">{todayEntry.ch_ac_dia}</p>
              <p>mm</p>
            </div>
          </div>

          <div className="main-content-subsection">
            <p className="section-title">Vento</p>
            <div style={{ color: "#418ABD" }}>
              <p className="section-value">{todayEntry.inten_vento}</p>
              <p> km/h {todayEntry.direc_vento}</p>
            </div>
          </div>

          <div className="main-content-subsection">
            <p className="section-title">Pressão Atmosférica</p>
            <div style={{ color: "#008000" }}>
              <p className="section-value">{todayEntry.pressao_atm}</p>
              <p>hPa</p>
            </div>
          </div>

          <div className="main-content-subsection">
            <p className="section-title">Radiação Solar Global</p>
            <div style={{ color: "#418ABD" }}>
              <p className="section-value">{todayEntry.rad_solar}</p>
              <p>W/m2</p>
            </div>
          </div>
        </div>
      </Container>
    );
  };

  render() {
    return (
      <div>
        <Jumbotron fluid style={{ padding: "12px 6px", maxWidth: "814px" }}>
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
