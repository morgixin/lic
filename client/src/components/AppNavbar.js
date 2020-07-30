import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
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
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            {user ? `Bem vindo ${user.nome}` : ""}
          </span>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/sobre">
            Sobre Nós
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/politica">
            Política de Uso
          </Link>
        </NavItem>
        <NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle className="nav-link" caret tag="a">
              Atualizar
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link className="nav-link" to="/inserir">
                  Inserir dados
                </Link>
              </DropdownItem>
              <DropdownItem disabled>
                <Link className="nav-link" to="/editar">
                  Editar dados
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <Link className="nav-link" to="/sobre">
            Sobre Nós
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/politica">
            Política de Uso
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/entrar">
            Entrar
          </Link>
        </NavItem>
      </Fragment>
    );

    return (
      <Navbar
        color="light"
        light
        expand="sm"
        className="nav-reduce-margin"
        style={{
          borderBottom: "6px solid lightblue",
          position: "sticky",
        }}
      >
        <Container>
          <NavbarBrand href="/">
            Laboratório de Instrumentos Ambientais
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" style={{ maxWidth: "800px" }} navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
