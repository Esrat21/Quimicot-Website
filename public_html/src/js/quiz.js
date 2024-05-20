let SelecetTurmaUpdate;
let selectFaseUpdate;
let selectQuizUpdate;
let SelectTurmaDelete;
let SelectTurmaList;
let selectFaseDelete;
let selectFaseList;
let selectQuizDelete;


$("input[name=alternativaCorreta]").on("click", (e) => {
    $("#alternativasQuiz > li.active").removeClass("active");
    e.target.parentNode.classList.add('active')
})

function swalErro(menssage) {
    Swal.fire({
        icon: 'error',
        title: menssage,
        allowOutsideClick: false
    })
}

function listAllQuizProcedimentos() {
    $("#titleQuiz").text("Listar todos os Quizes")
    $("#sectionCreateQuiz").addClass("d-none")
    $("#sectionUpdateQuiz").addClass("d-none")
    $("#sectionDeleteQuiz").addClass("d-none")
    $("#sectionListQuiz").addClass("d-none")
    $("#sectionListQuizAll").removeClass("d-none")
}

// evento de click no botao listar todos os quiz
$("#listQuizAll").on("click", async (e) => {
    listAllQuizProcedimentos()
    e.preventDefault();
    $.ajax({
        url: Rotasclass['gets']['professorAllQuizes'],
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            console.log(data);
            // pegar o tboby da tabela com id tabela-de-all-quiz-list
            let tbody = $("#tabela-de-all-quiz-list > tbody");
            // limpar o tbody
            tbody.empty();
            // percorrer o array de quiz
            data.forEach((quiz) => {
                // criar uma lina na tabela
                let tr = $("<tr></tr>");
                // criar uma coluna com o id do quiz
                let tdId = $(`<td>${quiz.quiz_id}</td>`);
                // criar uma coluna com a pergunta do quiz
                let tdPergunta = $(`<td>${quiz.pergunta}</td>`);
                // criar uma coluna com as alternativas do quiz com um botao de dropdown do bootstrap
                let tdAlternativas = $(`<td>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Alternativas
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" style="background-color: ${quiz.alternativas[0].alt_correta ? 'green' : ''}" href="#">${quiz.alternativas[0].descricao}</a>
                        <a class="dropdown-item"  style="background-color: ${quiz.alternativas[1].alt_correta ? 'green' : ''}" href="#">${quiz.alternativas[1].descricao}</a>
                        <a class="dropdown-item"  style="background-color: ${quiz.alternativas[2].alt_correta ? 'green' : ''}" href="#">${quiz.alternativas[2].descricao}</a>
                        <a class="dropdown-item"  style="background-color: ${quiz.alternativas[3].alt_correta ? 'green' : ''}" href="#">${quiz.alternativas[3].descricao}</a>
                    </div>
                </div>
                </td>`);


                // inserir a coluna id na linha
                tr.append(tdId);
                // inserir a coluna pergunta na linha
                tr.append(tdPergunta);
                // inserir a coluna alternativas na linha
                tr.append(tdAlternativas);
                // inserir a linha na tabela
                tbody.append(tr);

            });

        },
    })
})

function createQuizProcedientos() {
    $("#titleQuiz").text("Criar Quiz")
    $("#sectionCreateQuiz").removeClass("d-none")
    $("#sectionUpdateQuiz").addClass("d-none")
    $("#sectionDeleteQuiz").addClass("d-none")
    $("#sectionListQuiz").addClass("d-none")
    $("#sectionListQuizAll").addClass("d-none")
}


$("#createQuiz").on("click", () => {
    createQuizProcedientos()
    window.sessionStorage.setItem("nav-quiz", "create");
    dinamicReq['Quiz']()
})

