<?php
  	
  session_start();
  require_once("../Code/Controller/conexion.php");

  if(!isset($_SESSION["json"])){
    //echo "no existe sesion";
    header("Location: ../Code/close/closeSesion.php");
    exit();
  }
  
  $json=$_SESSION["json"];

//echo "que onda Reportes->MAESTRO";
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
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.20/b-1.6.1/b-colvis-1.6.1/b-flash-1.6.1/b-html5-1.6.1/b-print-1.6.1/datatables.min.css"/>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  
  <!-- Custom styles for this template -->
  <link rel="stylesheet" type="text/css" href="css/code/index.css">
  <link rel="stylesheet" type="text/css" href="css/code/estilo.css">
  <link rel="stylesheet" type="text/css" href="css/code/dashboard.css">
  <link rel="stylesheet" type="text/css" href="css/code/simple-sidebar.css">

</head>
<body>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class=" bg-dark border-right" id="sidebar-wrapper" >
      <div id="DivUser" class="DivUser">
          <center>Usuario: <?php  echo $json->nom; ?></center>
      </div>
      <div id="letra" class="sidebar-heading ">
        <center><span style="text-transform: none;" >Menu</span></center>
      </div>
      <div id="menuPrin" style="width: 100%;" class="list-group list-group-flush">
        <a id="a1" data-toggle="pill" href="#pills-sitios" role="tab"
        class="list-group-item  active list-group-item-action bg-dark" onclick="fn_setIndexTab(0)">Sitios</a>
        <a id="a1" data-toggle="pill"  href="#pills-vales" role="tab"
        class="list-group-item list-group-item-action bg-dark" onclick="fn_setIndexTab(1)">Vales</a>
        <a id="a2" data-toggle="pill"  href="#pills-precios" role="tab"
        class="list-group-item list-group-item-action bg-dark" onclick="fn_setIndexTab(2)">
          Precios
        </a>
        <a id="a2" data-toggle="pill"  href="#pills-costos" role="tab"
        class="list-group-item list-group-item-action bg-dark" onclick="fn_setIndexTab(3)">
          Costos
        </a>
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
                            <img src="img/reporte.png" style="height: 29px;width: 41px;">
                          </th>
                          <th style="text-align:left; color: #fff; font-size: 19px;" >Reportes</th>
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
        <div class="tab-pane fade show active " id="pills-sitios" role="tabpanel" aria-labelledby="pills-sitios-tab" style="width:100%; height:100%;  overflow-x:hidden; ">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3" style="padding: 0px;">
                <table class="table display compact" id="tabSitSit" style="width:100%">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Sitios</th>
                      <th scope="col">Estado</th>
                    </tr>
                    <tr>
                      <th style="text-align: center;">
                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                      </th>
                      <th style="text-align: center;" data-column="1">
                          <input type="text" class="col_filSitSit form-control form-control-sm" placeholder="Sitio" id="col1_SitSit">
                      </th>
                      <th style="text-align: center;" data-column="2">
                          <input type="text" class="col_filSitSit form-control form-control-sm" placeholder="Estado" id="col2_SitSit">
                      </th>
                    </tr>  
                  </thead>
                  <tbody></tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>  
                  </tfoot>
                </table>    
              </div>
              <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                <table class="table display compact" id="tabSitios" style="width:100%" >
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" id="">Articulo</th>
                      <th scope="col" id="">Categoria</th>
                      <th scope="col" id="">Marca</th>
                      <th scope="col" id="" title="Cantidad en pz">Cant.</th>
                      <th scope="col" id="" title="Cantidad en Capacidad">Cap.</th>
                    </tr>
                    <tr>
                      <th style="text-align: center;">
                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                      </th>
                      <th style="text-align: center;" data-column="1">
                          <input type="text" class="col_filSitios form-control form-control-sm" id="col1_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="2">
                          <input type="text" class="col_filSitios form-control form-control-sm" id="col2_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="3">
                          <input type="text" class="col_filSitios form-control form-control-sm" id="col3_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="4">
                          <input type="text" class="col_filSitios form-control form-control-sm" id="col4_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="5">
                          <input type="text" class="col_filSitios form-control form-control-sm" id="col5_Sitios">
                      </th>    
                    </tr>  
                  </thead>
                  <tbody></tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr> 
                  </tfoot>
                </table>    
              </div>  
            </div>  
          </div>
            <!--TABLA PARA SITIOS-->
        </div>
        <div class="tab-pane fade" id="pills-vales" role="tabpanel" aria-labelledby="pills-vales-tab" style="width:100%; height:100%;">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3"  style="padding: 0px;">
                  <table class="table display compact" id="tabValEnc" style="width:100%">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Encargado</th>
                      </tr>
                      <tr>
                        <th style="text-align: center;">
                           <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                        </th>
                        <th style="text-align: center;" data-column="1">
                            <input type="text" class="col_filValEnc form-control form-control-sm" placeholder="Encargado" id="col1_ValEnc">
                        </th>
                      </tr>  
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr> 
                    </tfoot>
                  </table>    
                </div>
                <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  <table class="table display compact" id="tabVales" style="width:100%">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sitio</th>
                        <th scope="col">Vale</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Partidas</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Imprimir</th>
                      </tr>
                      <tr>
                        <th style="text-align: center;">
                           <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                        </th>
                        <th style="text-align: center;" data-column="1">
                            <input type="text" class="col_filVales form-control form-control-sm" placeholder="Sitio" id="col1_Vales">
                        </th>
                        <th style="text-align: center;" data-column="2">
                            <input type="text" class="col_filVales form-control form-control-sm" placeholder="Vale" id="col2_Vales">
                        </th>
                        <th style="text-align: center;" data-column="3">
                            <input type="text" class="col_filVales form-control form-control-sm" placeholder="Fecha" id="col3_Vales">
                        </th>
                        <th style="text-align: center;" data-column="4">
                            <input type="text" class="col_filVales form-control form-control-sm" placeholder="Partidas" id="col4_Vales">
                        </th>
                        <th style="text-align: center;" data-column="5">
                            <input type="text" class="col_filVales form-control form-control-sm" placeholder="Tipo" id="col5_Vales">
                        </th>
                        <th></th>
                      </tr>  
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr> 
                    </tfoot>
                  </table>    
                </div>  
              </div>  
            </div>
        </div><!---->  
        <div class="tab-pane fade" id="pills-precios" role="tabpanel" aria-labelledby="pills-precios-tab" style="width:100%; height:100%;">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <table class="table display compact" id="tabPreci" style="width:100%">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Unidad</th>
                        <th scope="col" title="Precio Unitario">Prec. Unit.</th>  
                      </tr>
                      <tr>
                        <th style="text-align: center;">
                           <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                        </th>
                        <th style="text-align: center;" data-column="1">
                            <input type="text" class="col_filPreci form-control form-control-sm" placeholder="" id="col1_Preci">
                        </th>
                        <th style="text-align: center;" data-column="2">
                            <input type="text" class="col_filPreci form-control form-control-sm" placeholder="" id="col2_Preci">
                        </th>
                        <th style="text-align: center;" data-column="3">
                            <input type="text" class="col_filPreci form-control form-control-sm" placeholder="" id="col3_Preci">
                        </th>
                        <th style="text-align: center;" data-column="4">
                            <input type="text" class="col_filPreci form-control form-control-sm" placeholder="" id="col4_Preci">
                        </th>
                        <th style="text-align: center;" data-column="5">
                            <input type="text" class="col_filPreci form-control form-control-sm" placeholder="" id="col5_Preci">
                        </th>
                      </tr>  
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                      <tr>
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                      </tr> 
                    </tfoot>
                  </table>    
                </div>
              </div>
            </div>    
        </div>  
        <div class="tab-pane fade" id="pills-costos" role="tabpanel" aria-labelledby="pills-costos-tab" style="width:100%; height:100%;">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <table class="table display compact" id="tabCosto" style="width:100%">
                    <thead class="thead-dark">
                      <tr>
                        <th style="text-align: center;" scope="col">#</th>
                        <th style="text-align: center;" scope="col">Categoria</th>
                        <th style="text-align: center;" scope="col">Articulo</th>
                        <th style="text-align: center;" scope="col">Ingreso</th>
                        <th style="text-align: center;" scope="col">Salio</th>
                        <th style="text-align: center;" scope="col">Unidades</th>
                        <th style="text-align: center;" scope="col" title="Precio Unitario">P.U.</th>  
                        <th style="text-align: center;" scope="col">Total</th>
                      </tr>
                      <tr>
                        <th style="text-align: center;">
                           <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                        </th>
                        <th style="text-align: center;" data-column="1">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col1_Costo">
                        </th>
                        <th style="text-align: center;" data-column="2">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col2_Costo">
                        </th>
                        <th style="text-align: center;" data-column="3">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col3_Costo">
                        </th>
                        <th style="text-align: center;" data-column="4">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col4_Costo">
                        </th>
                        <th style="text-align: center;" data-column="5">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col5_Costo">
                        </th>
                        <th style="text-align: center;" data-column="6">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col6_Costo">
                        </th>
                        <th style="text-align: center;" data-column="7">
                            <input type="text" class="col_filCosto form-control form-control-sm" placeholder="" id="col7_Costo">
                        </th>
                      </tr>  
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                      <tr>
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                        <td style="text-align: right;">Total:</td><td></td>
                      </tr> 
                    </tfoot>
                  </table>    
                </div>
              </div>
            </div>    
        </div>  
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->



  <div class="loadMsg" id="loadWindow" tabindex="-1" >
    <div class="div_imgLoad">
      <div class="spinner-border text-light" style="width: 3rem; height: 3rem;"  role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span>LOADING...</span>
    </div>  
  </div>
  

  <!-- Bootstrap core JavaScript -->
  <script src="js/code/index.js?v=<?php echo time(); ?>"></script>
  <script src="js/code/funciones.js?v=<?php echo time(); ?>"></script>
  <script src="js/jquery/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.20/b-1.6.1/b-colvis-1.6.1/b-flash-1.6.1/b-html5-1.6.1/b-print-1.6.1/datatables.min.js"></script>

  <script src="js/bootstrap/bootstrap.bundle.min.js"></script>

  <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
  <script>
    
  </script>

  
</body>

</html>

