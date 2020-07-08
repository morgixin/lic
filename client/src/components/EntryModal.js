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
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { DatePicker } from "antd";
import { addEntry } from "../actions/obsActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class EntryModal extends Component {
  state = {
    modal: false,
    hora_leitura: new Date(),
    pressao_atm: 0,
    temp_ar: 0,
    temp_min: 0,
    temp_max: 0,
    umid_rel: 0,
    umid_min: 0,
    rad_solar: 0,
    chuva_ac_dia: 0,
    inten_vento: 0,
    direc_vento: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    added: PropTypes.bool,
    addEntry: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, added } = this.props;

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
      hora_leitura,
      pressao_atm,
      temp_ar,
      temp_min,
      temp_max,
      umid_rel,
      umid_min,
      rad_solar,
      chuva_ac_dia,
      inten_vento,
      direc_vento,
    } = this.state;
    const newEntry = {
      hora_leitura,
      pressao_atm,
      temp_ar,
      temp_min,
      temp_max,
      umid_rel,
      umid_min,
      rad_solar,
      chuva_ac_dia,
      inten_vento,
      direc_vento,
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
          <ModalHeader toggle={this.toggle}>
            Inserir nova observação
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className="lead">Horário local da leitura</Label>
                <Input
                  name="hora_leitura"
                  type="datetime-local"
                  onChange={this.onChange}
                  required
                />
                <Label className="lead">Pressão atmosférica</Label>
                <Input
                  type="text"
                  name="pressao_atm"
                  id="pressao-atm"
                  placeholder="1012.9"
                  onChange={this.onChange}
                  required
                />
                <Label className="lead">Temperatura do ar</Label>
                <Input
                  type="text"
                  name="temp_ar"
                  id="temp-ar"
                  className="temperatura"
                  placeholder="°C ar"
                  onChange={this.onChange}
                  required
                />
                <Input
                  type="text"
                  name="temp_min"
                  id="temp-min"
                  className="temperatura"
                  placeholder="°C mínima"
                  onChange={this.onChange}
                  required
                />
                <Input
                  type="text"
                  name="temp_max"
                  id="temp-max"
                  className="temperatura"
                  placeholder="°C máxima"
                  onChange={this.onChange}
                  required
                />
                <Label className="lead">Umidade relativa do ar</Label>
                <Input
                  type="text"
                  name="umid_rel"
                  id="umid-rel"
                  placeholder="% relativa"
                  onChange={this.onChange}
                  required
                />
                <Input
                  type="text"
                  name="umid_min"
                  id="umid-min"
                  placeholder="% mínima"
                  onChange={this.onChange}
                  required
                />
                <Label className="lead">Radiação solar global</Label>
                <Input
                  type="text"
                  name="rad_solar"
                  id="rad-global"
                  placeholder="399"
                  onChange={this.onChange}
                  required
                />
                <Label className="lead">Chuva acumulada 24h</Label>
                <Input
                  type="text"
                  name="chuva_ac_dia"
                  id="ch-ac-dia"
                  placeholder="10"
                  onChange={this.onChange}
                  required
                />
                <Label className="lead">Vento</Label>
                <Input
                  type="text"
                  name="inten_vento"
                  id="vento-inten"
                  placeholder="intensidade"
                  onChange={this.onChange}
                  required
                />
                <Input
                  type="select"
                  name="direc_vento"
                  id="vento-dir"
                  placeholder="direção"
                  onChange={this.onChange}
                  required
                >
                  <option value="E">E: leste</option>
                  <option value="N">N: norte</option>
                  <option value="O">O: oeste</option>
                  <option value="S">S: sul</option>
                  <option value="NE">NE: nordeste</option>
                  <option value="NO">NO: noroeste</option>
                  <option value="SE">SE: sudeste</option>
                  <option value="SO">SO: sudoeste</option>
                  <option value="ENE">ENE: leste-nordeste</option>
                  <option value="ESE">ESE: leste-sudeste</option>
                  <option value="SSE">SSE: sul-sudeste</option>
                  <option value="NNE">NNE: norte-nordeste</option>
                  <option value="NNO">NNO: norte-noroeste</option>
                  <option value="SSO">SSO: sul-sudoeste</option>
                  <option value="OSO">OSO: oeste-sudoeste</option>
                  <option value="ONO">ONO: oeste-nordeste</option>
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
  added: state.entry.added,
});

export default connect(mapStateToProps, { addEntry, clearErrors })(EntryModal);
