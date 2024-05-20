let slimVincularFase;
let slimDesvincularFase;
let slimEstatisticaTurmaFase;
let slimEstatisticaQuestão;
let slimEstatisticaFaseAluno;
let chartRadarTurma;
let chartPizzaTurma;
let chartBarQuestaoMedias;
let chartBarrasMediaQuestaoAluno;
let chartBarrasMediaQuestaoAlunoErro
let chartBarrasMediaQuestaoAlunoTentativas
let chartBarQuestaoMetricas;
let chartPizzaTurmaFase;
let infoAlunoAnalise;
let infoTurmaAnalise;

try {


    slimVincularFase = new SlimSelect({
        select: '#SelecetVincularFase',
        required: true,
        data: [],
        onChange: (info) => {
            const { value } = info
            let valueJSON = JSON.parse(value)
            let button = document.getElementsByClassName("vincularFase")[0];
            button.id = valueJSON.id
        },
    })
    slimDesvincularFase = new SlimSelect({
        select: '#SelecetDesvincularFase',
        required: true,
        data: [],
        onChange: (info) => {
            const { value } = info
            let valueJSON = JSON.parse(value)
            let button = document.getElementsByClassName("DesvincularFase")[0];
            button.id = valueJSON.Fase.id
        },
    })



    slimEstatisticaTurmaFase = new SlimSelect({
        select: '#EstatisticaFase',
        required: false,
        data: [],
        onChange: (info) => {
            //Arrumando os botões
            $("#mediaEstatisticaPizzaTurma").removeClass("btn-secondary").addClass("btn-primary")
            $("#metricasEstatisticaPizzaTurma").removeClass("btn-primary").addClass("btn-secondary")

            const { value } = info
            let { ID, Fase } = JSON.parse(value)
            let idFase = Fase.id
            const idTurma = $("#customModal").attr("data-id");

            $("#divEstatisticaQuestao").removeClass("invisible")


            if (slimEstatisticaQuestão !== undefined) {
                slimEstatisticaQuestão.destroy()
                slimEstatisticaQuestão = undefined;
            }

            //Pegar a lista das questão
            $.ajax({
                method: "GET",
                url: Rotasclass['gets']['quizesFaseProfessor'](idTurma, idFase),
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: (data) => {


                    let quizes = [
                        { placeholder: true, text: '-------Selecione um quiz------' },
                    ]


                    data.forEach(quiz => {
                        quizes.push({ value: JSON.stringify(quiz), text: `ID - ${quiz.quiz_id}: ` + quiz.pergunta })
                    });




                    slimEstatisticaQuestão = new SlimSelect({
                        select: '#EstatisticaQuestao',
                        required: false,
                        data: quizes,
                        onChange: (info) => {
                            //arrumando os botões
                            $("#metricasEstatisticaPizzaQuestao").removeClass("btn-primary").addClass("btn-secondary")
                            $("#mediaEstatisticaPizzaQuestao").removeClass("btn-secondary").addClass("btn-primary")

                            const { value } = info
                            let { quiz_id } = JSON.parse(value)

                            $.ajax({
                                method: "GET",
                                url: Rotasclass['gets']['analiseQuiz'](quiz_id),
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                },
                                beforeSend: function (data) {

                                    Swal.fire({
                                        position: 'center',
                                        title: "Estamos enviando as informações",
                                        onBeforeOpen: () => {
                                            Swal.showLoading()
                                        },
                                        allowOutsideClick: false
                                    })


                                },
                                success: (data) => {
                                    Swal.close();
                                    getEstatisticaQuestao(data)
                                    console.log(data);
                                },
                                error: function (e) {
                                    Swal.close();
                                    if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                                        window.sessionStorage.setItem("nav", "Acessar")
                                        window.sessionStorage.removeItem("token")
                                        window.location.href = 'login.php';
                                    }
                                    console.log(e);
                                },
                            })
                        },
                    })



                },
                error: function (e) {
                    if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                        window.sessionStorage.setItem("nav", "Acessar")
                        window.sessionStorage.removeItem("token")
                        window.location.href = 'login.php';
                    }
                },
            })
            getEstatisticaFase(ID)
        },
    })







} catch (error) {
    if (error == "Error: Could not find select element") {
        console.error(error)
    }

}

