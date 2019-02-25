<?php
if ((isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['phone']) && $_POST['phone'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'firegor@mail.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Заявка с формы обратной связи'; //Загаловок сообщения

    $name = 'N/D';
    $phone = 'N/D';
    $mail = 'N/D';
    if (isset($_POST['name']) && $_POST['name'] != "")
    {
        $name = $_POST['name'];
    }
    if (isset($_POST['phone']) && $_POST['phone'] != "")
    {
        $phone = $_POST['phone'];
    }

    if (isset($_POST['email']) && $_POST['email'] != "")
    {
        $email = $_POST['email'];
    }



    $message = '
                <html>
                    <head>
                        <title>' . $subject . '</title>
                    </head>
                    <body>
                        <p>Имя: ' . $_POST['name'] . '</p>
                        <p>Телефон: ' . $_POST['phone'] . '</p>
                        <p>E-mail: ' . $_POST['email'] . '</p>

                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель site@it-rich.ru\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {

        echo "Ваша заявка отправлена";

    } //Отправка письма с помощью функции mail


    else {

        echo("Ошибка!<br> Ваша заявка не отправлена");
    }


} else {

    echo "Ошибка!<br> Ваше данные не были отпревлены";

}
?>