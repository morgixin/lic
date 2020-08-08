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
import { updateEntry, getEntry, deleteEntry } from "../actions/obsActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class EditEntry extends Component {
  state = {
    msg: null,
    redirect: false,
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
    tempo_presente: "",
    num: 0,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    entry: PropTypes.object.isRequired,
    updated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    getEntry: PropTypes.func.isRequired,
    updateEntry: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  // Pega a entrada ao carregar a página
  componentDidMount() {
    this.props.getEntry(this.props.match.params.id);
  }

  // setStateToProps = (entry) => {
  //   this.setState({
  //     hora_leitura: entry.hora_leitura,
  //     pressao_atm: entry.pressao_atm,
  //     temp_ar: entry.temp_ar,
  //     temp_min: entry.temp_min,
  //     temp_max: entry.temp_max,
  //     umid_rel: entry.umid_rel,
  //     umid_min: entry.umid_min,
  //     rad_solar: entry.rad_solar,
  //     chuva_ac_dia: entry.chuva_ac_dia,
  //     inten_vento: entry.inten_vento,
  //     direc_vento: entry.direc_vento,
  //     tempo_presente: entry.tempo_presente,
  //   });
  // };

  componentDidUpdate(prevProps) {
    const { error, updated } = this.props;

    if (error !== prevProps.error) {
      // Checa se houve algum erro no alterar
      if (error.id === "UPDATE_ENTRY_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // retorna à Home Page se houver sucesso no alterar
    if (updated) {
      this.redirectHandler();
    }
  }

  redirectHandler = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };

  renderRedirect() {
    if (this.state.redirect) return <Redirect exact to={{ pathname: "/" }} />;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  form = () => {
    const { entries } = this.props.entry;

    if (this.state.num === 0 && entries._id === this.props.match.params.id) {
      console.log(entries);
      this.setState({
        hora_leitura: entries.hora_leitura,
        pressao_atm: entries.pressao_atm,
        temp_ar: entries.temp_ar,
        temp_min: entries.temp_min,
        temp_max: entries.temp_max,
        umid_rel: entries.umid_rel,
        umid_min: entries.umid_min,
        rad_solar: entries.rad_solar,
        chuva_ac_dia: entries.chuva_ac_dia,
        inten_vento: entries.inten_vento,
        direc_vento: entries.direc_vento,
        tempo_presente: entries.tempo_presente,
      });
      this.state.num = 1;
    }

    return (
      <Form onSubmit={this.onSubmit.bind(this)} className="form-grid-4">
        <div className="item">
          <Label className="lead">Horário local da leitura</Label>
          <Input
            name="hora_leitura"
            id="date-input"
            type="text"
            value={this.state.hora_leitura}
            onFocus={() =>
              (document.getElementById("date-input").type = "datetime-local")
            }
            onBlur={() => (document.getElementById("date-input").type = "text")}
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
            value={this.state.pressao_atm}
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
              value={this.state.temp_ar}
              onChange={this.onChange}
              required
            />
            <Input
              type="text"
              name="temp_min"
              id="temp-min"
              className="temperatura"
              value={this.state.temp_min}
              onChange={this.onChange}
              required
            />
            <Input
              type="text"
              name="temp_max"
              id="temp-max"
              className="temperatura"
              value={this.state.temp_max}
              onChange={this.onChange}
              required
            />
          </div>
        </div>
        <div className="item">
          <Label className="lead">Tempo Presente</Label>
          <Input
            type="text"
            name="tempo_presente"
            id="tempo_presente"
            value={this.state.tempo_presente}
            onChange={this.onChange}
            required
          />
        </div>
        <div className="item">
          <Label className="lead">Umidade relativa do ar</Label>
          <div className="input-group-flex">
            <Input
              type="text"
              name="umid_rel"
              id="umid-rel"
              value={this.state.umid_rel}
              onChange={this.onChange}
              required
            />
            <Input
              type="text"
              name="umid_min"
              id="umid-min"
              value={this.state.umid_min}
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
            value={this.state.rad_solar}
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
            value={this.state.chuva_ac_dia}
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
              value={this.state.inten_vento}
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
              <option value="direção" value hidden>
                {this.state.direc_vento}
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
          className="mt-3 btn-footer"
          block
        >
          Salvar mudanças
        </Button>
      </Form>
    );
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { isAuthenticated, user } = this.props.auth;
    const { nome } = user;
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
      tempo_presente,
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
      tempo_presente,
      nome,
    };

    console.log(newEntry);
    // Adiciona a entrada pelo addEntry
    if (isAuthenticated) this.props.updateEntry(newEntry);
  };

  render() {
    return (
      <Container>
        <h2 className="h3 title-simple mb-3">Inserir nova observação</h2>
        <div style={{ marginLeft: "12px" }}>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          {this.form()}
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
  updated: state.entry.updated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateEntry,
  getEntry,
  clearErrors,
})(EditEntry);
