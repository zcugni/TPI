<?php
/*
 * Description : all database request are in this file
 * Author : Zoé Cugni
 * Date : June 2017
 * Context : school last project (TPI)
*/
require_once("dbCoConfig.php");

// Create a PDO object following the singleton pattern
function myPdo(){
    static $pdo = null;  //thus, the PDO object won't be created again each time.

    if($pdo == null){	       
    	try{
			$pdo = @(new PDO('mysql:dbname=' . DB_NAME . ';host=' . HOST, USER, PASSWORD, array(
				  PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
				  PDO::ATTR_PERSISTENT => true
			)));
  
			  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //allows to send error
	  
	    }catch(PDOException $e){
		    die("Erreur de connexion à la base, contacter l'administrateur");
	    }
	}
    return $pdo;
}

// Descriptio : Get all the categories id and name
// Param : /
// Return : Either an associative array of the categories or false 
function getCategories(){
    try {
        $req = "SELECT * FROM category";
        $req = myPdo()->prepare($req);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Get the minimum and maximum year of the database
//               The minimum one is necessarily a startingYear but the maximum one can be either
// Param : /
// Return : Either an associative array of the range or false 
function getYearRange(){
    try {
        $req = "SELECT MIN(startingYear) AS minYear, GREATEST(MAX(startingYear), MAX(endingYear)) AS maxYear FROM event";
        $req = myPdo()->prepare($req);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Get the name of a category from its id
// Param : idCategory (int)
// Return : Either the name of the category or false 
function getCatName($idCategory){
    try {
        $req = "SELECT name FROM category WHERE idCategory = :idCategory";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idCategory', $idCategory);
        $req->execute();
        return $req->fetch(PDO::FETCH_NUM);
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Get all the event (and their data) between this two years and belonging to this category
// Param : idCategory (int), minYear (int), maxYear (int)
// Return : Either an associative array of the event or false
function getEvents($idCategory, $minYear, $maxYear){
    try {
        $req = "SELECT DISTINCT event.* FROM event JOIN event_has_category USING(idEvent) WHERE idCategory = :idCategory AND startingYear BETWEEN :minYear AND :maxYear ORDER BY startingYear";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idCategory', $idCategory);
        $req->bindParam(':minYear', $minYear);
        $req->bindParam(':maxYear', $maxYear);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Get all the users
// Param : /
// Return : Either an associative array of the user or false
function getUser(){
    try {
        $req = "SELECT * FROM user";
        $req = myPdo()->prepare($req);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Get All the categories for an event with its id
// Param : idEvent (int)
// Return : Either an array of the categories or false
function getAllCatForEvent($idEvent){
    try {
        $req = "SELECT idCategory  FROM event_has_category WHERE idEvent = :idEvent";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idEvent', $idEvent);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_NUM);
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Update the event with the new data
// Param : idEvent (int), title (string), description (string), imgFileName (string), 
//         startingDay (int), startingMonth (string), startingYear (int), endingDay (int), endingMonth (string), endingYear(int)
// Return : / (may throw an exception)
function updateEvent($idEvent, $title, $description, $imgFileName, $startingDay, $startingMonth, $startingYear, $endingDay, $endingMonth, $endingYear){
    try {
        $req = "UPDATE event SET title = :title, description = :description, imgFileName = :imgFileName, startingDay = :startingDay, startingMonth = :startingMonth, startingYear = :startingYear, endingDay = :endingDay, endingMonth = :endingMonth, endingYear = :endingYear WHERE idEvent = :idEvent";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idEvent', $idEvent);
        $req->bindParam(':title', $title);
        $req->bindParam(':description', $description);
        $req->bindParam(':imgFileName', $imgFileName);
        $req->bindParam(':startingDay', $startingDay);
        $req->bindParam(':startingMonth', $startingMonth);
        $req->bindParam(':startingYear', $startingYear);
        $req->bindParam(':endingDay', $endingDay);
        $req->bindParam(':endingMonth', $endingMonth);
        $req->bindParam(':endingYear', $endingYear);
        $req->execute();
    } catch(Exception $e) {
        error_log($e);
        //i don't return false here because this request is in a transaction, it seem more logical to process it higher
        throw $e;
    }
}

// Description : Update the category with the new data
// Param : catId (int), catName (string)
// Return : / (may throw an exception)
function updateCategory($catName, $catId){
    try {
        $req = "UPDATE category SET name = :catName WHERE idCategory = :idCategory";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idCategory', $catId);
        $req->bindParam(':catName', $catName);
        $req->execute();
        return true;
    } catch(Exception $e) {
        error_log($e);
        //i don't return false here because this request is in a transaction, it seem more logical to process it higher
        throw $e;
    }
}

// Description : Insert the new event
// Param : title (string), description (string), imgFileName (string), startingDay (int), startingMonth (month), startingYear (int), endingDay (int), endingMonth (string), endingYear (int)
// Return : / (may throw an exception)
function insertEvent($title, $description, $imgFileName, $startingDay, $startingMonth, $startingYear, $endingDay, $endingMonth, $endingYear){
    try {
        $req = "INSERT INTO event (title, description, imgFileName, startingDay, startingMonth, startingYear, endingDay, endingMonth, endingYear) VALUES(:title, :description, :imgFileName, :startingDay, :startingMonth, :startingYear, :endingDay, :endingMonth, :endingYear)";
        $req = myPdo()->prepare($req);
        $req->bindParam(':title', $title);
        $req->bindParam(':description', $description);
        $req->bindParam(':imgFileName', $imgFileName);
        $req->bindParam(':startingDay', $startingDay);
        $req->bindParam(':startingMonth', $startingMonth);
        $req->bindParam(':startingYear', $startingYear);
        $req->bindParam(':endingDay', $endingDay);
        $req->bindParam(':endingMonth', $endingMonth);
        $req->bindParam(':endingYear', $endingYear);
        $req->execute();
    } catch(Exception $e) {
        error_log($e);
        //i don't return false here because this request is in a transaction, it seem more logical to process it higher
        throw $e; 
    }
}

// Description : Insert the new event-category relation
// Param : idEvent (int), idCategory (int)
// Return : / (may throw an exception)
function insertRelation($idEvent, $idCategory){
    try {
        $req = "INSERT INTO event_has_category (idEvent, idCategory) VALUES(:idEvent, :idCategory)";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idEvent', $idEvent);
        $req->bindParam(':idCategory', $idCategory);
        $req->execute();
    } catch(Exception $e) {
        error_log($e);
        //i don't return false here because this request is in a transaction, it seem more logical to process it higher
        throw $e;
    }
}

// Description : Insert the new category
// Param : catName (string)
// Return : Either true or false
function insertCategory($catName){
    try {
        $req = "INSERT INTO category(name) VALUES(:catName)";
        $req = myPdo()->prepare($req);
        $req->bindParam(':catName', $catName);
        $req->execute();
        return true;
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Delete the event
// Param : idEvent (int)
// Return : Either true or false
function deleteEvent($idEvent){
    try {
        $req = "DELETE FROM event WHERE idEvent = :idEvent";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idEvent', $idEvent);
        $req->execute();
        return true;
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}

// Description : Delete the event-category relation
// Param : idEvent (int)
// Return : / (may throw an exception)
function deleteRelation($idEvent){
    try {
        $req = "DELETE FROM event_has_category WHERE idEvent = :idEvent";
        $req = myPdo()->prepare($req);
        $req->bindParam(':idEvent', $idEvent);
        $req->execute();
    } catch(Exception $e) {
        error_log($e);
        //i don't return false here because this request is in a transaction, it seem more logical to process it higher
        throw $e;
    }
}

// Description : Delete the category
// Param : catId (int)
// Return : Either true or false
function deleteCategory($catId){
    try {
        $req = "DELETE FROM category WHERE idCategory = :catId";
        $req = myPdo()->prepare($req);
        $req->bindParam(':catId', $catId);
        $req->execute();
        return true;
    } catch(Exception $e) {
        error_log($e);
        return false;
    }
}