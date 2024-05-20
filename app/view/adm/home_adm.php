<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADM</title>
    <link rel="stylesheet" href="src/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="src/css/slimselect.min.css">
    <link rel="stylesheet" href="src/css/adm.css">
    <script src="src/js/navigation.js"></script>
    <script>
        window.onload = () => {
            if (!window.sessionStorage.getItem("nav")) {
                window.sessionStorage.setItem("nav", "Usuários");
            }
            navigation({
                innerText: window.sessionStorage.getItem("nav")
            })
        }
    </script>


</head>

<body>
    <div id="app" class="d-flex vh-100">
        <section class="col-2 h-100 bg-dark">
            <div class="d-flex justify-content-center">
                <span class="iconify" data-inline="false" data-icon="ic:round-science" style="font-size: 100px; color: white;"></span>
            </div>
            <hr class="bg-secondary">
            <!-- <div id="nav"> -->
            <div class="d-flex flex-column justify-content-between col-2 sidebar-container" style="height: 68vh;">
                <ul id="nav" class="sidebar-navigation">
                    <!-- <button class="btn btn-info w-100 mb-2" onclick="navigation(this)">
                    Alunos
                </button> -->
                    <li class="active">
                        <a onclick="navigation(this)">
                            Usuários
                        </a>
                    </li>
                    <!-- <button class="btn btn-info w-100 mb-2" onclick="navigation(this)">
                        Turmas
                    </button> -->
                    <li>
                        <a onclick="navigation(this)">
                            Escolas
                        </a>
                    </li>
                    <li>
                        <a onclick="navigation(this)">
                            Fase
                        </a>
                    </li>
                    <!-- <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                        Quiz
                    </button> -->

                    <!-- <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                    Eventos
                </button>
                <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                    Ferramentas
                </button>
                <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                    Petianos
                </button> -->
                </ul>
            </div>

            <!-- <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                Usuários
            </button>
            <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                Escolas
            </button>
            <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                Fase
            </button> -->
            <!-- <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                    Eventos
                </button>
                <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                    Ferramentas
                </button>
                <button class="btn btn-light w-100 mb-2" onclick="navigation(this)">
                    Petianos
                </button> -->
            <!-- </div> -->
        </section>
        <section id="content" class="col-10 vh-100 bg-light p-0" style="background-color: #ecf0f5 !important">
            <div id="Usuários" class="col-12 h-100 p-0 d-none overflow-auto">
                <?php
                include "../app/view/adm/adm_usuarios.php";
                ?>
            </div>
            <div id="Escolas" class="col-12 h-100 p-0 d-none overflow-auto">
                <?php
                include "../app/view/adm/adm_escolas.php";
                ?>
            </div>
            <div id="Fase" class="col-12 h-100 p-0 d-none overflow-auto">
                <?php
                include "../app/view/adm/adm_fase.php";
                ?>
            </div>
            <!-- <div id="Eventos" class="col-12 h-100 p-0 d-none">
                <header class="w-100 text-center text-light bg-dark pt-1 pb-1">
                    <h3>Painel de eventos</h3>
                </header>
            </div>
            <div id="Ferramentas" class="col-12 h-100 p-0 d-none">
                <header class="w-100 text-center text-light bg-dark pt-1 pb-1">
                    <h3>Painel de ferramentas</h3>
                </header>
            </div>
            <div id="Petianos" class="col-12 h-100 p-0 d-none">
                <header class="w-100 text-center text-light bg-dark pt-1 pb-1">
                    <h3>Painel de petianos</h3>
                </header>
            </div> -->
        </section>
    </div>
    <script src="src/js/jquery-3.5.1.min.js"></script>
    <script src="src/js/bootstrap.min.js"></script>
    <script src="src/js/iconify.min.js"></script>
    <script src="src/js/sweetalert2@9.js"></script>
    <script src="src/js/jquery.dataTables.min.js"></script>
    <script src="src/js/slimselect.min.js"></script>
    <script src="src/js/dinamicReq.js"></script>
    <script src="src/models/Rotas.js"></script>
    <script src="src/js/adm.js"></script>
    <script src="src/js/admEscola.js"></script>
    <!-- <script src="src/js/admFase.js"></script> -->
    <script src="src/js/faseCreate.js"></script>
</body>

</html>