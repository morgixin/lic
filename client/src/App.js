import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import EntryList from "./components/EntryList";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
import LoadUser from "./components/LoadUser";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container style={{ position: "relative", marginLeft: "9rem" }}>
            <LoadUser />
            <EntryList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