function updateQuizClick() {
    $("#titleQuiz").text("Alterar Quiz")
    $("#sectionUpdateQuiz").removeClass("d-none")
    $("#sectionCreateQuiz").addClass("d-none")
    $("#sectionDeleteQuiz").addClass("d-none")
    $("#sectionListQuiz").addClass("d-none")
    $("#sectionListQuizAll").addClass("d-none")
    window.sessionStorage.setItem("nav-quiz", "update");

    //Campos
    $("#turmaFaseUpdate").addClass("d-none");
    $("#opcUpdate").removeClass("d-flex").addClass("d-none")
    $("#turmaFaseQuizUpdate").addClass("d-none")
    $("#inputAlterarPerguntaQuiz").addClass("d-none")
    $("#divAlterarAlternativazQuiz").addClass("d-none")


    if (SelecetTurmaUpdate !== undefined) {
        SelecetTurmaUpdate.destroy()
        SelecetTurmaUpdate = undefined;
    }

    $.ajax({
        url: Rotasclass['gets']['turma'],
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let turmas = [{ placeholder: true, text: '-------Selecione uma turma------' }]
            data.forEach(turma => {
                turmas.push({ value: turma.id, text: turma.nome })
            })
            SelecetTurmaUpdate = new SlimSelect({
                select: '#SelecetTurmaUpdate',
                required: true,
                data: turmas,
                onChange: (info) => {
                    let id_turma = info.value
                    if (selectFaseUpdate !== undefined) {
                        selectFaseUpdate.destroy()
                        selectFaseUpdate = undefined;
                    }
                    $.ajax({
                        method: "GET",
                        url: Rotasclass['gets']['fasesTurma'](id_turma),
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        success: function (data) {
                            $("#turmaFaseUpdate").removeClass("d-none");

                            let fases = [
                                { placeholder: true, text: '-------Selecione uma fase------' },
                            ]

                            data.forEach(turmaFase => {
                                fases.push({ value: turmaFase.Fase.id, text: turmaFase.Fase.nome })
                            });




                            selectFaseUpdate = new SlimSelect({
                                select: '#SelecetFaseUpdate',
                                required: true,
                                data: fases,
                                onChange: (info) => {
                                    console.log(info);
                                    let id_fase = info.value
                                    if (selectQuizUpdate !== undefined) {
                                        selectQuizUpdate.destroy()
                                        selectQuizUpdate = undefined;
                                    }
                                    $.ajax({
                                        method: "GET",
                                        url: Rotasclass['gets']['quizesFaseProfessor'](id_turma, id_fase),
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },
                                        success: (data) => {
                                            $("#turmaFaseQuizUpdate").removeClass("d-none")

                                            let quizes = [
                                                { placeholder: true, text: '-------Selecione um quiz------' },
                                            ]



                                            data.forEach(quiz => {
                                                quizes.push({ value: JSON.stringify(quiz), text: "ID - " + quiz.quiz_id + ": " + quiz.pergunta })
                                            });



                                            selectQuizUpdate = new SlimSelect({
                                                select: '#SelectQuizUpdate',
                                                required: true,
                                                data: quizes,
                                                onChange: (info) => {
                                                    // console.log(JSON.parse(info.value));
                                                    $("#opcUpdate").removeClass("d-none")
                                                }
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
                                }
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

                }
            })
        },
    })
}

$("#updateQuiz").on("click", updateQuizClick)


$("#btnAlterarPerguntaQuiz").on("click", () => {
    $("#divAlterarAlternativazQuiz").addClass("d-none")
    $("#inputAlterarPerguntaQuiz").removeClass("d-none")
    let quiz = JSON.parse(selectQuizUpdate.selected())
    $("#InputAlterarPergunta").val(quiz.pergunta)
})

$("#btnAlterarAlternativaQuiz").on("click", () => {
    $("#inputAlterarPerguntaQuiz").addClass("d-none")
    $("#divAlterarAlternativazQuiz").removeClass("d-none")
    let quiz = JSON.parse(selectQuizUpdate.selected())
    let cont = 1;
    for (const alternativa of quiz.alternativas) {
        if (alternativa.alt_correta == true) {
            $("#alterarAlternativaCorreta").val(alternativa.descricao)
            $("#alterarJustificativaAlternativasCorreta").val(alternativa.justificativa)
        } else {
            if (cont == 1) {
                $("#alterarAlternativasQuizB").val(alternativa.descricao)
                $("#alterarJustificativaAlternativasQuizB").val(alternativa.justificativa)
            } else if (cont == 2) {
                $("#alterarAlternativasQuizC").val(alternativa.descricao)
                $("#alterarJustificativaAlternativasQuizC").val(alternativa.justificativa)
            } else if (cont == 3) {
                $("#alterarAlternativasQuizD").val(alternativa.descricao)
                $("#alterarJustificativaAlternativasQuizD").val(alternativa.justificativa)
            }
            cont++
        }
    }
})

async function ajaxAlterarAlternativaQuiz(id_quiz, id_alternativa, descricao, justificativa) {
    let retorno = {
        sucesso: false,
        response: null
    }

    try {
        let response = await (() => {
            return $.ajax({
                url: Rotasclass['posts']['atualizarAlternativaQuiz'](id_quiz, id_alternativa),
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                mode: 'cors',
                data: {
                    descricao: descricao,
                    // descricao:  $("#alterarAlternativaCorreta").val(alternativa.descricao),
                    justificativa: justificativa
                    // justificativa: $("#alterarJustificativaAlternativasCorreta").val(alternativa.justificativa)
                }
            })
        })();

        retorno.response = response;
        retorno.sucesso = true;

    } catch (error) {
        retorno.response = error;
        console.log(error);
    }

    console.log(retorno);
    return retorno;
}

$("#salvarAlteracaoAlternativas").on("click", async () => {

    let alts = [
        document.getElementById('alterarAlternativaCorreta'),
        document.getElementById('alterarAlternativasQuizB'),
        document.getElementById('alterarAlternativasQuizC'),
        document.getElementById('alterarAlternativasQuizD'),

    ]

    for (const alt of alts) {
        if (!alt.validity.valid) {
            alt.reportValidity();
            return
        }
    }



    let quiz = JSON.parse(selectQuizUpdate.selected())
    let id_quiz = quiz.quiz_id
    Swal.fire({
        position: 'center',
        title: "Estamos enviando as informações",
        onBeforeOpen: () => {
            Swal.showLoading()
        },
        allowOutsideClick: false
    })

    let alterados = {
        correta: false,
        errada1: false,
        errada2: false,
        errada3: false
    }
    let cont = 1
    for (const alternativa of quiz.alternativas) {

        let id_alternativa = alternativa.id

        if (alternativa.alt_correta == true) {
            console.log($("#alterarAlternativaCorreta").val());
            if (alternativa.descricao != $("#alterarAlternativaCorreta").val() || alternativa.justificativa != $("#alterarJustificativaAlternativasCorreta").val()) {
                let retorno = await ajaxAlterarAlternativaQuiz(id_quiz, id_alternativa, $("#alterarAlternativaCorreta").val(), $("#alterarJustificativaAlternativasCorreta").val())

                alterados.correta = retorno

            }
        } else {
            if (cont == 1) {
                if (alternativa.descricao != $("#alterarAlternativasQuizB").val() || alternativa.justificativa != $("#alterarJustificativaAlternativasQuizB").val()) {
                    let retorno = await ajaxAlterarAlternativaQuiz(id_quiz, id_alternativa, $("#alterarAlternativasQuizB").val(), $("#alterarJustificativaAlternativasQuizB").val())
                    alterados.errada1 = retorno
                }
            } else if (cont == 2) {
                if (alternativa.descricao != $("#alterarAlternativasQuizC").val() || alternativa.justificativa != $("#alterarJustificativaAlternativasQuizC").val()) {
                    let retorno = await ajaxAlterarAlternativaQuiz(id_quiz, id_alternativa, $("#alterarAlternativasQuizC").val(), $("#alterarJustificativaAlternativasQuizC").val())
                    alterados.errada2 = retorno
                }
            } else if (cont == 3) {
                if (alternativa.descricao != $("#alterarAlternativasQuizD").val() || alternativa.justificativa != $("#alterarJustificativaAlternativasQuizD").val()) {
                    let retorno = await ajaxAlterarAlternativaQuiz(id_quiz, id_alternativa, $("#alterarAlternativasQuizD").val(), $("#alterarJustificativaAlternativasQuizD").val())
                    alterados.errada3 = retorno
                }
            }
            cont++
        }
    }



    console.log(alterados);


    let textoRetorno = ""
    let icone = "success"

    for (const key in alterados) {
        if (alterados[key] !== false) {
            if (alterados[key].sucesso) {
                textoRetorno += `${key}: alterado com sucesso<br>`
            } else {
                textoRetorno += `${key}: falha ao alterar<br>`
                icone = "error"
            }
        }
    }

    let id_turma = SelecetTurmaUpdate.selected()
    let id_fase = selectFaseUpdate.selected()
    let { quiz_id } = JSON.parse(selectQuizUpdate.selected())



    console.log(quiz_id);

    $.ajax({
        method: "GET",
        url: Rotasclass['gets']['quizesFaseProfessor'](id_turma, id_fase),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: (data) => {

            Swal.close();
            let quizes = [
                { placeholder: true, text: '-------Selecione um quiz------' },
            ]

            let selecionar

            data.forEach(quiz => {
                if (quiz.quiz_id == quiz_id) {
                    selecionar = JSON.stringify(quiz)
                }
                quizes.push({ value: JSON.stringify(quiz), text: `ID - ${quiz.quiz_id}:` + quiz.pergunta })
            });



            selectQuizUpdate.setData(quizes)
            if (selecionar != undefined) {
                selectQuizUpdate.set(selecionar)
            }

            Swal.fire({
                icon: icone,
                title: icone == "success" ? "Sucesso" : "Falha",
                html: textoRetorno,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `Ok`,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {

                    // window.location.reload()
                }
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





})

$("#salvarAlteracaoPergunta").on("click", () => {
    let quiz = JSON.parse(selectQuizUpdate.selected())
    $.ajax({
        method: "POST",
        url: Rotasclass['posts']['atualizarPerguntaQuiz'](quiz.quiz_id),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            pergunta: $("#InputAlterarPergunta").val()
        },
        success: (data) => {

            let id_turma = SelecetTurmaUpdate.selected()
            let id_fase = selectFaseUpdate.selected()
            let { quiz_id } = JSON.parse(selectQuizUpdate.selected())





            $.ajax({
                method: "GET",
                url: Rotasclass['gets']['quizesFaseProfessor'](id_turma, id_fase),
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: (data) => {


                    let quizes = [
                        { placeholder: true, text: '-------Selecione um quiz------' },
                    ]

                    let selecionar

                    data.forEach(quiz => {
                        if (quiz.quiz_id == quiz_id) {
                            selecionar = JSON.stringify(quiz)
                        }
                        quizes.push({ value: JSON.stringify(quiz), text: quiz.pergunta })
                    });



                    selectQuizUpdate.setData(quizes)
                    if (selecionar != undefined) {
                        selectQuizUpdate.set(selecionar)
                    }

                    Swal.fire({
                        icon: 'success',
                        title: "Pergunta atualizada com sucesso",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Ok`,
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {


                        }
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






        },
        error: (e) => {
            console.log(e);

            Swal.fire({
                icon: 'error',
                title: "Houve um erro ao tentar atualizar a pergunta, tente novamente mais tarde",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `Ok`,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
            })

        }
    })
})

$("#btnDeletarPerguntaQuiz").on("click", () => {
    let quiz = JSON.parse(selectQuizDelete.selected())
    Swal.fire({
        icon: 'warning',
        title: "Deseja realmente deletar este quiz?",
        text: 'Ao deletar um quiz todos os registros relacionados a ele serão apagados também, isso inclui as respostas efetuadas dos alunos.',
        showCancelButton: true,
        confirmButtonText: `Sim`,
        cancelButtonText: `Não`,
        focusConfirm: false,
        focusCancel: true,
        customClass: {
            confirmButton: 'btn-danger-important',
            cancelButton: 'btn-primary-important'
        }
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: Rotasclass['posts']['deletarPerguntaQuiz'](quiz.quiz_id),
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: (data) => {
                    Swal.fire({
                        icon: 'success',
                        title: "Pergunta removida com sucesso",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Ok`,
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                    })
                },
                error: (e) => {
                    console.log(e);
                    Swal.fire({
                        icon: 'error',
                        title: "Houve um erro ao tentar deletar a pergunta, tente novamente mais tarde",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Ok`,
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }
            })
        }
    })

})

$("#listQuiz").on("click", () => {
    $("#titleQuiz").text("Listar Quiz")
    $("#sectionDeleteQuiz").addClass("d-none")
    $("#sectionCreateQuiz").addClass("d-none")
    $("#sectionUpdateQuiz").addClass("d-none")
    $("#sectionListQuiz").removeClass("d-none")
    $("#sectionListQuizAll").addClass("d-none")



    window.sessionStorage.setItem("nav-quiz", "list");

    //Campos
    $("#turmaFaseList").addClass("d-none");
    $("#tabela-de-quiz-list").addClass("d-none");
    $("#divTabelaListQuiz").addClass("d-none");
    $("#opcList").removeClass("d-flex").addClass("d-none")

    if (SelectTurmaList !== undefined) {
        SelectTurmaList.destroy()
        SelectTurmaList = undefined;
    }

    $.ajax({
        url: Rotasclass['gets']['turma'],
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let turmas = [{ placeholder: true, text: '-------Selecione uma turma------' }]
            data.forEach(turma => {
                turmas.push({ value: turma.id, text: turma.nome })
            })

            SelectTurmaList = new SlimSelect({
                select: '#SelectTurmaList',
                required: true,
                data: turmas,
                onChange: (info) => {
                    let id_turma = info.value

                    if (selectFaseList !== undefined) {
                        selectFaseList.destroy()
                        selectFaseList = undefined;
                    }

                    $.ajax({
                        method: "GET",
                        url: Rotasclass['gets']['fasesTurma'](id_turma),
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        success: function (data) {
                            $("#turmaFaseList").removeClass("d-none");

                            let fases = [
                                { placeholder: true, text: '-------Selecione uma fase------' },
                            ]

                            data.forEach(turmaFase => {
                                fases.push({ value: turmaFase.Fase.id, text: turmaFase.Fase.nome })
                            });




                            selectFaseList = new SlimSelect({
                                select: '#SelecetFaseList',
                                required: true,
                                data: fases,
                                onChange: (info) => {
                                    let id_fase = info.value

                                    //Limpando tabela de quiz
                                    let tabela = document.getElementById("table-list-quiz");
                                    tabela.innerHTML = ""

                                    $.ajax({
                                        method: "GET",
                                        url: Rotasclass['gets']['quizesFaseProfessor'](id_turma, id_fase),
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },
                                        success: (data) => {
                                            $("#tabela-de-quiz-list").removeClass("d-none");
                                            $("#divTabelaListQuiz").removeClass("d-none");


                                            let tabela = document.getElementById("table-list-quiz");
                                            data.forEach(objectAluno => {
                                                let trAluno = criarTrQuiz(objectAluno)
                                                //Inserindo a tr na tabela
                                                if (trAluno) {
                                                    tabela.appendChild(trAluno)
                                                }

                                            })

                                        },
                                        error: function (e) {
                                            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                                                window.sessionStorage.setItem("nav", "Acessar")
                                                window.sessionStorage.removeItem("token")
                                                window.location.href = 'login.php';
                                            }
                                        },
                                        complete: function (data) {
                                            $('#tabela-de-quiz-list').DataTable().destroy()
                                            $('#tabela-de-quiz-list').DataTable({
                                                language: {
                                                    "decimal": "",
                                                    "emptyTable": "Não há quizes cadastrados",
                                                    "info": "quiz(es) _START_ a _END_ de um total de: _TOTAL_",
                                                    "infoEmpty": "Nenhum quiz encontrado",
                                                    "infoFiltered": "(filtrado de _MAX_ quizes)",
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
                                            });
                                        }
                                    })
                                }
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

                }
            })
        },
    })
})

$("#deleteQuiz").on("click", () => {
    $("#titleQuiz").text("Deletar   Quiz")
    $("#sectionDeleteQuiz").removeClass("d-none")
    $("#sectionCreateQuiz").addClass("d-none")
    $("#sectionUpdateQuiz").addClass("d-none")
    $("#sectionListQuiz").addClass("d-none")
    $("#sectionListQuizAll").addClass("d-none")
    window.sessionStorage.setItem("nav-quiz", "delete");

    //Campos
    $("#turmaFaseDelete").addClass("d-none");
    $("#opcDelete").removeClass("d-flex").addClass("d-none")
    $("#turmaFaseQuizDelete").addClass("d-none")

    if (SelectTurmaDelete !== undefined) {
        SelectTurmaDelete.destroy()
        SelectTurmaDelete = undefined;
    }

    $.ajax({
        url: Rotasclass['gets']['turma'],
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let turmas = [{ placeholder: true, text: '-------Selecione uma turma------' }]
            data.forEach(turma => {
                turmas.push({ value: turma.id, text: turma.nome })
            })
            SelectTurmaDelete = new SlimSelect({
                select: '#SelectTurmaDelete',
                required: true,
                data: turmas,
                onChange: (info) => {
                    let id_turma = info.value
                    if (selectFaseDelete !== undefined) {
                        selectFaseDelete.destroy()
                        selectFaseDelete = undefined;
                    }
                    $.ajax({
                        method: "GET",
                        url: Rotasclass['gets']['fasesTurma'](id_turma),
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        success: function (data) {
                            $("#turmaFaseDelete").removeClass("d-none");

                            let fases = [
                                { placeholder: true, text: '-------Selecione uma fase------' },
                            ]

                            data.forEach(turmaFase => {
                                fases.push({ value: turmaFase.Fase.id, text: turmaFase.Fase.nome })
                            });




                            selectFaseDelete = new SlimSelect({
                                select: '#SelecetFaseDelete',
                                required: true,
                                data: fases,
                                onChange: (info) => {
                                    let id_fase = info.value
                                    if (selectQuizDelete !== undefined) {
                                        selectQuizDelete.destroy()
                                        selectQuizDelete = undefined;
                                    }
                                    $.ajax({
                                        method: "GET",
                                        url: Rotasclass['gets']['quizesFaseProfessor'](id_turma, id_fase),
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },
                                        success: (data) => {
                                            $("#turmaFaseQuizDelete").removeClass("d-none");

                                            let quizes = [
                                                { placeholder: true, text: '-------Selecione um quiz------' },
                                            ]


                                            data.forEach(quiz => {
                                                quizes.push({ value: JSON.stringify(quiz), text: "ID - " + quiz.quiz_id + ": " + quiz.pergunta })
                                            });



                                            selectQuizDelete = new SlimSelect({
                                                select: '#SelectQuizDelete',
                                                required: true,
                                                data: quizes,
                                                onChange: (info) => {
                                                    // console.log(JSON.parse(info.value));
                                                    $("#opcDelete").removeClass("d-none")
                                                }
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
                                }
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

                }
            })
        },
    })
})

$("#form-quiz-create").on("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(document.getElementById("form-quiz-create"));
    let dataJSON = Object.fromEntries(formData)
    let submitData = {}

    submitData = {
        alt_correta: 0,
        alternativas: [
            {
                descricao: dataJSON.alternativasQuizA,
                justificativa: dataJSON.alternatjustificativaAlternativasQuizAivasQuizA
            },
            {
                descricao: dataJSON.alternativasQuizB,
                justificativa: dataJSON.alternatjustificativaAlternativasQuizAivasQuizB
            },
            {
                descricao: dataJSON.alternativasQuizC,
                justificativa: dataJSON.alternatjustificativaAlternativasQuizAivasQuizC
            },
            {
                descricao: dataJSON.alternativasQuizD,
                justificativa: dataJSON.alternatjustificativaAlternativasQuizAivasQuizD
            }
        ],
        turma_fase: +dataJSON.fase,
        pergunta: dataJSON.pergunta
    }

    console.log(submitData);
    if (isNaN(dataJSON.turma)) {
        swalErro("Escolha a turma desejada")
        return
    }
    if (isNaN(submitData.turma_fase)) {
        swalErro("Escolha a fase desejada")
        return
    }
    if (isNaN(submitData.alt_correta)) {
        swalErro("Assinale qual será a alternativa correta")
        return
    }

    $.ajax({
        url: Rotasclass['posts']['cadastrar']['quiz'],
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
        },
        data: submitData,
        beforeSend: (data) => {

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
            Swal.fire({
                icon: 'success',
                title: "Quiz cadastrado com sucesso",
                allowOutsideClick: false
            })
            navigation({
                innerText: window.sessionStorage.getItem("nav")
            })
        },
        error: (e) => {
            Swal.close();
            if (e.responseJSON.Erros == "Authorisation Failed") {
                window.sessionStorage.removeItem("token")
                window.sessionStorage.setItem("nav", "Acessar")
                window.location.href = "login.php"
            } else {
                console.log(e.responseJSON);
                swalErro(e.responseJSON.Erross)
            }

        },
        complete: (data) => {
            // navigation({
            //     innerText: window.sessionStorage.getItem("nav")
            // })
        }
    })
})



