<?php
session_start();
ini_set("max_execution_time", 15000);
ignore_user_abort(TRUE);
include('../setup.php');



$data = file_get_contents("php://input");
$data=json_decode($data,true);
$msg='';

if(is_array($data) && count($data)>1){
$ok_1=true;
	
	$name='';
	$email='';
	$phone='';
	
	if(isset($data['contacts'])){
		foreach ($data['contacts'] as $a=>$b ){
			if ($b!='')	{
				$msg.=$a.': '.$b.'<br>'."\n";
				if ($a=='name') $name=$b;
				if ($a=='email') $email=$b;
				if ($a=='phone') $phone=$b;
				}
		
			}
		}
	foreach ($data['answers2'] as $a=>$b){
		if(is_array($b)){
			foreach ($b as $c=>$d){
		
		if(!is_array($d)){	
		if ($c=='q'){
			$msg.=$d.' ';

			
				}
		if ($c=='a'){
				$msg.=$d.'<br>'."\n";
				}
				
		if($ok_1 && is_array($b['a'])){
					foreach ($b['a'] as $e=>$f){
					$msg.=$f.' '."\n";
					}
		 	$msg.='<br>'."\n";
			$ok_1=false;		
					}
				
				
				
			}
				
			
		}
			}
		}
	
	}

$header  = "Content-type: text/html; charset=utf-8\r\n";
$header .= "From: {$from}" . "\r\n";
$header .= 'X-Mailer: PHP v'.phpversion()."\r\n";
   
   
   
$arr_utm_bx24=array();	
$str_utm='';
if (isset($_SESSION['arr_utm']) && (count($_SESSION['arr_utm'])>0)) {
	foreach ($_SESSION['arr_utm'] as $a=>$b){
		$c=substr($a,0,4);
		
  if(stristr($c, 'utm_') === FALSE) {
  } else{
	  $str_utm .= $a.': '.$b."\n".'<br>';
	  $arr_utm_bx24[strtoupper($a)]=$b;
	  
	  }
		}
//	$_SESSION['arr_utm']='';
//	unset($_SESSION['arr_utm']);
	}

	if (strlen($str_utm)>5){
	$msg.='UTM метки: '."\n".'<br>'.$str_utm;
	}
   
   
   
   
   		// в битрикс.

// вот отсюда брать строку битрикса-источника utm_source		
// формируем параметры для создания лида в переменной $queryData

if (!empty($arr_utm_bx24['UTM_SOURCE']) && isset($arr_lib[$arr_utm_bx24['UTM_SOURCE']])) $source=$arr_lib[$arr_utm_bx24['UTM_SOURCE']]; else $source='';


$queryData = http_build_query(array(
  'fields' => array(
    'TITLE' => 'С сайта '.$sitename. ' Квиз Копия',
    'EMAIL' => Array(
	    "n0" => Array(
	        "VALUE" => htmlspecialchars($email),
	        "VALUE_TYPE" => "WORK",
	    ),
	),
	'PHONE' => Array(
	    "n0" => Array(
	        "VALUE" => htmlspecialchars($phone),
	        "VALUE_TYPE" => "WORK",
	    ),
	),
  'NAME'=>$name,
  'COMMENTS'=>$msg,
  'SOURCE_ID'=>$source,
  'UTM_CAMPAIGN'=>$arr_utm_bx24['UTM_CAMPAIGN'],
  'UTM_CONTENT'=>$arr_utm_bx24['UTM_CONTENT'],
  'UTM_MEDIUM'=>$arr_utm_bx24['UTM_MEDIUM'],
  'UTM_SOURCE'=>$arr_utm_bx24['UTM_SOURCE'],
  'UTM_TERM'=>$arr_utm_bx24['UTM_TERM'],
  ),


  'params' => array("REGISTER_SONET_EVENT" => "Y")
));

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_POST => 1,
  CURLOPT_HEADER => 0,
  CURLOPT_RETURNTRANSFER => 1,
  CURLOPT_URL => $queryUrl,
  CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);
$result = json_decode($result, 1);
if (array_key_exists('error', $result)){
file_put_contents('../../error_add.txt', date('[Y-m-d H:i:s] ') . $message."\n===========\n", FILE_APPEND | LOCK_EX);	
}	
   
   
   
   
   
   
   
   
   
   
   
   
$message = wordwrap($msg, 70, "\r\n");




$Subject = "=?UTF-8?B?".base64_encode($Subject)."?=";	
if (mail($to, $Subject, $message, "$header","-f$from")) {
echo '1';
} else echo 'mail() error!';