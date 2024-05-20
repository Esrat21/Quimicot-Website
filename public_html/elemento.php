<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuimiCot</title>
    <link rel="stylesheet" href="src/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="src/css/slimselect.min.css">
    <link rel="stylesheet" href="src/css/home.css">
    <link rel="stylesheet" href="src/css/customModal.css">
    <link rel="stylesheet" href="src/css/tabelaPeriodica.css">
    <link rel="stylesheet" href="src/css/elemento.css">
    <link rel="shortcut icon" href="src/images/favicon.ico">
    <script src="src/js/navigation.js"></script>
    <script>
        if (!window.sessionStorage.getItem("token")) {
            window.location.href = 'login.php'
        }
    </script>
    <script>
        window.onload = () => {
            if (!window.sessionStorage.getItem("nav")) {
                console.log('aaa');
                window.sessionStorage.setItem("nav", "Turmas");
            }
            navigation({
                innerText: window.sessionStorage.getItem("nav")
            })

            let user = document.getElementById("user");
            let teste = JSON.parse(window.sessionStorage.getItem("user"))
            user.innerHTML = teste.nome


        }
    </script>

</head>

<body>
    <div id="app" class="d-flex vh-100">
        <section class="col-1 h-100 bg-dark d-none d-lg-block ">
            <?php
            include "../app/view/homeAluno/minNavBarLateral.php";
            ?>
        </section>
        <section id="content" class="col-lg-11 col-12  bg-light p-0 " style="background-color: #ecf0f5 !important">
            <div id="Turmas" class="col-12 h-100 p-0 d-none overflow-auto" style="background-color: #ecf0f5 !important">
                <header class="w-100 text-center text-light bg-dark pt-1 pb-1">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-lg-none">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <button class="btn btn-info w-100 mt-2 mb-2" id="btnTurmaMobile" onclick="navigation(this)">
                                Turmas
                            </button>
                            <button class="btn btn-danger w-100 mb-2" onclick="navigation(this)">
                                Sair
                            </button>
                        </div>
                    </nav>
                    <div class=" position-absolute  ">
                        <button class="btn btn-info w-100 ml-2" onclick="history.back()">
                            Voltar
                        </button>
                    </div>
                    <h3>Elemento</h3>
                </header>
                <main class="justify-content-center">

                    <!-- criar uma div do elemento quimico -->
                    <!-- <div id="grid-container"> -->
                    <div class="row col-12 mt-3">
                        <div class="col-12 col-md-2 ">
                            <section class="container-elemento w-75 mx-auto d-block border border-dark pt-3" style="max-width: 200px;">
                                <span class="mr-5"></span>
                                <h2></h2>
                                <p></p>
                                <p></p>
                            </section>
                        </div>
                        <div class="row col-12 col-md-10 mt-2 mx-auto mx-md-0">
                            <div class="col-12 col-md-4 mb-3 mb-md-0">
                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseCaracterísticasGerais" aria-expanded="false" aria-controls="collapseCaracterísticasGerais">
                                    Características gerais
                                </button>
                                <div class="collapse" id="collapseCaracterísticasGerais">
                                    <div class="card card-body d-flex">
                                        <!-- <div class="dropdown-divider"></div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-3 mb-md-0">
                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapsePropriedadesFísicas" aria-expanded="false" aria-controls="collapsePropriedadesFísicas">
                                    Propriedades físicas
                                </button>
                                <div class="collapse" id="collapsePropriedadesFísicas">
                                    <div class="card card-body d-flex">
                                        <!-- <div class="dropdown-divider"></div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-3 mb-md-0">
                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapsePropriedadesQuímicas" aria-expanded="false" aria-controls="collapsePropriedadesQuímicas">
                                    Características atômicas
                                </button>
                                <div class="collapse" id="collapsePropriedadesQuímicas">
                                    <div class="card card-body d-flex">
                                        <!-- <div class="dropdown-divider"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </main>

                <!-- Seção de avisos sem dados -->
                <div class="container-fluid d-none" id="avisoSemDados">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="text-center">Aviso</h4>
                        </div>
                    </div>
                </div>


                <!-- Seção de graficos -->
                <div class="container-fluid" id="graficosEstatisticos">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="text-center">Gráficos</h4>
                            <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                <div style=" height:60vh; width:60vh">
                                    <canvas id="estatisticaPizzaFaseTotalJogadas"></canvas>
                                </div>
                                <div style=" height:60vh; width:60vh">
                                    <canvas id="estatisticaPizzaQuizesTotalRespondidos"></canvas>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                <div style=" height:60vh; width:80vh">
                                    <canvas id="metricasDoJogo"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Seção de fases -->
                <div class="container-fluid mt-5" id="fases">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="text-center">Fases</h4>
                            <div class="table-responsive">
                                <table class="table" id='tableFasesElemento'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Jogar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    </div>

    <script src="src/js/jquery-3.5.1.min.js"></script>
    <script src="src/js/bootstrap.bundle.min.js"></script>
    <script src="src/js/iconify.min.js"></script>
    <script src="src/js/sweetalert2@9.js"></script>
    <script src="src/js/jquery.dataTables.min.js"></script>
    <script src="src/js/slimselect.min.js"></script>
    <script src="src/chartJS/chart.min.js"></script>
    <script src="src/models/Rotas.js"></script>
    <script src="src/js/encrypt.js"></script>
    <script src="src/js/elemento.js"></script>
    <!-- <script src="src/js/homeAluno.js"></script> -->
    <!-- <script src="src/js/customModal.js"></script> -->
    <script src="src/js/dinamicReqAlunos.js"></script>
    <!-- <script src="src/js/handleClickOnElements.js"></script> -->

</body>

</html>