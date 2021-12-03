mi_imagen1=new Image
mi_imagen1.src="media/img/flecha.png"
mi_imagen2=new Image
mi_imagen2.src="MEDIA/IMG/flecha2.png"
var i=1;
function cambia_imagen() {
 if (i == 1)
 {
  document.images['prueba'].src=mi_imagen2.src
  i=2;
}
else
{
  document.images['prueba'].src=mi_imagen1.src;
  i=1;
}
}

function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 12 : hr;
  hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
    var time = setTimeout(function(){ startTime() }, 500);
  }
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  /*-------------------------------------------------------*/
  var menuOp=0;

  function fn_selectMenu(op){
    menuOp=op;
    
  }
  async function fn_ajustaTabSleep(){
    await sleep(200);
    //tb_Vales.columns.adjust().draw();
    $('#container').css( 'display', 'block' );
    tabSitios.columns.adjust().draw();

    //console.log("hola");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fn_ajustaTabSleep1(){
    await sleep(200);
    //tb_Vales.columns.adjust().draw();
    $('#container').css( 'display', 'block' );
    tabVales.columns.adjust().draw();
    
    console.log("hola1");
  }

  async function fn_ajustaTabSleep2(){
    await sleep(200);
    //tb_Vales.columns.adjust().draw();
    $('#container').css( 'display', 'block' );
    tabEncargado.columns.adjust().draw();
    
    console.log("hola1");
  }

 // FUNCION PARA VISUALIZAR TABLA SITIOS 


 var vecSitiso=[];

 function fn_iniSitio(){

  let obj={"op":11};
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
  beforeSend:function(){ /*showLoad() */},
  success:function(res){
   console.log(res);
   /*closeLoad();*/
   $('#modaldardealta').modal('toggle');
   let sig1=true;
   try{
     var obj=JSON.parse(res);
     vecSitiso=obj.personal;
     console.log(obj);
   }catch(e) {
    sig1=false;
    console.log(e,res);
  }

  if(sig1){
    if(obj.error){
      console.log("Error",obj.msg);
    }else{

      if(obj.view.ok){
        $("#encargado").autocomplete({
          appendTo: "#modaldardealta"
          ,source: vecSitiso
          ,minLength:1
          ,messages: {noResults: '',results: function() {}}
          ,select: function (event, ui) {
            console.log(ui.item);  
          }
        });
      }else{
        console.log("Aviso",obj.view.msg);
      }
    }
          }//if
        },  ///res
        error: function (request, status, error) {
          console.log(request.responseText);
        },
      }); 
}

  //FUNCION PARA DAR DE ALTA NUEVO SITIO

var idEncar=0;
function fn_openModalNewSitio(){
  /**/
  let obj={"op":11};
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ },
    success:function(res){
      //console.log(res);
      $("#modaldardealta").modal('show');
      let sig1=true;
      try{
        $( "#encargado" ).autocomplete( "close" );
      }catch(e) {
        //console.log(e,res);
      }
      try{
         var obj=JSON.parse(res);
         personal=obj.personal;
         //console.log(personal);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }

      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);
        }else{
          if(obj.view.ok){
            $("#encargado").autocomplete({
              appendTo: "#modaldardealta"
              ,source: personal
              ,minLength:1
              ,messages: {noResults: '',results: function() {}}
              ,select: function (event, ui) {
                //console.log(ui.item);  
                idEncar=ui.item.id;
              }
            });
          }else{
            console.log("Aviso",obj.view.msg);
          }
        }
      }//if
    },  ///res
    error: function (request, status, error) {
          console.log(request.responseText);
    },
  }); 
  /**/
}

