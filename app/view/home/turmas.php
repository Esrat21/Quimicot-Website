<header class="w-100 text-center text-light bg-dark pt-1 pb-1">
    <h3>Turmas</h3>
</header>
<div class="col-12 d-flex p-0 justify-content-center">
    <section class="col-7 bg-light border-top border-bottom border-info m-2" style="border-top-width: 2px !important;">
        <h3 class="p-2">Lista de Turmas</h3>
        <table class="table table-striped table-hover" id="tabela-de-turmas">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Escola</th>
                    <th>Ano</th>
                </tr>
            </thead>
            <tbody id="table-turmas" class="ponteiro">
            </tbody>
        </table>
    </section>
    <section class="col-4 bg-light border-top border-bottom border-info m-2 p-2" style="border-top-width: 2px !important; max-height: 500px; ">
        <h3 class="p-2">Cadastrar Turma</h3>
        <form id="form-turma-create" autocomplete="off">
            <div class="form-group">
                <label for="InputName" class="font-weight-bold">Nome</label>
                <input type="text" class="form-control" id="nomeTurma" placeholder="Nome da Turma" name="name" required>
            </div>
            <div class="form-group">
                <label for="InputEscola" class="font-weight-bold">Escola</label>
                <select name="escola" id="escola-turma-create">
                </select>
            </div>
            <div class="form-group">
                <label for="InputAno" class="font-weight-bold">Ano</label>
                <input type="text" class="form-control" id="anoTurma" placeholder="Informe o ano da turma ex: 2021" name="ano" minlength="4" pattern="\d{4}" required>
            </div>
            <div class="form-group ">
                <label for="exampleInputPassword" class="font-weight-bold">Senha</label><br />
                <small>(Esta senha devera ser compartilhada com os alunos desta turma)</small>
                <input type="password" class="form-control" id="senhaTurma" placeholder="Crie uma senha" name="password" minlength="8" required>
            </div>
            <div class="box-footer">
                <button type="submit" class="btn btn-success">Criar</button>
            </div>
        </form>
    </section>
