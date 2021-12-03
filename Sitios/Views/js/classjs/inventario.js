
$(document).ready( function () {
   obras = $("#obras").DataTable({
    responsive: true,

      //"ajax": "../../Code/PHP/inventario/consulta.php",
      "order": [],
      "autoWidth": true,
      "processing":true,
      "lengthChange": true,
      "paging":false,
      "info": true,
      "scrollY":"500px",
      "scrollCollapse": false,
      "responsive": true,

      dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf'
    ],

    language: {
      "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
          "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
          "infoFiltered": "(Filtrado de _MAX_ total entradas)",
          "infoPostFix": "",
          "thousands": ",",
          "lengthMenu": "Mostrar _MENU_ Entradas",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "Sin resultados encontrados",
          "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
          }

    },




    });


  

   $(".dataTables_filter input").css({ "background" :"" });
   $(".dataTables_filter input").css({ "margin-top" :"1px" });
   
//FUNCION PARA AGREGAR NUEVO SITIO
/*$("#botondardealta").on('click', function() {
   console.log('Submission was successful.');

   $("#formulariodardealta")[0].reset();
    // remove the error
    $(".form-group").removeClass('has-error').removeClass('has-success');
    $(".text-danger").remove();
    // empty the message div
    $(".messages").html("");


    // submit form
    $("#formulariodardealta").unbind('submit').bind('submit', function() {
      console.log('Submission was successful12.');


      $(".text-danger").remove();


      var form = $(this);

      // validation
      
     
      var fin = $("#fin").val();
      var observacion = $("#observacion").val();
      var descripcion = $("#descripcion").val();
      var lugar = $("#lugar1").val();
      var encargado = $("#encargado1").val();
      var inicio = $("#inicio1").val();
      
     
      if(fin == "") {
        $("#fin").closest('.form-group').addClass('has-error');
        $("#fin").after('<p class="text-danger">Introduce el fin</p>');
      } else {
        $("#fin").closest('.form-group').removeClass('has-error');
        $("#fin").closest('.form-group').addClass('has-success');
      }

      if(observacion == "") {
        $("#observacion").closest('.form-group').addClass('has-error');
        $("#observacion").after('<p class="text-danger">Introduce observaciones</p>');
      } else {
        $("#observacion").closest('.form-group').removeClass('has-error');
        $("#observacion").closest('.form-group').addClass('has-success');
      }

       if(descripcion == "") {
        $("#descripcion").closest('.form-group').addClass('has-error');
        $("#descripcion").after('<p class="text-danger">Introduce descripcion</p>');
      } else {
        $("#descripcion").closest('.form-group').removeClass('has-error');
        $("#descripcion").closest('.form-group').addClass('has-success');
      }
        if(lugar == "") {
        $("#lugar1").closest('.form-group').addClass('has-error');
        $("#lugar1").after('<p class="text-danger">Introduce el lugar</p>');
      } else {
        $("#lugar1").closest('.form-group').removeClass('has-error');
        $("#lugar1").closest('.form-group').addClass('has-success');
      }

       if(encargado == "") {
        $("#encargado1").closest('.form-group').addClass('has-error');
        $("#encargado1").after('<p class="text-danger">Introduce el encargado</p>');
      } else {
        $("#encargado1").closest('.form-group').removeClass('has-error');
        $("#encargado1").closest('.form-group').addClass('has-success');
      }
       if(inicio == "") {
        $("#inicio1").closest('.form-group').addClass('has-error');
        $("#inicio1").after('<p class="text-danger">Introduce el inicio</p>');
      } else {
        $("#inicio1").closest('.form-group').removeClass('has-error');
        $("#inicio1").closest('.form-group').addClass('has-success');
      }



         if(fin && observacion && descripcion && lugar && encargado  && inicio) {
          

                      //$('#obras').DataTable().ajax.reload(); 

        //submi the form to server
         $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {

                $('#obras').DataTable().ajax.reload();
                console.log('Submission was successful.');
                console.log(data);
               
            },


         
        }); // ajax subit
          } // /if

          return false;
        });

   // /submit form for create member
  });*/



//FUNCION PARA EDITAR SITIOS


   // /add modal

});

var menuOp=0;

function fn_selectMenu(op){
  menuOp=op;
}

