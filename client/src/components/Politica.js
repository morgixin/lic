import React, { Component } from "react";

export class Politica extends Component {
  render() {
    return (
      <div>
        <h3 className="mt-5">Política de Uso</h3>
        <div className="mt-3 ml-3" style={{ width: "800px" }}>
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
            O LAPA - CEFET/RJ não pode garantir a qualidade das imagens expostas
            nesta página; elas estão sujeitas a falha como falta de sincronia,
            dados incompatíveis e /ou restrições visuais; todo o processo é
            automatizado, portanto o produto carece de controle de qualidade
            e/ou inspeção visual regular. Recomenda-se a comparação das imagens
            com as de outras fontes antes de utilizá-la para outros fins.
          </p>
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

export default Politica;