$('#table-users').on("click", (e) => {
    const nomeAluno = e.target.parentNode.firstChild.innerText;
    const emailAluno = e.target.parentNode.children[1].innerText;
    const idAluno = e.target.parentNode.id;
    const idTurma = document.getElementById("customModal").getAttribute("data-id")
    $("#customModalAluno").attr("data-id", idAluno);
    $("#customModalAluno").removeClass("invisible").addClass("visible fadeIN");
    $("#divEstatisticaBarrasAluno").addClass("d-none")

    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['fasesTurma'](idTurma),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        beforeSend: function (data) {

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
            let dataFase = [
                { placeholder: true, text: 'Escolha uma fase' },
            ]
            data.map(fase => {

                dataFase.push({
                    value: JSON.stringify(fase),
                    text: fase.Fase.nome
                })
            })



            //Setando dados do modal Aluno
            $("#nomeAlunoAnalise").text(` ${nomeAluno}`)
            $("#emailAlunoAnalise").text(` ${emailAluno}`)


            $.ajax({
                method: "GET",
                url: Rotasclass['gets']['analiseAluno'](idAluno, idTurma),
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: (data) => {

                    Swal.close();
                    infoAlunoAnalise = data

                },
                error: function (e) {
                    Swal.close();
                    if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                        window.sessionStorage.setItem("nav", "Acessar")
                        window.sessionStorage.removeItem("token")
                        window.location.href = 'login.php';
                    }
                    console.log(e);
                },
            })



            if (slimEstatisticaFaseAluno != undefined) {
                slimEstatisticaFaseAluno.destroy();
                slimEstatisticaFaseAluno = undefined
            }

            slimEstatisticaFaseAluno = new SlimSelect({
                select: '#EstatisticaFaseAluno',
                required: false,
                data: [],
                onChange: (info) => {
                    const { value } = info
                    let { ID, Fase } = JSON.parse(value)
                    let idFase = Fase.id
                    const idTurma = document.getElementById("customModal").getAttribute("data-id")

                    $.ajax({
                        method: "GET",
                        url: Rotasclass['gets']['analiseTurmaFase'](ID),
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        success: function (data) {

                            // console.log("turma: ", data);
                            infoTurmaAnalise = data
                            //Criando analise do aluno
                            criarAnaliseDoAluno(ID, idFase, idTurma);

                        },
                        error: function (e) {
                            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                                window.sessionStorage.setItem("nav", "Acessar")
                                window.sessionStorage.removeItem("token")
                                window.location.href = 'login.php';
                            }

                        },
                    })
                },
            })

            //Selecet fase da analide do aluno
            slimEstatisticaFaseAluno.setData(dataFase)



        },
        error: function (e) {
            Swal.close();
            if (e.status == 500) {
                Swal.fire({
                    icon: 'error',
                    title: "Houve um erro no servidor contate os administradores",
                    allowOutsideClick: false
                })
            } else if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }

        },
    })







})


$('#table-turmas').on("click", (e) => {

    const idTurma = e.target.parentNode.firstChild.innerText
    const nomeTurma = e.target.parentNode.children[1].innerText
    localStorage.setItem("idTurma", idTurma)
    localStorage.setItem("nomeTurma", nomeTurma)
    $("#customModal").attr("data-id", idTurma)
    $("#customModal").removeClass("invisible").addClass("visible fadeIN")
    $("#Titulo").text('Turma: ' + nomeTurma)

    //Escondendo os graficos
    $("#divEstatisticaPizzaTurma").addClass("d-none")
    $("#divEstatisticaPizzaQuestao").addClass("d-none")
    $("#divEstatisticaQuestao").addClass("invisible")


    createRadarTurma(idTurma)

    //Requsitar alunos na turma X
    $.ajax({
        url: Rotasclass['gets']['alunos'](idTurma),
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let tabela = document.getElementById("table-users");
            $("#total-de-alunos-na-turma").html(data.length)
            data.forEach(objectAluno => {
                let trAluno = criaTrAluno(objectAluno)
                //Inserindo a tr na tabela
                if (trAluno) {
                    tabela.appendChild(trAluno)
                }

            })

        },
        error: function (error) {
            console.log(error);
            if (error.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }
        },
        complete: function (data) {
            $('#tabela-de-alunos').DataTable().destroy()
            $('#tabela-de-alunos').DataTable(
                {
                    language: {
                        "decimal": "",
                        "emptyTable": "Não há alunos cadastrados",
                        "info": "Aluno(s) _START_ a _END_ de um total de: _TOTAL_",
                        "infoEmpty": "Nenhum aluno encontrado",
                        "infoFiltered": "(filtrado de _MAX_ aluno)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ linhas",
                        "loadingRecords": "Carregando...",
                        "processing": "Processando...",
                        "search": "Buscar:",
                        "zeroRecords": "Nenhum resultado encontrado",
                        "paginate": {
                            "first": "Primera",
                            "last": "Última",
                            "next": "Próximo",
                            "previous": "Anterior"
                        },
                        "aria": {
                            "sortAscending": ": activate to sort column ascending",
                            "sortDescending": ": activate to sort column descending"
                        }
                    }
                }
            );
        }
    });
    //Requisitar a lista de fases não vinculadas
    requestFasesNotVinculadas(idTurma)

    //Requisitar lista de fases vinculadas
    requestFaseVinculada(idTurma)
})

