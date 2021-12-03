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
?>