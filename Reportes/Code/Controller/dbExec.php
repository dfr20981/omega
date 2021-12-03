<?php
	require_once("conexion.php");
	class dbExec{
		public static function exec($query){
			$json='';
			
			$conn =Conexion::con();//clase Conexion funtion con()
			if( $conn ){

				$db = mysqli_select_db( $conn, 'inventario_constructora') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
				
				$res =  mysqli_query($conn, $query)  or die ( "Algo ha ido mal en la consulta a la base de datos");
			
				while ($columna = mysqli_fetch_array( $res )){
					$json=utf8_encode($columna['RES']) ;
				}

			}else{
				$json='{"error":"true","msg":"Error de conexión"}';	     
			}	

			$json=utf8_decode($json);

			mysqli_close($conn);
			
			return  str_replace("Ã±","ñ",str_replace("Ã­","í",str_replace("Ã©","é",str_replace("Ã¡","á",str_replace("Ã³","ó",str_replace("Ã°","ú",$json ) ) ) ) ) );
		}
	}
?>