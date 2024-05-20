<header class="w-100 text-center text-light bg-dark pt-1 pb-1">
    <h3 id="titleQuiz">Criar Quiz</h3>
</header>
<section class="d-flex justify-content-center">
    <button id="createQuiz" class="btn btn-success m-2">Criar</button>
    <button id="listQuiz" class="btn btn-info m-2">Listar por turma</button>
    <button id="listQuizAll" class="btn btn-info m-2">Listar todos</button>
    <button id="updateQuiz" class="btn btn-primary m-2">Alterar</button>
    <button id="deleteQuiz" class="btn btn-danger m-2">Excluir</button>
</section>
<section id="sectionCreateQuiz" class="bg-light border-top border-bottom border-info m-2 p-2" style="border-top-width: 2px !important;">
    <h4>Criar o quiz para sua turma</h4>
    <form action="" id="form-quiz-create">
        <div class="form-group">
            <label for="SelecetTurma" class="font-weight-bold">Turma</label>
            <select id="SelecetTurma" name="turma" required>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFase">
            <label for="SelecetFase" class="font-weight-bold">Fase</label>
            <select id="SelecetFase" name="fase" required>
                <option value="" selected="selected" disabled>-------Selecione uma fase------</option>
            </select>
        </div>
        <div class="form-group">
            <label for="InputPergunta" class="font-weight-bold">Pergunta</label>
            <textarea type="text" class="form-control" id="InputPergunta" placeholder="Digite a pergunta do quiz" name="pergunta" required></textarea>
        </div>
        <div class="form-group">
            <label for="alternativasQuiz" class="font-weight-bold mb-0">Alternativas</label>
            <small class="form-text text-muted mt-0 mb-3">* As alternativas serão mostradas aleatoriamente para os alunos</small>
            <small class="form-text text-muted mt-0 mb-3">Depois de criar as altenativas selecione a opção correta</small>
            <ol type="a" id="alternativasQuiz" class="list-group">
                <li class="list-group-item active">
                    <label name="alternativasQuizA">Resposta Correta</label>
                    <input type="text" class="form-control" id="alternativasQuizA" placeholder="Alternativa" name="alternativasQuizA" required>
                    <input type="text" class="form-control mt-2" id="justificativaAlternativasQuizA" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizA">
                </li>
                <li class="list-group-item">
                    <label name="alternativasQuizB">Resposta errada 1</label>
                    <input type="text" class="form-control" id="alternativasQuizB" placeholder="Alternativa" name="alternativasQuizB" required>
                    <input type="text" class="form-control mt-2" id="justificativaAlternativasQuizB" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizB">
                </li>
                <li class="list-group-item">
                    <label name="alternativasQuizC">Resposta errada 2</label>
                    <input type="text" class="form-control" id="alternativasQuizC" placeholder="Alternativa" name="alternativasQuizC" required>
                    <input type="text" class="form-control mt-2" id="justificativaAlternativasQuizC" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizC">
                </li>
                <li class="list-group-item">
                    <label name="alternativasQuizD">Resposta errada 3</label>
                    <input type="text" class="form-control" id="alternativasQuizD" placeholder="Alternativa" name="alternativasQuizD" required>
                    <input type="text" class="form-control mt-2" id="justificativaAlternativasQuizD" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizD">
                </li>
            </ol>
        </div>
        <div class="box-footer">
            <button type="submit" class="btn btn-success">Criar</button>
        </div>
    </form>
</section>

<section id="sectionUpdateQuiz" class="bg-light border-top border-bottom border-info m-2 p-2 d-none" style="border-top-width: 2px !important;">
    <h4>Alterar o quiz da sua turma</h4>
    <form id="form-quiz-update">
        <div class="form-group">
            <label for="SelecetTurmaUpdate" class="font-weight-bold">Turma</label>
            <select id="SelecetTurmaUpdate" name="turma" required>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseUpdate">
            <label for="SelecetFaseUpdate" class="font-weight-bold">Fase</label>
            <select id="SelecetFaseUpdate" name="fase" required>
                <option value="" selected="selected" disabled>-------Selecione uma fase------</option>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseQuizUpdate">
            <label for="SelectQuizUpdate" class="font-weight-bold">Quiz</label>
            <select id="SelectQuizUpdate" name="quiz" required>
                <option value="" selected="selected" disabled>-------Selecione um quiz------</option>
            </select>
        </div>

        <!-- Opções para selecionar -->
        <div id="opcUpdate" class="d-none col-12 mb-3">
            <button type="button" id="btnAlterarPerguntaQuiz" class="btn btn-outline-info">Alterar a pergunta do quiz</button>
            <button type="button" id="btnAlterarAlternativaQuiz" class="btn btn-outline-info">Alterar a alternativa do quiz</button>
        </div>

        <!-- Alterar Pergunta -->
        <div id="inputAlterarPerguntaQuiz" class="d-none">
            <div class="form-group">
                <label for="InputAlterarPergunta" class="font-weight-bold">Pergunta</label>
                <textarea type="text" class="form-control" id="InputAlterarPergunta" placeholder="Digite a pergunta do quiz" name="pergunta" required></textarea>
            </div>
            <button type="button" id="salvarAlteracaoPergunta" class="btn btn-success">Salvar</button>
        </div>

        <!-- Alterar alternativa quiz -->
        <div id="divAlterarAlternativazQuiz" class="d-none">
            <div class="form-group">
                <label for="alterarAlternativasQuiz" class="font-weight-bold mb-0">Alternativas</label>
                <small class="form-text text-muted mt-0 mb-3">* As alternativas serão mostradas aleatoriamente para os alunos</small>
                <small class="form-text text-muted mt-0 mb-3">Depois de criar as altenativas selecione a opção correta</small>
                <ol type="a" id="alterarAlternativasQuiz" class="list-group">
                    <li class="list-group-item active">
                        <label name="alterarAlternativasQuizA">Resposta correta</label>
                        <input type="text" class="form-control" id="alterarAlternativaCorreta" placeholder="Alternativa" name="alternativasQuizA" required>
                        <input type="text" class="form-control mt-2" id="alterarJustificativaAlternativasCorreta" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizA">
                    </li>
                    <li class="list-group-item">
                        <label name="alterarAlternativasQuizB">Resposta errada 1</label>
                        <input type="text" class="form-control" id="alterarAlternativasQuizB" placeholder="Alternativa" name="alternativasQuizB" required>
                        <input type="text" class="form-control mt-2" id="alterarJustificativaAlternativasQuizB" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizB">
                    </li>
                    <li class="list-group-item">
                        <label name="alternativasQuizC">Resposta errada 2</label>
                        <input type="text" class="form-control" id="alterarAlternativasQuizC" placeholder="Alternativa" name="alternativasQuizC" required>
                        <input type="text" class="form-control mt-2" id="alterarJustificativaAlternativasQuizC" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizC">
                    </li>
                    <li class="list-group-item">
                        <label name="alternativasQuizD">Resposta errada 3</label>
                        <input type="text" class="form-control" id="alterarAlternativasQuizD" placeholder="Alternativa" name="alternativasQuizD" required>
                        <input type="text" class="form-control mt-2" id="alterarJustificativaAlternativasQuizD" placeholder="Justificativa" name="alternatjustificativaAlternativasQuizAivasQuizD">
                    </li>
                </ol>
            </div>
            <button type="button" id="salvarAlteracaoAlternativas" class="btn btn-success">Salvar</button>
        </div>
    </form>
