<?php
/*
 * Description : Answer to an ajax call, update an event if valid data are given
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/
require_once('../dao.php');

///TO_DO : faire filter_input_array
    $event = json_decode($_POST['event']);
    $oldImgName = $event->imgFileName;

    try {
        if(!empty($_FILES)){ //new image
            $imgName = $_FILES['img']['name'];
            $imgFilePath = '../../img/' . $imgName;
            move_uploaded_file($_FILES['img']['tmp_name'], $imgFilePath);
            
            if(!empty($oldImgName)) //no need to check if the file exist, if the old path is given it must exist
                unlink('../../img/' . $oldImgName);
        } else { // no new image
            $imgName = $oldImgName;
        }

        myPDO()->beginTransaction();
        
        updateEvent($event->idEvent, $event->title, $event->description, $imgName, $event->startingDay, $event->startingMonth, $event->startingYear, $event->endingDay, $event->endingMonth, $event->endingYear);
        deleteRelation($event->idEvent);

        foreach($event->categories as $idCat)
            insertRelation($event->idEvent, $idCat);

        myPDO()->commit();

        echo 'Evénement bien modifié!';
    } catch (Exception $e){
        if(!empty($imgFilePath) && file_exist($imgFilePath)) //cancel upload if there was a problem
            unlink($imgFilePath);

        myPDO()->rollBack();

        echo "Une erreur est survenue, modification impossible. Contacter l'administrateur";
    }
    
