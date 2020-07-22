import React, { Component } from "react";

export class Politica extends Component {
  render() {
    return (
      <div>
        <h3 className="mt-3 mb-3 title-simple">Política de Uso</h3>
        <div className="ml-3">
          <p>
            Todos os dados exibidos nesta página são de domínio público e podem
            ser veiculados e/ou armazenados em outros locais e outras mídias
            somente para fins educacionais, recreativos e/ou de pesquisa, desde
            que seja exibido junto com o mesmo a fonte "LAPA - CEFET/RJ " e,
            caso especificado, outro dado relativo ao mesmo. É vedado o uso de
            qualquer informação contida nesta página em atividades com
            propósitos comerciais, salvo o usuário que possuir a devida
            autorização. O LAPA - CEFET-RJ não dá nenhuma garantia sobre as
            informações expostas nesta página, não sendo passível de
            responsabilidade, em nenhum caso, por danos vinculados ou que
            provenham da utilização dessas informações. O LAPA - CEFET-RJ não
            pode garantir a regularidade desses dados.
          </p>
          <p>
            Para obter autorização para uso comercial ou informações adicionais,
            favor entrar em contato conosco no seguinte endereço: Av. Maracanã
            229 Rio de Janeiro, RJ - Brasil.
          </p>
          <ul>
            <li>telefone: +55 (21) 25663163</li>
            <li>e-mail: lapa.cefet.rj@gmail.com</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Politica;
