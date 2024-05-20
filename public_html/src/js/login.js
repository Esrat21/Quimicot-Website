const checkProfessor = document.getElementById("professor");
const sectionProfessor = document.getElementById("professores");
const formCadastro = document.getElementById("form-cadastro")
const formLogin = document.getElementById("form-login")
const request = new Request()
let select;

function marcarInputErrado(erro) {
    if (erro.includes("'email'")) {
        let email = document.getElementById("email_cadastro")
        email.classList.add("bg-danger")
    }
    if (erro.includes("'nome'")) {
        let nome = document.getElementById("nome_cadastro")
        nome.classList.add("bg-danger")
    }
    if (erro.includes("'cpf'")) {
        let cpf = document.getElementById("cpf_cadastro")
        cpf.classList.add("bg-danger")
    }
    if (erro.includes("'senha'")) {
        let senha = document.getElementById("senha_cadastro")
        let c_senha = document.getElementById("c_senha_cadastro")
        senha.classList.add("bg-danger")
        c_senha.classList.add("bg-danger")
    }
    if (erro.includes("'telefone'")) {
        let telefone = document.getElementById("telefone")
        telefone.classList.add("bg-danger")
    }
}

checkProfessor.addEventListener("click", () => {
    if (checkProfessor.checked) {
        sectionProfessor.classList.remove("d-none");
        sectionProfessor.innerHTML = `
        <div class="form-group text-left mb-4">
            <label for="cpf_cadastro">CPF</label>
            <input id="cpf_cadastro" name="cpf_cadastro" required onKeyPress="MascaraGenerica(this, 'CPF')"
                placeholder="ex. 999.999.999-99" maxlength="14" autocomplete="off"
                class="form-control" />
        </div>
        <div class="form-group text-left mb-4">
            <label for="escolas">Escola</label>
            <select id="escolas" name="escolas" multiple>
            </select>
        </div>
        <div class="form-group text-left mb-4">
            <label for="telefone_cadastro">Telefone</label>
            <input id="telefone" type="text" name="telefone_cadastro" minlength="15"
                onKeyPress="MascaraGenerica(this, 'TELEFONE')" onblur="MascaraGenerica(this, 'TELEFONE')" placeholder="ex. (34) 99999-9999"
                maxlength="15" autocomplete="off" class="form-control" />
        </div>
        `;

        select = new SlimSelect({
            select: '#escolas',
            required: true,
            placeholder: 'Escolha a(s) escola(s) onde trabalha',
            data: []
        })

        $.ajax({
            url: Rotasclass['gets']['escola'],
            method: 'GET',
            success: function (data) {
                let arrayEscolas = []
                data.forEach(escola => {
                    arrayEscolas.push({ value: +escola.id, text: escola.nome })
                });
                select.setData(arrayEscolas)
            },
            error: function (error) {
                console.error(error.responseJSON);
            },
        })

    } else {
        sectionProfessor.innerHTML = " "
        sectionProfessor.classList.add("d-none")
    }
});

$("#form-login").on("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(formLogin);
    let dataJSON = Object.fromEntries(formData)
    let submitJSON = {
        email: dataJSON['email_login'],
        senha: MD5(dataJSON['senha_login'])
    }
    $.ajax({
        url: Rotasclass['posts']['login'],
        method: "POST",
        data: submitJSON,
        beforeSend: function (data) {
            Swal.fire({
                position: 'center',
                title: 'Enviando suas informações',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                }
            })
        },
        success: function (data) {
            Swal.close();
            if (data["Aprovado"]) {
                window.sessionStorage.setItem("token", data['Token'])
                window.sessionStorage.setItem("user", `${JSON.stringify(data.User)}`)

                if (data["Tipo"] == "Professor") {
                    window.sessionStorage.setItem("nav","Turmas")
                    window.location.href = 'home.php'
                } else {
                    window.sessionStorage.setItem("aluno", true)
                    window.sessionStorage.setItem("nav","Turmas")
                    window.location.href = 'homeAluno.php'
                }
            }

        },
        error: function (error) {
            Swal.close();
            const response = JSON.parse(error.responseText)
            const { Tipo } = response
            console.log(Tipo);
            if (Tipo == "Desconhecido") {
                Swal.fire({
                    icon: 'error',
                    title: "Email ou senha inválidos",
                    onClose: () => {
                        document.getElementById('senha_login').value = "";
                    },
                    allowOutsideClick: false
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Cadastro Pendente (Entre em contato com os administradores)",
                    onClose: () => {
                        
                    },
                    allowOutsideClick: false
                })
            }
        },
    })
})

