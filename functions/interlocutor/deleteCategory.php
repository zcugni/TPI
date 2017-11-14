<?php
/*
 * Description : Answer to a call ajax, delete a category if a valid id is received
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

require_once('../dao.php');
$catId= filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

if(deleteCategory($catId)){
    echo 'Catégorie bien supprimée!';
} else {
    echo "Une erreur est survenue, suppression impossible. Contacter l'administrateur";
}
