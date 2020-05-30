import React from "react";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container>
      <div className="App">
        <AppNavbar />
      </div>
    </Container>
  );
}

export default App;
