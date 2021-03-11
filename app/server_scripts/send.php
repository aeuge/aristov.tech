<?php

###############################   Настройки почты    ###########################################
// Основные настройки отправительного ящик сделаны для Яндекс почты, 
// если нужна другая правим настройки ниже (host,ssl и т.д.)
// А Отправлять можно на любой

// Логин почты от имени которой будет отправляться 
$myLogin   = 'aristov.tech'; 

// Пароль почты от имени которой будет отправляться 
// (чтобы не вводить свой пароль можно использовать "пароли приложений" у Яндекса) 
 // Для яндекса не забыть поставить разрешающие галочки Почта → Все настройки → Почтовые программы
$myPassword   = 'ekoqovivohmiydbe';

// E-mail от имени которого будет отправляться 
$myEmail = 'aristov.tech@yandex.ru';

// Имя отправителя
$myName = 'Aristov.tech'; 

// Получатель письма (ящик куда отправляем)
$whereToSend = 'vyatchigor@yandex.ru';  

###############################################################################################





// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';


if (isset($_POST['name'],$_POST['email'],$_POST['text'])) {

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];    

// Формирование самого письма
$title = "Письмо с Aristov.tech";
$body = "
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {

    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = $myLogin; // Логин на почте (чтобы не вводить свой пароль можно использовать "пароли приложений")
    $mail->Password   = $myPassword; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom($myEmail, $myName); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress($whereToSend);  
    //$mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

}