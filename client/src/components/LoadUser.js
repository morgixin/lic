import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "reactstrap";

class LoadUser extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const showName = (
      <span className="navbar-text mr-3">
        {user ? `Bem vindo ${user.nome}` : ""}
      </span>
    );

    return <Container>{isAuthenticated ? showName : "Bem vindo"}</Container>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(LoadUser);
