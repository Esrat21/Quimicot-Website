function navigation(e) {
    try {
        for (const item of document.getElementById("nav").children) {
            if (item.innerText == e.innerText) {
                // item.classList.remove("btn-light");
                item.classList.add("active");
            } else {
                if (item.innerText !== "Sair") {
                    item.classList.remove("active");
                    // item.classList.add("btn-light");
                }
            }
        }
        if (e.innerText == "Sair") {
            if (window.sessionStorage.getItem("aluno")) {
                window.sessionStorage.removeItem("aluno")
            }
            window.sessionStorage.setItem("nav", "Acessar");
            window.sessionStorage.removeItem("token")
            window.location.href = "login.php"
        } else {
            document.getElementById(window.sessionStorage.getItem("nav")).classList.add("d-none");
            document.getElementById(e.innerText).classList.remove("d-none");
            window.sessionStorage.setItem("nav", e.innerText);
            if (e.innerText == "Turmas") {
                $("#customModal").removeClass("visible fadeIN").addClass("invisible")
                $("#customModalAluno").removeClass("visible fadeIN").addClass("invisible")
            }
            if (e.innerText == "Quiz") {
                if (window.sessionStorage.getItem("nav-quiz") == "update") {
                    updateQuizClick();
                }else if(window.sessionStorage.getItem("nav-quiz") == "delete"){
                    $("#deleteQuiz").click()
                }else if(window.sessionStorage.getItem("nav-quiz") == "list"){
                    $("#listQuiz").click()
                }
                else{
                    createQuizProcedientos();
                }
            }
            try {
                if (window.sessionStorage.getItem("aluno")) {
                    dinamicReqAlunos[e.innerText]();
                } else {
                    dinamicReq[e.innerText]();
                }
            } catch (error) {
                console.log(error);
                //ignorando
            }
        }
    } catch (error) {
        window.sessionStorage.removeItem("nav");
        window.location.reload();
    }
    

}

function navigationAuth(e) {
    try {
        document.getElementById(window.sessionStorage.getItem("nav")).classList.add("d-none");
        document.getElementById(e.innerText).classList.remove("d-none");
        window.sessionStorage.setItem("nav", e.innerText);
    } catch (error) {
        window.sessionStorage.removeItem("nav");
        window.location.reload();
    }
}