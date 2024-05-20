
function criaTrProfessor(objectProfessor) {

    let trProfessor = document.createElement('tr');
    let tdCadPendente = document.createElement('td');
    let tdCpf = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdTelephone = document.createElement('td');
    let tdOfButton = document.createElement('td');
    let button = document.createElement('button');


    //Colocando os dados nas td's
    tdCadPendente.innerHTML = objectProfessor.cad_pendente == 1 ? 'Pendente' : 'Aceito';
    tdCpf.innerHTML = objectProfessor.cpf;
    tdEmail.innerHTML = objectProfessor.email;
    tdId.innerHTML = objectProfessor.id;
    tdNome.innerHTML = objectProfessor.nome;
    if (objectProfessor.telefone == null) {
        tdTelephone.innerHTML = 'Não informado'
    } else {
        //Tratamento do numero de telefone
        let phone = `(${objectProfessor.telefone.substring(0, 2)}) ${objectProfessor.telefone.substring(2)}`
        tdTelephone.innerHTML = phone
    }
    tdOfButton.appendChild(button)
    button.innerHTML = objectProfessor.cad_pendente == 1 ? 'Aceitar' : 'Revogar';
    button.id = objectProfessor.id
    button.style.width = '100%';
    button.classList.add(...(() => {
        if (button.innerHTML == 'Aceitar') {
            return "btn btn-success text-light"
        } else {
            return "btn btn-danger text-light"
        }
    })().split(" "))

    button.setAttribute('onClick', 'alterarPendencia(this)')


    //Inserindo as td's na tr do professor
    trProfessor.appendChild(tdId);
    trProfessor.appendChild(tdNome);
    trProfessor.appendChild(tdEmail);
    trProfessor.appendChild(tdCpf);
    trProfessor.appendChild(tdTelephone);
    trProfessor.appendChild(tdCadPendente);
    trProfessor.appendChild(tdOfButton);
    trProfessor.setAttribute("class", "professor")

    return trProfessor
}

function alterarPendencia(element) {
    const idProfessor = element.id
    if (element.innerHTML == 'Aceitar') {
        $.ajax({
            url: Rotasclass['posts']['professorPendencia'] + "/" + idProfessor,
            method: 'POST',
            data: { metodo: "aceitar" },
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',
            success: function(data){
                if (data.Alterado) {
                    element.parentNode.parentNode.childNodes[5].innerText = `Aceito`
                    element.innerHTML = "Remover"
                    element.classList.remove("btn-success");
                    element.classList.add("btn-danger")
                    Swal.fire({
                        icon: 'success',
                        title: "Acesso aprovado",
                        allowOutsideClick: false
                    })
                }
            },
            error:function(error){
                console.log(error);
            }
        })
    } else {
        $.ajax({
            url: Rotasclass['posts']['professorPendencia'] + "/" + idProfessor,
            method: 'POST',
            data: { metodo: "revogar" },
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',
            success: function(data){
                if (data.Alterado) {
                    element.parentNode.parentNode.childNodes[5].innerText = `Pendente`
                    element.innerHTML = "Aceitar"
                    element.classList.remove("btn-danger");
                    element.classList.add("btn-success");
                    Swal.fire({
                        icon: 'success',
                        title: "Acesso revogado",
                        allowOutsideClick: false
                    })
    
                }

            },
            error:function(error){
                console.log(error);
            }
        })
    }
}

