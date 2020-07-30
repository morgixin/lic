import React, { Component } from "react";

export class Sobre extends Component {
  render() {
    return (
      <div>
        <h3 className="mt-3 mb-3 title-simple">Quem Somos</h3>
        <div className="ml-3">
          <p>Equipe</p>
          <ul>
            <li>Professor Almir Venancio Ferreira, Doutor em Meteorologia.</li>
            <li>Estagiária de Informática Ana Beatriz Ferreira</li>
            <li>Estagiário de Meteorologia Bruno Farroco</li>
          </ul>
          <p>
            Para obter autorização para uso comercial ou informações adicionais,
            favor entrar em contato conosco por e-mail: lapa.cefet.rj@gmail.com
          </p>
        </div>
      </div>
    );
  }
}

export default Sobre;
