function criarTrTurmaAluno(objectTurma) {
    const { Turma_id, Turma_nome, Professor_nome, Turma_ano } = objectTurma
    let trTurma = document.createElement('tr');
    let tdID = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdProfessor = document.createElement('td');
    let tdAno = document.createElement('td');

    tdID.innerHTML = Turma_id;
    tdNome.innerHTML = Turma_nome;
    tdProfessor.innerHTML = Professor_nome;
    tdAno.innerHTML = Turma_ano;

    trTurma.appendChild(tdID);
    trTurma.appendChild(tdNome)
    trTurma.appendChild(tdProfessor)
    trTurma.appendChild(tdAno)

    trTurma.id = Turma_id;

    if (trTurma.innerHTML == "") {
        return false
    } else {
        return trTurma
    }
}

function swalErro(menssage) {
    Swal.fire({
        icon: 'error',
        title: menssage,
        allowOutsideClick: false
    })
}

$("#form-turma-ingresso").on("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(document.getElementById("form-turma-ingresso"));
    let dataJSON = Object.fromEntries(formData)
    let submitData = {}
    submitData = {
        turma: +dataJSON.turma,
        senha: MD5(dataJSON.senha),
    }

    $.ajax({
        url: Rotasclass['posts']['ingressar'],
        data: submitData,
        method: "POST",
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
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: "Você ingressou na turma",
                allowOutsideClick: false,
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    // dar um reload na pagina
                    window.location.reload();
                }
            })
        },
        error: function (error) {
            Swal.close();
            console.log(error);
            if (error.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            } else {
                swalErro(error.responseJSON.Errors)
            }
        },
        complete: function (data) {
            navigation({
                innerText: window.sessionStorage.getItem("nav")
            })
        }
    })
})