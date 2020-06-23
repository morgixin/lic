import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

    return <Fragment>{isAuthenticated ? showName : "Bem vindo"}</Fragment>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(LoadUser);
