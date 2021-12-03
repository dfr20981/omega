<?php
//require_once 'Controller/conexion.php';
	require_once 'Controller/dbExec.php';
	//echo 'que onda!!';
	if($_POST['op']==8){

			$query="CALL sp_newSitio('".$_POST['obj']."');";
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
	}else if($_POST['op']==9){

			$query="CALL sp_newPerson('".$_POST['obj']."');";

			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;

	}else if($_POST['op']==10){

			$query="CALL sp_viewSitios(".$_POST['sel'].",'".$_POST['id']."');";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
			
	}else if($_POST['op']==11){

			$query="CALL sp_viewPersonal();";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
			
	}else if($_POST['op']==12){

			$query="CALL sp_viewVales();";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
			
	}else if($_POST['op']==13){

			$query="CALL sp_viewPersonal();";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
			
	}else if($_POST['op']==14){

			$query="CALL sp_editSitio('".$_POST['obj']."');";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
			
			
	}else if($_POST['op']==15){

			$query="CALL sp_editPerson('".$_POST['obj']."');";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
	}else if($_POST['op']==16){

			$query="CALL sp_editFinSitio('".$_POST['id_aloj']."',".$_POST['fin'].");";
			
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
			
			
	}else if($_POST['op']==17){
			$query="CALL sp_xPersonal('".$_POST['id_per']."');";
	   		
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
	}else{
			echo '{"error":true,"msg":"No se reconoce la opción que selecciono1"}';


	}
	

	
?>