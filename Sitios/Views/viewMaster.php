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

  <title></title>

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" rel="stylesheet">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <!-- Custom styles for this template -->
  <link rel="stylesheet" type="text/css" href="css/code/simple-sidebar.css" >
  <link rel="stylesheet" type="text/css" href="css/code/index.css">
  <link rel="stylesheet" type="text/css" href="css/code/estilo.css">
</head>
<body onload="startTime()" style="overflow-y:hidden; " >
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class=" bg-dark border-right" id="sidebar-wrapper">
      <div id="DivUser" class="DivUser">
          <center>Usuario: <?php  echo $json->nom; ?></center>
      </div>
      <div id="letra" class="sidebar-heading ">
        <center>Menu</center>
      </div>
      <div id="menuPrin" class="list-group list-group-flush">
        <a id="a1" data-toggle="pill" href="#pills-sitios" role="tab"
        class="list-group-item  active list-group-item-action bg-dark" onclick="fn_setIndexTab(0)">Sitios</a>
        <!--<a id="a1" data-toggle="pill"  href="#pills-vales" role="tab"
        class="list-group-item list-group-item-action bg-dark" onclick="fn_setIndexTab(1)">Vales</a>
        -->
        <a id="a1" data-toggle="pill"  href="#pills-encar" role="tab"
        class="list-group-item list-group-item-action bg-dark" onclick="fn_setIndexTab(2)">Encargados</a>
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
    <div id="page-content-wrapper" >
      <nav class="navbar navbar-expand-lg navbar-ligth  border-bottom"  style="background-color: #006d9e!important;" >
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="container-fluid">
              <div class="row">
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3">
                      <table class="tablaTitPage">
                        <tr>
                          <th style="text-align:right;padding: 4px;">
                            <img src="img/almacen1.png" style="height: 29px;width: 41px;">
                          </th>
                          <th style="text-align:left; color: #fff; font-size: 19px;" >Sitios</th>
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
      <!--EMPIEZAN TABS-->
      <div class="tab-content" id="v-pills-tabContent" >
        <div class="tab-pane fade show active " id="pills-sitios" role="tabpanel" aria-labelledby="pills-sitios-tab" 
        style="width:100%; height:100%;  overflow-x:hidden; ">
          <div class="doce">
            <ul class="list-group list-group-vertical-sm">
            </ul>
            <!--TABLA PARA SITIOS-->
            <table id="tabSitios"   class="display compact" style="width:100%">
                  <thead class="thead-dark">
                    <tr class="bg-dark text-white">
                      <th scope="col">#</th>
                      <th scope="col" id="">Sitio</th>
                      <th scope="col" id="">Encargado</th>
                      <th scope="col" id="">Dirección</th>
                      <th scope="col" id="">Descripción</th>
                      <th scope="col" id="">Inicio</th>                               
                      <th scope="col" id="">Finalizo</th>
                      <!--<th scope="col" id="">Observaciones</th>-->
                      <th scope="col" id="">Editar</th>
                      <th scope="col" id="">Finalizar</th>
                    </tr>
                    <tr>
                      <th style="text-align: center;">
                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                      </th>
                      <th style="text-align: center;" data-column="1">
                          <input type="text" class="col_filSitios form-control form-control-sm" placeholder="Sitio" id="col1_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="2">
                          <input type="text" class="col_filSitios form-control form-control-sm" placeholder="Encargado" id="col2_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="3">
                          <input type="text" class="col_filSitios form-control form-control-sm" placeholder="DIrección" id="col3_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="4">
                          <input type="text" class="col_filSitios form-control form-control-sm" placeholder="Descripción" id="col4_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="5">
                          <input type="text" class="col_filSitios form-control form-control-sm" placeholder="Inicio" id="col5_Sitios">
                      </th>
                      <th style="text-align: center;" data-column="6">
                          <input type="text" class="col_filSitios form-control form-control-sm" placeholder="Finalizo" id="col6_Sitios">
                      </th>
                      <th></th>
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
                      <td></td>
                      <td></td>
                    </tr> 
                  </tfoot>
            </table>
          </div>
        </div>
        <div class="tab-pane fade" id="pills-vales" role="tabpanel" aria-labelledby="pills-vales-tab" style="width:100%; height:600px; overflow: scroll;  overflow-x:hidden; ">
          <div class="doce">
            <ul class="list-group list-group-horizontal-sm">
            </ul>
            <!--TABLA PARA VALES-->
            <table class="table" id="tabVales" width="130%">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Clave</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Sitio</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Partidas</th>
                      <th scope="col">Visualizar</th>
                      <th scope="col">Imprimir</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
                      <td></td>
                    </tr> 
                  </tfoot>
            </table>
          </div>
        </div><!---->
        <div class="tab-pane fade" id="pills-encar" role="tabpanel" aria-labelledby="pills-encar-tab" style="width:100%; height:600px; overflow: scroll;  overflow-x:hidden; ">
          <div class="doce">
            <!--
            <ul class="list-group list-group-horizontal-sm">
                  <li><button  type="button" class="btn btn-info"  data-toggle="modal" data-target="#modaldardealtauser" id="botondardealta"><img width="15px" src="img/mas.png"id="imggra" style="margin-left: -8px;  float: center;">&nbsp&nbspDar de alta encargados
                  </button></li>
            </ul>
            -->
            <!--TABLA PARA USUARIOS-->
            <table id="tabEncargado"  class="display compact" style="width:100%">
                  <thead class="thead-dark">
                    <tr class="bg-dark text-white">
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Cargo</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Editar</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                     <tr>
                      <th style="text-align: center;">
                         <img title="Filtros" class="btnImgTablas" src="./img/filter.png">
                      </th>
                      <th style="text-align: center;" data-column="1">
                          <input type="text" class="col_filEncar form-control form-control-sm" placeholder="Nombre" id="col1_Encar">
                      </th>
                      <th style="text-align: center;" data-column="2">
                          <input type="text" class="col_filEncar form-control form-control-sm" placeholder="Cargo" id="col2_Encar">
                      </th>
                      <th style="text-align: center;" data-column="3">
                          <input type="text" class="col_filEncar form-control form-control-sm" placeholder="Correo" id="col3_Encar">
                      </th>
                      <th style="text-align: center;" data-column="4">
                          <input type="text" class="col_filEncar form-control form-control-sm" placeholder="Telefono" id="col4_Encar">
                      </th>
                      <th></th>
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
      </div><!---->
    </div>
    <!-- /#page-content-wrapper -->
  </div>  
