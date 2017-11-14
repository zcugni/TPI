<?php
/*
 * Description : Answer to an ajax call, retrieve the range of years
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/
require_once("../dao.php");
echo json_encode(getYearRange());