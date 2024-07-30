<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuimiCot</title>
    <link rel="stylesheet" href="/Quimicot-Website/public_html/src/css/bootstrap.min.css">
</head>


<header class="w-100 text-center text-light bg-dark pt-1 pb-1">
    <h3>Criar Escolas</h3>
</header>
<section class="bg-light border-top border-info m-2">
    <form id="form-escola-create" class="p-2">
        <div class="form-group">
            <label for="nomeEscola">Escola</label>
            <input type="text" class="form-control" id="nomeEscola" placeholder="Digite o nome da Escola" name="nome" required>
        </div>
        <div class="box-footer">
            <button type="submit" class="btn btn-success">Criar</button>
        </div>
    </form>
</section>
<section class="col-12">
    <table class="table table-striped" id="tabela-de-escolas">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
            </tr>
        </thead>
        <tbody id="tbody-table-escolas">

        </tbody>
    </table>
</section>