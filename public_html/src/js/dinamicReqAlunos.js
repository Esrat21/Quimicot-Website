const dinamicReqAlunos = {};
const token = window.sessionStorage.getItem("token") != null ? window.sessionStorage.getItem("token") : null;



dinamicReqAlunos['Turmas'] = () => {

    $.ajax({
        url: Rotasclass['gets']['turmaAluno'],
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        success: function (data) {
            let tabela = document.getElementById("table-aluno-turmas");
            if (tabela ) {
                data.forEach(turma => {
                    let trTurma = criarTrTurmaAluno(turma)
                    tabela.appendChild(trTurma);
                });
            }
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
                },
                responsive: true,
            });
        }
    })
}