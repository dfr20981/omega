  <?php
  	session_start();
    require_once("../Code/Controller/conexion.php");

    if(!isset($_SESSION["json"])){
      //echo "no existe sesion";
      header("Location: ../Code/close/closeSesion.php");
      exit();
    }
    
    $json=$_SESSION["json"];
    //$obj = json_decode($json);
  ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Omega Inventario</title>

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" rel="stylesheet">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  
  <!-- Custom styles for this template -->
  <link href="css/code/simple-sidebar.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="css/code/index.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" type="text/css" href="css/code/inv_estilo.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" type="text/css" href="css/code/dashboard.css?v=<?php echo time(); ?>">
</head>
<body>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-dark border-right" id="sidebar-wrapper">
      <div id="DivUser" class="DivUser">
          <center>Usuario: <?php  echo $json->nom; ?></center>
      </div>
      <div id="letra" class="sidebar-heading" style="padding: 0.1rem 1.25rem;">
        <center>Menu</center>
      </div>
      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-12 d-none d-md-block bg-dark sidebar">
            <div id="menuLeft" class="sidebar-sticky" style="">
              <ul class="nav flex-column"  id="li_categos">
                <li class="nav-item" onclick="fn_selectMenu(0)">
                  <a class="nav-link active" href="#content_menu_vales"  data-toggle="tab" style="padding: .2rem 1rem;">
                    <span data-feather="file"></span>
                    Doc. Vales <span class="sr-only">(current)</span>
                  </a>
                </li>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted" style="padding: 0.1rem 1.25rem;">
                  <span style="font-size: 0.9em; color: #fff !important;">Categorias&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <a class="d-flex align-items-center text-muted" href="#" onclick="fn_newCatego()">
                    <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">
                      <span data-feather="search"></span>
                    </span>
                  </div>
                  <input type="text" class="form-control  form-control-sm" id="inpSearchCat" placeholder="Buscar Categoria" onkeyup="fn_buscarCategos()">
                </div>
                

              </ul>
            </div>
          </nav>
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
                            <img src="img/inventario.png" style="height: 29px;width: 41px;">
                          </th>
                          <th style="text-align:left; color: #fff; font-size: 19px;" >Inventario</th>
                        </tr>
                      </table>  
                </div>
                <div class="col-sm-4 col-md-4 col-lg-6 col-xl-6 text-center">
                    
                </div>
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3  text-right">
                  <a class="btn btn-danger pull" href="../Code/close/closeSesion.php?error=9">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>Salir
                  </a>
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
                            <button class="btn btn-info mt-2" onclick="fn_newVale()">
                              <i class="fa fa-plus-circle"></i> Nuevo Vale
                            </button>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <button class="btn btn-info mt-2" onclick="fn_mdlBuscarVales()">
                              <i class="fa fa-search" aria-hidden="true"></i> Buscar Vales
                            </button>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                          
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                          
                          </div>
                        </div>      
              </div>
          </div>
          <div id="cont_tb_Vales" class="contenido_prin">
            <table id="tb_Vales" class="display compact" style="width:100%">
                <thead>
                    <tr>
                        <th class="btn-info centerTD">#</th>
                        <th class="btn-info centerTD">Clave</th>
                        <th class="btn-info centerTD">Tipo</th>
                        <th class="btn-info centerTD">Sitio</th>
                        <th class="btn-info centerTD">Fecha</th>
                        <th class="btn-info centerTD">Partidas</th>
                        <th class="btn-info centerTD">Editar</th>
                        <th class="btn-info centerTD">Imp.</th>
                        <th class="btn-info centerTD">X</th>
                    </tr>
                    <tr>
                      <th style="text-align: center;">
                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                      </th>
                      <th style="text-align: center;" data-column="1">
                          <input type="text" class="col_filVales form-control form-control-sm" placeholder="Buscar Id" id="col1_Vales">
                      </th>
                      <th style="text-align: center;" data-column="2">
                          <input type="text" class="col_filVales form-control form-control-sm" placeholder="Tipo" id="col2_Vales">
                      </th>
                      <th style="text-align: center;" data-column="3">
                          <input type="text" class="col_filVales form-control form-control-sm" placeholder="Sitios" id="col3_Vales">
                      </th>
                      <th style="text-align: center;" data-column="4">
                          <input type="text" class="col_filVales form-control form-control-sm" placeholder="Fechas" id="col4_Vales">
                      </th>
                      <th style="text-align: center;" data-column="5">
                          <input type="text" class="col_filVales form-control form-control-sm" placeholder="Partidas" id="col5_Vales">
                      </th>
                      <th></th><th></th><th></th>
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
                        <th></th>
                    </tr>
                </tfoot>
            </table>
          </div>
        </div>
       </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->

  <div id="mdl_buscarVales" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Buscar Vales</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Id Vale:</span>
                  </div>
                  <input type="text" id="inp_idValMdlSrc" class="form-control" placeholder="VA000001" aria-label="" aria-describedby="basic-addon1">
                </div>
              </div> 
            </div>
            <div class="row mb-2">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <span>Seleccione Periodo:</span>
              </div>  
            </div>  
            <div class="row mb-2">
              <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 text-center">
                <button type="button" class="btn btn-info btn-sm" onclick="fn_mdlValesBtnFch(0)">Hoy</button>
              </div>  
              <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 text-center">
                <button type="button" class="btn btn-info btn-sm" onclick="fn_mdlValesBtnFch(1)">Semana</button>
              </div>  
              <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 text-center">
                <button type="button" class="btn btn-info btn-sm" onclick="fn_mdlValesBtnFch(2)">Mes</button>
              </div>  
            </div>
            <div class="row mb-2">
              <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 text-center">
                <input type="date" class="form-control form-control-sm" id="inpFchIni_mdlVals" placeholder="">
              </div>  
              <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2 text-center">
                <span>al</span>
              </div>  
              <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 text-center">
                <input type="date" class="form-control form-control-sm" id="inpFchFin_mdlVals" placeholder="">
              </div>  
            </div>
            <div class="row mb-2">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Tipo:</span>
                  </div>
                  <select id="slt_tipoMdlSrc" class="custom-select">
                    <option value="0" selected>Elejir...</option>
                    <option value="1">Salida</option>
                    <option value="2">Entrada</option>
                  </select>
                </div>
              </div>  
            </div>  
            <div class="row mb-2">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Sitio:</span>
                  </div>
                  <input type="text" id="inp_sitioMdlSrc" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
                </div>
              </div>  
            </div>  
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary  btn-sm" onclick="fn_buscarVales()">Buscar</button>
        </div>
      </div>
    </div>
  </div>


  <div id="mdl_newCatego" class="modal fade bd-example-modal-md" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="titModalCatego" class="modal-title">Agregar Categoria</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
           <form id="frm_modal_newCatego">
            <div class="form-group">
              <label for="inp_nomNewCatego">Nombre:</label>
              <input type="text" class="form-control" id="inp_nomNewCatego" aria-describedby="inp_nomNewCategoHelp" placeholder="">
              <small id="inp_nomNewCategoHelp" class="form-text text-muted">Debe colocar un nombre para Agregar una nueva Categoria</small>
            </div>
            <div class="form-group">
              <label for="inp_descNewCatego">Descripción:</label>
              <textarea class="form-control" id="inp_descNewCatego" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button id="btnModalCat" type="button" class="btn btn-primary" onclick="fn_saveNewCatego()">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_newElemt" class="modal fade-modal-xl"  tabindex="-1" role="dialog" data-controls-modal="your_div_id" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title " id="exampleModalScrollableTitle" style="color: #fff!important;   text-align: center;">Registro</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
             <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="form-group row" style="margin-bottom:0em;">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Nombre:</span>
                  </div>
                  <input type="text" class="form-control"  name="nombre" placeholder="Ingrese el Nombre del material, elemento o producto" value="" id="frm_newEle_nom" >
                </div>
              </div>      
              <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4  mt-2">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Categoria:</span>
                  </div>
                  <input type="text" class="form-control" name="categoria" placeholder="Ingrese Categoria" value=""  id="frm_newEle_catego">
                </div>
              </div>      
              <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4  mt-2">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Marca:</span>
                  </div>
                  <input type="text" class="form-control" name="marca" placeholder="Ingrese la Marca" value=""  id="frm_newEle_marca">
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4  mt-2">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Modelo:</span>
                  </div>
                  <input type="text" class="form-control" name="modelo" placeholder="Ingresa Modelo" value="" id="frm_newEle_modelo">
                </div>
              </div>      
            </div>
            <div class="form-group row mt-2" style="margin-bottom:0em;">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Capacidad:</span>
                  </div>
                  <input type="text" class="form-control" name="capacidad" placeholder="" 
                   value="" id="frm_newEle_capaci" value="0">
                  <div class="input-group-append">
                    <select class="input-group" id="frm_newEle_uni" style="font-size: 12px;">
                      <option selected value="pz">pz</option>
                      <option value="lt">lt</option>
                      <option value="mt">mt</option>
                      <option value="Kg">Kg</option>
                    </select>
                  </div> 
                </div>
              </div>  
              <!--    
              <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2">
                <label for="basic-url">Unidad:</label>
                <div class="input-group mb-1">1
                   <input type="text" class="form-control form-control-sm" name="peso" placeholder="pz,lt,kg"  aria-describedby="basic-addon3"
                   value="" id="frm_newEle_uni"/>
                </div> 
              </div>      
            -->
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Altura:</span>
                  </div>
                  <input type="text" class="form-control" name="altura" placeholder=""  aria-describedby="basic-addon3" value="" id="frm_newEle_alt"/>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon3">cm</span>
                  </div>
                </div>
              </div>  
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Ancho:</span>
                  </div>
                  <input type="text" class="form-control" name="ancho" placeholder=""  aria-describedby="basic-addon3"  value="" id="frm_newEle_ancho"/>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon3">cm</span>
                  </div>
                </div>
              </div>  
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
                <div class="input-group  input-group-sm" title="Profundidad">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Prof.:</span>
                  </div>
                  <input type="text" class="form-control form-control-sm" name="profundidad" placeholder=""  aria-describedby="basic-addon3" value="" id="frm_newEle_prof"/>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon3">cm</span>
                  </div>
                </div>
              </div>  
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                <div class="input-group  input-group-sm" title="">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Peso:</span>
                  </div>
                  <input type="text" class="form-control" name="peso" placeholder="Ingrese el Peso"  aria-describedby="basic-addon3" value="" id="frm_newEle_peso"/>
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Kg</span>
                  </div>
                </div>
              </div>   
            </div>  
            <div class="form-group row mt-2" style="margin-bottom:0em;">  
              <div class="col-sm-6 col-md-4 col-lg-2 col-xl-1" style="padding-right: 0px;">
                  <label class="control-label tit_formArt">Necesita</label>
              </div>      
              <div class="col-sm-6 col-md-4 col-lg-2 col-xl-2" style="padding-left: 5px; padding-right:5px;">
                <div class="input-group  input-group-sm" title="">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Baterias:</span>
                  </div>
                  <select class="form-control form-control-sm" name="baterias" id="frm_newEle_bate"   value="">
                       <option value="0" selected>No</option>
                       <option value="1">Si</option>
                  </select>    
                </div>
              </div>       
              <div class="col-sm-6 col-md-4 col-lg-2 col-xl-2"  style="padding-left: 0px;">
                <div class="input-group  input-group-sm" title="">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Electricidad:</span>
                  </div>
                  <select class="form-control form-control-sm" name="conexion" id="frm_newEle_elect"   value="">
                    <option value="0"  selected>No</option>
                    <option value="1">Si</option>
                  </select>
                </div>  
              </div>      
              <div id="div_frm_newEle_gasto" class="col-sm-12 col-md-6 col-lg-2 col-xl-2" style="padding-right: 0px;">
                <div class="input-group  input-group-sm" title="">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Costo:</span>
                  </div>
                  <select class="form-control form-control-sm" name="baterias" id="frm_newEle_costo"   value="">
                       <option value="PR" selected>Precio</option>
                       <option value="RE">Renta</option>
                  </select>    
                </div> 
              </div>  
              <div id="div_frm_newEle_precio" class="col-sm-12 col-md-6 col-lg-2 col-xl-2"   style="padding-right:0px;">
                <div class="input-group  input-group-sm" title="">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Precio:</span>
                  </div>
                  <input class="form-control form-control-sm" type="text" name="precio" placeholder="" id="frm_newEle_precio"/>
                </div>   
              </div>  
              <div id="div_frm_newEle_renta" class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                 <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">Renta:</span>
                  </div>
                  <input type="text" class="form-control" name="capacidad" placeholder="" value="" id="frm_newEle_rent" value="0">
                  <div class="input-group-append">
                    <select class="input-group" id="frm_newEle_tipRent" style="font-size: 12px;">
                      <option selected value="1">Diaria</option>
                      <option value="7">Semanal</option>
                      <option value="30">Mensual</option>
                    </select>
                  </div> 
                </div>
              </div>  
            </div>  
          <!--     
            <label class="control-label">Selecciona alguna foto</label>
            <input class="input-group" type="file" id="files"  name="files" accept="image/*" />
            <output id="list"></output>
          -->  
            <br>
            <label class="control-label">Observaciones:</label>
            <textarea class="form-control" name="observaciones" rows="3" value=""
              id="frm_newEle_obs"></textarea>
          <!--  
            <label class="control-label">Codigo de Barras:</label>
            <input class="form-control" type="text" name="barras" placeholder="" value="" id="frm_newEle_cdb"/>
            <p></p>
          -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
          <button type="button" id="frm_newEle_btnSave" id_catego="0" class="btn btn-primary"  onclick="fn_saveElemt(this)">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>


  <div id="mdl_PosicionElemt" class="modal fade-modal-xl"  tabindex="-1" role="dialog" data-controls-modal="your_div_id" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title " id="mdl_PosicionElemt_Title" style="color: #fff!important;   text-align: center;">Posición en Almacen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
             <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
           <div class="container-fluid">
            <div class="row">
              <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="sltAlmPosArt">Almacen</label>
                    </div>
                    <select class="custom-select" id="sltAlmPosArt">
                    </select>
                  </div>
              </div>
              <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">Posición</span>
                    </div>
                    <input id="inpPosPosArt" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
                  </div>
              </div>
              <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <button type="button" class="btn btn-primary" onclick="fn_masPosArt()">
                    <span data-feather="plus-circle"></span>&nbsp;Agregar
                  </button>
              </div>
            </div>  
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <table id="tb_Posiciones" style="width: 100%;">
                    <thead>
                      <tr class="titTabPos">
                        <th>Almacen</th>
                        <th>Posición</th>
                        <th>X</th>
                      </tr> 
                    </thead>
                    <tbody>
                      
                    </tbody>
                  </table>
              </div>
            </div>  
          </div>         
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_searchArt" class="modal  fade-modal-lg" tabindex="-1" role="dialog">
    <div class="modal-dialog  modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 id="tit_mdlSearchArt" class="modal-title">Articulo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="a_tabSitios" data-toggle="tab" href="#contSitios_msa" role="tab" aria-controls="home" aria-selected="true">Sitios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="a_tabVales" data-toggle="tab" href="#contVales_msa" role="tab" aria-controls="profile" aria-selected="false">Vales</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="contSitios_msa" role="tabpanel" aria-labelledby="home-tab">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-12">
                      <table id="tbl_SitMdlSearchArt" style="width: 100%;" class="mt-2">
                        <thead class="bg-primary text-white">
                          <tr>
                            <th style="text-align: center;">#</th>
                            <th style="text-align: center;">Sitio</th>
                            <th style="text-align: center;">Entradas</th>
                            <th style="text-align: center;">Salidas</th>
                            <th style="text-align: center;">Total</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="contVales_msa" role="tabpanel" aria-labelledby="profile-tab">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-12">
                      <table id="tbl_ValMdlSearchArt" style="width: 100%;" class="mt-2">
                        <thead class="bg-primary text-white">
                          <tr>
                            <th style="text-align: center;">#</th>
                            <th style="text-align: center;">Vale</th>
                            <th style="text-align: center;">Sitio</th>
                            <th style="text-align: center;">Tipo</th>
                            <th style="text-align: center;">Cantidad</th>
                            <th style="text-align: center;">Fecha</th>
                            <th style="text-align: center;">Observación</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_vales" class="modalArb">
    <div class="mdl_head">
       <div class="container-fluid">
          <div class="row">
            <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <label id="tit_mdlVales">Nuevo Vale</label>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <button type="button" class="close" aria-label="Close" style="margin-top: 4px;"
                onclick="fn_hidden_mdlVales()">
                <span aria-hidden="true" style="color:#fff;text-shadow: 0 1px 0 #000;">&times;</span>
              </button>
            </div>
          </div>
       </div>
    </div>  
    <div class="mdl_body">
      <div class="mdl_body_h">
        <form class="container-fluid">
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Id Vale:</span>
                        </div>
                        <input id="inpVale_Idvale" class="form-control form-control-sm" type="text" placeholder="VA000001" value="">
                        <div class="input-group-append">
                          <button id="btnValle_llenar" type="button" class="btn btn-primary btn-sm" onclick="fn_llenarForm()">LLenar</button>
                        </div>
                      </div>
                  </div>        
                  <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                      <table style="width: 100%;">
                        <tr>
                          <td><label style="margin: 0px;">Tipo de Vale:</label></td>
                          <td>
                            <div class="custom-control custom-switch">
                              <input type="radio" name="rdi_tipoVale" class="custom-control-input" id="swt_salida">
                              <label class="custom-control-label" for="swt_salida">Salida</label>
                            </div>
                          </td>
                          <td>
                            <div class="custom-control custom-switch">
                              <input type="radio" name="rdi_tipoVale" class="custom-control-input" id="swt_entrada">
                              <label class="custom-control-label" for="swt_entrada">Entrada</label>
                            </div>
                          </td>
                          <td>
                            <div id="contEntSal" class="custom-control custom-switch">
                              <input type="checkbox" name="rdi_tipoVale2" class="custom-control-input" id="swt_entSal">
                              <label class="custom-control-label" for="swt_entSal">(S/E)</label>
                            </div>
                          </td>
                        </tr>
                      </table>
                  </div>  
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Sale de:</span>
                        </div>
                       <input id="inpVale_sitio1" class="form-control form-control-sm" type="text" placeholder="Nombre del sitio" value="">
                      </div>
                  </div>        
                </div>  
                <div class="row mt-2">
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Fecha Lote:</span>
                      </div>
                      <input id="inpVale_fech" class="form-control form-control-sm" type="date" value="">
                    </div>
                    <!--<span id="msgAlert_mdlVale" class="textAlert"></span>-->
                  </div>  
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Articulo:</span>
                        </div>
                       <input id="inpVale_art" class="form-control form-control-sm" type="text" placeholder="Nombre o Clave" value="">
                      </div>
                  </div>      
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Recibe:</span>
                        </div>
                       <input id="inpVale_sitio2" class="form-control form-control-sm" type="text" placeholder="Nombre del sitio" value=""/>
                      </div>
                   </div>      
                </div>
        </form>  
      </div>     
      <div class="mdl_body_b">
        <table id="tb_genVale" class="display compact" style="width:100%">
                <thead>
                    <tr>
                        <th class="btn-info centerTD">#</th>
                        <th class="btn-info centerTD">Clave</th>
                        <th class="btn-info centerTD">Nombre</th>
                        <th class="btn-info centerTD">Categoria</th>
                        <th class="btn-info centerTD">Precio</th>
                        <th class="btn-info centerTD">Posición</th>
                        <th class="btn-info centerTD">Cantidad</th>
                        <th class="btn-info centerTD">Observación</th>
                        <th class="btn-info centerTD">Borrar</th>
                    </tr>
                    <tr>
                      <th style="text-align: center;">
                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                      </th>
                      <th style="text-align: center;" data-column="1">
                          <input type="text" class="col_filgenVale form-control form-control-sm" placeholder="Clave" id="col1_genVale">
                      </th>
                      <th style="text-align: center;" data-column="2">
                          <input type="text" class="col_filgenVale form-control form-control-sm" placeholder="Nombre" id="col2_genVale">
                      </th>
                      <th style="text-align: center;" data-column="3"></th>
                      <th style="text-align: center;" data-column="4"></th>
                      <th style="text-align: center;" data-column="5"></th>
                      <th></th>
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
                        <th></th>
                    </tr>
                </tfoot>
            </table>
      </div>  
      
    </div>  
    <div class="mdl_floor">
      <div class="container-fluid">
          <div class="row">
            <div class="col-sm-4 col-md-6 col-lg-8 col-xl-8">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Observación:</span>
                </div>
                <input id="inpVale_obs" class="form-control form-control-sm" type="text" placeholder="Observación del vale" value="">
              </div>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-2 col-xl-2">
              <button type="button" class="btn btn-secondary btn-sm" onclick="fn_hidden_mdlVales()" style="height: 98%; margin-top: 1px;">
                Cerrar
              </button>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-2 col-xl-2">
              <button type="button" id="btnVale_save" id_catego="0" class="btn btn-info btn-sm"  onclick="fn_saveVale()"  style="height: 98%; margin-top: 1px;"> 
                Guardar
              </button>

            </div>
          </div>
       </div>
    </div>  
  </div>

  <div id="mdl_editVale" class="modal fade-modal-xl"  tabindex="-1" role="dialog" data-controls-modal="your_div_id" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title " id="nomMdl_editVale" style="color: #fff!important;   text-align: center;">Vale</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
             <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
              <form>
                <div class="row">
                  <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                      <label class="">Tipo de Vale:</label>
                  </div>  
                  <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div class="custom-control custom-switch">
                      <input type="radio" name="rdi_tipoVale" class="custom-control-input" id="swt_salida2">
                      <label class="custom-control-label" for="swt_salida">Salida</label>
                    </div>
                  </div>  
                  <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">  
                    <div class="custom-control custom-switch">
                      <input type="radio" name="rdi_tipoVale" class="custom-control-input" id="swt_entrada2">
                      <label class="custom-control-label" for="swt_entrada">Entrada</label>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Sale de:</span>
                        </div>
                       <input id="inpVale_sitio1_2" class="form-control form-control-sm" type="text" placeholder="Nombre del sitio" value="">
                      </div>
                  </div>        
                </div>  
                <div class="row mt-2">
                  <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Articulo:</span>
                        </div>
                       <input id="inpVale_art2" class="form-control form-control-sm" type="text" placeholder="Nombre o Clave" value="">
                      </div>
                  </div>      
                  <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="padding-top: 0px;padding-bottom: 0px;" id="">Recibe:</span>
                        </div>
                       <input id="inpVale_sitio2_2" class="form-control form-control-sm" type="text" placeholder="Nombre del sitio" value=""/>
                      </div>
                   </div>      
                </div>
              </form>  
          </div>
          <div class="container-fluid  mt-1">
            <table id="tb_genVale2" class="display compact" style="width:100%">
                <thead>
                    <tr>
                        <th class="btn-info centerTD">#</th>
                        <th class="btn-info centerTD">Clave</th>
                        <th class="btn-info centerTD">Nombre</th>
                        <th class="btn-info centerTD">Categoria</th>
                        <th class="btn-info centerTD">Marca</th>
                        <th class="btn-info centerTD">Cantidad</th>
                        <th class="btn-info centerTD">Borrar</th>
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
                    </tr>
                </tfoot>
            </table>
          </div>  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
          <button type="button" id="frm_newEle_btnSave2" id_catego="0" class="btn btn-primary"  onclick="fn_editSaveVale()">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_mapa" class="modal fade-modal-xl"  tabindex="-1" role="dialog" data-controls-modal="your_div_id" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title " id="tit_mdlMapa" style="color: #fff!important; text-align: center;">
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
             <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row" style="border-bottom: 1px solid #dcdcdc;">
              <div class="col-md-6">
                <div class="input-group  input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Sitio:</span>
                  </div>
                  <input id="inp_sitioMdlMapa" type="text" class="form-control" placeholder="">
                </div>
              </div>
            </div>
            <div id="mapa_mdlMapa" class="row" style="border-bottom: 1px solid #dcdcdc;">
              <div class="col-md-12">
                EN DESARROLLO
              </div>  
            </div>      
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_borrarArt" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header  bg-dark text-white">
          <h5 id="tit_mdlBorrArt" class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p id="text_mdlBorrarArt"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">Cerrar</button>
          <button id="btnDlt_mdlBrrArt" type="button" class="btn btn-danger" onclick="fn_deleteArt(this)">Borrar</button>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_borrarVale" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header  bg-dark text-white">
          <h5 id="tit_mdlBorrVale" class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p id="text_mdlBorrarVale"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">No</button>
          <button id="btnDlt_mdlBrrVale" type="button" class="btn btn-danger" onclick="fn_deleteVale(this)">Si</button>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_porcion" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="tit_mdlPorcion" class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group row">
               <div class="col-md-6">
                  <div class="input-group mb-3">
                    <input type="text" readonly  class="form-control form-control-plaintext text-right" id="capa_01" value="">
                    <div class="input-group-append">
                      <span class="input-group-text" id="uni_01"></span>
                    </div>
                  </div>
               </div> 
               <div class="col-md-6">
                  <div class="input-group mb-3">
                    <input type="text" readonly  class="form-control form-control-plaintext text-right" id="" value="1">
                    <div class="input-group-append">
                      <span class="input-group-text" id="">pz</span>
                    </div>
                  </div>
               </div> 
            </div>
            <div class="form-group row">
               <div class="col-md-6">
                 <div class="input-group mb-3">
                    <input type="text" class="form-control text-right" id="capa_02" value="" onkeyup="fn_insertCapa()">
                    <div class="input-group-append">
                      <span class="input-group-text" id="uni_02"></span>
                    </div>
                  </div>
               </div> 
               <div class="col-md-6">
                 <div class="input-group mb-3">
                    <input type="text" readonly  class="form-control form-control-plaintext text-right" id="capa_03" value="">
                    <div class="input-group-append">
                      <span class="input-group-text" id="">pz</span>
                    </div>
                  </div>
               </div> 
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button id="btn_mdlProcion" type="button" class="btn btn-primary">Aceptar</button>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_errors" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div id="mdlErr_header" class="modal-header bg-primary" style="padding: 6px; color:#fff;">
          <h5 class="modal-title no_selectable">Aviso</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:#fff;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p id="msg_mdlErrors"></p>
        </div>
        <div class="modal-footer" style="padding: 5px;">
          <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>  

  <div id="mdl_kits" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog  modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Lista de Kit</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" onclick="fn_agregarArtKits()">Agregar</button>
        </div>
      </div>
    </div>
  </div>

  <div id="mdl_ExcelUrl" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Actualizar Precios</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="form_subir" action="" method="" enctype="multipart/from-data">
        <div class="modal-body">
            <div class="form-group">
              <label for="exampleFormControlFile1">Buscar Archivo en Excel</label>
              <input type="file" name="archivo" class="form-control-file" id="inpUrlExcel">
            </div>
            <div id="id_loadarch" class="form-group notCar">Cargando 
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>  
            <div id="id_msgArch" class="form-group notCar">Listo...</div>  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" onclick="fn_updateArch()">Actualizar</button>
        </div>
        </form>
      </div>
    </div>
  </div>


  <div class="loadMsg" id="loadWindow" tabindex="-1" >
    <div class="div_imgLoad">
      <div class="spinner-border text-light" style="width: 3rem; height: 3rem;"  role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span>LOADING...</span>
    </div>  
  </div>
  
  <!-- Bootstrap core JavaScript -->
  <script src="js/excel/xlsx.full.min.js"></script>
  <script src="js/excel/FileSaver.min.js"></script>
  <script src="js/code/index.js?v=<?php echo time(); ?>"></script>
  <script src="js/code/funciones.js?v=<?php echo time(); ?>"></script>
  <script src="js/code/reload.js?v=<?php echo time(); ?>"></script>
  <script src="js/jquery/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>

  <script src="js/bootstrap/bootstrap.bundle.min.js"></script>

  <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
  <script>
    var parametors={usu:"M",viewColVales:[]};
    feather.replace()
  </script>

  <!-- Menu Toggle Script -->
  <script>
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  </script>
</body>
</html>

