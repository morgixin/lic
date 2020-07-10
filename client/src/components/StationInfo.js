import React, { Component } from "react";
import { Container, Button } from "reactstrap";

class StationInfo extends Component {
  render() {
    return (
      <Container>
        <div className="sidebar">
          <div>
            <p style={{ fontSize: "1.25rem" }}>
              Estação Meteorológica Convencional Didática
            </p>
          </div>
          <div className="sidebar-line">
            <div>
              <p style={{ paddingTop: "12px" }}>Cefet-RJ/Maracanã</p>
              <p>Lat: 22º54'11" - Long: 43º13'28.9" - Elev: 33 m</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Button color="link" href="#" style={{ padding: "6px 0px" }}>
                Quem Somos
              </Button>
              <Button color="link" href="#" style={{ padding: "6px 0px" }}>
                Fale conosco
              </Button>
              <Button color="link" href="#" style={{ padding: "6px 0px" }}>
                Política de Uso
              </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default StationInfo;