/*function fn_viewCategos(){

   let id="1";
   let almacen1="AL000026";
  let info={"id":(id)};
  let info2={"almacen":(almacen1)};
  let obj={"op":0,"id":JSON.stringify(info),"almacen":JSON.stringify(info2)};

  console.log(obj);
  $.ajax({
        data:obj,
        url:"../../Code/controlPHP1.php",
        type:'post',
        beforeSend:function(){ /*showLoad() },
        success:function(res){
          console.log(res);


          /*closeLoad();

          $('#mdl_newVale').modal('toggle');
          /*
          let sig1=true;
          try{
             var obj=JSON.parse(res);
             infoArt=obj.arts;
             infoSitios=obj.sitios;
             console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              if(obj.action.ok){
                  
              }else{
                console.log("Aviso",obj.action.msg);
              }
            }
          }
          
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    }); 
}*/


function fn_newSitio(){
  console.log("Algo anda mal");

    let info={"descr":$("#descr").val(),"nom":$("#nom").val(),
    "obser":$("#obser").val(),"calle":$("#calle").val(),
    "num_int":$("#num_int").val(),"num_ext":$("#num_ext").val(),
    "col":$("#col").val(),"del":$("#del").val(),"est":$("#est").val(),"pais":$("#pais").val()};
    let obj={"op":8,"obj":JSON.stringify(info)};

    console.log(info,"---");

  console.log(obj,"!!!!");
  /*
  $.ajax({
        data:obj,
        url:"../../Code/controlPHP1.php",
        type:'post',
        beforeSend:function(){ },
        success:function(res){
          console.log(res);

          //console.log(JSON.parse(res));
          

          $('#modaldardealta').modal('toggle');
          let sig1=true;
          try{
             var obj=JSON.parse(res);
             infoArt=obj.arts;
             infoSitios=obj.sitios;
             console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              if(obj.action.ok){
                  
              }else{
                console.log("Aviso",obj.action.msg);
              }
            }
          }
          
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    }); 
    */
}

