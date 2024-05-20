function Rotas(baseUrl) {
    this.baseUrl = baseUrl,
        this.posts = {
            cadastrar: {
                professor: `${this.baseUrl}/professor`,
                aluno: `${this.baseUrl}/aluno`,
                turma: `${this.baseUrl}/professor/turmas`,
                quiz: `${this.baseUrl}/professor/turmas/quiz`,
                escola: `${this.baseUrl}/admin/escola`,
            },
            login: `${this.baseUrl}/login`,
            ingressar: `${this.baseUrl}/aluno/turmas/ingressar`,
            professorPendencia: `${this.baseUrl}/admin/acessoProfessor`,
            fase: `${this.baseUrl}/admin/fase`,
            vincularFase: (id) => {
                return `${this.baseUrl}/professor/turmas/${id}/vincularFase`;
            },
            desvincularFase: (id) => {
                return `${this.baseUrl}/professor/turmas/${id}/desvincularFase`;
            },
            atualizarPerguntaQuiz: (id) => {
                return `${this.baseUrl}/professor/turmas/quiz/${id}/atualizar`;
            },
            atualizarAlternativaQuiz: (id_quiz, id_alternativa) => {
                { return `${this.baseUrl}/professor/turmas/quiz/${id_quiz}/atualizarAlternativa/${id_alternativa}` }
            },
            deletarPerguntaQuiz: (id) => {
                return `${this.baseUrl}/professor/turmas/quiz/${id}/deletar`;
            },

        },
        this.gets = {
            elementos: (filtro) => {
                return `${this.baseUrl}/elementos?filtro=${filtro}`
            },
            infoElemento: (id) => {
                return `${this.baseUrl}/elementos/get/${id}`
            },
            resultados:(id) => {
                return `${this.baseUrl}/aluno/resultados/analises?turma=${id}`
            },
            elementosNames: `${this.baseUrl}/elementos/names`,
            qtdJogadas: (turmaId) => {
                return `${this.baseUrl}/aluno/resultados/qtdJogadas?turma=${turmaId}`
            },
            professor: `${this.baseUrl}/admin/professor`,
            turma: `${this.baseUrl}/professor/turmas`,
            fases: `${this.baseUrl}/fases`,
            fasesTurma: (id) => { return `${this.baseUrl}/professor/turmas/${id}/fases` },
            fasesNaoVinculadasTurma: (id) => { return `${this.baseUrl}/professor/turmas/${id}/fases?vinculadas=false` },
            escola: `${this.baseUrl}/escola`,
            escolaProfessor: `${this.baseUrl}/professor/escolas`,
            alunos: (id) => { return `${this.baseUrl}/professor/turmas/alunos?turma=${id}` },
            turmaAluno: `${this.baseUrl}/aluno/turmas`,
            turmaAlunoFase: (turma, elemento) => { return `${this.baseUrl}/aluno/turmas/fases?idTurma=${turma}&elemento=${elemento}` },
            turmaAlunoFaseAll: (turma) => { return `${this.baseUrl}/aluno/turmas/fases?idTurma=${turma}` },
            quizesFaseProfessor: (id_turma, id_fase) => { return `${this.baseUrl}/professor/turmas/${id_turma}/fases/${id_fase}/quizes` },
            analiseQuiz: (id_quiz) => {
                return `${this.baseUrl}/professor/analises/quiz/${id_quiz}`
            },
            professorAllQuizes: `${this.baseUrl}/professor/allquizes`,
            analiseAluno: (id_aluno, idTurma) => {
                let rota = `${this.baseUrl}/professor/analises/aluno/${id_aluno}`
                if (idTurma) {
                    rota += `?turma=${idTurma}`
                }
                return rota
            },
            analiseTurmaFase: (turma_fase) => {
                return `${this.baseUrl}/professor/analises/turmaFase/${turma_fase}`
            },
            analiseTurma: (turma) => {
                return `${this.baseUrl}/professor/analises/turma/${turma}`
            },
            fasesComTurma: `${this.baseUrl}/professor/fasescomturmas`


        }
    return this;
}

let Rotasclass = Rotas('https://apichemical.quimicotgames.com');