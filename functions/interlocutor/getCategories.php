<?php
/*
 * Description : Answer to a call ajax, retrieve the categories
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/
require_once('../dao.php');

echo json_encode(getCategories());