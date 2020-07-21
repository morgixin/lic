import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <Link className="nav-link" to="/inserir">
            Inserir dados
          </Link>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <Link className="nav-link" to="/entrar">
            Entrar
          </Link>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar
          color="light"
          light
          expand="sm"
          className="mb-4 nav-reduce-margin"
          style={{
            borderBottom: "6px solid lightblue",
            position: "sticky",
          }}
        >
          <Container>
            <NavbarBrand href="/">
              {/* <Link className="nav-link" exact to="/" > */}
              Laboratório de Instrumentos Ambiental
              {/* </Link> */}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Link className="nav-link" to="/sobre">
                  Sobre Nós
                </Link>
                <Link className="nav-link" to="/politica">
                  Política de Uso
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