$("#table-aluno-turmas").on("click", (e) => {
    const tr = e.target.parentNode
    localStorage.setItem("idTurma", tr.id)

    // const nomeTurma = e.target.parentNode.children[1].innerText
    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['qtdJogadas'](tr.id),
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
            localStorage.setItem("qtdJogadas", JSON.stringify(data))
            console.log("qtdJogadas", data);
            window.location.href = './turmaAluno.php'
            // $("#conteudo").removeClass("d-block").addClass("d-none")
            // $("#customModal").removeClass("invisible").addClass("visible")
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

            // vincularFase(idTurma);

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

$(".DesvincularFase").on("click", (e) => {
    e.preventDefault();
    const idFase = e.target.id;
    if (idFase) {
        const idTurma = $("#customModal").attr("data-id");
        $.ajax({
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
            },
            url: Rotasclass['posts']['desvincularFase'](idTurma),
            method: "POST",
            data: {
                fase: +idFase
            },
            beforeSend: function (data) {

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
                console.log(data);
                Swal.close();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Essa fase foi desvinculada da turma',
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            error: function (err) {
                console.log(err);
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Essa turma não esta vinculada à esta fase!',
                })
            },
            complete: (data) => {
                requestFaseVinculada(idTurma);
                requestFasesNotVinculadas(idTurma)
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Selecione uma fase',
        })
    }
})

$(".vincularFase").on("click", (e) => {
    e.preventDefault();
    const idFase = e.target.id;
    if (idFase) {
        const idTurma = $("#customModal").attr("data-id");
        $.ajax({
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
            },
            url: Rotasclass['posts']['vincularFase'](idTurma),
            method: "POST",
            data: {
                fase: +idFase
            },
            beforeSend: function (data) {

                Swal.fire({
                    position: 'center',
                    title: "Estamos enviando as informações",
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    },
                    allowOutsideClick: false
                })


            },
            success: function (res) {

                Swal.close();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Essa fase foi vinculada à turma',
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            error: function (err) {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Essa turma já esta vinculada à esta fase!',
                })
            },
            complete: (data) => {
                requestFaseVinculada(idTurma);
                requestFasesNotVinculadas(idTurma)
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Selecione uma fase',
        })
    }

})
/**
 * Define o data do SlimSelect salvo na váriavel slimVincularFase com as fases não vinculadas
 *
 * @param {*} idTurma
 */
function requestFasesNotVinculadas(idTurma) {
    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['fasesNaoVinculadasTurma'](idTurma),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (data) {
            let dataFase = [
                { placeholder: true, text: 'Escolha uma fase' },
            ]
            data.map(fase => {
                dataFase.push({
                    value: JSON.stringify(fase),
                    text: fase.nome
                })
            })

            slimVincularFase.setData(dataFase);



        },
        error: function (e) {
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }

        },
    })
}

function requestFaseVinculada(idTurma) {
    //Requisitar lista de fases vinculadas
    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['fasesTurma'](idTurma),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (data) {
            let dataFase = [
                { placeholder: true, text: 'Escolha uma fase' },
            ]
            data.map(fase => {

                dataFase.push({
                    value: JSON.stringify(fase),
                    text: fase.Fase.nome
                })
            })

            slimDesvincularFase.setData(dataFase);
            //Colocando as informações no select
            slimEstatisticaTurmaFase.setData(dataFase)




        },
        error: function (e) {
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }

        },
    })
}



$("#exitModal").click((e) => {
    // $("#conteudo").removeClass("d-none").addClass("d-block")
    $("#customModal").removeClass("visible fadeIN").addClass("invisible")
    $('#tabela-de-alunos').DataTable().destroy()
    let tabela = document.getElementById("table-users");
    tabela.innerHTML = ""
})

$("#exitModalAluno").click((e) => {
    // $("#conteudo").removeClass("d-none").addClass("d-block")
    $("#customModalAluno").removeClass("visible fadeIN").addClass("invisible")
    // $('#tabela-de-alunos').DataTable().destroy()
    // let tabela = document.getElementById("table-users");
    // tabela.innerHTML = ""
})





