<?php
/*
 * Description : Answer to a call ajax, check if the admin is connected or not
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/
session_start();
require_once('../dao.php');

if(isset($_SESSION['admin']) && $_SESSION['admin'] == true)
    echo true;
else
    echo false;