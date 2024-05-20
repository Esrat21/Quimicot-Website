<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>
    <form  method="post" id="formAdmLogin">
        <input type="email" name="email" id="email" required>
        <input type="password" name="senha" id="senha" required>
        <button type="submit">Acessar</button>
    </form>

    <form action="./adm.php" method="POST" id="redirect" style="display: none;">
        <input type="hidden" name="data" id="data">
    </form>

    <script src="src/js/jquery-3.5.1.min.js"></script>
    <script src="src/js/sweetalert2@9.js"></script>
    <script>
        $("#formAdmLogin").on("submit", (e) => {
            e.preventDefault();
            console.log("aaaa");
            let formData = new FormData(document.getElementById("formAdmLogin"));
            let dataJSON = Object.fromEntries(formData)
            let submitJSON = {
                email: dataJSON['email'],
                senha: dataJSON['senha']
            }
            $.ajax({
                url: "https://apichemical.quimicotgames.com/admin/login",
                method: "POST",
                data: submitJSON,
                beforeSend: function(data) {
                    Swal.fire({
                        position: 'center',
                        title: 'Enviando suas informações',
                        showConfirmButton: false,
                        onBeforeOpen: () => {
                            Swal.showLoading()
                        }
                    })
                },
                success: function(data) {
                    Swal.close();
                    if (data["Aprovado"]) {
                        window.sessionStorage.setItem("token", data['Token'])
                        window.sessionStorage.setItem("user", `${JSON.stringify(data.User)}`)

                        $("#data").val(JSON.stringify(data))
                        $("#redirect").submit();

                    }

                },
                error: function(error) {
                    Swal.close();
                    
                },
            })
        })
    </script>
</body>

</html>