function createRadarTurma(idTurma) {

    //Pegando os dados da api

    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['analiseTurma'](idTurma),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: "cors",
        success: function (data) {
            let nomeFase = []
            let aproveitamentoFase = []
            let { Turma_Fases } = data
            console.log('aaa', data);
            Turma_Fases.forEach(turmaFase => {
                nomeFase.push(turmaFase.Fase.nome)
                aproveitamentoFase.push(turmaFase.Aproveitamento )
            });

            //Radar
            let ctxRadar = document.getElementById('estatisticaRadarTurma').getContext('2d');

            if (chartRadarTurma != undefined) {
                chartRadarTurma.destroy();
                chartRadarTurma = undefined
            }


            // verificar se os valores de aproveitamentoFase são iguais a 0
            // se sim exibir mensagem de que não há dados para serem exibidos
            // se não exibir o gráfico

            if (aproveitamentoFase.every((val, i, arr) => val === arr[0])) {
                $("#erroEstatisticaRadarTurma").removeClass("d-none")
                $("#estatisticaRadarTurma").addClass("d-none")
            }else{
                $("#erroEstatisticaRadarTurma").addClass("d-none")
                $("#estatisticaRadarTurma").removeClass("d-none")
            }

            console.log(aproveitamentoFase);



            chartRadarTurma = new Chart(ctxRadar, {
                type: 'bar',
                data: {
                    labels: nomeFase,
                    datasets: [{
                        label: 'Aproveitamento por fase',
                        data: aproveitamentoFase,
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    },
                        // {
                        //     label: 'My Second Dataset',
                        //     data: [28, 48, 40, 19, 96, 27, 100],
                        //     fill: true,
                        //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        //     borderColor: 'rgb(54, 162, 235)',
                        //     pointBackgroundColor: 'rgb(54, 162, 235)',
                        //     pointBorderColor: '#fff',
                        //     pointHoverBackgroundColor: '#fff',
                        //     pointHoverBorderColor: 'rgb(54, 162, 235)'
                        // }
                    ]
                },
                options: {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    },
                    aspectRatio: 1
                },
            });
        },
        error: function (e) {
            if (e.status == 500) {
                Swal.fire({
                    icon: 'error',
                    title: "Houve um erro no servidor contate os administradores",
                    allowOutsideClick: false
                })
            } else if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }


        },
    })


}

function criarAnaliseQuestaoAluno(idFase) {

}

