<?php
	require_once 'Controller/dbExec.php';

	if($_POST['op']==0){
   		$query="CALL sp_viewCatego();";
   		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==1){
		$query="CALL sp_newCatego('".$_POST['nom']."','".$_POST['desc']."');";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==2){
		$query="CALL sp_newElemt('".$_POST['obj']."');";
	   	//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==3){

		$query="CALL sp_getInfoArtCatMar2();";
		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==4){
		$query="CALL sp_newVale('".$_POST['head']."','".$_POST['detalle']."');";
	   	//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;

	}else if($_POST['op']==5){
		$query="CALL sp_viewVales('".$_POST['buscar']."');";
	   	//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;	
	}else if($_POST['op']==6){
		$query="CALL sp_viewValeId2('".$_POST['idVale']."');";
		//echo $query;
		$json=dbExec::exec($query);//clase read QueryExe
		echo $json;
	}else if($_POST['op']==7){

		$query="CALL sp_editVale('".$_POST['head']."','".$_POST['detalle']."','".$_POST['idVale']."');";
		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	   		
	}else if($_POST['op']==8){
		$query="CALL sp_editCatego(".$_POST['id'].",'".$_POST['nom']."','".$_POST['desc']."');";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==9){
		$query="CALL sp_editElemt('".$_POST['obj']."');";
		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==10){
		$query="CALL sp_viewSitios(".$_POST['_op'].",'".$_POST['id']."');";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;   		
	}else if($_POST['op']==11){
		$query="CALL sp_viewCatego_Id(".$_POST['num'].");";
		
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;   		
	}else if($_POST['op']==12){
		$query="CALL sp_viewHistArt('".$_POST['id']."');";
		
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;   		
	}else if($_POST['op']==13){
		$query="CALL sp_crudPosArt('".$_POST['id_aloj']."','".$_POST['id_art']."','".$_POST['pos']."','".$_POST['tip']."');";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==14){
		$query="CALL sp_borrarGen('".$_POST['id']."','".$_POST['_op']."');";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==15){
		$query="CALL sp_viewMarcas();";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==16){
		$query="CALL sp_viewMapa();";
		//echo $query;

   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==17){
		$query="CALL sp_deleteVale('".$_POST['buscar']."');";
		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==18){
		$query="CALL sp_updatePrecios('".$_POST['vec']."');";
		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==19){
		$query="CALL sp_viewInfoArt('".$_POST['id_a']."');";
		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==20){
   		$query="CALL sp_getArts();";
   		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==21){
   		$query="CALL sp_getCategos();";
   		//echo $query;
   		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==22){
		$query="CALL sp_getInfoArt('".$_POST['id_a']."');";
		//echo $query;
		$json=dbExec::exec($query);//clase read QueryExe
		echo $json;
	}else{
		echo '{"error":true,"msg":"No se reconoce la opción que selecciono"}';
	}



?>