</div>
<section id="customModal" class="invisible bg-light vh-100 col-12 p-0 fade-in overflow-auto">
    <div class="d-flex text-light bg-dark  pr-3 pt-1 m-0 text-center fixed-top col-11" style="left: 15.5%">
        <div class="exit col-2">
            <button id="exitModal" class="btn btn-secondary mt-auto col-10">
                <i class="seta-esquerda"></i>
                Voltar
            </button>

        </div>
        <div class="col-10">
            <h2 class="" id="Titulo">Turma de Sistemas</h2>
        </div>

    </div>

    <div class="m-5 p-3">
        <section id="listFasesTurma">
            <h3>Estatísticas da turma</h3>
            <h5>Total de alunos na turma: <span id="total-de-alunos-na-turma">0</span></h5>
        </section>
        <section>
            <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                <h4>Média de aproveitamento por fase</h4>
                <div class="d-flex justify-content-center align-items-center">
                    <h5>Aproveitamento</h5>
                    <button type="button" class="btn btn-warning ml-3" data-toggle="modal" data-target="#modalAproveitamentoFase">
                        <strong>?</strong>
                    </button>
                </div>
                <div id="divEstatisticaRadarTurma" class="" style=" height:70vh; width:70vh">
                    <div id="erroEstatisticaRadarTurma" class="d-none mt-5">
                        <div class='alert alert-warning'>Não há dados para mostrar</div>
                    </div>
                    <canvas id="estatisticaRadarTurma"></canvas>
                </div>
            </div>
            <hr>
            <div class="col-12 d-flex align-items-center justify-content-center">
                <div class="col-6">
                    <h4>Estatísticas da fase</h4>

                    <div class="form-group">
                        <label for="InputEstaticaFase">Selecione uma fase</label><br>
                        <select name="classificacao" id="EstatisticaFase">
                        </select>
                        <small>* Escolha uma fase para ver suas estatísticas</small>
                    </div>
                    <div id="divEstatisticaPizzaTurma" class="d-none" style=" height:60vh; width:60vh">
                        <div class="d-flex justify-content-around">
                            <button id="mediaEstatisticaPizzaTurma" class="btn btn-primary">Médias</button>
                            <button id="metricasEstatisticaPizzaTurma" class="btn btn-secondary">Tentativas</button>
                        </div>

                        <div id="erroEstatisticaPizzaTurma" class="d-none mt-5">
                            <div class='alert alert-warning'>Não há dados para mostrar</div>
                        </div>
                        <canvas id="estatisticaPizzaTurma"></canvas>

                    </div>
                </div>

                <div class="col-6 invisible" id="divEstatisticaQuestao">
                    <h4>Estatísticas da questão</h4>

                    <div class="form-group">
                        <label for="InputEstaticaQuestao">Selecione uma questão</label><br>
                        <select name="classificacao" id="EstatisticaQuestao">
                        </select>
                        <small>* Escolha uma questão para ver suas estatísticas</small>
                    </div>
                    <div id="divEstatisticaPizzaQuestao" class="d-none" style=" height:60vh; width:60vh">
                        <div class="d-flex justify-content-center align-items-center">
                            <strong>Aproveitamento:&nbsp;</strong><span id="aproveitamentoQuestao"></span>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-warning ml-3" data-toggle="modal" data-target="#modalAproveitamento">
                                <strong>?</strong>
                            </button>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-around">
                            <button id="mediaEstatisticaPizzaQuestao" class="btn btn-primary">Médias</button>
                            <button id="metricasEstatisticaPizzaQuestao" class="btn btn-secondary">Tentativas</button>
                        </div>

                        <div id="erroEstatisticaPizzaQuestaoMedias" class="d-none mt-5">
                            <div class='alert alert-warning'>Não há dados para mostrar</div>
                        </div>
                        <canvas id="estatisticaPizzaQuestaoMedias"></canvas>
                        <!-- <hr>
                        <canvas id="estatisticaPizzaQuestaoMetricas"></canvas> -->
                    </div>
                </div>
            </div>

        </section>
    </div>

    <div class="p-3">
        <h3>Lista de alunos na turma</h3>
        <small>* Escolha um aluno para ver suas estatísticas</small>
        <section class="bg-light border-top border-bottom border-info m-2" style="border-top-width: 2px !important;">
            <table class="table table-striped table-hover" id="tabela-de-alunos">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody id="table-users" class="ponteiro">
                </tbody>
            </table>
        </section>
    </div>
    <div class="contentModal mb-5 flex-row">
        <form action="" id="form-vincular-fase" class="bg-white border-top border-bottom border-info p-2 col-5" style="border-top-width: 2px !important; max-height: 454px; ">
            <h2>Vincular fase na turma</h2>
            <div class="form-group">
                <label for="SelecetVincularFase" class="font-weight-bold">Fase</label>
                <select id="SelecetVincularFase" name="turma" required>
                </select>
                <button type="submit" class="vincularFase btn btn-success mt-2">Vincular</button>
            </div>
        </form>
        <form action="" id="form-desvincular-fase" class="bg-white border-top border-bottom border-info p-2 col-5" style="border-top-width: 2px !important; max-height: 454px; ">
            <h2>Desvincular fase da turma</h2>
            <div class="form-group">
                <label for="SelecetDesvincularFase" class="font-weight-bold">Fase</label>
                <select id="SelecetDesvincularFase" name="turma" required>
                </select>
                <button type="submit" class="DesvincularFase btn btn-danger mt-2">Desvincular</button>
            </div>
        </form>
    </div>

</section>

