<?php
/*
 * Description : Answer to an ajax call, update a category if valid data are given
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/
require_once('../dao.php');

$catName = filter_input(INPUT_POST, 'newName', FILTER_SANITIZE_STRING);
$catId = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

if(updateCategory($catName, $catId)){
    echo 'Catégorie bien mise à jour!';
} else {
    echo "Une erreur est survenue, modification impossible. Contacter l'administrateur";
}
