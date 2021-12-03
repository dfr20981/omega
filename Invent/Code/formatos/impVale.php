<?php
	session_start();
	require_once '../Controller/conexion.php';
	require_once 'Navigator.php';

	if(!isset($_SESSION["json"])){
	    //echo "no existe sesion";
	    header("Location: ../Code/close/closeSesion.php");
	    exit();
	}
	  
	$info=$_SESSION["json"];
	
	$conn =Conexion::con();//clase Conexion funtion con()

	//echo $_GET['idVale'];

	if( $conn ){
	    $db = mysqli_select_db( $conn, 'inventario_constructora') or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );

	    $msgConexion= "Conexión establecida.<br />";

	   	$query="CALL sp_viewValeId('".$_GET['idVale']."');";

		//echo $query;
	   		/**/
		$res =  mysqli_query($conn,$query)  or die ( "Algo ha ido mal en la consulta a la base de datos");

		while ($columna = mysqli_fetch_array( $res )){
			$json=utf8_encode($columna['RES']) ;
		}
		mysqli_close($conn);

		$obj = json_decode(utf8_decode($json));

		//echo  str_replace("Ã±","ñ",str_replace("Ã­","í",str_replace("Ã©","é",str_replace("Ã¡","á",str_replace("Ã³","ó",$json)))));
		    
	}else{
	   $msgConexion= "Conexión no se pudo establecer.<br/>";
	   echo '{"error":true,"msg":"'.$msgConexion.'"}';

	   //return 0;

	   mysqli_close($conn);
	}
	
	
?>
<!doctype html>
<html lang="es">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Vale Omega</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans:800|Roboto:900|Work+Sans:700" rel="stylesheet">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<style>
		/*
		@page { size: landscape; }
		div.page {
			writing-mode: tb-rl;
			height: 80%;
			margin: 10% 0%;
		}*/
		.tit01{
			font-size: 1.6em;
			font-weight: bold;
		}
		.tit02{
			font-size: 1.3em;
			font-weight: bold;	
		}
		.tabDat{
			width: 100%;
			font-size: 10px;
		}
		.tabDat02{
			width: 100%;
		}
		
		.tdText0{
			font-size: 1.0em;
			font-weight: bold;
			/*width:5em;*/
			border: 1px solid #000;
		}
		.tdText1{
			font-size: 0.8em;
			border: 1px solid #000;
			/*height: 3.1em;*/
		}

		.thTit{
			font-size: 0.9em;
			text-align: center;
			border: 1px solid #000;
		}
		.tdText01{
			font-size: 0.9em;
			text-align: center;
			border: 1px solid #000;
		}
		
		.tdText2{
			font-size: 0.9em;
			text-align: right;
			border: 1px solid #000;
		}
		.tdText3{
			font-size: 0.9em;
			text-align: left;
			border: 1px solid #000;
		}

		.tdText4{
			font-size: 0.9em;
			border: 1px solid #000;
			/*border-bottom: 2px solid #000;
			border-right: 6px solid #fff;*/
		}		

		.tdText5{
			font-size: 13px;
			font-weight: bold;
			text-align: center;
			width: 25%;
			border-right: 1px solid #000;
		}

		.thRow{
			border-radius: 10px;
			/*border-top: 2px solid #bfbfbf;
			border-radius: 10px;
			border-bottom: 2px solid #bfbfbf;*/
		}

		.primer{
			height: 260px;
		}
		.segundo{
			border: 1px solid #000;
		}
		.tercero{
			height: 180px;
		}
		.logo{
			/*display: none;*/
			width: 300px;
		}
	</style>
