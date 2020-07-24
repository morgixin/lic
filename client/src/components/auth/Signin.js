import React, { Component } from "react";
import { connect } from "react-redux";
import { Label, Form, Input, Button, Alert } from "reactstrap";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import PropTypes from "prop-types";

export class Signin extends Component {
  state = {
    modal: false,
    apelido: "",
    nome: "",
    matricula: "",
    senha: "",
    confSenha: "",
    msg: null,
    redirect: false,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  redirectHandler = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };

  renderRedirect() {
    if (this.state.redirect) return <Redirect exact to="/" />;
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      // Checando se há algum erro
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // Se autenticado, fecha o modal
    if (isAuthenticated) {
      this.redirectHandler();
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { nome, apelido, matricula, senha, confSenha } = this.state;
    const newUser = {
      nome,
      apelido,
      matricula,
      senha,
      confSenha,
    };

    // Tentativa de logar
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <h2 className="h3 mb-3 title-simple">Criar conta</h2>
        <div style={{ marginLeft: "12px" }}>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit} className="form-grid-2">
            <div className="item">
              <Label for="nome">Nome</Label>
              <Input
                type="text"
                name="nome"
                placeholder="Nome"
                onChange={this.onChange}
              />
            </div>
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
              <Label for="matricula">Matrícula</Label>
              <Input
                type="text"
                name="matricula"
                placeholder="Matrícula"
                onChange={this.onChange}
              />
            </div>
            <div
              className="item"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Label for="senha">Senha</Label>
              <Input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={this.onChange}
              />
              <Input
                type="password"
                name="confSenha"
                placeholder="Confirme sua senha"
                className="mt-1"
                onChange={this.onChange}
              />
            </div>
            <Button
              style={{ width: "fit-content", height: "fit-content" }}
              className="btn-footer"
              color="secondary"
              block
            >
              Criar conta
            </Button>
          </Form>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Signin);
