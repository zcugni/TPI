<?php
/*
 * Description : Answer to a call ajax, insert a category if a valid name is given
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

require_once('../dao.php');

$catName = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

if(insertCategory($catName)){
    echo 'Catégorie bien ajoutée!';
} else {
    echo "Une erreur est survenue, ajout impossible. Contacter l'administrateur";
}