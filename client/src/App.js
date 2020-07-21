import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import EntryList from "./components/EntryList";
import { Container } from "reactstrap";
import LoadUser from "./components/LoadUser";

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
                <Route exact path="/inserir" component={EntryForm} />
                <Route exact path="/entrar">
                  <Container
                    className="mt-2"
                    style={{ display: "flex", width: "820px" }}
                  >
                    <Login />
                    <Signin />
                  </Container>
                </Route>
                {/* <Route exact path="/adms" component={AdmList} /> */}
                <Route exact path="/">
                  <LoadUser />
                  <TodayEntry />
                  <EntryList />
                </Route>
              </div>
              <StationInfo />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