function fn_newSitio(){
  if(idEncar!=0 &&  $("#calle").val()!="" &&  $("#nom").val()!=""){
    let info={"descr":$("#descr").val(),"nom":$("#nom").val(),
       "id_p":parseInt(idEncar),
       "obser":$("#obser").val(),"calle":$("#calle").val(),
       "num_int":$("#num_int").val(),"num_ext":$("#num_ext").val(),
       "col":$("#colonia").val(),"del":$("#delegacion").val(),"est":$("#estado").val(),"pais":$("#pais").val(),
       "cp":$("#cp").val()
     };


    let obj={"op":8,"obj":JSON.stringify(info)};
    
    $.ajax({
      type:'post',
      url:"../Code/controlPHP.php",
      data:obj,
      success:function(res){
        console.log(res);
        $("#modaldardealta").modal('hide');
        let sig1=true;
        try{
           var obj=JSON.parse(res);
        }catch(e) {
          sig1=false;
          console.log(e,res);
        }
        if(sig1){
          if(obj.error){
            console.log("Error",obj.msg);xº
          }else{
            if(obj.actio.ok){
             vecSitiso=obj.sitios;
             console.log(vecSitiso);
             tabSitios.clear().draw();
             tabSitios.rows.add(vecSitiso).draw();
             tabSitios.columns.adjust().draw();
                     // tb_Vales.fixedColumns().update(); 
            }else{
                    console.log("Aviso",obj.action.msg);
            }
          }
        }
        $('#descr').val('');
        $('#nom').val('');
        $('#obser').val('');
        $('#calle').val('');
        $('#num_int').val('');
        $('#num_ext').val('');
        $('#colonia').val('');
        $('#delegacion').val('');
        $('#estado').val('');
        $('#pais').val('');
        $('#encargado').val('');
        idEncar=0;
     }, 
      error: function() {
        console.log("No se ha podido obtener la información");
      },
    }); //ajax
    
  }  
} 



/*
  function fn_newSitio(){

   let info={"descr":$("#descr").val(),"nom":$("#nom").val(),"encargado":$("#encargado").val(),
   "obser":$("#obser").val(),"calle":$("#calle").val(),
   "num_int":$("#num_int").val(),"num_ext":$("#num_ext").val(),
   "col":$("#col").val(),"del":$("#del").val(),"est":$("#est").val(),"pais":$("#pais").val()};
   let obj={"op":8,"obj":JSON.stringify(info)};


   if (info.descr == ""){
    $("#descr").addClass("is-invalid");
  }else {
    $("#descr").removeClass("is-invalid");
    $("#descr").addClass("is-valid");
  }
  if (info.nom == ""){
    $("#nom").addClass("is-invalid");
   // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
 }else {
   $("#nom").removeClass("is-invalid");
   $("#nom").addClass("is-valid");
 }
 if (info.encargado == ""){
  $("#encargado").addClass("is-invalid");
   // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
 }else {
  $("#encargado").removeClass("is-invalid");
  $("#encargado").addClass("is-valid");
  }
  if (info.obser == ""){
    $("#obser").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#obser").removeClass("is-invalid");
    $("#obser").addClass("is-valid");
  }
  if (info.calle == ""){
    $("#calle").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#calle").removeClass("is-invalid");
    $("#calle").addClass("is-valid");
  }
  if (info.num_int == ""){
    $("#num_int").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#num_int").removeClass("is-invalid");
    $("#num_int").addClass("is-valid");
  }
  if (info.num_ext == ""){
    $("#num_ext").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#num_ext").removeClass("is-invalid");
    $("#num_ext").addClass("is-valid");
  }
  if (info.col == ""){
    $("#col").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#col").removeClass("is-invalid");
    $("#col").addClass("is-valid");
  } if (info.del == ""){
    $("#del").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#del").removeClass("is-invalid");
    $("#del").addClass("is-valid");
  } if (info.est == ""){
    $("#est").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#est").removeClass("is-invalid");
    $("#est").addClass("is-valid");

  } if (info.pais == ""){
    $("#pais").addClass("is-invalid");
     // $("#nom").after('<p class="text-danger">Introduce el sitio</p>');
   }else {
    $("#pais").removeClass("is-invalid");
    $("#pais").addClass("is-valid");
  }
  if (info.descr && info.nom && info.encargado&& info.obser&&info.calle&&info.num_int&&info.num_ext&&
    info.col&&info.del&&info.est&& info.pais) {

   $("#alert").after('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Sitio agregado con exito!</strong> .<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');

   

  $.ajax({
    type:'post',
    url:"../Code/controlPHP.php",
    data:obj,
    success:function(res){

        //$('#tabSitios').DataTable().ajax.reload();
        console.log(res);
        console.log(JSON.parse(res)); 

        let sig1=true;
        try{
         var obj=JSON.parse(res);

       }catch(e) {
        sig1=false;
        console.log(e,res);
      }
      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);xº
        }else{
          if(obj.actio.ok){
           vecSitiso=obj.sitios;
           console.log(vecSitiso);
           tabSitios.clear().draw();
           tabSitios.rows.add(vecSitiso).draw();
           tabSitios.columns.adjust().draw();
                   // tb_Vales.fixedColumns().update(); 
                 }else{
                  console.log("Aviso",obj.action.msg);
                }
              }
            }




            $('#descr').val('');
            $('#nom').val('');
            $('#obser').val('');
            $('#calle').val('');
            $('#num_int').val('');
            $('#num_ext').val('');
            $('#col').val('');
            $('#del').val('');
            $('#est').val('');
            $('#pais').val('');
            $('#encargado').val('');


        //Limpiar url

       // document.getElementById("descr").value=''


     }, 
     error: function() {
      console.log("No se ha podido obtener la información");
    },


    }); //ajax
  } 
}*/




 //FUNCION PARA REFRESCAR PAGINA

 function refreshPage() {

  location.reload(true);
}

