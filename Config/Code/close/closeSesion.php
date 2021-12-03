<?php
	$error = $_GET["error"];
	session_start();
	
	session_unset();


	if(session_destroy()){
		header("Location: ../../../Inicio/Views/home.php?error=".$error); // Redireccionando a la pagina home.php
	}
?>