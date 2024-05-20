function criaTrAluno(objectAluno) {
    let trAluno = document.createElement('tr');

    let tdEmail = document.createElement('td');
    let tdNome = document.createElement('td');

    //Colocando os dados nas td's
    tdEmail.innerHTML = objectAluno.email;
    tdNome.innerHTML = objectAluno.nome;

    //Inserindo as td's na tr do professor
    trAluno.appendChild(tdNome);
    trAluno.appendChild(tdEmail);


    trAluno.id = objectAluno.id

    if (trAluno.innerHTML == "") {
        return false
    } else {
        return trAluno
    }
}

function criarTrFaseNaTurma(objectFaseNaTurma) {
    console.log(objectFaseNaTurma);
    let trFaseNaTurma = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdTurma = document.createElement('td');

    //objectFaseNaTurma = { faseContem:{elementos:['Cu']}}

    tdNome.innerHTML = objectFaseNaTurma.faseNome
    tdTurma.innerHTML = objectFaseNaTurma.turmasVinculadas.join(", ")

    // entrar no objeto objectFaseNaTurma.faseContem.elementos e pegar os elementos
    let elementos = objectFaseNaTurma.faseContem.elementos
    // criar uma td com os elementos
    let tdElementosContidos = document.createElement('td')
    tdElementosContidos.innerHTML = elementos.join(", ")


    trFaseNaTurma.appendChild(tdNome)
    trFaseNaTurma.appendChild(tdTurma)
    trFaseNaTurma.appendChild(tdElementosContidos)

    if (trFaseNaTurma.innerHTML == "") {
        return false
    } else {
        return trFaseNaTurma;
    }
}

function criarTrQuiz(objectQuiz) {
    let trQuiz = document.createElement('tr');

    let tdID = document.createElement('td');
    let tdPergunta = document.createElement('td');

    //Colocando os dados nas td's
    tdID.innerHTML = objectQuiz.quiz_id;
    tdPergunta.innerHTML = objectQuiz.pergunta;

    //Inserindo as td's na tr do professor
    trQuiz.appendChild(tdID);
    trQuiz.appendChild(tdPergunta);


    trQuiz.id = objectQuiz.quiz_id

    if (trQuiz.innerHTML == "") {
        return false
    } else {
        return trQuiz
    }
}

function criaTrturma(objectTurma) {
    const { escola, ano, nome, id } = objectTurma

    let trTurma = document.createElement('tr');

    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdEscola = document.createElement('td');
    let tdAno = document.createElement('td');

    //Colocando os dados nas td's
    tdId.innerHTML = id;
    tdNome.innerHTML = nome;
    tdAno.innerHTML = ano;
    tdEscola.innerHTML = escola.nome

    //Inserindo as td's na tr do professor
    trTurma.appendChild(tdId);
    trTurma.appendChild(tdNome);
    trTurma.appendChild(tdEscola);
    trTurma.appendChild(tdAno);

    trTurma.id = id

    trTurma.title = "Clique para ver mais informações"

    if (trTurma.innerHTML == "") {
        return false
    } else {
        return trTurma
    }
}

$("#form-turma-create").on("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(document.getElementById('form-turma-create'));
    let dataJSON = Object.fromEntries(formData)

    let submitData = {
        escola: +dataJSON.escola,
        nome: dataJSON.name,
        senha: MD5(dataJSON.password),
        ano: +dataJSON.ano
    }



    $.ajax({
        url: Rotasclass['posts']['cadastrar']['turma'],
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
        },
        data: submitData,
        success: (data) => {
            Swal.fire({
                icon: 'success',
                title: "Turma criada",
                allowOutsideClick: false,
            })
        },
        error: (e) => {
            if (e.responseJSON.Errors.includes('Authorisation Failed')) {
                window.sessionStorage.setItem("nav", "Acessar")
                window.sessionStorage.removeItem("token")
                window.location.href = 'login.php';
            }
            console.log(e);
        },
        complete: (data) => {
            if (data.status == 200) {
                document.location.reload()
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: "Erro ao criar turma",
                    allowOutsideClick: false,
                })
            }
        }
    })
})