//FUNCION PARA VISUALIZAR TABLA DE SITIOS 

function fn_actTabSitios(){
  let obj={"op":10,"sel":0,"id":""};
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){
    },
    success:function(res){

      let sig=true;
      try{
        var obj=JSON.parse(res);
        console.log(obj);
      }catch(e){
        console.log(e,res);
        sig=false;
      }

      if(sig){
        if(!obj.error){
          vecSitiso=obj.sitios;
          console.log(vecSitiso);
          tabSitios.clear().draw();
          tabSitios.rows.add(vecSitiso).draw();
            //tabSitios.fixedColumns().update(); 
          }else{
           console.log("Error en la consulta de la BD",obj);
         } 
       }
     },
     error: function (request, status, error) {
      console.log(request.responseText);
    }  
  });

}

// FUNCION PARA VISUALIZAR TABLA DE VALES

function fn_actTabVales(){
  let obj={"op":12};
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){
    },
    success:function(res){
      //console.log(res);
      /**/
      let sig1=true;
      try{
       var obj=JSON.parse(res);
       console.log(obj);
     }catch(e) {
      sig1=false;
      console.log(e,res);
    }
    if(sig1){
      if(obj.error){
        console.log("Error",obj.msg);
      }else{
        vecVales=obj.vales;
        console.log(vecVales);
        tabVales.clear().draw();
        tabVales.rows.add(vecVales).draw();
        tabVales.columns.adjust().draw();
              //tb_Vales.fixedColumns().update(); 
            }
          }
          /**/
        },  
        error: function (request, status, error) {
          console.log(request.responseText);
        }  
      });

}

// FUNCION PARA VISUALIZAR TABLA ENCARGADO 

function fn_actTabEncargado(){
  console.log("Hola");
  let obj={"op":13};
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){
    },
    success:function(res){
      console.log(res);
      /**/
      let sig1=true;
      try{
       var obj=JSON.parse(res);
       console.log(obj);
     }catch(e) {
      sig1=false;
      console.log(e,res);
    }
    if(sig1){
      if(obj.error){
        console.log("Error",obj.msg);
      }else{
        vecEncargado=obj.personal;
        tabEncargado.clear().draw();
        tabEncargado.rows.add(vecEncargado).draw();
        tabEncargado.columns.adjust().draw();
              //tb_Vales.fixedColumns().update(); 
            }
          }
          /**/
        },  
        error: function (request, status, error) {
          console.log(request.responseText);
        }  
      });

}


// FUNCION PARA DAR DE ALTA ENCARGADO  

var vecEncargado=[];

function fn_openModalNewEnc(){
  $("#modaldardealtauser").modal("show");
}

function fn_newPer(){
  let info={"nom":$("#nomuser").val(),
            "cargo":$("#cargo").val(),"email":$("#email").val(),
            "tel":$("#tel").val()};

  let obj={"op":9,"obj":JSON.stringify(info)};
  //console.log(info);
  //console.log(obj);
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ /*showLoad() */},
    success:function(res){
      //console.log(res);  console.log(JSON.parse(res));
      let sig1=true;
      try{
        var obj=JSON.parse(res);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }
      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);
        }else{
          if(obj.action.ok){
            vecEncargado=obj.pers;
            //console.log(vecEncargado);
            tabEncargado.clear().draw();
            tabEncargado.rows.add(vecEncargado).draw();
            tabEncargado.columns.adjust().draw();

            $('#nomuser').val('');
            $('#cargo').val('');
            $('#email').val('');
            $('#tel').val('');
          }else{
                  console.log("Aviso",obj.action.msg);
          }
        }
      }
      $("#modaldardealtauser").modal("hide");
    },  
    error: function() {
          console.log("No se ha podido obtener la información");
    },
  }); 
}