<section id="customModalAluno" class="invisible bg-light vh-100 col-12 p-0 fade-in overflow-auto">
    <div class="d-flex text-light bg-dark pt-1 pr-3 m-0 text-center fixed-top col-11" style="left: 15.5%">
        <div class="exit col-2">
            <button id="exitModalAluno" class="btn btn-secondary mt-auto col-10">
                <i class="seta-esquerda"></i>
                Voltar
            </button>
        </div>
        <div class="col-10">
            <h2 class="" id="Titulo">Informações do aluno</h2>
        </div>
    </div>

    <div class="m-5 p-3">
        <section id="listFasesTurma">
            <h3>Estatísticas do aluno</h3>
            <strong>Nome:</strong><span id="nomeAlunoAnalise"></span> <br>
            <strong>Email:</strong><span id="emailAlunoAnalise"></span>
        </section>

        <section>
            <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                <h4>Estatísticas por questão</h4>

                <div class="form-group">
                    <label for="InputEstaticaFaseAluno">Selecione uma fase</label><br>
                    <select name="classificacao" id="EstatisticaFaseAluno">
                    </select>
                    <small>* Escolha uma fase para ver estatísticas do aluno na fase</small>
                </div>
                <div id="divEstatisticaBarrasAluno" class="d-none" style=" height:70vh; width:70vh">
                    <div id="btnEstatisticaBarrasAluno" class="d-flex justify-content-around">
                        <button id="estatisticaBarrasAlunoAcerto" class="btn btn-primary">Acerto</button>
                        <button id="estatisticaBarrasAlunoErro" class="btn btn-secondary">Erro</button>
                        <button id="estatisticaBarrasAlunoTentativas" class="btn btn-secondary">Tentativas</button>
                    </div>


                    <div id="erroEstatisticaBarrasAlunoSemDados" class="d-none mt-5">
                        <div class='alert alert-warning'>Não há dados para mostrar</div>
                    </div>

                    <canvas id="estatisticaBarrasAluno"></canvas>
                    <canvas id="erroEstatisticaBarrasAluno" class="d-none"></canvas>
                    <canvas id="tentativasEstatisticaBarrasAluno" class="d-none"></canvas>
                    <div class="d-flex justify-content-center">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCompleteAsks">
                            Ver as Perguntas Completas
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section>
            <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                <h4>Média de aproveitamento por fase</h4>
                <div id="divEstatisticaRadarTurma" class="" style=" height:70vh; width:70vh">
                    <canvas id="estatisticaRadarTurma"></canvas>
                </div>
            </div>
            <hr>
            <div class="col-12 d-flex align-items-center justify-content-center">
                <div class="col-6">
                    <h4>Estatísticas da fase</h4>
                    <div class="form-group">
                        <label for="InputEstaticaFase">Selecione uma fase</label><br>
                        <select name="classificacao" id="EstatisticaFase">
                        </select>
                        <small>* Escolha uma fase para ver suas estatísticas</small>
                    </div>
                    <div id="divEstatisticaPizzaTurma" class="d-none" style=" height:60vh; width:60vh">
                        <canvas id="estatisticaPizzaTurma"></canvas>
                    </div>
                </div>

                <div class="col-6 invisible" id="divEstatisticaQuestao">
                    <h4>Estatísticas da questão</h4>
                    <div class="form-group">
                        <label for="InputEstaticaQuestao">Selecione uma questão</label><br>
                        <select name="classificacao" id="EstatisticaQuestao">
                        </select>
                        <small>* Escolha uma questão para ver suas estatísticas</small>
                    </div>
                    <div id="divEstatisticaPizzaQuestao" class="d-none" style=" height:60vh; width:60vh">
                        <strong>Aproveitamento:</strong><span id="aproveitamentoQuestao"></span>
                        <canvas id="estatisticaPizzaQuestaoMedias"></canvas>
                        <canvas id="estatisticaPizzaQuestaoMetricas"></canvas>
                    </div>
                </div>
            </div>

        </section> -->
    </div>

</section>

<!-- Modal Aproveitamento Fase -->
<div class="modal fade" id="modalAproveitamentoFase" tabindex="-1" aria-labelledby="modalAproveitamentoFaseLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAproveitamentoFaseLabel">Aproveitamento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-justify">
                <h3>O que é ?</h3>
                O termo aproveitamento representa uma aproximação sobre o rendimento escolar avaliado conforme as informações
                contidas nesse contexto, que neste caso, refere-se ao aproveitamento da turma na fase indicada.
                <h3>Como é calculado? </h3>
                Este aproveitamento é calculado utilizando o número de tentativas inválidas que ocorreram antes da primeira resposta
                correta, ou seja, o valor para de ser atualizado assim que o aluno acerta pela primeira vez a questão.<br>
                Nós chamaremos o número de tentátivas inválidas de "penalidade" para que possamos simplificar a fórmula.

                <img src="./src/img/AproveitamentoFase.png" class="w-100" alt="">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal Aproveitamento-->
<div class="modal fade" id="modalAproveitamento" tabindex="-1" aria-labelledby="modalAproveitamentoLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAproveitamentoLabel">Aproveitamento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-justify">
                <h3>O que é ?</h3>
                O termo aproveitamento representa uma aproximação sobre o rendimento escolar avaliado conforme as informações
                contidas nesse contexto, que neste caso, refere-se ao aproveitamento da turma na questão selecionada.
                <h3>Como é calculado? </h3>
                Este aproveitamento é calculado utilizando o número de tentativas inválidas que ocorreram antes da primeira resposta
                correta, ou seja, o valor para de ser atualizado assim que o aluno acerta pela primeira vez a questão.<br>
                Nós chamaremos o número de tentátivas inválidas de "penalidade" para que possamos simplificar a fórmula.

                <img src="./src/img/AproveitamentoQuestao.png" class="w-100" alt="">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Perguntas completas-->
<div class="modal fade" id="modalCompleteAsks" tabindex="-1" aria-labelledby="modalCompleteAsksLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCompleteAsksLabel">Perguntas Completas</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalCompleteAskBody">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>