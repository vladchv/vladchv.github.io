<?php

// для марквиза

$http = 'http'; // протокол, http или https 

if( isset($_SERVER['HTTPS'] ) ) {
	$http = 'https'; // протокол, http или https 
	}

$domen = $_SERVER['HTTP_HOST'] . '/quiz/';
// на какую страницу редиректить после окончания марквиза
$redir = 'https://vk.com/remont_otdelka48';

// для почты
$from = 'quiz@'.$_SERVER['HTTP_HOST'];
$to ='luxomebel@mail.ru'; //to
$Subject='Заявка с сайта '.$_SERVER['HTTP_HOST']; // тема приходящего письма



//Для битрикса
// https://dizayn-remont.bitrix24.ru/rest/23/1cx1g81i6g432rj9/
/*
сопоставление слов и ID справочника (источников)
 */

$arr_lib=array(

'yandex_retarget'=>4,
'yandex_rsi'=>3,
'yandex_poisk'=>'ADVERTISING',
'vkontakte'=>'WEBFORM', //'ВК таргет'=>'WEBFORM',

'Инстаграм'=>2,
'Другое'=>1,
'Лендинг'=>'OTHER',
'Мебель'=>'RC_GENERATOR',
'Обратный звонок'=>'CALLBACK',
'Вк таргет'=>'WEBFORM',
'ВК лс'=>'STORE',
'ВК сообщ.'=>'TRADE_SHOW',
'По рекомендации'=>'RECOMMENDATION',
'Повторный'=>'PARTNER',
'Ядирект'=>'ADVERTISING',
'Авито'=>'WEB',
'Партнерка'=>'EMAIL',
'Звонок'=>'CALL',
'Не выбрано'=>'',
);




// формируем URL в переменной $queryUrl
$queryUrl = 'https://dizayn-remont.bitrix24.ru/rest/23/1cx1g81i6g432rj9/crm.lead.add.json';