
$(function () {
    $('[data-toggle="tooltip"]').tooltip({ boundary: 'window', html: true });
    let turmaId = localStorage.getItem('idTurma');
    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['turmaAlunoFaseAll'](turmaId),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        beforeSend: () => {
            Swal.fire({
                position: 'center',
                title: "Estamos buscando as informações",
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false
            })

        },
        success: function (data) {
            // Swal.close();
            console.log(data);
            // {
            //     "Elemento": {
            //         "qtdFases": "<número de fases que tem o elemento>",
            //         "qtdFasesJogadas": "<número de fazes que o aluno jogou>",
            //         "qtdQuizes": "<total de quizes>",
            //         "qtdQuizesRespondidos": "<total de quizes respondidos>",
            //         "Fases": [{
            //             "NomeFase": "<nome>",
            //             "IdDaFase": "<id>",
            //             "TurmaFase": "<Id>",
            //             "qtdQuizes": "<número de quizes da fase>",
            //             "qtdQuizesRespondidos": "<número de quizes respondidos da fase>"
            //         }]
            //     }
            // },

            let elementosDatabase = {}

            data.forEach(dataFase => {
                for (const key in dataFase.Fase_contem) {
                    if (key === 'elementos') {
                        dataFase.Fase_contem[key].forEach(elemento => {
                            //verifica se na varivavel elementosDatabase ja existe a chave do elemento
                            if (elementosDatabase[elemento] === undefined) {
                                //cria a chave do elemento
                                elementosDatabase[elemento] = {
                                    qtdFases: 1,
                                    qtdFasesJogadas: dataFase.Fase_contem.quizes.qtd_respondidos > 0 ? 1 : 0,
                                    qtdQuizes: dataFase.Fase_contem.quizes.qtd_quizes,
                                    qtdQuizesRespondidos: dataFase.Fase_contem.quizes.qtd_respondidos,
                                    Fases: [{
                                        NomeFase: dataFase.Fase_nome,
                                        IdDaFase: dataFase.Fase_id,
                                        TurmaFase: dataFase.Turma_Fase_id,
                                        qtdQuizes: dataFase.Fase_contem.quizes.qtd_quizes,
                                        qtdQuizesRespondidos: dataFase.Fase_contem.quizes.qtd_respondidos,
                                        faseUrl: dataFase.Fase_url
                                    }]
                                }
                            } else {
                                //adiciona a fase na chave do elemento
                                elementosDatabase[elemento].Fases.push({
                                    NomeFase: dataFase.Fase_nome,
                                    IdDaFase: dataFase.Fase_id,
                                    TurmaFase: dataFase.Turma_Fase_id,
                                    qtdQuizes: dataFase.Fase_contem.quizes.qtd_quizes,
                                    qtdQuizesRespondidos: dataFase.Fase_contem.quizes.qtd_respondidos,
                                    faseUrl: dataFase.Fase_url
                                })

                                //incrimenta a quantidade de fases jogadas
                                elementosDatabase[elemento].qtdFasesJogadas += dataFase.Fase_contem.quizes.qtd_respondidos > 0 ? 1 : 0;
                                //incrementa o numero de fases que o elemento tem
                                elementosDatabase[elemento].qtdFases++;
                                //incrementa a qunatidade de quizes     
                                elementosDatabase[elemento].qtdQuizes += dataFase.Fase_contem.quizes.qtd_quizes;
                                //incrementa a qunatidade de quizes respondidos
                                elementosDatabase[elemento].qtdQuizesRespondidos += dataFase.Fase_contem.quizes.qtd_respondidos;
                            }
                        })
                    }
                }
            })

            console.log(elementosDatabase);
            // armazenar elementosDatabase no localStorage
            localStorage.setItem('elementosDatabase', JSON.stringify(elementosDatabase));


            //todas as sections com o atributo data-toggle="tooltip" nelas serão renderizadas com o tooltip
            let sections = $('[data-toggle="tooltip"]')
            //para cada section renderizada, pegar o segundo filho
            sections.each(function (index, element) {
                let h2Text = $(element).children()[1].innerHTML;
                $(element).attr('data-original-title', `${h2Text}<br> 0 de 0 fases jogadas<br>0 de 0 quizes respondidos`)
                for (const key in elementosDatabase) {
                    if (key === h2Text) {
                        //renderiza o tooltip com os dados do elemento
                        $(element).attr('data-original-title', `${key}<br>${elementosDatabase[key].qtdFasesJogadas} de ${elementosDatabase[key].qtdFases} fases jogadas<br>${elementosDatabase[key].qtdQuizesRespondidos} de ${elementosDatabase[key].qtdQuizes} quizes respondidos`);
                    }
                }

            })
        },
        error: function (e) {
            Swal.close();
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }

        },
    })


    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['resultados'](turmaId),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (data) {
            Swal.close();
            localStorage.setItem('analise', JSON.stringify(data))
        },
        error: function (e) {
            Swal.close();
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }
        },
    })

})

$('main #grid-container section').on('click', function (event) {
    $(".contentModal").html(``)
    let id = event.currentTarget.children[1].innerHTML;
    let turmaId = localStorage.getItem('idTurma');

    if (id === '* *') {
        return
    }

    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['infoElemento'](id),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        beforeSend: () => {
            Swal.fire({
                position: 'center',
                title: "Estamos enviando as informações",
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false
            })

        },
        success: function (data) {
            Swal.close();

            const formatedData = {
                sigla: data.sigla,
                objeto: data.objeto,
            }

            // armazenar no localstorage o formatedData
            localStorage.setItem('elemento', JSON.stringify(formatedData))

            //navegar para a pagina elemento.php
            window.location.href = `elemento.php?id=${id}&turmaId=${turmaId}`;

            // const qtdJogadas = JSON.parse(localStorage.getItem('qtdJogadas'));
            // data.map(fase => {
            //     fase.QtdJogadas =  qtdJogadas.filter(item => item.TurmaFase == fase.Turma_Fase_id).map(item=> item.Vezes).reduce((a,b) => a + b, 0);
            //     fase.Jogou = fase.QtdJogadas > 0;
            // })
            // console.log(data);
            // $(".contentModal").html(`
            //     <a href="${data[0].Fase_url}?aluno=${window.sessionStorage.getItem("token")}&turmaFase=${data[0].Turma_Fase_id}" target="_blank" class="btn btn-primary">Jogar</a>
            // `)



            // $(".contentModal").html(
            //     `
            //         <h3 class="text-dark mb-5">Acessar fase na turma de ${nomeTurma}</h3>	
            //         <div class="d-flex w-100 flex-wrap justify-content-center"> 
            //         ${data.map(fase => {
            //         //Criar descrição
            //         return (
            //             `
            //                     <div class="card col-12 col-lg-3 fase mt-2">
            //                     <div class="card-body d-flex justify-content-center flex-column">
            //                         <h5 class="card-title">${fase.Fase_nome}</h5>
            //                         <!--<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
            //                         <a href="${fase.Fase_url}?aluno=${window.sessionStorage.getItem("token")}&turmaFase=${fase.Turma_Fase_id}" target="_blank" class="btn btn-primary">Jogar</a>
            //                     </div>
            //                     </div>
            //                     `
            //         )

            //     })}
            //         </div>
            //     `

            // )


        },
        error: function (e) {
            Swal.close();
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }

        },
    })
})

// $('main #grid-container section').tooltip()



// $(function() {
//     $( "main #grid-container section" ).mouseover(function() {

//         // $(this).css("background-color", "rgba(255, 255, 255, 0.2)");
//     })
// });

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