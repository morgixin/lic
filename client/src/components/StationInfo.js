import React, { Component } from "react";
import { Container } from "reactstrap";

class StationInfo extends Component {
  render() {
    return (
      <Container>
        <div className="sidebar ml-5">
          <div>
            <p style={{ fontSize: "1.25rem" }}>Estação Ambiental Didática</p>
          </div>
          <div className="sidebar-line">
            <div className="pt-3">
              <p>
                Laboratório de Instrumentos
                <br />
                CEFET/Maracanã, Rio de Janeiro
              </p>
              <p>
                Lat: 22º54'11"
                <br />
                Long: 43º13'28.9"
                <br />
                Elev: 33 m
              </p>
            </div>
          </div>
          <div className="sidebar-line">
            <div className="pt-3">
              <p>© 2020. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default StationInfo;
