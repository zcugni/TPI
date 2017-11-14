<?php
/*
 * Description : Answer to a call ajax, insert an event if valid data are given
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/

require_once('../dao.php');

///TO_DO : faire filter_input_array
    $event = json_decode($_POST['event']);

    try {
        if(!empty($_FILES)){ //new image
            $imgName = $_FILES['img']['name'];
            $imgFilePath = '../../img/' . $imgName;
            move_uploaded_file($_FILES['img']['tmp_name'], $imgFilePath);
        }  else {
            $imgName = null;
        }

        myPDO()->beginTransaction();

        insertEvent($event->title, $event->description, $imgName, $event->startingDay, $event->startingMonth, $event->startingYear, $event->endingDay, $event->endingMonth, $event->endingYear);
        $idPost = myPDO()->lastInsertId();

        foreach($event->categories as $idCategory)
            insertRelation($idPost, $idCategory);
            
        myPDO()->commit();

        echo 'Evénement bien ajouté!';
    } catch (Exception $e){
        if(!empty($imgFilePath) && file_exist($imgFilePath)) //cancel upload if there was a problem
            unlink($imgFilePath);

        myPDO()->rollBack();
        echo "Une erreur est survenue, ajout impossible. Contacter l'administrateur";
    }
    
