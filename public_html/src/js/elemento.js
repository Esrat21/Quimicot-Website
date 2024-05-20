// variavel global parar os graficos
let chartQuantidadeDeFasesJogadas = undefined;
let chartQuantidadeDeQuizesRespondidos = undefined;
let chartMetricas = undefined;
// executar um js quando a pagina carregar
$(document).ready(function () {
  // pegar os dados do elemento no localStorage na chave "elemento"
  let elemento = JSON.parse(localStorage.getItem("elemento"));
  let analise = JSON.parse(localStorage.getItem("analise"));
  // se o elemento for null, redirecionar para a pagina de elementos
  if (elemento == null) {
    window.location.href = "homeAluno.php";
  }
  // se o elemento nao for null, colocar od dados do elemento no htlm
  else {
    // pegar o elemento com a class "container-elemento"
    let container = $(".container-elemento");
    // colocar o numero atomico no primeiro elemento filho do container
    container.children().first().text(elemento.objeto["Número atômico"]);
    // colocar o simbolo no segundo elemento filho do container
    container.children().eq(1).text(elemento.objeto["Simbolo"]);
    // colocar o nome no terceiro elemento filho do container
    container.children().eq(2).text(elemento.objeto["Nome"]);
    // colocar a massa atomica no quarto elemento filho do container
    container
      .children()
      .eq(3)
      .text(elemento.objeto["Massa atômica relativa"]["Intervalo"]["min"]);

    //pegar o filho da div com o id "collapseCaracterísticasGerais"
    let divCaracteristicasGerais = $(
      "#collapseCaracterísticasGerais"
    ).children();
    // Inserir uma tag span com o texto "Nome"  e o valor do nome do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Nome:</strong> ${elemento.objeto["Nome"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divCaracteristicasGerais.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Simbolo"  e o valor do simbolo do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Simbolo:</strong> ${elemento.objeto["Simbolo"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divCaracteristicasGerais.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Grupo" e o valor do grupo do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Grupo:</strong></span><span>Nome: ${elemento.objeto["Grupo"]["Nome"]}</span><span>Coluna: ${elemento.objeto["Grupo"]["Coluna"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divCaracteristicasGerais.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Período" e o valor do periodo do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Período:</strong> ${elemento.objeto["Período"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divCaracteristicasGerais.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com texto "Subgrupo" e o valor do subgrupo do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Subgrupo:</strong> ${elemento.objeto["Subgrupo"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divCaracteristicasGerais.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Tipo" e o valor do tipo do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Tipo:</strong> ${elemento.objeto["Tipo"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divCaracteristicasGerais.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Classificação" e o valor da classificação do elemento
    divCaracteristicasGerais.append(
      `<span><strong>Classificação:</strong> ${elemento.objeto["Classificação"]}</span>`
    );

    //pegar o filho da div com o id "collapsePropriedadesFísicas"
    let divPropriedadesFisicas = $("#collapsePropriedadesFísicas").children();
    // Inserir uma tag span com o texto "Ponto de fusão" e o valor do ponto de fusão do elemento
    divPropriedadesFisicas.append(
      `<span><strong>Ponto de fusão:</strong> ${elemento.objeto["Ponto de Fusão"]["Valor"]}${elemento.objeto["Ponto de Fusão"]["Unidade De Medida"]} </span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divPropriedadesFisicas.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Ponto de ebulição" e o valor do ponto de ebulição do elemento
    divPropriedadesFisicas.append(
      `<span><strong>Ponto de ebulição:</strong> ${elemento.objeto["Ponto de Ebulição"]["Valor"]}${elemento.objeto["Ponto de Ebulição"]["Unidade De Medida"]} </span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divPropriedadesFisicas.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Densidade" e o valor da densidade do elemento
    divPropriedadesFisicas.append(
      `<span><strong>Densidade:</strong> ${elemento.objeto["Densidade"]["Valor"]}${elemento.objeto["Densidade"]["Unidade De Medida"]} </span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divPropriedadesFisicas.append(`<div class="dropdown-divider"></div>`);
    // Inserir um tag span com o texto "Eletronegatividade" e o valor da eletronegatividade do elemento
    divPropriedadesFisicas.append(
      `<span><strong>Eletronegatividade:</strong> ${elemento.objeto["Eletronegatividade"]["Valor"]}${elemento.objeto["Eletronegatividade"]["Unidade De Medida"]}</span>`
    );

    //pegar o filho da div com o id "collapsePropriedadesQuímicas"
    let divPropriedadesQuimicas = $("#collapsePropriedadesQuímicas").children();
    // Inserir uma tag span com o texto "Numero Atômico" e o valor do numero atômico do elemento
    divPropriedadesQuimicas.append(
      `<span><strong>Número Atômico:</strong> ${elemento.objeto["Número atômico"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divPropriedadesQuimicas.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Composição do átomo" e o valor da composição do átomo do elemento
    divPropriedadesQuimicas.append(
      `<span><strong>Composição do átomo:</strong></span><span>Elétrons: ${elemento.objeto["Composição do átomo"]["Elétrons"]}</span><span>Nêutrons: ${elemento.objeto["Composição do átomo"]["Nêutrons"]}</span><span>Prótons: ${elemento.objeto["Composição do átomo"]["Prótons"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divPropriedadesQuimicas.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Massa Atômica" e o valor da massa atômica do elemento
    divPropriedadesQuimicas.append(
      `<span><strong>Massa Atômica:</strong> ${elemento.objeto["Massa atômica relativa"]["Intervalo"]["min"]} ${elemento.objeto["Massa atômica relativa"]["Unidade De Medida"]}</span>`
    );
    // Inserir uma div com a classe dropdown-divider abaixo
    divPropriedadesQuimicas.append(`<div class="dropdown-divider"></div>`);
    // Inserir uma tag span com o texto "Raio Atômico" e o valor do raio atômico do elemento
    divPropriedadesQuimicas.append(
      `<span><strong>Raio Atômico:</strong> ${elemento.objeto["Raio atômico calculado"]["Valor"]} ${elemento.objeto["Raio atômico calculado"]["Unidade De Medida"]}</span>`
    );

    // pegar do local storage a key "elementosDatabase"
    let elementosDatabase = JSON.parse(
      localStorage.getItem("elementosDatabase")
    );
    // se a key "elementosDatabase" for nula
    if (elementosDatabase == null) {
      // criar um obejeto vazio
      elementosDatabase = {};
    } else {
      // verificar se o simbolo do elemento tem uma key no objeto "elementosDatabase"
      if (elementosDatabase[elemento.objeto["Simbolo"]] != undefined) {
        // verificar se a variavel "chartQuantidadeDeFasesJogadas" for != de undefined
        if (chartQuantidadeDeFasesJogadas != undefined) {
          // destruir o grafico
          chartQuantidadeDeFasesJogadas.destroy();
          chartQuantidadeDeFasesJogadas = undefined;
        }

        // pegar o contexto do canvas com a id "estatisticaPizzaFaseTotalJogadas"
        let ctxPizzaFaseTotalJogadas = document
          .getElementById("estatisticaPizzaFaseTotalJogadas")
          .getContext("2d");
        // criar um grafico de pizza
        chartQuantidadeDeFasesJogadas = new Chart(ctxPizzaFaseTotalJogadas, {
          type: "pie",
          data: {
            labels: [
              "Quantidade de Fases Jogadas",
              "Quantidade de Fases Não Jogadas",
            ],
            datasets: [
              {
                label: "Quantidade de Fases Jogadas",
                //pegar a quantidade de fases jogadas da variavel "elementosDatabase"
                data: [
                  elementosDatabase[elemento.objeto["Simbolo"]][
                    "qtdFasesJogadas"
                  ],
                  elementosDatabase[elemento.objeto["Simbolo"]]["qtdFases"] -
                    elementosDatabase[elemento.objeto["Simbolo"]][
                      "qtdFasesJogadas"
                    ],
                ],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            aspectRatio: 1,
          },
        });

        // verificar se a variavel "chartQuantidadeDeQuizesRespondidos" for != de undefined
        if (chartQuantidadeDeQuizesRespondidos != undefined) {
          // destruir o grafico
          chartQuantidadeDeQuizesRespondidos.destroy();
          chartQuantidadeDeQuizesRespondidos = undefined;
        }

        if (elementosDatabase[elemento.objeto["Simbolo"]]["qtdQuizes"] == 0) {
          // pegar o pai da div com id "estatisticaPizzaQuizesTotalRespondidos"
          let divEstatisticaPizzaQuizesTotalRespondidos = $(
            "#estatisticaPizzaQuizesTotalRespondidos"
          ).parent();
          // inserir uma div com a classe "alert alert-warning" e o texto "Não há estatísticas de quizes para este elemento"
          divEstatisticaPizzaQuizesTotalRespondidos.append(
            `<div class="alert alert-warning">Não há estatísticas de quizes para este elemento</div>`
          );
        } else {
          // pegar o contexto do canvas com a id "estatisticaPizzaQuizesTotalRespondidos"
          let ctxPizzaQuizesTotalRespondidos = document
            .getElementById("estatisticaPizzaQuizesTotalRespondidos")
            .getContext("2d");
          // criar um grafico de pizza
          chartQuantidadeDeQuizesRespondidos = new Chart(
            ctxPizzaQuizesTotalRespondidos,
            {
              type: "pie",
              data: {
                labels: [
                  "Quantidade de Quizes Respondidos",
                  "Quantidade de Quizes Não Respondidos",
                ],
                datasets: [
                  {
                    label: "Quantidade de Quizes Respondidos",
                    //pegar a quantidade de quizes respondidos da variavel "elementosDatabase"
                    data: [
                      elementosDatabase[elemento.objeto["Simbolo"]][
                        "qtdQuizesRespondidos"
                      ],
                      elementosDatabase[elemento.objeto["Simbolo"]][
                        "qtdQuizes"
                      ] -
                        elementosDatabase[elemento.objeto["Simbolo"]][
                          "qtdQuizesRespondidos"
                        ],
                    ],
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 99, 132, 0.2)",
                    ],
                    hoverOffset: 4,
                  },
                ],
              },
              options: {
                aspectRatio: 1,
              },
            }
          );
        }

        // pegar o tbody da table com o id 'tableFasesElemento''
        let tbodyFasesElemento = $("#tableFasesElemento tbody");
        // percorrer o array de fases da variavel "elementosDatabase"
        for (
          let i = 0;
          i < elementosDatabase[elemento.objeto["Simbolo"]]["Fases"].length;
          i++
        ) {
          // pegar a fase atual
          let fase = elementosDatabase[elemento.objeto["Simbolo"]]["Fases"][i];
          // criar um tr
          let tr = $("<tr></tr>");
          // criar um th com atributo "scope" = "row" e o valor da variavel fase["IdDaFase"]
          let th = $(`<th scope="row">${fase["IdDaFase"]}</th>`);
          // adicionar o th ao tr
          tr.append(th);
          // criar um td com o valor da variavel fase["NomeFase"]
          let td = $(`<td>${fase["NomeFase"]}</td>`);
          // adicionar o td ao tr
          tr.append(td);
          // criar uma td que vai conter um botao com a class "btn btn-primary" e o texto "Jogar" e um atributo "onclick" com o valor "jogarFase(${fase["faseUrl"], fase["TurmaFase"]})"
          td = $(
            `<td><button class="btn btn-primary" onclick="jogarFase('${fase["faseUrl"]}','${fase["TurmaFase"]}')">Jogar</button></td>`
          );
          // adicionar o td ao tr
          tr.append(td);
          // adicionar o tr ao tbody
          tbodyFasesElemento.append(tr);
        }



				let ctxMetricas = document
				.getElementById("metricasDoJogo")
				.getContext("2d");

        if (chartMetricas !== undefined) {
          chartMetricas.destroy();
          chartMetricas = undefined;
        }


				let dadosAnalise = JSON.parse(
					localStorage.getItem("analise")
				);

				const nomesFases = extrairNomesFases(dadosAnalise);

				console.log(nomesFases);


				datasetsFases = [
					criarDatasetsFases(dadosAnalise, 'Erros', 'Erros', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 99, 132, 1)'),
					criarDatasetsFases(dadosAnalise, 'Tentativas', 'Tentativas', 'rgba(75, 192, 192, 0.5)', 'rgba(75, 192, 192, 1)'),
					criarDatasetsFases(dadosAnalise, 'Acertos', 'Acertos', 'rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 1)'),
				]



        // Dados para o gráfico
        var data = {
          labels: nomesFases,
          datasets: datasetsFases,
        };

        // Configurações do gráfico
        var config = {
          type: "bar",
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Desempenho nas Fases",
              },
            },
          },
        };

        // Cria o gráfico
        var chartMetricas = new Chart(ctxMetricas, config);



      } else {
        // esconder a div com id 'graficosEstatisticos'
        $("#graficosEstatisticos").hide();
        // esconder a div com id 'fases'
        $("#fases").hide();

        // remover classe d-none da div com id avisoSemDados
        $("#avisoSemDados").removeClass("d-none");

        // inserir uma div com a classe "alert alert-warning" e o texto "Não há informações de fases relacionadas com este elemento"
        $("#avisoSemDados").append(
          `<div class="alert alert-warning">Não há informações de fases relacionadas com este elemento</div>`
        );
      }
    }
  }
});

// função para jogar a fase
function jogarFase(faseUrl, turmaFase) {
  // abrir uma nova aba com a url da fase e passando como parametro pela url o aluno que ira pega de sessionStorage token e a turmaFase
  window.open(
    `${faseUrl}?aluno=${window.sessionStorage.getItem(
      "token"
    )}&turmaFase=${turmaFase}`,
    "_blank"
  );
}

// adiconar um escutador de click no botao buttonTurmaAlunoDesktop
$("#buttonTurmaAlunoDesktop").click(function () {
  // voltar para a pagina de home aluno
  window.location.href = "homeAluno.php";
});

// adiconar um escutador de click no botao btnTurmaMobile
$("#btnTurmaMobile").click(function () {
  // voltar para a pagina de home aluno
  window.location.href = "homeAluno.php";
});


// Função para extrair os nomes das fases
function extrairNomesFases(dados) {
  var nomesFases = [];

  for (var i = 0; i < dados.Fases.length; i++) {
    var fase = dados.Fases[i].Fase;
    nomesFases.push(fase.nome);
  }

  return nomesFases;
}

// Função para criar os conjuntos de dados das métricas das fases
function criarDatasetsFases(dados, propriedade, label, backgroundColor, borderColor) {
  var valoresFases = [];

  for (var i = 0; i < dados.Fases.length; i++) {
    var fase = dados.Fases[i];
    valoresFases.push(fase.Metricas[propriedade]);
  }

  return {
    label: label,
    data: valoresFases,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: 1
  };
}