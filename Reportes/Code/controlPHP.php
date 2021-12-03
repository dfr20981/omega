<?php
	require_once 'Controller/dbExec.php';

	if($_POST['op']==0){

   		$query="CALL sp_viewSitios(0,'');";
			
			/**/
		$json=dbExec::exec($query);//clase read QueryExe
		echo  $json;
			/**/
			//echo $query;
	
	}else if($_POST['op']==1){
		$query="CALL sp_viewPersonal();";
			
		$json=dbExec::exec($query);//clase read QueryExe
		echo  $json;
		
		//echo $query;
	}else if($_POST['op']==2){
			$query="CALL sp_reporte1('".$_POST['id_aloj']."');";
	   		
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
	}else if($_POST['op']==3){
			$query="CALL sp_reporte2('".$_POST['id_per']."');";
	   		
			/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
	}else if($_POST['op']==4){
			$query="CALL sp_reporte3();";
	   		/**/
			$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			/**/
			//echo $query;
	}else if($_POST['op']==5){
			$query="CALL sp_reporte4('".$_POST['obj']."');";
	   		$json=dbExec::exec($query);//clase read QueryExe
			echo  $json;
			
			//echo $query;
	}else{
		echo '{"error":true,"msg":"No se reconoce la opción que selecciono"}';
	}


?>