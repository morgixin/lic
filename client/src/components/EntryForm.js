import React, { Component } from "react";
import {
  Button,
  Form,
  // FormFeedback,
  Label,
  Input,
  Alert,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import { addEntry } from "../actions/obsActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";
import { useHistory, Redirect } from "react-router-dom";

class EntryForm extends Component {
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
    redirect: false,
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

    // go back to Home Page if added
    if (added) {
      // window.location.hash = "/";
      this.redirectHandler();
    }
  }

  redirectHandler = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };

  renderRedirect() {
    if (this.state.redirect) return <Redirect exact to="/" />;
  }

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
      <Container>
        <h2 className="h3 title-simple mb-3">Inserir nova observação</h2>
        <div style={{ marginLeft: "12px" }}>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit} className="form-grid-4">
            <div className="item">
              <Label className="lead">Horário local da leitura</Label>
              <Input
                name="hora_leitura"
                id="date-input"
                type="text"
                placeholder="data"
                onFocus={() =>
                  (document.getElementById("date-input").type =
                    "datetime-local")
                }
                onBlur={() =>
                  (document.getElementById("date-input").type = "text")
                }
                onChange={this.onChange}
                required
              />
            </div>
            <div className="item">
              <Label className="lead">Pressão atmosférica</Label>
              <Input
                type="text"
                name="pressao_atm"
                id="pressao-atm"
                placeholder="1012.9"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="item">
              <Label className="lead">Temperatura do ar</Label>
              <div className="input-group-flex">
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
                  placeholder="°C mín"
                  onChange={this.onChange}
                  required
                />
                <Input
                  type="text"
                  name="temp_max"
                  id="temp-max"
                  className="temperatura"
                  placeholder="°C máx"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="item">
              <Label className="lead">Umidade relativa do ar</Label>
              <div className="input-group-flex">
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
                  placeholder="% mín"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="item">
              <Label className="lead">Radiação solar global</Label>
              <Input
                type="text"
                name="rad_solar"
                id="rad-global"
                placeholder="399"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="item">
              <Label className="lead">Chuva acumulada 24h</Label>
              <Input
                type="text"
                name="chuva_ac_dia"
                id="ch-ac-dia"
                placeholder="10"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="item">
              <Label className="lead">Vento</Label>
              <div className="input-group-flex">
                <Input
                  type="text"
                  name="inten_vento"
                  id="vento-inten"
                  placeholder="força"
                  onChange={this.onChange}
                  required
                />
                <Input
                  type="select"
                  name="direc_vento"
                  id="vento-dir"
                  onChange={this.onChange}
                  required
                >
                  <option value="direção" defaultValue hidden>
                    direção
                  </option>
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
              </div>
            </div>
            <Button
              style={{
                width: "fit-content",
                height: "fit-content",
              }}
              className="btn-footer"
              block
            >
              Gravar dados
            </Button>
          </Form>
        </div>
        {this.renderRedirect()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  entry: state.entry,
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
  added: state.entry.added,
});

export default connect(mapStateToProps, { addEntry, clearErrors })(EntryForm);
