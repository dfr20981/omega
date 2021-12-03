<?php
	class Conexion{
	 public static function con(){
	   	//$serverName = "172.16.2.200\\SERVER, 1433"; 
		//$serverName = "DESARROLLO\SER_ADIR"; 
		$serverName = "1";    
    	//$connectionInfo = array( "Database"=>"emp2", "UID"=>"root", "PWD"=>'1234');	
		$conn =  mysqli_connect("localhost","root","");
		
		
		return $conn;
	 }
	}

/*
$Localhost = 'localhost';
$Usuario_BD = 'root';
$Password_BD = '';
$Nombre_BD = 'inventario_constructora';

try{
  $DB_con = new PDO("mysql:host={$Localhost};dbname={$Nombre_BD};charset=UTF8",$Usuario_BD,$Password_BD);
  $DB_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
  echo $e->getMessage();
}*/

?>