function criarAnaliseDoAluno(ID, idFase, idTurma) {

    let mediaTentativasPorQuestao = 0;

    //Infos
    let arrayTurmaQuizes = infoTurmaAnalise.Quizes
    let arrayFases = infoAlunoAnalise.Fases

    let arrayQuizes
    let arrayPerguntaQuizes = []
    let arrayTentativasQuizes = []
    let arrayTurmaTentativasQuizes = []
    let arrayAcertosQuizes = []
    let arrayTurmaAcertosQuizes = []
    let arrayErrosQuizes = []
    let arrayTurmaErrosQuizes = []


    let arrayPorcentagemAcertoAluno = []
    let arrayPorcentagemAcertoTurma = []

    let arrayPorcentagemErroAluno = []
    let arrayPorcentagemErroTurma = []




    arrayFases.forEach(elemento => {
        if (elemento.Fase.id == idFase) {
            arrayQuizes = elemento.Quizes
        }
    });


    console.log(arrayFases);
    // arrayTurmaFase.forEach(tumafase => {
    //     if (tumafase.Fase.id == idFase) {

    //     }
    // })
    $("#modalCompleteAskBody").html("")
    arrayQuizes.forEach(quiz => {
        // mediaTentativasPorQuestao += quiz.Metricas.tentativas

        $("#modalCompleteAskBody").append(`${quiz.Quiz.pergunta}<hr>`)

        console.log(quiz);

        arrayPerguntaQuizes.push(quiz.Quiz.pergunta.slice(0, 26))
        let quizMatch = arrayTurmaQuizes.find(turmaquiz => turmaquiz.PerguntaQuiz == quiz.Quiz.pergunta)

        // console.log(quizMatch);

        arrayPorcentagemAcertoAluno.push(isNaN(quiz.Metricas.Acertos / quiz.Metricas.Tentativas) == true ? 0 : +((quiz.Metricas.Acertos / quiz.Metricas.Tentativas) * 100).toFixed(2))
        arrayPorcentagemAcertoTurma.push(isNaN(quizMatch.Metricas.Acertos / quizMatch.Metricas.Tentativas) == true ? 0 : +((quizMatch.Metricas.Acertos / quizMatch.Metricas.Tentativas) * 100).toFixed(2))

        arrayTentativasQuizes.push(quiz.Metricas.Tentativas)
        arrayTurmaTentativasQuizes.push(quizMatch.Metricas.Tentativas)

        arrayPorcentagemErroAluno.push(isNaN(quiz.Metricas.Erros / quiz.Metricas.Tentativas) == true ? 0 : +((quiz.Metricas.Erros / quiz.Metricas.Tentativas) * 100).toFixed(2))
        arrayPorcentagemErroTurma.push(isNaN(quizMatch.Metricas.Erros / quizMatch.Metricas.Tentativas) == true ? 0 : +((quizMatch.Metricas.Erros / quizMatch.Metricas.Tentativas) * 100).toFixed(2))

        // arrayTurmaTentativasQuizes.push(quizMatch.Medias.Tentativas)
        // arrayTentativasQuizes.push(quiz.Metricas.tentativas);
        // arrayTurmaAcertosQuizes.push(quizMatch.Medias.Acertos)
        // arrayAcertosQuizes.push(quiz.Metricas.acertos)
        // arrayTurmaErrosQuizes.push(quizMatch.Medias.Erros)
        // arrayErrosQuizes.push(quiz.Metricas.Erros)
    });


    console.log('arrayPorcentagemAcertoAluno',arrayPorcentagemAcertoAluno);
    console.log('arrayPorcentagemAcertoTurma',arrayPorcentagemAcertoTurma);
    console.log('arrayPorcentagemErroAluno',arrayPorcentagemErroAluno);
    console.log('arrayPorcentagemErroTurma',arrayPorcentagemErroTurma);




    mediaTentativasPorQuestao = mediaTentativasPorQuestao / arrayQuizes.length;

    $("#divEstatisticaBarrasAluno").removeClass("d-none");
    let ctxBarrasMediaQuestaoAluno = document.getElementById('estatisticaBarrasAluno').getContext('2d');
    let ctxBarrasMediaQuestaoAlunoErro = document.getElementById('erroEstatisticaBarrasAluno').getContext('2d');
    let ctxBarrasMediaQuestaoAlunoTentativas = document.getElementById('tentativasEstatisticaBarrasAluno').getContext('2d');

    // verificar se todos os valores são 0 do arrayPorcentagemAcertoAluno
    if (arrayTurmaTentativasQuizes.every((val, i, arr) => val === arr[0])) {
        console.log("todos os valores são iguais");
        
        $("#btnEstatisticaBarrasAluno").addClass("d-none").removeClass("d-flex")
        $("#erroEstatisticaBarrasAlunoSemDados").removeClass("d-none")
        return

    }
    else{
        $("#btnEstatisticaBarrasAluno").removeClass("d-none").addClass("d-flex")
        $("#erroEstatisticaBarrasAlunoSemDados").addClass("d-none")
    }

    if (chartBarrasMediaQuestaoAluno != undefined) {
        chartBarrasMediaQuestaoAluno.destroy();
        chartBarrasMediaQuestaoAluno = undefined
    }

    if (chartBarrasMediaQuestaoAlunoErro != undefined) {
        chartBarrasMediaQuestaoAlunoErro.destroy();
        chartBarrasMediaQuestaoAlunoErro = undefined
    }

    if (chartBarrasMediaQuestaoAlunoTentativas != undefined) {
        chartBarrasMediaQuestaoAlunoTentativas.destroy();
        chartBarrasMediaQuestaoAlunoTentativas = undefined
    }


    chartBarrasMediaQuestaoAlunoTentativas = new Chart(ctxBarrasMediaQuestaoAlunoTentativas,

        {
            type: 'line',
            data: {
                labels: arrayPerguntaQuizes,
                datasets: [
                    {
                        label: ' Tentativas do aluno',
                        data: arrayTentativasQuizes,
                        backgroundColor: 'rgba(201, 203, 207,0.5)',
                        borderColor: 'rgb(201, 203, 207)',
                        stack: 'combined',
                        type: 'bar'
                    },
                    // {
                    //     label: 'Erros',
                    //     data: arrayPorcentagemErroAluno,
                    //     backgroundColor: 'rgba(255, 99, 132,0.6)',
                    //     borderColor: 'rgb(255, 99, 132)',
                    //     stack: 'combined',
                    //     type: 'bar'
                    // },
                    {
                        label: 'Tentativas da turma',
                        data: arrayTurmaTentativasQuizes,
                        borderColor: 'rgb(153,204,50)',
                        backgroundColor: 'rgb(153,204,50)',
                        stack: 'combined'
                    },
                ],
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Stacked Line/Bar Chart'
                        }
                    },
                    scales: {
                        // x: {
                        //     stacked: true,
                        // },
                        y: {
                            stacked: true
                        }
                    }
                },
            }
        }
    );

    chartBarrasMediaQuestaoAlunoErro = new Chart(ctxBarrasMediaQuestaoAlunoErro,

        {
            type: 'line',
            data: {
                labels: arrayPerguntaQuizes,
                datasets: [
                    {
                        label: ' % de erros do aluno',
                        data: arrayPorcentagemErroAluno,
                        backgroundColor: 'rgba(255, 99, 132,0.6)',
                        borderColor: 'rgb(255, 99, 132)',
                        stack: 'combined',
                        type: 'bar'
                    },
                    // {
                    //     label: 'Erros',
                    //     data: arrayPorcentagemErroAluno,
                    //     backgroundColor: 'rgba(255, 99, 132,0.6)',
                    //     borderColor: 'rgb(255, 99, 132)',
                    //     stack: 'combined',
                    //     type: 'bar'
                    // },
                    {
                        label: '% de erro da turma',
                        data: arrayPorcentagemErroTurma,
                        borderColor: 'rgb(153,204,50)',
                        backgroundColor: 'rgb(153,204,50)',
                        stack: 'combined'
                    },
                ],
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Stacked Line/Bar Chart'
                        }
                    },
                    scales: {
                        // x: {
                        //     stacked: true,
                        // },
                        y: {
                            stacked: true
                        }
                    }
                },
            }
        }
    );


    chartBarrasMediaQuestaoAluno = new Chart(ctxBarrasMediaQuestaoAluno,

        {
            type: 'line',
            data: {
                labels: arrayPerguntaQuizes,
                datasets: [
                    {
                        label: ' % acertos do aluno',
                        data: arrayPorcentagemAcertoAluno,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgb(54, 162, 235)',
                        stack: 'combined',
                        type: 'bar'
                    },
                    // {
                    //     label: 'Erros',
                    //     data: arrayPorcentagemErroAluno,
                    //     backgroundColor: 'rgba(255, 99, 132,0.6)',
                    //     borderColor: 'rgb(255, 99, 132)',
                    //     stack: 'combined',
                    //     type: 'bar'
                    // },
                    {
                        label: '% de acertos da turma',
                        data: arrayPorcentagemAcertoTurma,
                        borderColor: 'rgb(153,204,50)',
                        backgroundColor: 'rgb(153,204,50)',
                        stack: 'combined'
                    },
                ],
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Stacked Line/Bar Chart'
                        }
                    },
                    scales: {
                        // x: {
                        //     stacked: true,
                        // },
                        y: {
                            stacked: true
                        }
                    }
                },
            }
        }
    );

    $("#estatisticaBarrasAlunoAcerto").on("click", (e) => {

        $("#estatisticaBarrasAlunoAcerto").addClass("btn-primary").removeClass("btn-secondary")
        $("#estatisticaBarrasAlunoErro").addClass("btn-secondary").removeClass("btn-primary")
        $("#estatisticaBarrasAlunoTentativas").addClass("btn-secondary").removeClass("btn-primary")

        $("#estatisticaBarrasAluno").removeClass("d-none")
        $("#erroEstatisticaBarrasAluno").addClass("d-none")
        $("#tentativasEstatisticaBarrasAluno").addClass("d-none")

    })

    $("#estatisticaBarrasAlunoTentativas").on("click", (e) => {

        $("#estatisticaBarrasAlunoTentativas").addClass("btn-primary").removeClass("btn-secondary")
        $("#estatisticaBarrasAlunoErro").addClass("btn-secondary").removeClass("btn-primary")
        $("#estatisticaBarrasAlunoAcerto").addClass("btn-secondary").removeClass("btn-primary")

        $("#tentativasEstatisticaBarrasAluno").removeClass("d-none")
        $("#estatisticaBarrasAluno").addClass("d-none")
        $("#erroEstatisticaBarrasAluno").addClass("d-none")

    })

    $("#estatisticaBarrasAlunoErro").on("click", (e) => {

        $("#estatisticaBarrasAlunoErro").addClass("btn-primary").removeClass("btn-secondary")
        $("#estatisticaBarrasAlunoAcerto").addClass("btn-secondary").removeClass("btn-primary")
        $("#estatisticaBarrasAlunoTentativas").addClass("btn-secondary").removeClass("btn-primary")


        $("#estatisticaBarrasAluno").addClass("d-none")
        $("#erroEstatisticaBarrasAluno").removeClass("d-none")
        $("#tentativasEstatisticaBarrasAluno").addClass("d-none")
    })


    // chartBarrasMediaQuestaoAluno = new Chart(ctxBarrasMediaQuestaoAluno, {
    //     type: 'bar',
    //     data: {
    //         labels: arrayPerguntaQuizes,
    //         datasets: [
    //             {
    //                 // axis: 'y',
    //                 label: 'Tentativas do aluno',
    //                 data: arrayTentativasQuizes,
    //                 fill: false,
    //                 backgroundColor: [

    //                     'rgb(201, 203, 207))',

    //                 ],
    //                 borderColor: [
    //                     'rgb(201, 203, 207)',

    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 // axis: 'y',
    //                 label: 'Média de tentativas da turma',
    //                 data: arrayTurmaTentativasQuizes,
    //                 fill: false,
    //                 backgroundColor: [

    //                     'rgba(201, 203, 207,0.5)',

    //                 ],
    //                 borderColor: [
    //                     'rgb(201, 203, 207)',

    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 // axis: 'y',
    //                 label: 'Acertos  do aluno',
    //                 data: arrayAcertosQuizes,
    //                 fill: false,
    //                 backgroundColor: [
    //                     'rgb(54, 162, 235)',

    //                 ],
    //                 borderColor: [
    //                     'rgb(54, 162, 235)',
    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 // axis: 'y',
    //                 label: 'Média de acertos  da turma',
    //                 data: arrayTurmaAcertosQuizes,
    //                 fill: false,
    //                 backgroundColor: [
    //                     'rgba(54, 162, 235,0.5)',

    //                 ],
    //                 borderColor: [
    //                     'rgb(54, 162, 235)',
    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 // axis: 'y',
    //                 label: 'Erros  do aluno',
    //                 data: arrayErrosQuizes,
    //                 fill: false,
    //                 backgroundColor: [
    //                     'rgb(255, 99, 132)', ,

    //                 ],
    //                 borderColor: [
    //                     'rgb(255, 99, 132)',
    //                 ],
    //                 borderWidth: 1
    //             },
    //             {
    //                 // axis: 'y',
    //                 label: 'Média de erros  da turma',
    //                 data: arrayTurmaErrosQuizes,
    //                 fill: false,
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.5)', ,

    //                 ],
    //                 borderColor: [
    //                     'rgb(255, 99, 132)',
    //                 ],
    //                 borderWidth: 1
    //             },
    //         ]
    //     },
    //     options: {
    //         // indexAxis: 'y',
    //     }
    // });


}

