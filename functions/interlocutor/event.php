<?php
/*
 * Description : Answer to a call ajax, 
 *               retrieve data on events in the database and form an array with them
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

$idCategory = filter_input(INPUT_GET, 'idCategory', FILTER_VALIDATE_INT);
$minYear = filter_input(INPUT_GET, 'minYear', FILTER_VALIDATE_INT);
$maxYear = filter_input(INPUT_GET, 'maxYear', FILTER_VALIDATE_INT);

require_once('../dao.php');

if($idCategory != false && $minYear != false && $maxYear != false){
    $eventArray = getEvents($idCategory, $minYear, $maxYear);
    $catName = getCatName($idCategory);

    foreach($eventArray as &$event)
        $event['categories'] = getAllCatForEvent($event['idEvent']);

    array_unshift($eventArray, $catName);
    array_unshift($eventArray, $idCategory);

    echo json_encode($eventArray);
}