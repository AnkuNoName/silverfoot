<?php

$method = $_SERVER['REQUEST_METHOD'];

// Перевірка методу запиту (POST або GET)
if ($method === 'POST') {
    // Отримання значень з форми, відправленої методом POST
    $project_name = trim($_POST["project_name"]);
    $admin_email = trim($_POST["admin_email"]);
    $form_subject = trim($_POST["form_subject"]);

    // Ініціалізація змінної для збереження повідомлення
    $message = "";

    // Ітерація по всім полям форми
    foreach ($_POST as $key => $value) {
        // Якщо значення не порожнє і не є одним зі спеціальних полів
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            // Додаємо рядок до повідомлення, що містить назву поля та його значення
            $message .= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
            </tr>
            ";
        }
    }
} elseif ($method === 'GET') {
    // Отримання значень з форми, відправленої методом GET
    $project_name = trim($_GET["project_name"]);
    $admin_email = trim($_GET["admin_email"]);
    $form_subject = trim($_GET["form_subject"]);

    // Ініціалізація змінної для збереження повідомлення
    $message = "";

    // Ітерація по всім полям форми
    foreach ($_GET as $key => $value) {
        // Якщо значення не порожнє і не є одним зі спеціальних полів
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            // Додаємо рядок до повідомлення, що містить назву поля та його значення
            $message .= "
            <tr>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
            </tr>
            ";
        }
    }
}

// Формування HTML-таблиці для повідомлення
$message = "<table style='width: 100%;'>$message</table>";

// Функція для кодування тексту з використанням UTF-8 та Base64
function adopt($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

// Формування заголовків для відправки електронної пошти
$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $admin_email . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . '' . PHP_EOL;

// Відправка електронної пошти
mail($admin_email, adopt($form_subject), $message, $headers);