$('#form-cadastro').on("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(formCadastro);
    let dataJSON = Object.fromEntries(formData)
    if (dataJSON["c_senha_cadastro"] != dataJSON["senha_cadastro"]) {
        Swal.fire({
            icon: 'error',
            title: "Senhas não coincidem",
            onClose: () => {
                document.getElementById('c_senha_cadastro').classList.add('bg-danger')
                document.getElementById('c_senha_cadastro').value = ""
                document.getElementById('senha_cadastro').classList.add('bg-danger')
                document.getElementById('senha_cadastro').value = ""
            },
            allowOutsideClick: false
        })
    } else {
        document.getElementById('c_senha_cadastro').classList.remove('bg-danger')
        document.getElementById('senha_cadastro').classList.remove('bg-danger')
        let submitJSON = {}
        if (checkProfessor.checked) {
            //Cadastrando como Professor
            submitJSON['nome'] = dataJSON['nome_cadastro'];
            submitJSON['email'] = dataJSON['email_cadastro'];
            submitJSON['senha'] = MD5(dataJSON['senha_cadastro']);
            submitJSON['cpf'] = dataJSON['cpf_cadastro']
            if (dataJSON['telefone_cadastro'] != "") {
                submitJSON['telefone'] = dataJSON['telefone_cadastro'];
            }
            if (!dataJSON['escolas']) {
                Swal.fire({
                    icon: 'error',
                    title: "O campo escola não pode ser vazio",
                    onClose: () => {
                        $('.ss-multi-selected').addClass("bg-danger")
                    },
                    allowOutsideClick: false
                })
            } else {
                $('.ss-multi-selected').removeClass("bg-danger")
                submitJSON['escolas'] = select.selected().map((numero) => {
                    return parseInt(numero, 10);
                });

                console.log(submitJSON);
                request.criarComLoad(
                    'Aguarde um momento! Estamos realizando o seu cadastro',
                    {
                        icon: 'success',
                        title: 'Cadastro efetuado com sucesso',
                        text: 'Aguarde seu cadastro ser aprovado',
                        onClose: () => {
                            navigationAuth({ innerText: "Acessar" })
                        },
                        allowOutsideClick: false
                    },
                    "Houve um erro inesperado ao tentar realizar o cadastro",
                    Rotasclass['posts']['cadastrar']['professor'],
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(submitJSON),
                        mode: 'cors',
                    },
                    (erros) => {
                        erros.forEach(erro => marcarInputErrado(erro))
                    }
                )
                $("#form-cadastro").trigger("reset");
            }
        } else {
            //Cadastro aluno
            submitJSON['nome'] = dataJSON['nome_cadastro'];
            submitJSON['email'] = dataJSON['email_cadastro'];
            submitJSON['senha'] = MD5(dataJSON['senha_cadastro']);
            request.criarComLoad(
                'Aguarde um momento! Estamos realizando o seu cadastro',
                {
                    icon: 'success',
                    title: 'Cadastro efetuado com sucesso',
                    onClose: () => {
                        navigationAuth({ innerText: "Acessar" })
                    },
                    allowOutsideClick: false
                },
                "Houve um erro inesperado ao tentar realizar o cadastro",
                Rotasclass['posts']['cadastrar']['aluno'],
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(submitJSON),
                    mode: 'cors',
                },
                (erros) => {
                    erros.forEach(erro => marcarInputErrado(erro))
                }
            )
        }
    }
})