function getEstatisticaQuestao(info) {
    //Mostrando estatistica da questão
    //Barras
    $("#divEstatisticaPizzaQuestao").removeClass("d-none")
    let ctxBarMedias = document.getElementById('estatisticaPizzaQuestaoMedias').getContext('2d');
    // let ctxBarMetricas = document.getElementById('estatisticaPizzaQuestaoMetricas').getContext('2d');

    let { Aproveitamento, Medias, Metricas } = info

    $("#aproveitamentoQuestao").text(` ${Aproveitamento}%`)

    if (chartBarQuestaoMedias != undefined) {
        chartBarQuestaoMedias.destroy();
        chartBarQuestaoMedias = undefined

    }

    if (Medias.Acertos == 0 && Medias.Erros == 0 && Medias.Tentativas == 0) {
        $("#estatisticaPizzaQuestaoMedias").addClass("d-none")
        $("#erroEstatisticaPizzaQuestaoMedias").removeClass("d-none")
    }else{
        $("#estatisticaPizzaQuestaoMedias").removeClass("d-none")
        $("#erroEstatisticaPizzaQuestaoMedias").addClass("d-none")
    }

    chartBarQuestaoMedias = new Chart(ctxBarMedias, {
        type: 'bar',
        data: {
            labels: [
                "Médias"
            ],
            datasets: [
                {
                    label: 'Acertos',
                    axis: 'y',
                    data: [Medias.Acertos],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                    ],
                    fill: false,
                },
                {
                    label: 'Erros',
                    axis: 'y',
                    data: [Medias.Erros],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                    ],
                    fill: false,
                },
                {
                    label: 'Tentativas',
                    axis: 'y',
                    data: [Medias.Tentativas],
                    backgroundColor: [
                        'rgba(201, 203, 207)'
                    ],
                    fill: false,
                }
            ]
        },
        options: {
            indexAxis: 'y',
        }
    });


    $("#mediaEstatisticaPizzaQuestao").click((e) => {
        $("#metricasEstatisticaPizzaQuestao").removeClass("btn-primary").addClass("btn-secondary")
        $("#mediaEstatisticaPizzaQuestao").removeClass("btn-secondary").addClass("btn-primary")
        chartBarQuestaoMedias.data.datasets.forEach(dataset => {
            if (dataset.label == "Acertos") {
                dataset.data = [Medias.Acertos]
            } else if (dataset.label == "Erros") {
                dataset.data = [Medias.Erros]
            } else {
                dataset.data = [Medias.Tentativas]
            }
            chartBarQuestaoMedias.data.labels = ["Médias"]
        })
        chartBarQuestaoMedias.update()

    })

    $("#metricasEstatisticaPizzaQuestao").click((e) => {
        $("#metricasEstatisticaPizzaQuestao").removeClass("btn-secondary").addClass("btn-primary")
        $("#mediaEstatisticaPizzaQuestao").removeClass("btn-primary").addClass("btn-secondary")
        chartBarQuestaoMedias.data.datasets.forEach(dataset => {
            if (dataset.label == "Acertos") {
                dataset.data = [Metricas.Acertos]
            } else if (dataset.label == "Erros") {
                dataset.data = [Metricas.Erros]
            } else {
                dataset.data = [Metricas.Tentativas]
            }
            chartBarQuestaoMedias.data.labels = ["Quantidades"]
        })
        chartBarQuestaoMedias.update()

    })



    // if (chartBarQuestaoMetricas != undefined) {
    //     chartBarQuestaoMetricas.destroy();
    //     chartBarQuestaoMetricas = undefined
    // }

    // chartBarQuestaoMetricas = new Chart(ctxBarMetricas, {
    //     type: 'bar',
    //     data: {
    //         labels: [
    //             'Métricas'
    //         ],
    //         datasets: [
    //             {
    //                 label: 'Acertos',
    //                 axis: 'y',
    //                 data: [Metricas.Acertos],
    //                 backgroundColor: [
    //                     'rgb(54, 162, 235)',
    //                 ],
    //                 fill: false,
    //             },
    //             {
    //                 label: 'Erros',
    //                 axis: 'y',
    //                 data: [Metricas.Erros],
    //                 backgroundColor: [
    //                     'rgb(255, 99, 132)',
    //                 ],
    //                 fill: false,
    //             },
    //             {
    //                 label: 'Tentativas',
    //                 axis: 'y',
    //                 data: [Metricas.Tentativas],
    //                 backgroundColor: [
    //                     'rgba(201, 203, 207)'
    //                 ],
    //                 fill: false,
    //             }
    //         ]
    //     },
    //     options: {
    //         indexAxis: 'y',
    //     }
    // });

}

