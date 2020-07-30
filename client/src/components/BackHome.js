import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

export class BackHome extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {}

  redirectHandler = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };

  renderRedirect() {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect exact to="/" />;
    }
  }

  render() {
    if (window.location.pathname !== "/")
      return (
        <div>
          <Button
            className="mt-3"
            style={{
              width: "fit-content",
              height: "fit-content",
            }}
            onClick={this.redirectHandler}
          >
            {"<"} Voltar à página inicial
          </Button>
          {this.renderRedirect()}
        </div>
      );
    else return null;
  }
}

export default BackHome;