</section>

<section id="sectionDeleteQuiz" class="bg-light border-top border-bottom border-info m-2 p-2 d-none" style="border-top-width: 2px !important;">
    <h4>Deletar o quiz da sua turma</h4>
    <form id="form-quiz-delete">
        <div class="form-group">
            <label for="SelectTurmaDelete" class="font-weight-bold">Turma</label>
            <select id="SelectTurmaDelete" name="turma" required>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseDelete">
            <label for="SelecetFaseDelete" class="font-weight-bold">Fase</label>
            <select id="SelecetFaseDelete" name="fase" required>
                <option value="" selected="selected" disabled>-------Selecione uma fase------</option>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseQuizDelete">
            <label for="SelectQuizDelete" class="font-weight-bold">Quiz</label>
            <select id="SelectQuizDelete" name="quiz" required>
                <option value="" selected="selected" disabled>-------Selecione um quiz------</option>
            </select>
        </div>
        <div id="opcDelete" class="d-none col-12">
            <button type="button" id="btnDeletarPerguntaQuiz" class="btn btn-outline-danger">Excluir a pergunta do quiz</button>
        </div>
    </form>
</section>

<section id="sectionListQuiz" class="bg-light border-top border-bottom border-info m-2 p-2 d-none" style="border-top-width: 2px !important;">
    <h4>Listar os seus quizes</h4>
    <form id="form-quiz-list">
        <div class="form-group">
            <label for="SelectTurmaList" class="font-weight-bold">Turma</label>
            <select id="SelectTurmaList" name="turma" required>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseList">
            <label for="SelecetFaseList" class="font-weight-bold">Fase</label>
            <select id="SelecetFaseList" name="fase" required>
                <option value="" selected="selected" disabled>-------Selecione uma fase------</option>
            </select>
        </div>
    </form>
    <div class="p-4 d-none" id="divTabelaListQuiz">
        <table class="table table-striped table-hover d-none" id="tabela-de-quiz-list">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Pergunta</th>
                </tr>
            </thead>
            <tbody id="table-list-quiz">
            </tbody>
        </table>
    </div>

    <!-- <form id="form-quiz-List">
        <div class="form-group">
            <label for="SelectTurmaList" class="font-weight-bold">Turma</label>
            <select id="SelectTurmaList" name="turma" required>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseList">
            <label for="SelecetFaseList" class="font-weight-bold">Fase</label>
            <select id="SelecetFaseList" name="fase" required>
                <option value="" selected="selected" disabled>-------Selecione uma fase------</option>
            </select>
        </div>
        <div class="form-group d-none" id="turmaFaseQuizList">
            <label for="SelectQuizList" class="font-weight-bold">Quiz</label>
            <select id="SelectQuizList" name="quiz" required>
                <option value="" selected="selected" disabled>-------Selecione um quiz------</option>
            </select>
        </div>
        <div id="opcList" class="d-none col-12">
            <button type="button" id="btnDeletarPerguntaQuiz" class="btn btn-outline-danger">Deletar a pergunta do quiz</button>
        </div>
    </form> -->
</section>

<section id="sectionListQuizAll" class="bg-light border-top border-bottom border-info m-2 p-2 d-none" style="border-top-width: 2px !important;">
    <h4>Listar todos os quizes</h4>


    <table class="table table-striped table-hover" id="tabela-de-all-quiz-list">
        <thead>
            <tr>
                <th>ID</th>
                <th>Pergunta</th>
                <th>Alternativas</th>
            </tr>
        </thead>
        <tbody id="table-list--all-quizes">
        </tbody>
    </table>

</section>