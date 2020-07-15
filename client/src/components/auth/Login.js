import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  //   FormFeedback,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Redirect } from "react-router-dom";

class LoginModal extends Component {
  state = {
    modal: false,
    apelido: "",
    senha: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      // Checando se há algum erro
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // Se autenticado, fecha o modal
    if (this.state.modal) {
      if (isAuthenticated) {
        <Redirect to="/"></Redirect>;
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { apelido, senha } = this.state;
    const user = {
      apelido,
      senha,
    };

    // Tentativa de logar
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <h2 className="h3">Entrar</h2>
        <div>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="apelido">Apelido</Label>
              <Input
                type="text"
                name="apelido"
                id="apelido"
                placeholder="Apelido"
                onChange={this.onChange}
              />

              <Label for="senha">Senha</Label>
              <Input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                onChange={this.onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Entrar
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
