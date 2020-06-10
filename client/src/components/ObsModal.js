import React, { Component } from "react";
import {
  Button,
  Jumbotron,
  Form,
  FormGroup,
  //   FormFeedback,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addEntry } from "../actions/obsActions";
// import { v1 as uuid } from "uuid";

export class ObsModal extends Component {
  state = {
    horaLeitura: "",
    pressaoAtm: "",
    tempAr: "",
    tempMin: "",
    tempMax: "",
    umidRel: "",
    umidMin: "",
    radGlobal: "",
    chDia: "",
    chSemana: "",
    chMes: "",
    ventoInten: "",
    ventoDirecao: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      hora_leitura: this.state.horaLeitura,
      pressaoAtm: this.state.pressaoAtm,
      tempAr: this.state.tempAr,
      tempMin: this.state.tempMin,
      tempMax: this.state.tempMax,
      umidRel: this.state.umidRel,
      umidMin: this.state.umidMin,
      radGlobal: this.state.radGlobal,
      chDia: this.state.chDia,
      chSemana: this.state.chSemana,
      chMes: this.state.chMes,
      ventoInten: this.state.ventoInten,
      ventoDirecao: this.state.ventoDirecao,
    };

    // Adiciona a entrada pelo addEntry()
    this.props.addEntry(newEntry);
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label className="lead">Horário local da leitura</Label>
              <Input
                type="datetime"
                name="horaLeitura"
                id="hora-leitura"
                placeholder="15jan2019/14:30h"
              />

              <Label className="lead">Pressão atmosférica</Label>
              <Input
                type="text"
                name="pressaoAtm"
                id="pressao-atm"
                placeholder="1012.9"
              />
              <Label className="lead">Temperaturas (ar/min/max)</Label>
              <Input
                type="text"
                name="tempAr"
                id="temp-ar"
                placeholder="°C ar"
              />
              <Input
                type="text"
                name="tempMin"
                id="temp-min"
                placeholder="mínima"
              />
              <Input
                type="text"
                name="tempMax"
                id="temp-max"
                placeholder="máxima"
              />
              <Label className="lead">Umidade (relativa/mín)</Label>
              <Input
                type="number"
                name="umidRel"
                id="umid-rel"
                placeholder="relativa"
              />
              <Input
                type="number"
                name="umidMin"
                id="umid-min"
                placeholder="mínima"
              />
              <Label className="lead">Radiação solar global</Label>
              <Input
                type="number"
                name="radGlobal"
                id="rad-global"
                placeholder="399"
              />
              <Label className="lead">Chuva acumulada (dia/semana/mês)</Label>
              <Input
                type="text"
                name="chDia"
                id="ch-ac-dia"
                placeholder="dia"
              />
              <Input
                type="text"
                name="chSemana"
                id="ch-ac-semana"
                placeholder="semana"
              />
              <Input
                type="text"
                name="chMes"
                id="ch-ac-mes"
                placeholder="mes"
              />
              <Label className="lead">Vento (intensidade/direção)</Label>
              <Input
                type="text"
                name="ventoInten"
                id="vento-inten"
                placeholder="intensidade"
              />
              <Input
                type="select"
                name="ventoDirecao"
                id="vento-dir"
                placeholder="direção"
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
              <Button color="secondary">gravar dados</Button>
            </FormGroup>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { addEntry })(ObsModal);
