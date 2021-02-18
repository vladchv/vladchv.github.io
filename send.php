<?php
ini_set('display_errors', 'On');
date_default_timezone_set('Europe/Moscow');

$thanks_file = 'form-ok.php';

if(isset($_POST['phone'])) {
	try {

		$name = trim($_REQUEST['name']);
		$phone = trim($_REQUEST['phone']);
		$email = trim($_REQUEST['email']);
		$size = trim($_REQUEST['size']);
		$product = json_decode($_REQUEST['product']['items']);	
	
        $ip = $_SERVER['REMOTE_ADDR'];
		
		$site = $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']);

		
		$from = array('noreply@' . $site);
		$to = file(__DIR__ . '/email.cnf');
		$to = array_map('trim', $to);
		$subject = 'Новый заказ с сайта ' . $site;
		$message = 'Поступил новый заказ с сайта ' . $site . ':
			<table>
				<tr>
					<td><b>Дата:</b></td>
					<td>' . date('d.m.Y H:i') . '</td>
				</tr>
				<tr>
					<td><b>Имя:</b></td>
					<td>' . $name . '</td>
				</tr>
				<tr>
					<td><b>Телефон:</b></td>
					<td>' . $phone . '</td>
				</tr>                ';
			if($email != '') {
				$message .= '<tr>
					<td><b>Email:</b></td>
					<td>' . $email . '</td>
				</tr>';
			}
     		if($size != '') {
				$message .= '<tr>
					<td><b>Размер:</b></td>
					<td>' . $size . '</td>
				</tr>';
			}
			if(is_array($product) && count($product) > 0) { 
					$message .= '<tr>
						<td colspan="2"><b>Заказ:</b></td>
					</tr>';
				foreach($product as $p) {
					$message .= '<tr>
						<td colspan="2">' . $p->title . ' - ' . $p->count . 'шт. - ' . $p->price . 'руб.</td>
					</tr>';
				}
			}

	    $message .= '</table>';				
		
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";
		$headers .= "From: " . implode(',', $from) . "\r\n";

		$result = mail(implode(',', $to), $subject, $message, $headers);
		
		if($result) {
			header('Location: ' . $thanks_file);
		}
		else {
			echo 'Ошибка';
		}
	}
	catch(Exception $e) {
		echo 'Ошибка';
	}
}?>