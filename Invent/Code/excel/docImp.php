<?php
	session_start();
	require_once '../Controller/dbExec.php';
	require_once '../formatos/Navigator.php';

	if(!isset($_SESSION["json"])){
	    //echo "no existe sesion";
	    header("Location: ../Code/close/closeSesion.php");
	    exit();
	}
	  
	$info=$_SESSION["json"];
	$query="CALL sp_viewCatego_Id(".$_GET['id'].");";
    //echo $query;
    
    $msg=dbExec::exec($query);//clase read QueryExe
	
	$navigator=Navigator::detect();
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
		@page { size: landscape; }
		div.page {
			writing-mode: tb-rl;
			height: 80%;
			margin: 10% 0%;
		}

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
			text-align:left;
			border: 1px solid #000;
		}
		.tdText3{
			font-size: 0.9em;
			text-align:center;
			border: 1px solid #000;
		}

		.tdText4{
			font-size: 0.9em;
			border: 1px solid #000;
			text-align:center;
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
			height: 98px;
		}
		.segundo{
			/*border: 1px solid #000;*/
		}
		.tercero{
			height:0px;
		}
	</style>
</head>
<body>
	<div class="container-fluid">
		<?php
		$js= json_decode($msg);
	    $vc=$js->catego;
	    $lmt=count($vc);
	    $list=$js->arts;

	    $catego_nom='Todo';
	    if($lmt==1){
	        $catego_nom=$vc[0]->nom;
	    }

	    $marcas= array();
	    foreach ($list as &$vl1) {
	        $mrc=$vl1->marcas;            
	        $ok=true;
	        foreach ($marcas as &$vl2) {
	            if($vl2==$mrc){
	                $ok=false;
	            }
	        }
	        if($ok){
	           array_push($marcas,$mrc);
	        }
	    }
	    asort($marcas);
	    
	    $vec = array();
	    foreach ($marcas as &$vl3){
	        $semi = array();
	        foreach($list as &$vl4){
	            if($vl4->marcas==$vl3){
	                //if($vl4->cant>0){
	                    array_push($semi,$vl4);         
	                //}
	            }
	        }
	        usort($semi, function($a, $b){
	            return strcmp($a->nom, $b->nom);
	        }); 

	        foreach($semi as &$vl5){
	            array_push($vec,$vl5);     
	        }    
	    }    
	
		$primero='<div class="primer">
			<div class="row">
				<div class="col-sm-7 col-md-7 col-lg-7 col-xl-7">
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
				<div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
					<div class="container-fluid">
						<div class="row">
							<div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">	
							</div>
							<div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">	
								<img src="fondosf.png" class="img-fluid" />
							</div>
							<div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">	
							</div>
						</div>			
					</div>					
				</div>
			</div>	
		</div>';

		$tercero='<div class="tercero"></div>';

		$incr1=(($navigator["browser"]==='CHROME')?20:(($navigator["browser"]==='IE')?48:22));//
/**/
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
									<td style="" class="tdText2">('.$vec[0]->id.') '.$vec[0]->nom.'</td>
									<td class="tdText01">'.$vec[0]->cant.'</td>
									<td class="tdText3">'.$vec[0]->uni.'</td>
									<td class="tdText3">'.$vec[0]->fam.'</td>
									<td class="tdText4">'.$vec[0]->marcas.'</td>
									
								</tr>';
								/*    width: 700px;*/
				
				array_splice($vec,0, 1);
				$okAlm=$okAlm+1;

				if(count($vec)==0){
					$i=1; $y=1;
				}	

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
										<th class="thTit">Articulo</th>
										<th class="thTit">Cant</th>
										<th class="thTit">Uni</th>
										<th class="thTit">Familia</th>
										<th class="thTit">Marca</th>
									</tr>
								</thead>
								<tbody>'.$trHtml.'</tbody>
							</table>
						</div>
					</div>
				</div>';

				echo $primero.' '.$segundo.' '.$tercero;
			//}	

		}	
	/**/	
	?>
	</div>		
	 <script src="jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		window.onload = function() {
			let ancho = $(window).width();
  			let alto = $(window).height();

  			let p=260;
  			let t=120;
  			let es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
			if(es_chrome){
				var s=651;
			}
			let es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			if(es_firefox){
			    var s=680;
			}
			let es_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
			if(es_opera){
			    var s=1220;
			}
			let es_ie = navigator.userAgent.indexOf("MSIE") > -1 ;
			if(es_ie){
			    var s=1220;
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
