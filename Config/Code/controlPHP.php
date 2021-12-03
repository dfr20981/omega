<?php
	require_once 'Controller/dbExec.php';

	if($_POST['op']==0){
		$query="CALL sp_viewPersSob();";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==1){
		$query="CALL sp_viewKits();";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==2){
		$query="CALL sp_viewCatego();";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}else if($_POST['op']==3){
		$query="CALL sp_editSaveKit(".$_POST['tip'].",".$_POST['id_kit'].",'".$_POST['vec']."');";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
   		//echo $query;
	}else if($_POST['op']==4){
		$query="CALL sp_viewUsuPer(".$_POST['tip'].",".$_POST['id_per'].");";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
   		//echo $query;
	}else if($_POST['op']==5){
		$query="CALL sp_crudPers('".$_POST['obj']."');";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
   		//echo $query;
	}else{
		$query="CALL sp_viewPersSob();";

		$json=dbExec::exec($query);//clase read QueryExe
   		echo $json;
	}	



?>