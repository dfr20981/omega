<?php
	session_start();
  require_once("../Code/Controller/conexion.php");

  if(!isset($_SESSION["json"])){
    //echo "no existe sesion";
    header("Location: ../Code/close/closeSesion.php");
    exit();
  }
  
  $json=$_SESSION["json"];

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Catalogo</title>

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" rel="stylesheet">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  
  <!-- Custom styles for this template -->
  <link href="css/code/simple-sidebar.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="css/code/index.css">
  <link rel="stylesheet" type="text/css" href="css/code/estilo.css">
  <link rel="stylesheet" type="text/css" href="css/code/dashboard.css">

</head>
<body>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-dark border-right" id="sidebar-wrapper">
      <div id="DivUser" class="DivUser">
          <center>Usuario: <?php  echo $json->nom; ?></center>
      </div>
      <div id="letra" class="sidebar-heading ">
        <center>Menu</center>
      </div>
      <div id="menuPrin" class="list-group list-group-flush" style="width: 100%;">
        <a data-toggle="pill" href="#content_menu_vales" role="tab"
        class="list-group-item  active list-group-item-action bg-dark" onclick="fn_setIndexTab(0)">Personal</a>
        <a data-toggle="pill" href="#content_menu_kits" role="tab"
        class="list-group-item  list-group-item-action bg-dark" onclick="fn_setIndexTab(1)">Kits</a>
      </div>
      
      <div id="reloj"  class="sidebar-heading " >
      </div>
      <div id="clockdate">
        <div class="clockdate-wrapper">
          <div id="clock"></div>
          <div id="date"></div>
        </div>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
      	<nav class="navbar navbar-expand-lg navbar-ligth  border-bottom"  style="background-color: #006d9e!important;" >
	        <!--<img src="MEDIA/IMG/flecha.png" name="prueba" onMousedown="cambia_imagen()" id="menu-toggle">-->
	        <div class="collapse navbar-collapse" id="navbarSupportedContent">
	          <div class="container-fluid">
	              <div class="row">
	                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3">
	                      <table class="tablaTitPage">
	                        <tr>
	                          <th style="text-align:right;padding: 4px;">
	                            <img src="img/config.png" style="height: 29px;width: 41px;">
	                          </th>
	                          <th style="text-align:left; color: #fff; font-size: 19px;" >Configuración</th>
	                        </tr>
	                      </table>  
	                </div>
	                <div class="col-sm-4 col-md-4 col-lg-6 col-xl-6 text-center">
	                    
	                </div>
	                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3  text-right">
	                    <a class="btn btn-danger pull" href="../Code/close/closeSesion.php?error=9"><i class="fa fa-sign-out" aria-hidden="true"></i>Salir</a>
	                </div>
	              </div>    
	          </div>
	        </div>  
	      </nav>
      	<div class="tab-content" id="content_menu" style="height: 100%;">
      		<div class="tab-pane fade show active" id="content_menu_vales"  style="height: 100%;">
	          <div class="panelBtn_prin">
	              <div class="container-fluid">
	                        <div class="row">
	                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
	                            <button class="btn btn-info mt-2" onclick="fn_mdlPerso(0)">
	                              <i class="fa fa-plus-circle"></i> Agregar Personal
	                            </button>
	                          </div>
	                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
	                          
	                          </div>
	                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
	                          
	                          </div>
	                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
	                          
	                          </div>
	                        </div>      
	              </div>
	          </div>
	          <div id="cont_tb_Pers" class="contenido_prin">
	            <table id="tb_Pers" class="display compact" style="width:100%">
	                <thead>
	                    <tr>
	                        <th class="btn-info centerTD">#</th>
	                        <th class="btn-info centerTD">Nombre</th>
	                        <th class="btn-info centerTD">Email</th>
	                        <th class="btn-info centerTD">Usuario</th>
	                        <th class="btn-info centerTD">Registro</th>
	                        <th class="btn-info centerTD">Estado</th>
	                        <th class="btn-info centerTD">Editar</th>
	                        <th class="btn-info centerTD">X</th>
	                    </tr>
	                    <tr>
	                      <th style="text-align: center;">
	                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
	                      </th>
	                      <th style="text-align: center;" data-column="1">
	                          <input type="text" class="col_filPers form-control form-control-sm" placeholder="Nombre" id="col1_Pers">
	                      </th>
	                      <th style="text-align: center;" data-column="2">
	                          <input type="text" class="col_filPers form-control form-control-sm" placeholder="Email" id="col2_Pers">
	                      </th>
	                      <th style="text-align: center;" data-column="3">
	                          <input type="text" class="col_filPers form-control form-control-sm" placeholder="Usuario" id="col3_Pers">
	                      </th>
	                      <th style="text-align: center;" data-column="4">
	                          <input type="text" class="col_filPers form-control form-control-sm" placeholder="Registro" id="col4_Pers">
	                      </th>
	                      <th style="text-align: center;" data-column="5">
	                          <input type="text" class="col_filPers form-control form-control-sm" placeholder="Estado" id="col5_Pers">
	                      </th>
	                      <th></th>
	                      <th></th>
	                    </tr>  
	                </thead>
	                <tbody></tbody>  
	                <tfoot>
	                    <tr>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                        <th></th>
	                    </tr>
	                </tfoot>
	            </table>
	          </div>
	        </div>
	        <div class="tab-pane fade" id="content_menu_kits"  style="height: 100%;">
	        	<div class="panelBtn_prin">
		              <div class="container-fluid">
		                        <div class="row">
		                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
		                            <button class="btn btn-info mt-2" onclick="fn_nuevoKit()">
		                              <i class="fa fa-plus-circle"></i> Agregar Kit
		                            </button>
		                          </div>
		                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
		                          	<button id="btnExcel_" class="btn btn-info mt-2" onclick="fn_repExcelKit()" 
		                               title="Reporte Excel">
		                                <i class="fa fa-file-excel-o"></i> Excel
		                            </button>
                                  </div>
		                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
		                      		
		                          </div>
		                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
		                          
		                          </div>
		                        </div>      
		              </div>
		        </div>
	        	<div id="listKits" style="overflow-y:auto;">
	        		<div class="list-group">
					 
					</div>
	        	</div>	
	        </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->


  <!-----------------------------------MODAL'S------------------------------------------------------->
  	<div id="mdl_kits" class="modal fade bd-example-modal-lg" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="title_mdlKits"></h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
		      <div class="container-fluid">
		      	<div class="row">
		      		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
		      			<div  class="input-group mb-3">
						  <div class="input-group-prepend">
						  	<span class="input-group-text" id="basic-addon1">
						  		<i class="fa fa-archive" aria-hidden="true"></i>&nbsp; Seleccionar 
						  	</span>
						  </div>
						  <input type="text" class="form-control" placeholder="Artículo" aria-label="Artículo" id="inp_SelArtMdlKits" aria-describedby="basic-addon1">
						</div>         
		      		</div>
		      		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
		      			<table id="tblListArt_mdlKits" class="tblArtsKits">
		      				<thead>
		      					<tr style="border-bottom: 1px solid #dcdcdc;">
		      						<th colspan="3" class="centerTD">
		      							Lista de Artículos para el Kit
		      						</th>
		      					</tr>
		      					<tr>
		      						<th class="centerTD">Descripción</th>
		      						<th class="centerTD">Tipo</th>
		      						<th class="centerTD">X</th>
		      					</tr>
		      				</thead>
		      				<tbody></tbody>
		      			</table>
		      		</div>	
		      		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
		      			<!--
		                <div class="input-group mb-3">
						  <div class="input-group-prepend">
						  	<span class="input-group-text" id="basic-addon1">
						  		<i class="fa fa-comment" aria-hidden="true"></i>&nbsp;Observación
						  	</span>
						  </div>
						  <input type="text" class="form-control" placeholder="" aria-label="Observación" aria-describedby="basic-addon1">
						</div>                   
						-->
		      		</div>		
		      	</div>
		      </div>  	
	      </div>
	      <div class="modal-footer">
	      </div>
	    </div>
	  </div>
	</div>

	<div id="mdl_kitsX" class="modal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 id="title_mdlKitsX" class="modal-title"></h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <p id="cnt_mdlKitsX"></p>
	      </div>
	      <div class="modal-footer">
	      </div>
	    </div>
	  </div>
	</div>

	<div id="mdl_personal" class="modal" tabindex="-1" role="dialog">
	  <div class="modal-dialog modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 id="tit_mdlPer" class="modal-title"></h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form>
			  <div class="form-group row">
			    <div class="col-sm-8">
			        <div class="input-group input-group-sm">
					  <div class="input-group-prepend">
					    <span class="input-group-text">Nombre:</span>
					  </div>
					  <input  id="nom_mdlPer" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
					</div>
			    </div>
			    <div class="col-sm-4">
			      	<div class="input-group input-group-sm">
					  <div class="input-group-prepend">
					    <span class="input-group-text">Estado:</span>
					  </div>
					  <select class="custom-select" id="est_mdlPer">
					    <option value="1">Activo</option>
					    <option value="2">Inactivo</option>
					    <option value="3">Descanso</option>
					  </select>
					</div>
			    </div>
			  </div>
			  <div class="form-group row">
			    <div class="col-sm-8">
			        <div class="input-group input-group-sm">
					  <div class="input-group-prepend">
					    <span class="input-group-text">Email:</span>
					  </div>
					  <input  id="email_mdlPer" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
					</div>
			    </div>
			    <div class="col-sm-4">
			      	<div class="input-group input-group-sm">
					  <div class="input-group-prepend">
					    <span class="input-group-text">Usuario:</span>
					  </div>
					  <select class="custom-select" id="usu_mdlPer">
					  </select>
					</div>
			    </div>
			  </div>
			  <div class="form-group row">
			    <div class="col-sm-6">
			      	<div class="input-group input-group-sm">
					  <div class="input-group-prepend">
					    <span class="input-group-text">Contraseña:</span>
					  </div>
					  <input  id="pass_mdlPer" type="password" pattern=".{6,}" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
					</div>
			    </div>
			    <div class="col-sm-6">
			      
			    </div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
	        <button id="btnSave_mdlPer" type="button" class="btn btn-primary">Guardar</button>
	      </div>
	    </div>
	  </div>
	</div>

	<div id="mdl_xPers" class="modal" tabindex="-1" role="dialog">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 id="title_mdlXPers" class="modal-title"></h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	       	<span>¿Seguro de borrar el usuario permanentemente?</span>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
	        <button id="btn_xPers" type="button" class="btn btn-danger">Si</button>
	      </div>
	    </div>
	  </div>
	</div>


  <div class="loadMsg" id="loadWindow" tabindex="-1" >
    <div class="div_imgLoad"><span>LOADING...</span></div>  
  </div>
  

  <!-- Bootstrap core JavaScript -->
  <script src="js/code/index.js"></script>
  <script src="js/code/funciones.js"></script>
  <script src="js/jquery/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>

  <script src="js/bootstrap/bootstrap.bundle.min.js"></script>

  <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
  <script>
    
  </script>

  
</body>

</html>