var res1;
// FUNCION PARA RECOGER ID DEL SITIO 
function fn_editSitioP(id){
  var obj={op:10
          ,sel:1
          ,id:$(id).attr("id_aloj")
  };

  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ /*showLoad()*/ },
    success:function(res){
      //console.log(res);
      let sig1=true;
      try{
        var obj=JSON.parse(res);
        console.log(obj);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }
      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);
        }else{

            if(obj.sitios.length>0){
              let sit=obj.sitios[0];
              $("#editTit").text("Editar Sitio "+sit.id);  
              $("#editTit").attr("sitId",sit.id);  

              $("#editSitio").val(sit.nom);  
              $("#editCalle").val(sit.calle);  
              $("#editNumInt").val(sit.num_int);  
              $("#editNumExt").val(sit.num_ext);  
              $("#editCol").val(sit.col);  
              $("#editDel").val(sit.del);  
              $("#editEstado").val(sit.est);  
              $("#editPais").val(sit.pais);  

              $("#editCP").val(sit.cp);  
              $("#editObser").val(sit.obs);  
              $("#editDescr").val(sit.descr);  

              $("#swithFin01").prop( "checked",((sit.fecha_fin=="")?false:true));

            }else{

            }
        }
      }
    },  
    error: function (request, status, error) {
          console.log(request.responseText);
    },
  }); //ajax
}

//FUNCION PARA EDITAR SITIO 
function fn_editSitio(){
  let interr = $("#swithFin01").prop( "checked");
  let res={
    "id_aloj":$("#editTit").attr("sitId"),
    "nom":$("#editSitio").val(),
    "num_int":$("#editNumInt").val(),
    "num_ext":$("#editNumExt").val(),
    "calle":$("#editCalle").val(),
    "descr":$("#editDescr").val(),
    "colonia":$("#editCol").val(),
    "delegacion":$("#editDel").val(),
    "estado":$("#editEstado").val(),
    "pais":$("#editPais").val(),
    "obser":$("#editObser").val(),
    "cp":$("#editCP").val(),
    "finaliza":((interr)?'1':'0')
  };

  let obj={"op":14,"obj":JSON.stringify(res)};

  //console.log(obj);
  /**/
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ },
    success:function(res){
      console.log(res);
      //limpia formulario
      $("#editTit").text("Editar Sitio ");  
      $("#editTit").attr("sitId","");  
      $("#editSitio").val("");  
      $("#editCalle").val("");  
      $("#editNumInt").val("");  
      $("#editNumExt").val("");  
      $("#editCol").val("");  
      $("#editDel").val("");  
      $("#editEstado").val("");  
      $("#editPais").val("");  
      $("#editCP").val("");  
      $("#editObser").val("");  
      $("#editDescr").val("");  
      $("#swithFin01").prop( "checked",false);

      $("#modaleditar").modal('hide');  
      let sig1=true;
      try{
        var obj=JSON.parse(res);
        //console.log(obj);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }

      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);
        }else{
          if(obj.actio.ok){
           vecSitiso=obj.sitios;
           //console.log(vecSitiso);
           tabSitios.clear().draw();
           tabSitios.rows.add(vecSitiso).draw();
           tabSitios.columns.adjust().draw();
                   // tb_Vales.fixedColumns().update(); 
          }else{
            console.log("Aviso",obj.action.msg);
          }
        }
       }
    },  
    error: function (request, status, error) {
          console.log(request.responseText);
    },
  }); //ajax
}

function fn_editFinSitio(id){
  let obj={"op":16
          ,"id_aloj":$(id).attr("id_aloj")
          ,"fin":(($(id).prop("checked")) ?1:0),};  

  //console.log(obj);
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ },
    success:function(res){
      let sig1=true;
      try{
        var obj=JSON.parse(res);
        //console.log(obj);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }

      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);
        }else{
          if(obj.actio.ok){
           vecSitiso=obj.sitios;
           //console.log(vecSitiso);
           tabSitios.clear().draw();
           tabSitios.rows.add(vecSitiso).draw();
           tabSitios.columns.adjust().draw();
                   // tb_Vales.fixedColumns().update(); 
          }else{
            console.log("Aviso",obj.action.msg);
          }
        }
       }
    },  
    error: function (request, status, error) {
          console.log(request.responseText);
    },
  }); //ajax
}



