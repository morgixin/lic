import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ObsModal from "./components/ObsModal";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <div className="app-main-content">
            <ObsModal />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
