<header class="w-100 text-center text-light bg-dark pt-1 pb-1">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-lg-none">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <button class="btn btn-info w-100 mt-2 mb-2" onclick="navigation(this)">
        Turmas
      </button>
      <button class="btn btn-danger w-100 mb-2" onclick="navigation(this)">
        Sair
      </button>
    </div>
  </nav>
  <h3>Turmas</h3>
</header>

<div id="conteudo" class="col-12 d-block d-lg-flex p-2 p-lg-0 justify-content-center">
  <section class="col-lg-7 col-12 bg-light border-top border-bottom border-info m-lg-2 p-2" style="border-top-width: 2px !important;">
    <h3 class="p-2">Lista de Turmas</h3>
    <table class="table table-striped table-hover" id="tabela-de-turmas">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Professor</th>
          <th>Ano</th>
        </tr>
      </thead>
      <tbody id="table-aluno-turmas">
      </tbody>
    </table>
  </section>
  <section class="col-lg-4 col-12 bg-light border-top border-bottom border-info mt-2 m-lg-2 p-2" style="border-top-width: 2px !important; ">
    <h3 class="p-2">Acessar Turma</h3>
    <form role="form" id="form-turma-ingresso" class="p-2">
      <div class="box-body">
        <div class="form-group">
          <label for="turma">Código da Turma</label>
          <input type="text" class="form-control" id="IDturma" placeholder="Digite o código da Turma (ex:12)" name="turma" pattern="\d+" required />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" class="form-control" id="senhaTurma" placeholder="Insira a senha da turma" minlength="8" name="senha" required />
        </div>
      </div>
      <!-- /.box-body -->
      <div class="box-footer">
        <button type="submit" class="btn btn-success">
          Entrar
        </button>
      </div>
    </form>
  </section>
</div>

<section id="customModal" class="invisible bg-light vh-lg-100 col-12 modalAluno">
  <div class="exit" style=" display: flex; justify-content: flex-end;">
    <button id="exitModal" class="btn btn-danger">
      x
    </button>
  </div>
  <div class="contentModal overflow-auto d-flex">

  </div>
</section>