<?php
	session_start();
  require_once("../Code/Controller/conexion.php");

  if(!isset($_SESSION["json"])){
    //echo "no existe sesion";
    header("Location: ../Code/close/closeSesion.php");
    exit();
  }
  
  $json=$_SESSION["json"];

	//echo "que onda Control->ADMINSTRADOR";
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
      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-12 d-none d-md-block bg-dark sidebar">
            
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
                            <img src="img/config.png" style="height: 29px;width: 41px;">
                          </th>
                          <th style="text-align:left; color: #fff; font-size: 19px;" >Configuración</th>
                        </tr>
                      </table>  
                </div>
                <div class="col-sm-4 col-md-4 col-lg-6 col-xl-6 text-center">
                    
                </div>
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3  text-right">
                    <a class="btn btn-danger pull" href="../Code/close/closeSesion.php">Salir</a>
                </div>
              </div>    
          </div>
        </div>  
      </nav>
      <div class="tab-content" id="content_menu" style="height: 100%;">
        
       </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->




 


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


