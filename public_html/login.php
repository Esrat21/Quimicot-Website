<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>QuimiCot</title>
    <link rel="shortcut icon" href="src/images/favicon.ico">
    <script src="src/js/navigation.js"></script>
    <script>
        window.onload = () => {
            if (!window.sessionStorage.getItem("nav")) {
                window.sessionStorage.setItem("nav", "Acessar");
            }
            navigationAuth({
                innerText: window.sessionStorage.getItem("nav")
            })
        }
    </script>
    <link rel="stylesheet" href="src/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/css/slimselect.min.css">
    <link rel="stylesheet" href="src/css/index.css">

</head>

<body class="bg-dark vh-100">
    <div class="container-fluid vh-100">
        <div class="row h-100 align-items-center">
            <div class="col-md-4 d-none d-md-flex">
            </div>
            <section class="bg-light rounded text-center p-3 col-md-4 col-12 d-none" style="height: fit-content;" id="Acessar">
                <h1 class="page">Acessar</h1>
                <hr class="bg-dark">
                <form id="form-login">
                    <section id="erro" class="">
                        <p class="text-danger"></p>
                    </section>
                    <div class="form-group text-left mb-4">
                        <label for="email_login" class="">Seu e-mail</label>
                        <input type="email" class="form-control" id="email_login" name="email_login" placeholder="ex. contato@contato.com" required>
                    </div>
                    <div class="form-group text-left mb-4">
                        <label for="senha_login" class="">Sua senha</label>
                        <input id="senha_login" class="form-control" name="senha_login" minlength="8" required="required" type="password" placeholder="ex. ************" />
                    </div>


                    <div class="d-flex justify-content-around align-items-center m-4">
                        <a href="#" id="sign-up" onclick="navigationAuth({ innerText: 'Cadastrar'})">Não possui conta?</a>
                        <button type="submit" class="btn btn-primary w-50">Acessar</button>
                    </div>

                </form>
            </section>
            <section class="bg-light rounded text-center p-3 col-md-4 col-12 d-none" style="height: fit-content;" id="Cadastrar">
                <h1 class="">Cadastro</h1>
                <hr class="bg-dark">
                <form id="form-cadastro" autocomplete="off">
                    <section id="erro" class="">
                        <p class="text-danger"></p>
                    </section>
                    <div class="form-group text-left mb-4">
                        <label for="nome_cadastro">Seu nome</label>
                        <input id="nome_cadastro" class="form-control" name="nome_cadastro" required type="text" placeholder="ex. Fulano" />
                    </div>
                    <div class="form-group text-left mb-4">
                        <label for="email_cadastro" class="">Seu e-mail</label>
                        <input type="email" class="form-control" id="email_cadastro" name="email_cadastro" placeholder="ex. contato@contato.com" required>
                    </div>
                    <div class="form-group text-left mb-4">
                        <label for="senha_cadastro" class="">Sua senha</label>
                        <input id="senha_cadastro" class="form-control" name="senha_cadastro" required="required" type="password" minlength="8" placeholder="ex. ************" auto />
                    </div>

                    <div class="form-group text-left mb-4">
                        <label for="c_senha_cadastro">Confirme sua senha</label>
                        <input id="c_senha_cadastro" class="form-control" name="c_senha_cadastro" required minlength="8" type="password" placeholder="********" />
                    </div>

                    <div>
                        <input type="checkbox" id="professor"> Você é um professor?
                    </div>

                    <section id="professores" class="d-none">

                    </section>


                    <div class="d-flex justify-content-around align-items-center m-4">
                        <a href="#" id="sign-in" onclick="navigationAuth({ innerText: 'Acessar'})">Possui conta?</a>
                        <button type="submit" class="btn btn-primary w-50">Cadastrar</button>
                    </div>

                </form>
            </section>
            <div class="col-md-4  d-none d-md-flex">
            </div>
        </div>
    </div>

    <script src="src/js/jquery-3.5.1.min.js"></script>
    <script src="src/js/slimselect.min.js"></script>
    <script src="src/js/sweetalert2@9.js"></script>
    <script src="src/classes/Util.js"></script>
    <script src="src/classes/mask.js"></script>
    <script src="src/js/encrypt.js"></script>
    <script src="src/models/Rotas.js"></script>
    <script src="src/models/Request.js"></script>
    <script src="src/js/login.js"></script>
    <script>

    </script>
</body>

</html>