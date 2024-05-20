"use strict";
const dinamicReq = {};
const token = window.sessionStorage.getItem("token") != null ? window.sessionStorage.getItem("token") : null
let selectTurma;
let selectFase;
let selectEscola;
let selectDificuldade;
let selectClassificacao;
let selectElementos;
let selectGrupo;

dinamicReq['Usuários'] = () => {

    $.ajax({
        url: Rotasclass['gets']['professor'],
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (data) {

            let tabela = document.getElementById("tbody-table-professores");
            data.forEach(objectProfessor => {
                let trProfessor = criaTrProfessor(objectProfessor)
                //Inserindo a tr na tabela
                tabela.appendChild(trProfessor)
            })

        },
        error: function (error) {
            console.log(error);
        },
        complete: function (data) {
            $('#tabela-de-professores').DataTable().destroy()
            $('#tabela-de-professores').DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "Não há professores cadastrados",
                    "info": "Professor(es) _START_ a _END_ de um total de: _TOTAL_",
                    "infoEmpty": "Nenhum professor encontrado",
                    "infoFiltered": "(filtrado de _MAX_ professor)",
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
    });
}

dinamicReq['Escolas'] = () => {
    $.ajax({
        url: Rotasclass['gets']['escola'],
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        success: function (data) {
            let tabela = document.getElementById("tbody-table-escolas");

            data.forEach(objectProfessor => {
                let trProfessor = criaTrEscola(objectProfessor)
                //Inserindo a tr na tabela
                tabela.appendChild(trProfessor)
            })
        },
        error: function (error) {
            console.log(error);
        },
        complete: function (data) {
            $('#tabela-de-escolas').DataTable().destroy()
            $('#tabela-de-escolas').DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "Não há escolas cadastrados",
                    "info": "Escola(s) _START_ a _END_ de um total de: _TOTAL_",
                    "infoEmpty": "Nenhuma escola encontrado",
                    "infoFiltered": "(filtrado de _MAX_ escolas)",
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
    });
}


dinamicReq['Fases'] = () => {
    console.log(Rotasclass['gets']['fasesComTurma']);
    $.ajax({
        url: Rotasclass['gets']['fasesComTurma'],
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (data) {
            let tabela = document.getElementById("table-list-fase");
            $('#tabela-de-listar-fase').DataTable().destroy()
            console.log('data', data);
            tabela.innerHTML = ""
            data.forEach(fase => {
                let trFaseNaTurma = criarTrFaseNaTurma({ faseNome: fase.Fase.nome, faseContem: fase.Fase.contem, turmasVinculadas: fase.Turmas.map(turma => turma.Turma.nome) })
                console.log(trFaseNaTurma);
                tabela.appendChild(trFaseNaTurma)
            });
        },
        error: function (error) {
            // TODO
            if (error.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }
            console.log(error);
        },
        complete: function (data) {
            // $('#tabela-de-listar-fase').DataTable().destroy()
            $('#tabela-de-listar-fase').DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "Não há professores cadastrados",
                    "info": "Professor(es) _START_ a _END_ de um total de: _TOTAL_",
                    "infoEmpty": "Nenhum professor encontrado",
                    "infoFiltered": "(filtrado de _MAX_ professor)",
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
    });
}


dinamicReq['Fase'] = () => {
    let sectionPlus = document.getElementById("plus-information");
    sectionPlus.innerHTML = "";

    if (selectDificuldade !== undefined) {
        selectDificuldade.destroy()
        selectDificuldade = undefined;
    }


    selectDificuldade = new SlimSelect({
        select: '#dificuldadeFase',
        required: true,
        data: [
            { placeholder: true, text: 'Escolha a dificuldade da fase' },
            {
                value: 'F',
                text: 'Fácil'
            },
            {
                value: 'M',
                text: 'Médio'
            },
            {
                value: 'D',
                text: 'Díficil'
            },
        ]
    })

    // selectClassificacao = new SlimSelect({
    //     select: '#classificacaoFase',
    //     required: true,
    //     data: [

    //     ]
    // })


    // $.ajax({
    //     url: Rotasclass['gets']['elementos']("classificacao"),
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     success: function (data) {
    //         let dataClassificacao = [
    //             { placeholder: true, text: 'Escolha a classificação' },
    //         ]
    //         console.log(data);
    //         data.map(classificacao => {
    //             dataClassificacao.push({
    //                 value: JSON.stringify(classificacao),
    //                 text: classificacao
    //             })
    //         })

    //         selectClassificacao.setData(dataClassificacao)
    //     }
    // })

    selectElementos = new SlimSelect({
        select: '#elementosFase',
        required: true,
        data: [
            { placeholder: true, text: 'Escolha os elementos contidos' },
        ]
    })

    $.ajax({
        url: Rotasclass['gets']['elementosNames'],
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        success: function (data) {
            let dataElementos = [
                { placeholder: true, text: 'Escolha os elementos contidos' },
            ]

            data.map(elemento => {
                dataElementos.push({
                    value: elemento.sigla,
                    text: elemento.sigla + " - " + elemento.nome
                })
            })

            selectElementos.setData(dataElementos)
        },

    })


    // selectGrupo = new SlimSelect({
    //     select: '#grupoFase',
    //     required: true,
    //     data: [

    //     ]
    // })

    // $.ajax({
    //     url: Rotasclass['gets']['elementos']("grupo"),
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     success: function (data) {
    //         let dataGrupo = [
    //             { placeholder: true, text: 'Escolha o grupo' },
    //         ]
    //         data.map(grupo => {
    //             dataGrupo.push({
    //                 value: JSON.stringify(grupo),
    //                 text: grupo
    //             })
    //         })

    //         selectGrupo.setData(dataGrupo)
    //     }
    // })

};

dinamicReq['Alunos'] = () => {
    $.ajax({
        url: Rotasclass['gets']['alunos'],
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let tabela = document.getElementById("table-users");
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
            $('#tabela-de-alunos').DataTable({
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
            });
        }
    });
}

dinamicReq["Turmas"] = () => {

    let arrayEscolas = [
        { placeholder: true, text: 'Selecione uma escola' },
    ];
    $.ajax({
        url: Rotasclass['gets']['turma'],
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let tabela = document.getElementById("table-turmas");
            data.forEach(turma => {
                let trTurma = criaTrturma(turma)
                tabela.appendChild(trTurma);
            });

        },
        error: function (e) {
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }

        },
        complete: function (data) {
            $('#tabela-de-turmas').DataTable().destroy()
            $('#tabela-de-turmas').DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "Não há turmas cadastrados",
                    "info": "Turma(s) _START_ a _END_ de um total de: _TOTAL_",
                    "infoEmpty": "Nenhuma turma encontrado",
                    "infoFiltered": "(filtrado de _MAX_ turmas)",
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

    // Chamada para preencher o select de escolas do cadastro de turmas do professor
    $.ajax({
        url: Rotasclass['gets']['escolaProfessor'],
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
        },
        success: function (data) {
            data.forEach(element => {
                arrayEscolas.push({ value: element.id, text: element.nome })
            });
        },
        error: function (e) {
            console.log(e);
        },
        complete: function (data) {


            if (selectEscola !== undefined) {
                selectEscola.destroy()
                selectEscola = undefined;
            }

            selectEscola = new SlimSelect({
                select: '#escola-turma-create',
                required: true,
                data: arrayEscolas,
            })
        }
    })
}

dinamicReq['Quiz'] = () => {
    // createQuizProcedientos()
    $('#form-quiz-create')[0].reset();
    // $("#alternativasQuiz > li.active").removeClass("active");
    $("#turmaFase").addClass("d-none");
    if (selectTurma !== undefined) {
        selectTurma.destroy()
        selectTurma = undefined;
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
            selectTurma = new SlimSelect({
                select: '#SelecetTurma',
                required: true,
                data: turmas,
                onChange: (info) => {
                    if (selectFase !== undefined) {
                        selectFase.destroy()
                        selectFase = undefined;
                    }
                    $.ajax({
                        method: "GET",
                        url: Rotasclass['gets']['fasesTurma'](info.value),
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        success: function (data) {
                            $("#turmaFase").removeClass("d-none");

                            let fases = [
                                { placeholder: true, text: '-------Selecione uma fase------' },
                            ]

                            data.forEach(turmaFase => {
                                fases.push({ value: turmaFase.ID, text: turmaFase.Fase.nome })
                            });




                            selectFase = new SlimSelect({
                                select: '#SelecetFase',
                                required: true,
                                data: fases
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
        complete: function (data) {
        }
    });



}