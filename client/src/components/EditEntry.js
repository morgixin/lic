import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateEntry } from "../actions/obsActions";
import { getEntries } from "../actions/obsActions";
import { Container, Table, Button } from "reactstrap";

export class EditEntry extends Component {
  static propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getEntries();
  }

  enableEdit = () => {
    const { tableContent } = document.getElementsByClassName("table-content");
    console.log(tableContent);
    tableContent.map((e) => (e.isContentEditable = true));
    document.getElementById("edit-table-content").style.display = "none";
    document.getElementById("save-table-changes").style.display = "block";
  };

  rows = () => {
    const { entries } = this.props.entry;

    const listEntries = entries
      .sort((a, b) => {
        return a.hora_leitura < b.hora_leitura
          ? -1
          : a.hora_leitura > b.hora_leitura
          ? 1
          : 0;
      })
      .map((entry) => {
        return (
          <tr key={entry._id}>
            <td>
              <div className="table-content">
                {new Intl.DateTimeFormat("pt-BR", {
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(entry.hora_leitura))}
              </div>
            </td>
            <td>
              <div className="table-content">{entry.temp_ar}</div>
            </td>
            <td>
              <div className="table-content">{entry.temp_max}</div>
            </td>
            <td>
              <div className="table-content">{entry.temp_min}</div>
            </td>
            <td>
              <div className="table-content">{entry.umid_rel}</div>
            </td>
            <td>
              <div className="table-content">{entry.umid_min}</div>
            </td>
            <td>
              <div className="table-content">{entry.chuva_ac_dia}</div>{" "}
            </td>
            <td>
              <div className="table-content">{entry.inten_vento}</div>
            </td>
            <td>
              <div className="table-content">{entry.direc_vento}</div>
            </td>
            <td>
              <div className="table-content">{entry.pressao_atm}</div>
            </td>
            <td>
              <div className="table-content">{entry.rad_solar}</div>
            </td>
          </tr>
        );
      });

    return listEntries.sort(() => -1);
  };

  render() {
    return (
      <Container>
        <Button
          className="mt-3 mb-3"
          id="edit-table-content"
          onClick={this.enableEdit}
          disabled
        >
          Editar
        </Button>
        <Table className="table-limit-scroll" striped>
          <thead>
            <tr className="title-simple">
              <th>Data</th>
              <th>Temp Ar</th>
              <th>Máx</th>
              <th>Min</th>
              <th>Umidade Rel</th>
              <th>Umidade Mín</th>
              <th>Chuva Ac. 24h</th>
              <th>Vento Intensidade</th>
              <th>Direção</th>
              <th>Pressão</th>
              <th>Radiação Solar</th>
            </tr>
          </thead>
          <tbody>{this.rows()}</tbody>
        </Table>
        <Button
          id="save-table-changes"
          style={{ display: "none" }}
          onClick={this.saveEdit}
        >
          Salvar alterações
        </Button>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { updateEntry, getEntries })(EditEntry);
