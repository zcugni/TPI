<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link href="css/nouislider.min.css" rel="stylesheet">
        <title>Chronoview</title>
        <link rel="stylesheet" href="css/nouislider.css">
        <link rel="stylesheet" href="css/style.css">
	</head>
	<body id='login'>
        <div id='blackCloak'>
            <?php 
                session_start();
                $toDisplay = "<form method='post' action='functions/interlocutor/loginCheck.php'>";

                if(!isset($_SESSION['admin']) || $_SESSION['admin'] != true){
                    $toDisplay .= "<label for='mail'>Email :</label>";
                    $toDisplay .= "<input type='email' id='mail' name='mail'>";
                    $toDisplay .= "<label for='pw'>Mot de passe :</label>";
                    $toDisplay .= "<input type='password' id='pw' name='pw'>";
                    $toDisplay .= "<input type='submit' value='Se connecter'>";

                    if(isset($_GET['error']) && $_GET['error'] == 'true')
                        $toDisplay .= "<p id='error'>Vous avez entré de mauvais paramètres ou vous n'êtes pas un administrateur.</p>"; 
                } else {
                    $toDisplay .= '<input type="submit" value="Se déconnecter">';
                }

                echo $toDisplay;
                ?>
            </form>
        </div>
	</body>
</html>