</head>
<body>
	<div class="container-fluid">
	<?php
		$navigator=Navigator::detect();

		$vale=$obj->vale;
		$head=$vale->head;
		$detalle=$vale->detalle;
		$sit1=$head->sitio1;
		$sit2=$head->sitio2;

		$primero='<div class="primer">
			<div class="row">
				<!--<div class="col-sm-5 col-md-5 col-lg-5 col-xl-7">-->
				<div style="width:600px;">
					<div class="container-fluid">
						<div class="row">
							<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
								<span class="tit01">OMEGA EMPRESAS UNIDAS, S.A. DE C.V.</span>
							</div>
						</div>	
						<div class="row">
							<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
								<table class="tabDat">
									<tr>
										<td>MAUEL FERNANDO SOTO No.125</td>
										<td>TELS.</td>
										<td>(55) 5561-6509</td>
									</tr>
									<tr>
										<td>COL. CONSTITUCIÓN DE LA REPUBLICA</td>
										<td></td>
										<td>(55) 5539-8848</td>
									</tr>
									<tr>
										<td>C.P. 07469 MÉXICO D.F.</td>
										<td>FAX.</td>
										<td>(55) 5352-7862</td>
									</tr>
								</table>
							</div>
						</div>	
					</div>		
				</div>
				<!--<div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">-->
				<div style="width:380px;">
					<div class="container-fluid">
						<div class="row">
							<div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">	
							</div>
							<div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">	
								<img src="fondosf.png" class="logo" />
							</div>
							<div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">	
							</div>
						</div>			
					</div>					
				</div>
			</div>	
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
					<span class="tit02">'
					.(($sit1->id==$sit2->id)
					   ?'INVENTARIO '.$head->id_doc.'</span>'
					   :'VALE DE '.(( $head->tipo=='E')?'ENTRADA':'SALIDA').' '.$head->id_doc.'</span>'
					).
				'</div>
			</div>	
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">'
				.(($sit1->id==$sit2->id)
					?'<table class="tabDat02">
							<tr>
								<td class="tdText0">Sitio:</td>
								<td class="tdText1">
									<p style="margin: 0px;">('.$sit1->id.') '.$sit1->nom.'</p>
								</td>
								<td class="tdText0">Registrado:</td>
								<td class="tdText1  text-center">'.$head->fecha.'</td>
							</tr>
							<tr>
								<td class="tdText0">Dirección:</td>
								<td class="tdText1">
									<p style="margin: 0px;">'.$sit1->calle.' '.$sit1->num_int.' 
										'.$sit1->num_ext.' COL. '.$sit1->col.'
										'.$sit1->del.' '.$sit1->estado.' '.$sit1->pais.'
										C.P.:'.$sit1->cp.'
									</p>
								</td>
								<td class="tdText0">Tels:</td>
								<td class="tdText1  text-center">'.$sit1->tel.'</td>
							</tr>
					  </table>'
					:'<table class="tabDat02">
							<tr>
								<td class="tdText0">Sale de:</td>
								<td class="tdText1">
									<p style="margin: 0px;">('.$sit1->id.') '.$sit1->nom.'</p>
								</td>
								<td class="tdText0">Registrado:</td>
								<td class="tdText1  text-center">'.$head->fecha.'</td>
							</tr>
							<tr>
								<td class="tdText0">Dirección:</td>
								<td class="tdText1">
									<p style="margin: 0px;">'.$sit1->calle.' '.$sit1->num_int.' 
										'.$sit1->num_ext.' COL. '.$sit1->col.'
										'.$sit1->del.' '.$sit1->estado.' '.$sit1->pais.'
										C.P.:'.$sit1->cp.'
									</p>
								</td>
								<td class="tdText0">Tels:</td>
								<td class="tdText1  text-center">'.$sit1->tel.'</td>
							</tr>
							<tr>
								<td class="tdText0">Recibe:</td>
								<td class="tdText1">
									<p style="margin: 0px;">('.$sit2->id.') '.$sit2->nom.'</p>
								</td>
								<td class="tdText0">LLegada:</td>
								<td class="tdText1  text-center"></td>
							</tr>
							<tr>
								<td class="tdText0">Dirección:</td>
								<td class="tdText1">
									<p style="margin: 0px;">'.$sit2->calle.' '.$sit2->num_int.' 
										'.$sit2->num_ext.' COL. '.$sit2->col.'
										'.$sit2->del.' '.$sit2->estado.' '.$sit2->pais.'
										C.P.:'.$sit2->cp.'
									</p>
								</td>
								<td class="tdText0">Tels:</td>
								<td class="tdText1  text-center">'.$sit2->tel.'</td>
							</tr>
					  </table>'
				).'
				</div>
			</div>
		</div>';

		$tercero='<div class="tercero">
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
					<table style="width: 100%; height: 60px;">
						<tr>
							<td class="tdText0">Nota: '.$head->obs_d.'</td>
						</tr>
					</table>	
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
					<table style="width: 100%; height: 60px; border: 1px solid #000;">
						<tr>
							<td class="tdText5">Elabora</td>
							<td class="tdText5">Recibe</td>
							<td class="tdText5"></td>
						</tr>
						<tr>
							<td class="tdText5">____________________________</td>
							<td class="tdText5">____________________________</td>
							<td class="tdText5"></td>
						</tr>
						<tr>
							<td class="tdText5">'.$info->nom.'</td>
							<td class="tdText5">'.$sit2->nom_p.'</td>
							<td class="tdText5"></td>
						</tr>
					</table>	
				</div>
			</div>
			
		</div>';

		$incr1=(($navigator["browser"]==='CHROME')?40:(($navigator["browser"]==='IE')?48:14));
		$i=0;
		$cc=1;
		while ($i<=0){

			$trHtml='';
			$y=0;
			$okAlm=0;
			$conf=true;
			while ($y<=0){
				
				$trHtml=$trHtml.'<tr>
									<td class="tdText01">'.$cc.'</td>
									<td class="tdText01">'.$detalle[0]->id.'</td>
									<td class="tdText01">'.$detalle[0]->cant.'</td>
									<td class="tdText01">pz</td>
									<td class="tdText3">'.$detalle[0]->nom.'</td>
									<td class="tdText4"></td>
									<td class="tdText4"></td>
								</tr>';
				
				array_splice($detalle,0, 1);
				$okAlm=$okAlm+1;

				if(count($detalle)==0){
					$i=1; $y=1;
				}	

				//if($okAlm==35){//fire fox
				if($okAlm==$incr1){	
					$y=1;
				}	

				$cc=$cc+1;
			}
			//if($i==0){
				$segundo='<div class="segundo">
					<div class="row">
						<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
							<table style="width: 100%;">
								<thead class="thRow">
									<tr>
										<th class="thTit">#</th>
										<th class="thTit" style="width:80px;">ID</th>
										<th class="thTit" style="width:90px;">Cantidad</th>
										<th class="thTit" style="width:56px;">Unidad</th>
										<th class="thTit" style="">Descripción</th>
										<th class="thTit">Confir 1</th>
										<th class="thTit">Confir 2</th>
									</tr>
								</thead>
								<tbody>'.$trHtml.'</tbody>
							</table>
						</div>
					</div>
				</div>';
				echo $primero.' '.$segundo.' '.$tercero;
				//echo $primero.' '.$tercero;
			//}	

		}	//1060+260+158
		
	?>
	</div>		
	 <script src="jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		window.onload = function() {
			let ancho = $(window).width();
  			let alto = $(window).height();


  			let es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
			if(es_chrome){
				var s=1060;
			}
			let es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			if(es_firefox){
			    var s=378;
			}
			let es_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
			if(es_opera){
			    var s=378;
			}
			let es_ie = navigator.userAgent.indexOf("MSIE") > -1 ;
			if(es_ie){
			    var s=378;
			}

			$(".segundo").css("height",s+"px");

		/**/
			setTimeout(function(){ 
					window.print();
					window.close();
	    	},500);  	
		/**/	
		};

		
	</script>
</body>
</html>
