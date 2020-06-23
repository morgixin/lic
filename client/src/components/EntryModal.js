import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  // FormFeedback,
  Label,
  Input,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { addEntry } from "../actions/obsActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

export class EntryModal extends Component {
  state = {
    modal: false,
    added: false,
    horaLeitura: Date,
    pressaoAtm: 0,
    tempAr: 0,
    tempMin: 0,
    tempMax: 0,
    umidRel: 0,
    umidMin: 0,
    radGlobal: 0,
    chDia: 0,
    ventoInten: 0,
    ventoDirecao: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const added = this.state.added;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "ADD_ENTRY_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (added) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    // console.log(typeof this.props.clearErrors);
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

    const {
      horaLeitura,
      pressaoAtm,
      tempAr,
      tempMin,
      tempMax,
      umidRel,
      umidMin,
      radGlobal,
      chDia,
      ventoInten,
      ventoDirecao,
    } = this.state;
    const newEntry = {
      horaLeitura,
      pressaoAtm,
      tempAr,
      tempMin,
      tempMax,
      umidRel,
      umidMin,
      radGlobal,
      chDia,
      ventoInten,
      ventoDirecao,
    };

    // Adiciona a entrada pelo addEntry
    this.props.addEntry(newEntry);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Inserir dados
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Inserir observação</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className="lead">Horário local da leitura</Label>
                <Input
                  type="datetime"
                  name="horaLeitura"
                  id="hora-leitura"
                  placeholder="15jan2019/14:30h"
                  onChange={this.onChange}
                />

                <Label className="lead">Pressão atmosférica</Label>
                <Input
                  type="text"
                  name="pressaoAtm"
                  id="pressao-atm"
                  placeholder="1012.9"
                  onChange={this.onChange}
                />
                <Label className="lead">Temperaturas (ar/min/max)</Label>
                <Input
                  type="text"
                  name="tempAr"
                  id="temp-ar"
                  className="temperatura"
                  placeholder="°C ar"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="tempMin"
                  id="temp-min"
                  className="temperatura"
                  placeholder="mínima"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="tempMax"
                  id="temp-max"
                  className="temperatura"
                  placeholder="máxima"
                  onChange={this.onChange}
                />
                <Label className="lead">Umidade (relativa/mín)</Label>
                <Input
                  type="number"
                  name="umidRel"
                  id="umid-rel"
                  placeholder="relativa"
                  onChange={this.onChange}
                />
                <Input
                  type="number"
                  name="umidMin"
                  id="umid-min"
                  placeholder="mínima"
                  onChange={this.onChange}
                />
                <Label className="lead">Radiação solar global</Label>
                <Input
                  type="number"
                  name="radGlobal"
                  id="rad-global"
                  placeholder="399"
                  onChange={this.onChange}
                />
                <Label className="lead">Chuva acumulada dia</Label>
                <Input
                  type="text"
                  name="chDia"
                  id="ch-ac-dia"
                  placeholder="10"
                />
                <Label className="lead">Vento (intensidade/direção)</Label>
                <Input
                  type="text"
                  name="ventoInten"
                  id="vento-inten"
                  placeholder="intensidade"
                  onChange={this.onChange}
                />
                <Input
                  type="select"
                  name="ventoDirecao"
                  id="vento-dir"
                  placeholder="direção"
                  onChange={this.onChange}
                >
                  <option value="opt-E">E: este/leste</option>
                  <option value="opt-N">N: norte</option>
                  <option value="opt-O">O: oeste</option>
                  <option value="opt-S">S: sul</option>
                  <option value="opt-NE">NE: nordeste</option>
                  <option value="opt-NO">NO: noroeste</option>
                  <option value="opt-SE">SE: sudeste</option>
                  <option value="opt-SO">SO: sudoeste</option>
                  <option value="opt-ENE">ENE: lés-nordeste</option>
                  <option value="opt-ESE">ESE: lés-sudeste</option>
                  <option value="opt-SSE">SSE: sul-sudeste</option>
                  <option value="opt-NNE">NNE: nor-nordeste</option>
                  <option value="opt-NNO">NNO: nor-noroeste</option>
                  <option value="opt-SSO">SSO: sul-sudoeste</option>
                  <option value="opt-OSO">OSO: oés-sudoeste</option>
                  <option value="opt-ONO">ONO: oés-noroeste</option>
                </Input>
                <Button style={{ marginTop: "2rem" }} color="secondary" block>
                  Gravar dados
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
  entry: state.entry,
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addEntry, clearErrors })(EntryModal);