function getEstatisticaFase(id) {

    //Pegando dados da api
    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['analiseTurmaFase'](id),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: (data) => {
            console.log(data);
            let { Medias, Metricas } = data
            //Mostrando estatistica da turma
            //Pizza
            $("#divEstatisticaPizzaTurma").removeClass("d-none")
            let ctxPizza = document.getElementById('estatisticaPizzaTurma').getContext('2d');



            if (chartPizzaTurmaFase != undefined) {
                chartPizzaTurmaFase.destroy();
                chartPizzaTurmaFase = undefined
            }

            console.log([Medias.Acertos, Medias.Erros]);

            if (Medias.Acertos == 0 && Medias.Erros == 0) {
                $("#erroEstatisticaPizzaTurma").removeClass("d-none")
                $("#estatisticaPizzaTurma").addClass("d-none")

            }else{
                $("#erroEstatisticaPizzaTurma").addClass("d-none")
                $("#estatisticaPizzaTurma").removeClass("d-none")
            }

            chartPizzaTurmaFase = new Chart(ctxPizza, {
                type: 'pie',
                data: {
                    labels: [
                        'Média de acertos',
                        'Média de erros',
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [Medias.Acertos, Medias.Erros],
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    aspectRatio: 1,
                },

            });


            $("#metricasEstatisticaPizzaTurma").click((e) => {
                $("#metricasEstatisticaPizzaTurma").removeClass("btn-secondary").addClass("btn-primary")
                $("#mediaEstatisticaPizzaTurma").removeClass("btn-primary").addClass("btn-secondary")
                chartPizzaTurmaFase.data.datasets.forEach(dataset => {
                    dataset.data = [Metricas.Acertos, Metricas.Erros]
                    chartPizzaTurmaFase.data.labels = [
                        'Quantidade de acertos',
                        'Quantidade de erros',
                    ]
                })
                chartPizzaTurmaFase.update()
            })

            $("#mediaEstatisticaPizzaTurma").click((e) => {
                $("#mediaEstatisticaPizzaTurma").removeClass("btn-secondary").addClass("btn-primary")
                $("#metricasEstatisticaPizzaTurma").removeClass("btn-primary").addClass("btn-secondary")
                chartPizzaTurmaFase.data.datasets.forEach(dataset => {
                    dataset.data = [Medias.Acertos, Medias.Erros]
                    chartPizzaTurmaFase.data.labels = [
                        'Média de acertos',
                        'Média de erros',
                    ]

                })
                chartPizzaTurmaFase.update()
            })

        },
        error: (e) => {

        }
    })

}