<!-- EMPIEZAN LOS MODAL-->
<!-- Modal para dar de alta sitio   -->
  <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true"  id="modaldardealta" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title" id="exampleModalCenterTitle" style="color: #fff!important;">Dar de alta sitio</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="formulariodardealta">
              <div class="modal-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label  for="nom">Sitio:</label>
                      <input type="text" class="form-control" id="nom" placeholder=""  required>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="">Encargado:</label>
                      <input type="text" class="form-control" id="encargado" placeholder=""  required>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="">Calle:</label>
                      <input type="text" class="form-control" id="calle" placeholder=""  required>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-2">
                      <label title="Numero Interno" for="">Num.Int.:</label>
                      <input type="text" class="form-control" id="num_int" placeholder="">
                    </div>
                    <div class="form-group col-md-2">
                      <label title="Numero Externo" for="">Num.Ext.:</label>
                      <input type="text" class="form-control" id="num_ext" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="">Colonia:</label>
                      <input type="text" class="form-control" id="colonia" placeholder="" >
                    </div>
                    <div class="form-group col-md-4">
                      <label for="">Delegación:</label>
                      <input type="text" class="form-control" id="delegacion" placeholder="">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="">Estado:</label>
                      <input type="text" class="form-control" id="estado" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="  ">País:</label>
                      <input type="text" class="form-control" id="pais" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label title="Codigo postal"for="  ">C.P.:</label>
                      <input type="text" class="form-control" id="cp" placeholder="">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="">Observacion:</label>
                      <textarea class="form-control" id="obser" rows="3"></textarea>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="  ">Descripcion:</label>
                      <textarea class="form-control" id="descr" rows="3"></textarea>
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal"><img width="15px" src="img/tachar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspCancelar</button>
                
                <button type="button" class="btn btn-info" onclick="fn_newSitio()"  id="botonagregarmodal"><img width="15px" src="img/mas.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspAgregar</button>
              </div>
              </form>
            </div>
          </div>
  </div>
<!-- MODAL PARA EDITAR SITIOS -->
  <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true"  id="modaleditar" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title" id="editTit" style="color: #fff!important;">Editar sitio</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="formulariodardealta">
              <div class="modal-body">
                <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="">Sitio:</label>
                      <input type="text" class="form-control" id="editSitio" placeholder="">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="  ">Calle:</label>
                      <input type="text" class="form-control" id="editCalle" placeholder="">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-2">
                      <label for="editNumInt" title="Numerto Interior">Num. Int.:</label>
                      <input type="text" class="form-control" id="editNumInt" placeholder="">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="editNumExt"  title="Numerto Exterior">Num. Ext.:</label>
                      <input type="text" class="form-control" id="editNumExt" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="editCol">Colonia:</label>
                      <input type="text" class="form-control" id="editCol" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="editDel">Delegación:</label>
                      <input type="text" class="form-control" id="editDel" placeholder="">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="editEstado">Estado:</label>
                      <input type="text" class="form-control" id="editEstado" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="editPais">País:</label>
                      <input type="text" class="form-control" id="editPais" placeholder="">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="editCP" title="Codigo Postal">C.P.:</label>
                      <input type="text" class="form-control" id="editCP" placeholder="">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="">Observación</label>
                      <textarea class="form-control" id="editObser" style=" resize: none;" rows="3"></textarea>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="  ">Descripción</label>
                      <textarea class="form-control" id="editDescr" style=" resize: none;" rows="3"></textarea>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="form-group col-md-2">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="swithFin01">
                    <label class="custom-control-label" for="swithFin01" style="margin-left: -700px;">Finalizar</label>
                  </div>
                </div>
                <button type="button" class="btn btn-light" data-dismiss="modal"><img width="15px" src="img/tachar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspCancelar</button>
                <button type="button" class="btn btn-warning custom-btn text-white" id="dardealta" onclick="fn_editSitio()" ><img width="15px" src="img/editar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;" >&nbspEditar</button>
              </div>
              </form>
            </div>
          </div>
  </div>
