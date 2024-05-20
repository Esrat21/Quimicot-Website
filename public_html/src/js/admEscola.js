$("#form-escola-create").on("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(document.getElementById("form-escola-create"));
    let dataJSON = Object.fromEntries(formData)
    $.ajax({
        url: Rotasclass['posts']['cadastrar']["escola"],
        data:dataJSON,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        beforeSend: function (data) {
            console.log("enviando os dados");
        },
        success: function (data) {
            if (data.ID) {
                Swal.fire({
                    icon: 'success',
                    title: "Escola cadastrada com sucesso",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        // dar um reload na pagina
                        window.location.reload();
                    }
                })
            }
        },
        error: function (error) {
            console.error(error.responseJSON);
            Swal.fire({
                icon: 'error',
                title: "Houve um erro ao tentar cadastrar escola",
                allowOutsideClick: false
            })
        },
        complete: function (data) {
            $("#form-escola-create").trigger("reset");

        }
    })
});

function criaTrEscola(objectProfessor) {

    let trEscola = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');


    //Colocando os dados nas td's
    tdId.innerHTML = objectProfessor.id;
    tdNome.innerHTML = objectProfessor.nome;
  
    //Inserindo as td's na tr do professor
    trEscola.appendChild(tdId);
    trEscola.appendChild(tdNome);

    return trEscola
}