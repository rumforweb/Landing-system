<?php
// адрес письма
$webmaster_email = "partnership@cyber.bet";


// URL-адреса поддерживающих страниц (спасибо, ошибка и тд.)
$feedback_page = "index.html";
$error_page = "error.html";
$thankyou_page = "thanks.html";


// загружает данные поля формы в переменные 
$email_address = $_REQUEST['email_address'] ;
$msg = 
"Email: " . $email_address . "\r\n" ;


// функция проверяет наличие электронной почты
function isInjected($str) {
	$injections = array('(\n+)',
	'(\r+)',
	'(\t+)',
	'(%0A+)',
	'(%0D+)',
	'(%08+)',
	'(%09+)'
	);
	$inject = join('|', $injections);
	$inject = "/$inject/i";
	if(preg_match($inject,$str)) {
		return true;
	}
	else {
		return false;
	}
}

// если поля верны покажем станицу
if (!isset($_REQUEST['email_address'])) {
header( "Location: $feedback_page" );
}

// если все верно, блогодарим
else {

	mail( "$webmaster_email", "May be new Streamer!", $msg );

	header( "Location: $thankyou_page" );
}
?>