<!--DAR DE ALTO USUARIO -->
  <div class="modal fade" id="modaldardealtauser" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header bg-dark">
              <h5 class="modal-title" id="exampleModalScrollableTitle" style="color: #fff!important;">Agregar nuevo encargado</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action=""  method="" id="formulariodardealta">
                <div class="form-group">
                  <label for="formGroupExampleInput">Nombre</label>
                  <input type="text" class="form-control" id="nomuser" name="nom" placeholder="Nombre de usuario">
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Cargo</label>
                  <input type="text" class="form-control" id="cargo" name="cargo" placeholder="Cargo de usuario">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Correo</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo de usuario">
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Telefono</label>
                  <input type="text" class="form-control" id="tel" name="tel" placeholder="Numero de telefono">
                </div>
              </form>  
            </div>    
            <div class="modal-footer">
                 <button type="button" class="btn btn-light" data-dismiss="modal"><img width="15px" src="img/tachar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspCancelar</button>

                 <button type="button" class="btn btn-info" onclick="fn_newPer()"  id="botonagregarmodal"><img width="15px" src="img/mas.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspAgregar</button>
            </div>
          </div>
        </div>
  </div>

  <div class="modal fade" id="modaleliminaruser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Estas apunto de eliminar el registro
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal"><img width="15px" src="img/tachar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspCancelar</button>

            <button type="button" class="btn btn-danger" id="botoneliminar"><img width="15px" src="img/eliminar.png"  style="margin-left: -8px; margin-top: -5px; float: center; ">&nbspEliminar</button>
          </div>
        </div>
      </div>
  </div>
<!--MODAL PARA EDITAR USUARIO-->
  <div class="modal fade" id="modaleditaruser" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title" id="editUsuarioTit" style="color: #fff!important;">Editar usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff!important;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form action=""  method="" id="formulariodardealta">

            <div class="form-group">
              <label for="formGroupExampleInput2">Nombre</label>
              <input type="text" class="form-control" id="editUserNom" name="" placeholder="">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Correo</label>
              <input type="email" class="form-control" id="editemailuser" aria-describedby="emailHelp" placeholder="">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Telefono</label>
              <input type="text" class="form-control" id="editteluser" name="editteluser" placeholder="">
            </div>
            <div class="form-group">
              <label >Cargo</label>
              <input type="text" name="bday" id="editCargo" class="form-control">
            </div>
            <div class="form-group">
              <label for="editestado">Estado</label>
              <select class="form-control " id="editestado1">
                <option value="A">Activo</option>
                <option value="S" >Suspendido</option>
                <option value="T" >Temporal</option>
                <option value="C">Eliminar</option>
              </select>
            </div>
            <div class="modal-footer">
             <button type="button" class="btn btn-light" data-dismiss="modal"><img width="15px" src="img/tachar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;">&nbspCancelar</button>

             <button type="button" class="btn btn-warning custom-btn text-white" onclick="fn_editPersonal()"><img width="15px" src="img/editar.png" id="imggra" style="margin-left: -8px; margin-top: -5px; float: center;" onclick="">&nbspEditar</button></button>
           </form>
         </div>
       </div>
     </div>
   </div>
  </div>

     <!-- /#wrapper -->

     <!-- Bootstrap core JavaScript -->
     <script src="js/code/index.js"></script>
     <script src="js/code/funciones.js"></script>
     <script src="js/jquery/jquery.min.js"></script>
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
     <!--<script type="text/javascript" src="js/classjs/inventario.js"></script>-->
     <script src="js/classjs/sitios.js" type="text/javascript" ></script>
     <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
     <script src="js/datatables/jquery.dataTables.min.js"></script>
     <!-- Menu Toggle Script -->
     <script>
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");

      });

    </script>
    <script type="text/javascript">

    </script>

  </body>

  </html>



