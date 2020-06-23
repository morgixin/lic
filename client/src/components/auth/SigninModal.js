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
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import PropTypes from "prop-types";

class SigninModal extends Component {
  state = {
    modal: false,
    nome: "",
    apelido: "",
    matricula: "",
    senha: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // Se autenticado, fecha o modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { nome, apelido, matricula, senha } = this.state;
    const newUser = {
      nome,
      apelido,
      matricula,
      senha,
    };

    // Tentativa de logar
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Cadastrar
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Criar conta</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="nome">Nome</Label>
                <Input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Juliana Azevedo"
                  onChange={this.onChange}
                />

                <Label for="apelido">Apelido</Label>
                <Input
                  type="text"
                  name="apelido"
                  id="apelido"
                  placeholder="jujuba_21"
                  onChange={this.onChange}
                />

                <Label for="matricula">Matricula</Label>
                <Input
                  type="text"
                  name="matricula"
                  id="matricula"
                  placeholder="1234567AAABBB"
                  onChange={this.onChange}
                />

                <Label for="nome">Senha</Label>
                <Input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="flyingcupcakeS201"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Cadastrar
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(SigninModal);
