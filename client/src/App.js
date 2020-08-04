import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import EntryList from "./components/EntryList";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodayEntry from "./components/TodayEntry";
import StationInfo from "./components/StationInfo.js";
import EntryForm from "./components/EntryForm";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import Sobre from "./components/Sobre";
import Politica from "./components/Politica";
import EditEntry from "./components/EditEntry";
import BackHome from "./components/BackHome";
import Record from "./components/Record";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container className="main-content">
              <div>
                <Route exact path="/">
                  <Container style={{ display: "flex" }}>
                    <div>
                      <TodayEntry />
                      <EntryList />
                    </div>
                    <StationInfo />
                  </Container>
                </Route>
                <Route strict sensitive path="/entrar">
                  <Container
                    className="mt-3"
                    style={{ display: "flex", width: "880px" }}
                  >
                    <Login />
                    <Signin />
                  </Container>
                </Route>
                <Route path="/inserir" component={EntryForm} />
                <Route path="/editar" component={EditEntry} />
                <Route path="/sobre" component={Sobre} />
                <Route path="/politica" component={Politica} />
                <Route path="/relatorio" component={Record} />
                <BackHome />
              </div>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