function fn_newPer(){
    let info={"nom":$("#nomuser").val(),
    "cargo":$("#cargo").val(),"email":$("#email").val(),
    "tel":$("#tel").val()};
    let obj={"op":9,"obj":JSON.stringify(info)};
    console.log(info);

  console.log(obj);
  $.ajax({
        data:obj,
        url:"../../Code/controlPHP1.php",
        type:'post',
        beforeSend:function(){ /*showLoad() */},
        success:function(res){
          console.log(res);
          /*closeLoad();*/

          $('#modaldardealtauser').modal('toggle');
          /*
          let sig1=true;
          try{
             var obj=JSON.parse(res);
             infoArt=obj.arts;
             infoSitios=obj.sitios;
             console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              if(obj.action.ok){
                  
              }else{
                console.log("Aviso",obj.action.msg);
              }
            }
          }
          */
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    }); 
}


/*function fn_savenewSitio(){

  console.log("hola");

  
  let info={"encargado":$("#encargado1").val(),"lugar1":$("#lugar1").val(),"calle1":$("#calle1").val(),
  "numint1":$("#numint1").val(),"numext1":$("#numext1").val(),"colonia1":$("#colonia1").val(),
  "delegacion1":$("#delegacion1").val(),"estado1":$("#estado1").val(),"pais1":$("#pais1").val(),
  "observacion1":$("#observacion1").val(),"descripcion1":$("#descripcion1").val()};
  let obj={"op":2,"head":JSON.stringify(info),"detalle":JSON.stringify(vecVales)};

  console.log(obj);
  $.ajax({
        data:obj,
        url:"../../Code/controlPHP1.php",
        type:'post',
        beforeSend:function(){ /*showLoad() },
        success:function(res){
          console.log(res);
         /* closeLoad();

          $('#modaldardealta').modal('toggle');
          /*
          let sig1=true;
          try{
             var obj=JSON.parse(res);
             infoArt=obj.arts;
             infoSitios=obj.sitios;
             console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              if(obj.action.ok){
                  
              }else{
                console.log("Aviso",obj.action.msg);
              }
            }
          }
        
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    }); 
}
*/

//


function editMember(id_obra = null) {

   if(id_obra) {
   


    // remove the error
    $(".form-group").removeClass('has-error').removeClass('has-success');
    $(".text-danger").remove();
     //empty the message div
    $(".edit-messages").html("");

    // remove the id
    $("#member_id").remove();

    // fetch the member data
     $.ajax({

      url: '../../Code/PHP/inventario/consultaedit.php',
      type: 'post',
      data: {id_obra : id_obra},
      dataType: 'json',

  success: function(respuesta) {
    console.log(respuesta);
    

   

        $("#lugaredit").val(respuesta.lugar);

        $("#encargadoedit").val(respuesta.encargado);

        $("#inicioedit").val(respuesta.inicio);

        $("#finedit").val(respuesta.fin);

        $("#observacionedit").val(respuesta.observacion);

        $("#descripcionedit").val(respuesta.descripcion);
        // mmeber id
        $(".editar").append('<input type="hidden" name="member_id" id="member_id" value="'+respuesta.id_obra+'"/>');

      $("#formularioeditar").unbind('submit').bind('submit', function() {
          // remove error messages
          $(".text-danger").remove();

          var form = $(this);

          // validation
          var lugar = $("#lugaredit").val();
          var encargado = $("#encargadoedit").val();
          var inicio = $("#inicioedit").val();
          var fin = $("#finedit").val();
          var observacion = $("#observacionedit").val();
          var descripcion = $("#descripcionedit").val();


          if(fin == "") {
        $("#finedit").closest('.form-group').addClass('has-error');
        $("#finedit").after('<p class="text-danger">Introduce el fin</p>');
      } else {
        $("#finedit").closest('.form-group').removeClass('has-error');
        $("#finedit").closest('.form-group').addClass('has-success');
      }

      if(observacion == "") {
        $("#observacionedit").closest('.form-group').addClass('has-error');
        $("#observacionedit").after('<p class="text-danger">Introduce observaciones</p>');
      } else {
        $("#observacionedit").closest('.form-group').removeClass('has-error');
        $("#observacionedit").closest('.form-group').addClass('has-success');
      }

       if(descripcion == "") {
        $("#descripcionedit").closest('.form-group').addClass('has-error');
        $("#descripcionedit").after('<p class="text-danger">Introduce descripcion</p>');
      } else {
        $("#descripcionedit").closest('.form-group').removeClass('has-error');
        $("#descripcionedit").closest('.form-group').addClass('has-success');
      }
        if(lugar == "") {
        $("#lugaredit").closest('.form-group').addClass('has-error');
        $("#lugaredit").after('<p class="text-danger">Introduce el lugar</p>');
      } else {
        $("#lugaredit").closest('.form-group').removeClass('has-error');
        $("#lugaredit").closest('.form-group').addClass('has-success');
      }

       if(encargado == "") {
        $("#encargadoedit").closest('.form-group').addClass('has-error');
        $("#encargadoedit").after('<p class="text-danger">Introduce el encargado</p>');
      } else {
        $("#encargadoedit").closest('.form-group').removeClass('has-error');
        $("#encargadoedit").closest('.form-group').addClass('has-success');
      }
       if(inicio == "") {
        $("#inicioedit").closest('.form-group').addClass('has-error');
        $("#inicioedit").after('<p class="text-danger">Introduce el inicio</p>');
      } else {
        $("#inicioedit").closest('.form-group').removeClass('has-error');
        $("#inicioedit").closest('.form-group').addClass('has-success');
      }





          if(fin && observacion && descripcion && lugar && encargado  && inicio) {

          

                      //$('#obras').DataTable().ajax.reload(); 

        //submi the form to server
         $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {

                $('#obras').DataTable().ajax.reload();
                console.log('Submission was successful.');
                console.log(data);
            },


         
        }); // ajax subit
          } // /if

return false;
        });

      } // /success
    }); // /fetch selected member info

  } else {
    alert("Error : Refresh the page again");
  }
}



function removeMember(id_obra = null) {
  if(id_obra) {
    // click on remove button
    $("#botoneliminar").unbind('click').bind('click', function() {
      console.log("hola")
      $.ajax({
        url: '../../Code/PHP/inventario/eliminar.php',
        type: 'post',
        data: {id_obra : id_obra},
        dataType: 'json',
        success: function (data) {

                $('#obras').DataTable().ajax.reload();
                console.log('Submission was successful.');
                console.log(data);
            },
      });
    }); // click remove btn
  } else {
    alert('Error: Refresh the page again');
  }
}

   



    

    


