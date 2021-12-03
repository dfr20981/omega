<?php
  $error = $_GET["error"];
  
  $msg='';
  if($error ==0){
      $msg='Error de conexión revisar si esta conectado';
  }else if($error ==1){
      $msg='Usuario o contranseña no validos, Revisar';
  }else if($error ==2){
      $msg='Usuario no tiene acceso a esta sección';
  }else{
      $msg='';
  } 
?>
<!DOCTYPE HTML>

<html>
   <head>
      <title>Omega</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="stylesheet" type="text/css" href="css/estilos.css">
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
  </head>
  <body class="is-preload" style="background-color: #ECF0F1;" >
      <div class="omega_head">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-3">
                  <h3 class="tit_api" style="" title="Sistema de Adminiastración para Inventario Constructora Omega">SAICO</h3>
            </div>
            <div class="col-sm-6">
            </div>
            <div class="col-sm-3">
               <img src="img/logo.jpg" class=" imgEmp">
            </div>
          </div>
        </div>        
      </div>     
      <div class="omega_body">
        <div class="container-fluid">
          <div class="row sec1" >
            <div class="col-sm-12">  </div>
          </div>
          <div class="row sec2">
            <div class="col-sm-3">
              <div class="btnCircle" onclick="fn_openModalIngresar(0)">
                  <table style="width: 100%; height: 100%;">
                    <tr><td class="text-center" ><img src="img/almacen1.png" class="imgbtn " /></td></tr>
                  </table>
              </div>
              <div class="text-center">
                  <span class="textTitBtn">SITIOS</span>
              </div>
            </div>
            <div class="col-sm-3">
               <div class="btnCircle" onclick="fn_openModalIngresar(1)">
                  <table style="width: 100%; height: 100%;">
                    <tr><td class="text-center" ><img src="img/inventario.png" class="imgbtn " /></td></tr>
                  </table>
              </div>
              <div class="text-center">
                  <span class="textTitBtn">INVENTARIO</span>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="btnCircle" onclick="fn_openModalIngresar(2)">
                  <table style="width: 100%; height: 100%;">
                    <tr><td class="text-center" ><img src="img/reporte.png" class="imgbtn " /></td></tr>
                  </table>
              </div>
              <div class="text-center">
                  <span class="textTitBtn">REPORTES</span>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="btnCircle" onclick="fn_openModalIngresar(3)">
                  <table style="width: 100%; height: 100%;">
                    <tr><td class="text-center" ><img src="img/config.png" class="imgbtn " /></td></tr>
                  </table>
              </div>
              <div class="text-center">
                  <span class="textTitBtn">CONFIGURACION</span>
              </div>
            </div>
          </div>
          <div class="row sec3">
            <div class="col-sm-9"> <span><?php echo $msg; ?></span> </div>
            <div class="col-sm-3">
              <span class="textVer">Version 1.0.0</span>
            </div>
          </div>
        </div>        
      </div>     
      <!-- Modals -->
      <div class="modal fade" id="modalIngresar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">INGRESA</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_set" action="" method="post">
            <div class="modal-body">
               <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Usuario:</label>
                  <input type="text" class="form-control" id="iptUsuario" name="iptUsuario" placeholder="Usuario">
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Contraseña:</label>
                  <input type="password" class="form-control" id="iptPassword" name="iptPassword" placeholder="Contraseña">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary" onclick="$('#modalIngresar').modal('hide');">Ingresar</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      <!-- \Modals -->
      <!-- Scripts -->
      <script src="js/jquery.min.js"></script>
      <script src="js/index.js"></script>
      <script src="js/bootstrap.min.js"></script>
  </body>
</html>
