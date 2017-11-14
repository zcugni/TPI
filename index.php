<?php
    session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link href="css/nouislider.min.css" rel="stylesheet">
        <title>Chronoview</title>
        <link rel="stylesheet" href="css/nouislider.css">
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans+Caption" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
		<script src="//cdn.jsdelivr.net/jquery.color-animation/1/mainfile"></script>
        <script src="js/wNumb.js"></script>
        <script src="js/nouislider.js"></script>
        <script src="js/timeline.js"></script>
        <script src='js/lightbox.js'></script>
	</head>
	<body>
    <div id='blackCloak'>
        <div id='sidebarBlock'>
            <h2>Catégories &#x25BE;</h2>
            <ul id='listCat'>
                <!--Generated in javascript -->
            </ul>
        </div>
        <h1>Chronoview</h1>
        <!-- hidden insert lightbox -->
            <div id="addLightbox">
                    <h1>Ajouter un événement</h1>
                    <form action='functions/interlocutor/insertEvent.php' method='post'>
                        <div id='left'>
                            <div id='leftInnerBlock'>
                                <label for="insertTitle">Titre</label>
                                <input type="text" name="insertTitle" id="insertTitle" required>

                                <label for="insertDescription">Description</label>
                                <textarea id='insertDescription' name='insertDescription' rows='20' required></textarea>
                            </div>
                        </div>

                        <div id='right'>
                            <div id='rightInnerBlock'>
                                <div id='startingDateBlock'>
                                    <label for="insertStartingDay">Date de début</label>
                                    <input type="number" min='1' max='31' name="insertStartingDay" id="insertStartingDay">
                                    <select id='insertStartingMonth'>
                                        <option value='null'> </option>
                                        <option value='Janvier'>Janvier</option>
                                        <option value='Février'>Février</option>
                                        <option value='Mars'>Mars</option>
                                        <option value='Avril'>Avril</option>
                                        <option value='Mai'>Mai</option>
                                        <option value='Juin'>Juin</option>
                                        <option value='Juillet'>Juillet</option>
                                        <option value='Août'>Août</option>
                                        <option value='Septembre'>Septembre</option>
                                        <option value='Octobre'>Octobre</option>
                                        <option value='Novembre'>Novembre</option>
                                        <option value='Décembre'>Décembre</option>
                                    </select>
                                    <input type="number" name="insertStartingYear" id="insertStartingYear" onfocusout="minInsertEndingYear()" required>
                                </div>

                                <div id='endingDateBlock'>
                                    <label for="insertEndingDay">Date de fin</label>
                                    <input type="number" min='1' max='31' name="insertEndingDay" id="insertEndingDay">
                                        <select id='insertEndingMonth'>
                                            <option value='null'> </option>
                                            <option value='Janvier'>Janvier</option>
                                            <option value='Février'>Février</option>
                                            <option value='Mars'>Mars</option>
                                            <option value='Avril'>Avril</option>
                                            <option value='Mai'>Mai</option>
                                            <option value='Juin'>Juin</option>
                                            <option value='Juillet'>Juillet</option>
                                            <option value='Août'>Août</option>
                                            <option value='Septembre'>Septembre</option>
                                            <option value='Octobre'>Octobre</option>
                                            <option value='Novembre'>Novembre</option>
                                            <option value='Décembre'>Décembre</option>
                                        </select>
                                    <input type="number" name="insertEndingYear" id="insertEndingYear" required>
                                </div>

                                <label for="insertImgFile">Image</label>
                                <input type="file" name="insertImgFile" id="insertImgFile">

                                <label for="insertCategories">Catégories :</label>
                                <select multiple name="insertCategories" id="insertCategories" required>
                                    <!--Generated in javascript -->
                                </select>
                            </div>
                        </div>
                        <div class='clear'></div>
                        <input type='submit' value='ajouter'>
                    </form>
                </div>

                <!-- hidden update lightbox -->
                <div id='lightboxOverlay'>
                    <div id='updateLightbox'>
                        <form>
                            <input type='text' id='updateTitle'>
                            <input type='submit' id='modify' value="Confirmer">
                            <button type='button' id='cancelUpdate' onclick='cancelUpdate()'>Annuler</button>
                            
                            <!-- Dates -->
                            <div id='dateSection'>
                                <input type='number' id='updateStartingDay' min='1'max='31'>
                                <select id='updateStartingMonth'>
                                    <option value='null'> </option>
                                    <option value='Janvier'>Janvier</option>
                                    <option value='Février'>Février</option>
                                    <option value='Mars'>Mars</option>
                                    <option value='Avril'>Avril</option>
                                    <option value='Mai'>Mai</option>
                                    <option value='Juin'>Juin</option>
                                    <option value='Juillet'>Juillet</option>
                                    <option value='Août'>Août</option>
                                    <option value='Septembre'>Septembre</option>
                                    <option value='Octobre'>Octobre</option>
                                    <option value='Novembre'>Novembre</option>
                                    <option value='Décembre'>Décembre</option>
                                </select>
                                <input type='number' id='updateStartingYear' onfocusout="minUpdateEndingYear()" required>

                                <p> - </p>

                                <input type='number' id='updateEndingDay' min='1'max='31'>
                                <select id='updateEndingMonth'>
                                    <option value='null'> </option>
                                    <option value='Janvier'>Janvier</option>
                                    <option value='Février'>Février</option>
                                    <option value='Mars'>Mars</option>
                                    <option value='Avril'>Avril</option>
                                    <option value='Mai'>Mai</option>
                                    <option value='Juin'>Juin</option>
                                    <option value='Juillet'>Juillet</option>
                                    <option value='Août'>Août</option>
                                    <option value='Septembre'>Septembre</option>
                                    <option value='Octobre'>Octobre</option>
                                    <option value='Novembre'>Novembre</option>
                                    <option value='Décembre'>Décembre</option>
                                </select>
                                <input type='number' id='updateEndingYear' required>
                            </div>

                            <textarea id='updateDescription' required></textarea>
                            <div id='rightBlock'>
                                <input type='file' id='fileInput'>
                                <label for='updateCategories'>Catégories :</label>
                                <select multiple name="updateCategories" id="updateCategories" size='7' required>
                                    <!--Generated in javascript -->
                                </select>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <main>
            <?php
                if(isset($_SESSION['admin']) && $_SESSION['admin'] == true)
                    echo '<img src="img/add.png" alt="Ajouter un événement" id="addIcon" onclick="addEvent()">';
            ?>
            <!-- generated in javascript -->
        </main>
        <div id="slider">
            <!-- generated in javascript -->
        </div>
    </div>
	</body>
</html>