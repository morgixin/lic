import React, { Component } from "react";
import {
  Button,
  Form,
  div,
  Label,
  Input,
  //   FormFeedback,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Login extends Component {
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
    if (isAuthenticated) {
      window.location.href = "/";
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "800px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 className="h3 mb-3">Entrar</h2>
          <div style={{ marginLeft: "12px" }}>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit} className="form-grid-2">
              <div className="item">
                <Label for="apelido">Apelido</Label>
                <Input
                  type="text"
                  name="apelido"
                  placeholder="Apelido"
                  onChange={this.onChange}
                />
              </div>
              <div className="item">
                <Label for="senha">Senha</Label>
                <Input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  onChange={this.onChange}
                />
              </div>
              <Button
                style={{ width: "fit-content", height: "fit-content" }}
                className="btn-footer"
                color="secondary"
                block
              >
                Entrar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
