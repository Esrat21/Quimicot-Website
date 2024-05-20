<?php

if (isset($_POST["data"])) {
    $data = json_decode($_POST["data"]);

    if (is_object($data) && $data->Aprovado == true) {
        include "../app/view/adm/home_adm.php";
    } else {
        http_response_code(403);
    }
} else {
    include "../app/view/adm/login_adm.php";
}
