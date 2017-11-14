<?php
/*
 * Description : Answer to a call ajax, delete an event if a valid id is received
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

require_once('../dao.php');

$eventId= filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

if(deleteEvent($eventId)){
    echo 'Evénement bien supprimé!';
} else {
    echo "Une erreur est survenue, suppression impossible. Contacter l'administrateur";
}