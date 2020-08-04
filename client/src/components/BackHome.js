import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

export class BackHome extends Component {
  state = {
    redirect: false,
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

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
    const { location } = this.props;

    switch (location.pathname) {
      case "/editar":
      case "/entrar":
      case "/politica":
      case "/sobre":
      case "/inserir":
      default:
        return (
          <div>
            <Button
              className="mt-3 btn-clear"
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

      case "/":
        return null;
    }
  }
}

export default withRouter(BackHome);