// FUNCION PARA RECOGER ID DEL PERSONAL


function fn_editPersonalPa(id){
  var id_per=$(id).attr("id")
  let obj={"op":11};
  //console.log(id_per);
  $("#editUserNom").val("");  
  $("#editemailuser").val("");  
  $("#editestado1").val("A");  
  $("#editCargo").val("");  
  $("#editteluser").val("");  
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ },
    success:function(res){
      //console.log(res);
      let sig1=true;
      $("#modaleditaruser").modal("show");
      try{
        var obj=JSON.parse(res);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }
      if(sig1){
        if(obj.error){
          console.log("Error",obj.msg);
        }else{
          if(obj.view.ok){
            vecEncargado=obj.personal;
            for(var d=0;d<vecEncargado.length;d++){
                if(vecEncargado[d].id==id_per){
                  $("#editUsuarioTit").text("Editar Usuario "+vecEncargado[d].id);
                  $("#editUsuarioTit").attr("id_per",vecEncargado[d].id);
                  $("#editUserNom").val(vecEncargado[d].nom);  
                  $("#editemailuser").val(vecEncargado[d].email);  
                  $("#editteluser").val(vecEncargado[d].tel);  
                  $("#editestado1").val(vecEncargado[d].est);  
                  $("#editCargo").val(vecEncargado[d].cargo);

                  break;                        
                }
            }
          }else{
                  console.log("Aviso",obj.action.msg);
          }
        }
      }    
    },  
    error: function (request, status, error) {
          console.log(request.responseText);
    },
  }); //ajax
}

// FUNCION PARA EDITAR PERSONAL

function fn_editPersonal(){
  //console.log($("#editCargo").val());
  let res={
   "id":$("#editUsuarioTit").attr("id_per"),
   "cargo":$("#editCargo").val(),
   "email":$("#editemailuser").val(),
   "tel":$("#editteluser").val(),
   "nom":$("#editUserNom").val(),
   "est":$("#editestado1").val()
  };
  //console.log(res);
  let obj={"op":15,"obj":JSON.stringify(res)};
  //console.log(obj);
/*  */
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ },
    success:function(res){
      console.log(res);
      //closeLoad();
      let sig1=true;
      try{
        var obj=JSON.parse(res);
        console.log(obj);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }
      if(sig1){
        if(obj.error){
           console.log("Error",obj.msg);
        }else{
          if(obj.view.ok){
            vecEncargado=obj.personal;
            console.log(vecEncargado);
            tabEncargado.clear().draw();
            tabEncargado.rows.add(vecEncargado).draw();
            tabEncargado.columns.adjust().draw();
          }else{
            console.log("Aviso",obj.view.msg);
          }
        }
      }
            
    },  
    error: function (request, status, error) {
            console.log(request.responseText);
    },
  }); 
/* */
}

function fn_eliminarPers(id){ 
  console.log($(id).attr("id_per"));
   let obj={"op":17,"id_per":$(id).attr("id_per")};
  //console.log(obj);
/*  */
  $.ajax({
    data:obj,
    url:"../Code/controlPHP.php",
    type:'post',
    beforeSend:function(){ },
    success:function(res){
      console.log(res);
      //closeLoad();
      let sig1=true;
      try{
        var obj=JSON.parse(res);
        console.log(obj);
      }catch(e) {
        sig1=false;
        console.log(e,res);
      }
      if(sig1){
        if(obj.error){
           console.log("Error",obj.msg);
        }else{
          if(obj.view.ok){
            vecEncargado=obj.personal;
            console.log(vecEncargado);
            tabEncargado.clear().draw();
            tabEncargado.rows.add(vecEncargado).draw();
            tabEncargado.columns.adjust().draw();
          }else{
            console.log("Aviso",obj.view.msg);
          }
        }
      }
            
    },  
    error: function (request, status, error) {
            console.log(request.responseText);
    },
  }); 
/* */
}


function fn_impVale(id){
  console.log("fn_impVale",$(id).attr("id_vale"));
  window.open("../Code/formatos/impVale.php?idVale="+$(id).attr("id_vale"));
}