import React, { Component } from "react";

export class Sobre extends Component {
  render() {
    return (
      <div>
        <h3>Quem Somos</h3>
        <div className="ml-3" style={{ width: "800px" }}>
          <p>
            O LAPA, Laboratorio de Análises e Previsões Atmosféricas, iniciou
            suas atividades em 2007, a partir de um grupo formado por três
            professores da Laboratório de Análises e Previsões Ambientais do
            Centro Federal de Educação Tecnologica Celso Suckow da Fonseca
            (CEFET/RJ). Após inumeras pesquisas na area de Ciências Exatas e da
            Terra, os Professores Almir Venancio Ferreira, Felipe das Neves
            Roque da Silva e Leanderson Marcos da Silva Paiva, implementaram uma
            metodologia de trabalho, principalmente, no que diz respeito as
            mudanças de tempo e clima. As áreas de atuação da Meteorologia
            abrangem: Agricultura, Pesca, Energia Elétrica, Gestão de Recuros
            Hidricos, Modelagem Climática, Previsão do Tempo, Relatórios
            Ambientais e muitas outras. O objetivo deste grupo de professores,
            técnicos e alunos é de atuar em projetos de pesquisa nas áreas de
            Ciências Atmosféricas e da Terra, Meio-Ambiente, engenharias, dentre
            outras, otimizando os recursos com total integração de planejamento
            e sempre servindo à sociedade brasileira. Estamos abertos para a
            procura de soluções para problemas rotineiros e específicos em
            diversas áreas. Atualmente, o Laboratorio de Análises e Previsões
            Atmosféricas, o LAPA, conta com 4 profissionais e mais outros
            colaboradores, para fornecer e contribuir com conhecimento para as
            futuras gerações.
          </p>
          <ul>
            <li>Professor Almir Venancio Ferreira, Doutor em Meteorologia.</li>
            <li>
              Professor Felipe das Neves Roque da Silva, Doutor em Meteorologia.
            </li>
            <li>
              Professor Leanderson Marcos da Silva Paiva, Doutor em
              Meteorologia.
            </li>
            <li>Técnico em Meteorologia Candido Talim Bugarin.</li>
          </ul>
          <p>
            Para obter autorização para uso comercial ou informações adicionais,
            favor entrar em contato conosco no seguinte endereço: Av. Maracanã
            229 Rio de Janeiro, RJ - Brasil. tel:+55(21)25663163. email:
            lapa.cefet.rj@gmail.com
          </p>
        </div>
      </div>
    );
  }
}

export default Sobre;
