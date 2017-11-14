<?php
/*
 * Description : Answer to a form, check if the given login are legit
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

session_start();
require_once('../dao.php');
$salt = 'Lorem ipsum dolor sit amet';

if(isset($_SESSION['admin']) && $_SESSION['admin']){ //If the admin was connected he clicked on the 'deconnect' button
    session_unset();
    header("Location: ../../index.php");
    exit();
} else {
    $email = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_EMAIL);
    $pw = filter_input(INPUT_POST, 'pw', FILTER_SANITIZE_STRING) . $salt;

    if(filter_var($email, FILTER_VALIDATE_EMAIL) != false){
        foreach(getUser() as $user){
            if($user['email'] == $email && password_verify($pw, $user['pwHash']) && $user['isAdmin'] == '1'){
                $_SESSION['admin'] = true;
                header("Location: ../../index.php");
                exit();
            }
        }
    }
}

header("Location: ../../login.php?error=true");