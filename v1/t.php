<?php
session_start();
ini_set("max_execution_time", 15000);
ignore_user_abort(TRUE);
include('../setup.php');

$message='rrrrrr6544534354354b n4535435435435';

file_put_contents('../../error_add.txt', date('[Y-m-d H:i:s] ') . $message."\n===========\n", FILE_APPEND | LOCK_EX);		

die;