<?php
	session_start(); // Iniciando sesion
	require_once 'Code/Controller/conexion.php';

	$msgConexion="";
	$use= $_POST["iptUsuario"]; 
	$pass=$_POST["iptPassword"];

	$conn =Conexion::con();//clase Conexion funtion con()
	if( $conn ){
	    $db = mysqli_select_db( $conn, 'inventario_constructora') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );

	  	$msgConexion= "Conexión establecida.<br />";

	   	$query="CALL sp_autoUser('{\"email\":\"".$use."\",\"pass\":\"".$pass."\",\"sec\":2,\"id_app\":1}');";
	   		   		
		$res =  mysqli_query($conn, $query)  or die ( "Algo ha ido mal en la consulta a la base de datos");
		
		while ($columna = mysqli_fetch_array( $res )){
				$json=utf8_encode($columna['RES']) ;
		}
		$json=utf8_decode($json);
		
		mysqli_close($conn);

		$obj = json_decode($json);

		if($obj->{'error'}==false){
			$sec=$obj->msg->sec;

			if($sec->act==1){
				$_SESSION['json']=$obj->msg; // JSON DATOS
				$_SESSION['token']=$obj->token; // TOKEN DE ACCESO

				header("Location: Views/".$sec->view."");	
			}else{
				header("Location: Code/close/closeSesion.php?error=2");						
				//echo "Location: ../Inicio/Views/home.php";
			}
		}else{
			header("Location: Code/close/closeSesion.php?error=1");
		}
	}else{
	  $msgConexion= "Conexión no se pudo establecer.<br/>";

	  //echo '{"error":true,"msg":"'.$msgConexion.'"}';
	  header("Location: Code/close/closeSesion.php?error=0");

	   mysqli_close($conn);
	}

?>