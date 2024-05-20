<header class="w-100 text-center text-light bg-dark pt-1 pb-1">
    <h3>Painel de Fase</h3>
</header>
<section class="p-2">
    <form id="form-fase-create" class="bg-light border-top border-info m-2 p-2">
        <div class="form-group">
            <label for="InputFase">Nome da Fase</label>
            <input type="text" class="form-control" id="nomeFase" placeholder="Digite o nome da Fase" name="nome" required>
        </div>
        <div class="form-group">
            <label for="InputURL">URL da Fase</label>
            <input type="url" class="form-control" id="URLFase" placeholder="https://example.com" pattern="https?://.*" name="url" required>
        </div>
        <div class="form-group">
            <label for="InputCriador">Criador</label>
            <input type="text" class="form-control" id="CriadorFase" placeholder="Fulano Junior" name="criador" required>
        </div>
        <div class="form-group">
            <label for="InputDificulde">Dificulde</label>
            <select name="dificuldade" id="dificuldadeFase">
            </select>
        </div>
        <div class="form-group">
            <label for="InputDificulde">Tempo Ideal para concluir(segundos)</label>
            <input type="number" class="form-control" name="tempo_medio_seg" min="0" id="tempoIdealFase" placeholder="Tempo ideal da fase" required>
        </div>
        <!-- <div class="form-group">
            <label for="InputClassificacao">Classificações de elementos contidos</label>
            <select name="classificacao" id="classificacaoFase" multiple>
            </select>
        </div> -->
        <div class="form-group">
            <label for="InputElementos">Elementos contidos</label>
            <select name="elementos" id="elementosFase" multiple>
            </select>
        </div>
        <!-- <div class="form-group">
            <label for="InputGrupo">Grupos de elementos contidos</label>
            <select name="grupo" id="grupoFase" multiple>
            </select>
        </div> -->
        <div class="form-group" style="display:flex; flex-direction: row-reverse;">
            <button type="button" id="button-plus" class="btn btn-success">+ Informações</button>
        </div>
        <section id="plus-information">

        </section>

        <div class="box-footer">
            <button type="submit" class="btn btn-success">Criar</button>
        </div>
    </form>
</section>