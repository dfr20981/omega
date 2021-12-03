var infoArt=[];
var infoSitios=[];
var idSitio1;
var idSitio2;
var idSitio3="";
var listKits=[];
/***********************************VALES*********************************************************/
  function fn_newVale(){
    let obj={"op":3};
    $("#tit_mdlVales").text("Nuevo Vale ");
    $("#btnVale_save").attr("onclick","fn_saveVale()");
    $("#btnValle_llenar").attr("onclick","fn_llenarForm()");
    $("#inpVale_Idvale").prop( "disabled", false );
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            closeLoad();
            //$('#mdl_newVale').modal('toggle');
            fn_shown_mdlVales();
            //:P
            let sig1=true;
            try{
               var obj=JSON.parse(res);
               infoArt=[];
               //console.log(vec_arts);
               for(let f=0;f<vec_arts.length;f++){
                  let row=vec_arts[f];
                  let obj1={"label":'('+row.id+') '+row.nom,"value":row.id};
                  infoArt.push(obj1);
               }
               //infoArt=obj.arts;
               infoSitios=obj.sitios;
               //console.log("infoArt",infoSitios);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            if(sig1){
              if(obj.error){
                console.log("Error",obj.msg);
              }else{
                $("#contEntSal").css("display","block");
                if(obj.action.ok){
                    $("#inpVale_sitio1").autocomplete({
                      appendTo: "#mdl_newVale"
                      ,source: infoSitios
                      ,minLength:1
                      ,messages: {noResults: '',results: function() {}}
                      ,select: function (event, ui) {
                          //console.log(ui.item);  
                          idSitio1=ui.item.id;
                      }
                    });
                    $("#inpVale_sitio2").autocomplete({
                      appendTo: "#mdl_newVale"
                      ,source: infoSitios
                      ,minLength:1
                      ,messages: { noResults: '',results: function() {}}
                      ,select: function (event, ui) {
                          //console.log(ui.item);  
                          idSitio2=ui.item.id;
                      }
                    });
                    
                    console.log(infoArt);

                    $("#inpVale_art").autocomplete({
                      source:  infoArt
                      ,appendTo: "#mdl_newVale"
                      ,minLength: 1
                      ,messages: { noResults: '', results: function() { }}
                      ,select: function (event, ui) {
                          console.log(ui.item);
                          getInfo_art(ui.item.value);
  
                      }
                    });
                    
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

  function fn_saveVale(){
    let salida = document.getElementById("swt_salida").checked;
    let entrada = document.getElementById("swt_entrada").checked;
    let doble=($("#swt_entSal").prop("checked"))?1:0;
    console.log(doble);
    let info={"sitio1":idSitio1,"sitio2":idSitio2
             ,"tipo":((salida)?'Salida':'Entrada')
             ,"obs":$("#inpVale_obs").val()
             ,"fech":fechas.vale,"doble":doble
           };
    let ok=true;       
    let errors={op:1,msg:""};
    
    if(idSitio1=='' ||  idSitio1==null){
      ok=false;
      errors.msg="No ingreso el sitio de donde Sale";
    }else{
      if(idSitio2=='' || idSitio2==null){
        ok=false;
        errors.msg="No ingreso el sitio que Recibe";
      }else{
        if(vecgenVale.length==0){
          ok=false;
          errors.msg="No ingreso ningun articulo par el vale";
        }        
      }      
    }       
    //console.log("fn_saveVale vecgenVale ",info);
    let obj={"op":4,"head":JSON.stringify(info),"detalle":JSON.stringify(vecgenVale)};
    //console.log("fn_saveVale obj ",obj);
    //console.log(idSitio1,idSitio2);
    /**/
    if(ok){    
      $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ 
            showLoad() 
          },
          success:function(res){
            //console.log(res);
            closeLoad();
            //$('#mdl_newVale').modal('toggle');
            fn_hidden_mdlVales();
            let sig1=true;
            try{
               var obj=JSON.parse(res);
            }catch(e) {
              sig1=false;
              console.log(e,res);
              msg_aviso({op:0,msg:"Error en la ocnsulta revisar con Soporte. No actualizar la pagina"});
            }
            if(sig1){
              if(obj.error){
                //console.log("Error",obj.msg);
                msg_aviso({op:0,msg:obj.msg});
              }else{
                if(obj.actio.ok){
                    vecVales=obj.vales;
                    tb_Vales.clear().draw();
                    tb_Vales.rows.add(vecVales).draw();
                    tb_Vales.columns.adjust().draw();
                   // tb_Vales.fixedColumns().update(); 
                }else{
                  //console.log("Aviso",obj.action.msg);
                  msg_aviso({op:1,msg:obj.action.msg});
                }
              }
            }
            closeLoad();
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
      }); 
    }else{
      msg_aviso(errors);
    }  
    /**/
  }

  function fn_getVales(){
    let buscar={"ini":fechas.ini,"fin":fechas.fin,"tipo":"0","sitio":"","id_doc":""};
    let obj={"op":5,"buscar":JSON.stringify(buscar)};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){/*showLoad();*/},
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
                tb_Vales.clear().draw();
                tb_Vales.rows.add(vecVales).draw();
                tb_Vales.columns.adjust().draw();
                //tb_Vales.fixedColumns().update(); 
              }
            }
            /**/
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
      });  
  }

  function fn_mdlBuscarVales(){
    let obj={"op":3};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            closeLoad();
            //$('#mdl_newVale').modal('toggle');
            $("#mdl_buscarVales").modal("show");
            console.log(fechas);
            $("#inpFchIni_mdlVals").val(fechas.ini);
            $("#inpFchFin_mdlVals").val(fechas.fin);
            //:P
            let sig1=true;
            try{
               var obj=JSON.parse(res);
               infoArt=obj.arts;
               infoSitios=obj.sitios;
               console.log("infoArt",infoArt);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            
            if(sig1){
              if(obj.error){
                console.log("Error",obj.msg);
              }else{
                if(obj.action.ok){
                    $("#inp_sitioMdlSrc").autocomplete({
                      appendTo: "#mdl_buscarVales"
                      ,source: infoSitios
                      ,minLength:1
                      ,messages: {noResults: '',results: function() {}}
                      ,select: function (event, ui) {
                         console.log(ui.item);  
                         idSitio3=ui.item.id;
                     }
                    });
                }else{
                  console.log("Aviso",obj.action.msg);
                }
              }
            }
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
      }); 
  }

  function fn_buscarVales(){
    let buscar={"ini":fechas.ini,"fin":fechas.fin,"tipo":$("#slt_tipoMdlSrc").val(),"sitio":idSitio3,"id_doc":$("#inp_idValMdlSrc").val()};
    let obj={"op":5,"buscar":JSON.stringify(buscar)};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            closeLoad();
            let sig1=true;
            try{
               var obj=JSON.parse(res);
              // console.log(obj);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            if(sig1){
              if(obj.error){
                console.log("Error",obj.msg);
              }else{
                vecVales=obj.vales;
                tb_Vales.clear().draw();
                tb_Vales.rows.add(vecVales).draw();
                tb_Vales.columns.adjust().draw();
                //tb_Vales.fixedColumns().update(); 
              }
            }
            $("#mdl_buscarVales").modal("hide");
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
    }); 
  }

  function fn_deleteVale(id){
    let id_vale=$(id).attr("id_vale");
    let buscar={"ini":fechas.ini,"fin":fechas.fin,"tipo":$("#slt_tipoMdlSrc").val(),"sitio":idSitio3,"id_doc":id_vale};
    let obj={"op":17,"buscar":JSON.stringify(buscar)};
    $("#mdl_borrarVale").modal("hide");
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            closeLoad();
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
                tb_Vales.clear().draw();
                tb_Vales.rows.add(vecVales).draw();
                tb_Vales.columns.adjust().draw();
                //tb_Vales.fixedColumns().update(); 
              }
            }
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
    }); 
    /**/
  }

  function fn_editTab(id){//EDITA VALES
    let idVale=$(id).attr("id_vale");
    let obj={"op":6,"idVale":idVale};

    $("#tit_mdlVales").attr("idVale",idVale);
    $("#tit_mdlVales").text("Editar Vale "+idVale);

    $("#btnVale_save").attr("onclick","fn_editSaveVale()");
    $("#btnValle_llenar").attr("onclick","");
    $("#inpVale_Idvale").prop( "disabled", true );
    
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){showLoad();},
          success:function(res){
            console.log(res);
            closeLoad(); 
            let sig1=true;
            try{
               let obj=JSON.parse(res);
               var head= obj.vale.head;
               var detalle= obj.vale.detalle;
               var infoSitios= obj.sitios;
               //infoArt= obj.arts;
               //console.log("EDIT_VALE",obj);
               infoArt=[];
               //console.log(vec_arts);
               for(let f=0;f<vec_arts.length;f++){
                  let row=vec_arts[f];
                  let obj1={"label":'('+row.id+') '+row.nom,"value":row.id};
                  infoArt.push(obj1);
               }
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            if(sig1){

               if(head.tipo=='S'){
                  $("#swt_salida").prop('checked', true);
               }else{
                  $("#swt_entrada").prop('checked', true);
               } 

               $("#contEntSal").css("display","none");

               document.getElementById('inpVale_fech').value=head.fech_l;
               
               $("#inpVale_sitio1").val('('+head.sitio1.id+') '+head.sitio1.nom);
               idSitio1=head.sitio1.id;
               $("#inpVale_sitio2").val('('+head.sitio2.id+') '+head.sitio2.nom);
               idSitio2=head.sitio2.id;
               //console.log("head.obs_d",head.obs_d); 
               $("#inpVale_obs").val(head.obs_d);
               //console.log(detalle);
               vecgenVale=detalle;
               tb_genVale.rows.add(detalle).draw();  
               tb_genVale.columns.adjust().draw();
               //console.log("infoSitios",infoSitios);
              try{
                 $("#inpVale_sitio1").autocomplete("destroy");
              }catch(e){}
              $("#inpVale_sitio1").autocomplete({
                        appendTo: "#mdl_vales"
                        ,source: infoSitios
                        ,minLength:1
                        ,messages: {noResults: '',results: function() {}}
                        ,select: function (event, ui) {
                           //console.log(ui.item);  
                           idSitio1=ui.item.id;
                        }
              });
              
              try{
                  $("#inpVale_sitio2").autocomplete("destroy");
              }catch(e){}
              $("#inpVale_sitio2").autocomplete({
                        appendTo: "#mdl_vales"
                        ,source: infoSitios
                        ,minLength:1
                        ,messages: { noResults: '',results: function() {}}
                        ,select: function (event, ui) {
                            //console.log(ui.item);  
                            idSitio2=ui.item.id;
                        }
              });

              try{
                  $("#inpVale_art").autocomplete("destroy");
              }catch(e){}
              $("#inpVale_art").autocomplete({
                      source:  infoArt
                      ,appendTo: "#mdl_vales"
                      ,minLength: 1
                      ,messages: { noResults: '', results: function() { }}
                      ,select: function (event, ui) {
                          //console.log(ui.item);  
                          console.log(ui.item);
                          getInfo_art(ui.item.value);
                        /* 
                          var artP=ui.item;
                          artP.vecKit=(artP.kits=='')?[]:artP.kits.split(",");
                          let tam=artP.vecKit.length;
                          if(tam==0){
                            var obj=artP;
                            obj.cant=0; obj.obs='';
                            let ok=true;
                            for(let d=0;d<vecgenVale.length;d++){
                                if(vecgenVale[d].id==obj.id){
                                    ok=false;
                                    break;
                                }
                            }
                            setTimeout(function(){$("#inpVale_art").val(""); },350);  
                            if(ok){
                              vecgenVale.push(obj);
                              
                              tb_genVale.row.add(obj).draw();  
                              tb_genVale.columns.adjust().draw();
                              setTimeout(function(){ $("#cant_"+obj.id).focus(); },350);  
                            }else{
                              $("#msgAlert_mdlVale").text("Artículo ya ingresado en el vale");
                              setTimeout(function(){ $("#msgAlert_mdlVale").text(""); },5000);  
                            }
                          }else{
                            pestKits=artP.vecKit;
                            listKits=[];
                            $("#mdl_kits").modal("show");
                            $("#mdl_kits .modal-body ul").empty();
                            let html=`<li class="list-group-item">
                                                      <div class="custom-control custom-checkbox">
                                                        <input checked type="checkbox" id="kit_`+artP.id+`" 
                                                           class="custom-control-input" idArt="`+artP.id+`" onclick="fn_clkBoxSltAKit(this)"  >   
                                                        <label class="custom-control-label" for="kit_`+artP.id+`">
                                                          `+artP.label+`
                                                        </label>
                                                      </div>
                                                  </li>`;
                             listKits.push({"id":artP.id,"ok":true});
                             let tm=pestKits.length;
                             for(let d=0;d<tm;d++){
                                let id_kit=pestKits[d];
                                //console.log(id_kit,infoArt.length);
                                html=html+`<li class="list-group-item" style="background: #00b4d0;color: #fff;font-weight: 600;">
                                            Kit-`+id_kit+
                                          `</li>`;
                                for(let f=0;f<infoArt.length;f++){
                                   let art=infoArt[f];
                                   let kits=(art.kits=='')?[]:art.kits.split(",");
                                   if(kits.length>0){
                                      //console.log(kits,kits.length);
                                      for(let m=0;m<kits.length;m++){
                                          let id=kits[m];
                                          if(id==id_kit && artP.id!=art.id){
                                              listKits.push({"id":art.id,"ok":false});
                                              html=html+`<li class="list-group-item">
                                                      <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" id="kit_`+art.id+id_kit+`" 
                                                           class="custom-control-input" idArt="`+art.id+`" onclick="fn_clkBoxSltAKit(this)"  >   
                                                        <label class="custom-control-label" for="kit_`+art.id+id_kit+`">
                                                          `+art.label+`
                                                        </label>
                                                      </div>
                                                  </li>`;
                                          }
                                      }
                                   }
                                }
                             }
                             $("#mdl_kits .modal-body ul").append(html);
                             setTimeout(function(){$("#inpVale_art").val(""); },350);  
                            
                             
                          } 
                        */  
                      }
              });
            }
            
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
      });
      
      fn_shown_mdlVales();
  }

  function fn_editSaveVale(){
    let salida = document.getElementById("swt_salida").checked;
    let entrada = document.getElementById("swt_entrada").checked;
    let info={"sitio1":idSitio1
             ,"sitio2":idSitio2
             ,"tipo":((salida)?'Salida':'Entrada'),"obs":$("#inpVale_obs").val()
             ,"fech":fechas.vale};
    //console.log("fn_editSaveVale",info);
    console.log(vecgenVale);
    let obj={"op":7,"head":JSON.stringify(info),"detalle":JSON.stringify(vecgenVale)
            ,"idVale":$("#tit_mdlVales").attr("idVale")
          };
    /**/      
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ 
            showLoad() 
          },
          success:function(res){
            //console.log(res);
            //$('#mdl_editVale').modal('toggle');
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
                if(obj.actio.ok){
                    vecVales=obj.vales;
                    tb_Vales.clear().draw();
                    tb_Vales.rows.add(vecVales).draw();
                    tb_Vales.columns.adjust().draw();
                   // tb_Vales.fixedColumns().update(); 
                }else{
                  console.log("Aviso",obj.action.msg);
                }
              }
            }
            fn_hidden_mdlVales();
            closeLoad();
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
      }); 
      /**/
  }

  function fn_llenarForm(){
    let idVale=$("#inpVale_Idvale").val();
    if(idVale!=''){
      let obj={"op":6,"idVale":idVale};
      //$("#nomMdl_editVale").attr("idVale",idVale);
      $.ajax({
            data:obj,
            url:"../Code/controlPHP.php",
            type:'post',
            beforeSend:function(){showLoad();},
            success:function(res){
              console.log(res);
              closeLoad(); 
              let sig1=true;
              try{
                 let obj=JSON.parse(res);
                 var head= obj.vale.head;
                 var detalle= obj.vale.detalle;
                 var infoSitios= obj.sitios;
                 infoArt= obj.arts;
                 console.log(obj);
              }catch(e) {
                sig1=false;
                console.log(e,res);
              }
              if(sig1){

                 if(head.tipo=='S'){
                    $("#swt_salida2").prop('checked', true);
                 }else{
                    $("#swt_entrada2").prop('checked', true);
                 } 
                 
                 $("#inpVale_sitio1").val('('+head.sitio1.id+') '+head.sitio1.nom);
                 $("#inpVale_sitio2").val('('+head.sitio2.id+') '+head.sitio2.nom);

                 $("#inpVale_obs").val(head.obs_d);

                 vecgenVale=detalle;
                 console.log(detalle);
                 /**/
                 tb_genVale.rows.add(detalle).draw();  
                 tb_genVale.columns.adjust().draw();
                 /**/
                try{
                 $("#inpVale_sitio1").autocomplete("destroy");
                }catch(e){}
                 $("#inpVale_sitio1").autocomplete({
                        appendTo: "#mdl_vales"
                        ,source: infoSitios
                        ,minLength:1
                        ,messages: {noResults: '',results: function() {}}
                        ,select: function (event, ui) {
                            //console.log(ui.item);  
                        }
                 });
                try{
                 $("#inpVale_sitio2").autocomplete("destroy");
                }catch(e){} 
                 $("#inpVale_sitio2").autocomplete({
                        appendTo: "#mdl_vales"
                        ,source: infoSitios
                        ,minLength:1
                        ,messages: { noResults: '',results: function() {}}
                        ,select: function (event, ui) {
                            //console.log(ui.item);  
                        }
                 });
                 try{
                   $("#inpVale_art").autocomplete("destroy");
                 }catch(e){}     
                 $("#inpVale_art").autocomplete({
                        source:  infoArt
                        ,appendTo: "#mdl_vales"
                        ,minLength: 1
                        ,messages: { noResults: '', results: function() { }}
                        ,select: function (event, ui) {
                            //console.log(ui.item);
                            let obj=ui.item;  
                            obj.cant=0; obj.obs='';
                            vecgenVale.push(obj);
                            tb_genVale.row.add(obj).draw();  
                            tb_genVale.columns.adjust().draw();
                          //tb_genVale.fixedColumns().update();
                            setTimeout(function(){$("#inpVale_art2").val(""); },350);  
                        }
                 });
                 

              }
              
            },  
            error: function (request, status, error) {
                  console.log(request.responseText);
            },
       }); 
     }
  }
  
  function fn_impVale(id){
    //console.log("fn_impVale",$(id).attr("id_vale"));
    window.open("../Code/formatos/impVale.php?idVale="+$(id).attr("id_vale"));
  }
/************************************\VALES******************************************************/
/***********************************CATEGORIAS***************************************************/
  function fn_viewCategos(op){
    let obj={"op":0};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){
              showLoad();
          },
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
                fn_actListCatego(obj,op);
              }
            }
            closeLoad();
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
          },
      });
  }
  function fn_saveNewCatego(){
    let obj={"op":1,"nom":$("#inp_nomNewCatego").val(),"desc":$("#inp_descNewCatego").val()};
    fn_newCatego();
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){
            showLoad();
          },
          success:function(res){
            //console.log(res);
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
                if(obj.insrt.ok){
                    fn_actListCatego(obj,1);
                    $('#mdl_newCatego').modal('hide');
                }else{
                  console.log("Aviso",obj.insrt.msg);
                }
              }
            }
            closeLoad();
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
          },
      });
  }
  function fn_editCatBD(id){
    //console.log($(id).attr("idCat"));
    let obj={"op":8,"id":$(id).attr("idCat"),"nom":$("#inp_nomNewCatego").val(),"desc":$("#inp_descNewCatego").val()};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){
            showLoad();
          },
          success:function(res){
            //console.log(res);
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
                fn_actListCatego(obj,1);
                $('#mdl_newCatego').modal('toggle');              
              }
            }
            closeLoad();
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
      });
  }
/************************************\CATEGORIAS*************************************************/
/************************************ARTICULOS*************************************************/

  function getInfo_art(id){
    let data={'op':22,'id_a':id};
        $.ajax({
          data:data,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){
          },
          success:function(res){
            //console.log(res);
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
                console.log(obj.arts,obj.kits);
                var artP=obj.arts;
                artP.vecKit=(artP.kits=='')?[]:artP.kits.split(",");
                //let tam=artP.vecKit.length;
                let tam=0;
                if(tam==0){
                  var obj=artP;
                  obj.cant=0; obj.obs='';
                  let ok=true;
                  for(let d=0;d<vecgenVale.length;d++){
                    if(vecgenVale[d].id==obj.id){
                        ok=false;
                        break;
                    }
                  }
                  setTimeout(function(){$("#inpVale_art").val(""); },350);  
                  if(ok){
                    vecgenVale.push(obj);
                              
                    tb_genVale.row.add(obj).draw();  
                    tb_genVale.columns.adjust().draw();
                    setTimeout(function(){ $("#cant_"+obj.id).focus(); },350);  
                  }else{
                    $("#msgAlert_mdlVale").text("Artículo ya ingresado en el vale");
                    setTimeout(function(){ $("#msgAlert_mdlVale").text(""); },5000);  
                  }
                }else{
                  pestKits=artP.vecKit;
                  listKits=[];
                  $("#mdl_kits").modal("show");
                  $("#mdl_kits .modal-body ul").empty();
                  let html=`<li class="list-group-item">
                                                      <div class="custom-control custom-checkbox">
                                                        <input checked type="checkbox" id="kit_`+artP.id+`" 
                                                           class="custom-control-input" idArt="`+artP.id+`" onclick="fn_clkBoxSltAKit(this)"  >   
                                                        <label class="custom-control-label" for="kit_`+artP.id+`">
                                                          (`+artP.id+`) `+artP.nom+`
                                                        </label>
                                                      </div>
                                                  </li>`;
                  listKits.push({"id":artP.id,"ok":true});
                  let tm=pestKits.length;
                  for(let d=0;d<tm;d++){
                    let id_kit=pestKits[d];
                                //console.log(id_kit,infoArt.length);
                    html=html+`<li class="list-group-item" style="background: #00b4d0;color: #fff;font-weight: 600;">
                      Kit-`+id_kit+
                    `</li>`;
                    let veckk=obj.kits;
                    for(let f=0;f<veckk.length;f++){
                        let row=veckk[f];
                        if(row.id==id_kit){
                          listKits.push({"id":art.id,"ok":false});
                          html=html+`<li class="list-group-item">
                                                      <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" id="kit_`+art.id+id_kit+`" 
                                                           class="custom-control-input" idArt="`+art.id+`" onclick="fn_clkBoxSltAKit(this)"  >   
                                                        <label class="custom-control-label" for="kit_`+art.id+id_kit+`">
                                                          `+art.label+`
                                                        </label>
                                                      </div>
                                     </li>`;
                        } 
                    }  

                    /*
                                for(let f=0;f<infoArt.length;f++){
                                   let art=infoArt[f];
                                   let kits=(art.kits=='')?[]:art.kits.split(",");
                                   if(kits.length>0){
                                      //console.log(kits,kits.length);
                                      for(let m=0;m<kits.length;m++){
                                          let id=kits[m];
                                          if(id==id_kit && artP.id!=art.id){
                                              listKits.push({"id":art.id,"ok":false});
                                              html=html+`<li class="list-group-item">
                                                      <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" id="kit_`+art.id+id_kit+`" 
                                                           class="custom-control-input" idArt="`+art.id+`" onclick="fn_clkBoxSltAKit(this)"  >   
                                                        <label class="custom-control-label" for="kit_`+art.id+id_kit+`">
                                                          `+art.label+`
                                                        </label>
                                                      </div>
                                                  </li>`;
                                          }
                                      }
                                   }
                                }*/
                  }
                  /*
                  let veckk=obj.kits;
                  for(let d=0;d<veckk.length;d++){
                    let id_kit=pestKits[d];
                    html=html+`<li class="list-group-item" style="background: #00b4d0;color: #fff;font-weight: 600;">
                                            Kit-`+id_kit+
                                          `</li>`;

                  }
                  */

                  /*
                  let tm=pestKits.length;
                  for(let d=0;d<tm;d++){
                                let id_kit=pestKits[d];
                                //console.log(id_kit,infoArt.length);
                                html=html+`<li class="list-group-item" style="background: #00b4d0;color: #fff;font-weight: 600;">
                                            Kit-`+id_kit+
                                          `</li>`;
                                for(let f=0;f<infoArt.length;f++){
                                   let art=infoArt[f];
                                   let kits=(art.kits=='')?[]:art.kits.split(",");
                                   if(kits.length>0){
                                      //console.log(kits,kits.length);
                                      for(let m=0;m<kits.length;m++){
                                          let id=kits[m];
                                          if(id==id_kit && artP.id!=art.id){
                                              listKits.push({"id":art.id,"ok":false});
                                              html=html+`<li class="list-group-item">
                                                      <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" id="kit_`+art.id+id_kit+`" 
                                                           class="custom-control-input" idArt="`+art.id+`" onclick="fn_clkBoxSltAKit(this)"  >   
                                                        <label class="custom-control-label" for="kit_`+art.id+id_kit+`">
                                                          `+art.label+`
                                                        </label>
                                                      </div>
                                                  </li>`;
                                          }
                                      }
                                   }
                                }
                             }
                    */         
                  $("#mdl_kits .modal-body ul").append(html);
                  setTimeout(function(){$("#inpVale_art").val(""); },350);  
                }
              }
            }
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
          },
      }); 
  }

  function fn_masInfoArtDB(id,op){
    let id_a=$(id).attr("idE");
    let data={'op':19,'id_a':id_a};
    //console.log(data);
    $.ajax({
      data:data,
      url:"../Code/controlPHP.php",
      type:'post',
      beforeSend:function(){  showLoad();   },
      success:function(res){
        let ok=true;
        try{
          var obj=JSON.parse(res);
        }catch(e) {
          ok=false;
          console.log(e,res);
        }
        if(ok){
          if(obj.error){
            console.log("Error",data);
          }else{
            let art=obj.art[0];
            if(op==0){
              $("#tjt_modelo_"+id_a).text(art.modelo);
              $("#tjt_uni_"+id_a).text(art.uni);
              $("#tjt_obs_"+id_a).text(art.obs);
              $("#tjt_alt_"+id_a).text(art.alt);
              $("#tjt_anc_"+id_a).text(art.anc);
              $("#tjt_prof_"+id_a).text(art.prof);
              $("#tjt_peso_"+id_a).text(art.peso);
              fn_expandirInfoElemt(id);      
            }else{
              for(let d=0;d<vecCategos.length;d++){
                  if(art.id_tipo==vecCategos[d].id){
                      $("#frm_newEle_catego").val(vecCategos[d].nom);
                      break;
                  }
              }
              categoriaId=art.id_tipo;
              $("#frm_newEle_nom").val(art.nom);
              $("#frm_newEle_nom").focus();
              $("#frm_newEle_marca").val(art.marcas);
              //$("#frm_newEle_marca" ).prop( "disabled", true );
              $("#frm_newEle_precio").val(art.costo);
              $("#frm_newEle_alt").val(art.alt);
              $("#frm_newEle_ancho").val(art.anc);
              $("#frm_newEle_prof").val(art.prof);
              $("#frm_newEle_peso").val(art.peso);
              $("#frm_newEle_uni").val(art.uni_cap);
              $("#frm_newEle_capaci").val(art.capacidad);
              $("#frm_newEle_modelo").val(art.modelo);

              $("#frm_newEle_bate").val(art.bate);
              $("#frm_newEle_elect").val(art.elect);
              $("#frm_newEle_obs").val(art.obs);
              $("#frm_newEle_costo").val(art.gasto);
              $("#frm_newEle_rent").val(art.renta);
              $("#frm_newEle_tipRent").val(art.tip_r);

              /**/
              fn_editElemt(id,art.id_tipo);
            }
          }
        }
        closeLoad();
      },  
      error: function (request, status, error) {
        console.log(request.responseText);
        closeLoad();
      },
    });
  }


  function  fn_editElemtBD(id){
    let marca=$("#frm_newEle_marca").val();
    let nom=$("#frm_newEle_nom").val().replace(/"/g, "''");
    let tipo=categoriaId;
    if(marca!="" || nom!="" || tipo!=0){

      let precio=($("#frm_newEle_precio").val()=="")?"0":$("#frm_newEle_precio").val();
      let alt=($("#frm_newEle_alt").val()=="")?"0":$("#frm_newEle_alt").val();
      let ancho=($("#frm_newEle_ancho").val()=="")?"0":$("#frm_newEle_ancho").val();
      let prof=($("#frm_newEle_prof").val()=="")?"0":$("#frm_newEle_prof").val();
      let peso=($("#frm_newEle_peso").val()=="")?"0":$("#frm_newEle_peso").val();
      let uni=($("#frm_newEle_uni").val()=="")?"pz":$("#frm_newEle_uni").val();
      let capacidad=($("#frm_newEle_capaci").val()=="")?"1":$("#frm_newEle_capaci").val();
      let modelo=($("#frm_newEle_modelo").val()=="")?"0":$("#frm_newEle_modelo").val();
      let costo=$("#frm_newEle_costo").val();
      let renta=($("#frm_newEle_rent").val()=="")?"0":$("#frm_newEle_rent").val();
      let tip_rent=$("#frm_newEle_tipRent").val();


      let res={"nom":nom,"marca":marca,"precio":precio,"alt":alt
              ,"ancho":ancho,"prof":prof,"peso":peso,"bate":$("#frm_newEle_bate").val()
              ,"elect":$("#frm_newEle_elect").val(),"obs":$("#frm_newEle_obs").val()
              ,"uni":uni,"idE":$(id).attr("idE"),"tipo":tipo,"capaci":capacidad
              ,"modelo":modelo,"tip_rent":tip_rent,"renta":renta,"costo":costo
              };
      //console.log(res);
      let obj={"op":9,"obj":JSON.stringify(res)};
      $('#mdl_newElemt').modal('toggle');
      /**/
      $.ajax({
            data:obj,
            url:"../Code/controlPHP.php",
            type:'post',
            beforeSend:function(){
              showLoad();
            },
            success:function(res){
              //console.log(res);
              let sig1=true;
              try{
                 var obj=JSON.parse(res);
                 console.log("edit",obj);
              }catch(e) {
                sig1=false;
                console.log(e,res);
              }
              
              if(sig1){
                if(obj.error){
                  console.log("Error",obj);
                }else{
                  
                  fn_actListCatego(obj,1);
                  
                }
              }
              
              closeLoad();
            },  
            error: function (request, status, error) {
                console.log(request.responseText);
                closeLoad();
            },
        }); 
      /**/ 
    }  
  }

  function fn_saveElemt(id){
    let marca=$("#frm_newEle_marca").val();
    let nom=$("#frm_newEle_nom").val().replace(/"/gi, "''''");
    let tipo=categoriaId;
    if(marca!="" || nom!="" || tipo!=0){

      let precio=($("#frm_newEle_precio").val()=="")?"0":$("#frm_newEle_precio").val();
      let alt=($("#frm_newEle_alt").val()=="")?"0":$("#frm_newEle_alt").val();
      let ancho=($("#frm_newEle_ancho").val()=="")?"0":$("#frm_newEle_ancho").val();
      let prof=($("#frm_newEle_prof").val()=="")?"0":$("#frm_newEle_prof").val();
      let peso=($("#frm_newEle_peso").val()=="")?"0":$("#frm_newEle_peso").val();
      let uni=($("#frm_newEle_uni").val()=="")?"pz":$("#frm_newEle_uni").val();
      let capacidad=($("#frm_newEle_capaci").val()=="")?"1":$("#frm_newEle_capaci").val();
      let modelo=($("#frm_newEle_modelo").val()=="")?"0":$("#frm_newEle_modelo").val();
      let costo=$("#frm_newEle_costo").val();
      let renta=($("#frm_newEle_rent").val()=="")?"0":$("#frm_newEle_rent").val();
      let tip_rent=$("#frm_newEle_tipRent").val();

      let res={"nom":nom,"marca":marca,"precio":precio,"alt":alt
              ,"ancho":ancho,"prof":prof,"peso":peso,"bate":$("#frm_newEle_bate").val()
              ,"elect":$("#frm_newEle_elect").val(),"obs":$("#frm_newEle_obs").val()
              ,"tipo":tipo,"uni":uni,"capaci":capacidad,"modelo":modelo
              ,"tip_rent":tip_rent,"renta":renta,"costo":costo
              };
      console.log(res);
      let obj={"op":2,"obj":JSON.stringify(res)};
    //console.log(obj);
     $('#mdl_newElemt').modal('toggle');
      $.ajax({
            data:obj,
            url:"../Code/controlPHP.php",
            type:'post',
            beforeSend:function(){showLoad();},
            success:function(res){
              //console.log(res);
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
                  if(obj.insrt.ok){
                      fn_actListCatego(obj,1);
                  }else{
                    console.log("Aviso",obj.insrt.msg);
                  }
                }
              }
              closeLoad();
              
            },  
            error: function (request, status, error) {
                console.log("error");
                closeLoad();
            },
      }); 
    }   
  }
  
  function fn_docExcel(){
      window.open("../code/excel/docExcel.php?id="+menuOp); 
      //window.open("../code/excel/docExcel.php?id="+menuOp+"&bArt="+$("#inpBuscarNom_").val()+"&bMarc="+$("#inpBuscarMarc_").val()); 
  }

  function fn_docinfoImp(){
   // console.log("fn_docinfoImp",menuOp);
    window.open("../code/excel/docImp.php?id="+menuOp); 
  }

  function fn_mdlSearchArt(id){
    let idaRT=$(id).attr("idE");
    let nom=$(id).attr("nomArt");
    $("#tit_mdlSearchArt").text('Articulo ('+idaRT+') '+nom);
    let obj={"op":12,"id":idaRT};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            $("#mdl_searchArt").modal('show');
            //console.log(res);
            closeLoad();
            let sig1=true;
            try{
               var obj=JSON.parse(res);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            if(sig1){
              fn_infoHistArtSitios(obj.sitios);
              fn_infoHistArtVales(obj.vales);    
            }
            
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
    }); 
  }

  function fn_infoMdlPosArt(id){
    var id_art=$(id).attr("idE");
    let obj={"op":10,"_op":0,"id":""};
    /**/
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            let obj=JSON.parse(res);
            if(obj.error){
               console.log("Error",obj);
            }else{
              let vec=obj.sitios;
              fn_consultPosArt(id_art,vec);
            }
            
            closeLoad();
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
     }); 
    /**/
  }

  function fn_consultPosArt(id_art,vec){
    let obj={"op":13,"tip":"R","id_aloj":"","id_art":id_art,"pos":""};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            closeLoad();
            let sig1=true;
            try{
                var obj=JSON.parse(res);
                console.log(obj);
            }catch(e) {
                sig1=false;
                console.log(e,res);
            }
            if(sig1){
              fn_mdlPositionArt(id_art,vec,obj.vec);
            }  
            
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
    }); 
  }

  function fn_deleteArt(id){
    let obj={"op":14,"id":$(id).attr("idArt"),"_op":parseInt($(id).attr("tipDlt"))};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){ showLoad() },
          success:function(res){
            //console.log(res);
            let sig1=true;
            try{
                var data=JSON.parse(res);
            }catch(e) {
                sig1=false;
                console.log(e,res);
            }
            if(sig1){
              //console.log(data);
              fn_actListCatego(data,1);
            }  
            closeLoad();
            $("#mdl_borrarArt").modal("hide");
            
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
      }); 
  }

  function fn_savePosArt(obj){
  obj.op=13; 
  obj.tip='S'; 
  $.ajax({
        data:obj,
        url:"../Code/controlPHP.php",
        type:'post',
        beforeSend:function(){ showLoad() },
        success:function(res){
          console.log(res);
          closeLoad();
        },  
        error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
        },
    }); 
}

function fn_borrarPosArt(id){
  let obj={"op":13,"tip":"D","id_aloj":$(id).attr("idAlm"),"id_art":$(id).attr("idArt"),"pos":""};
  //console.log(obj);
  $.ajax({
        data:obj,
        url:"../Code/controlPHP.php",
        type:'post',
        beforeSend:function(){ showLoad() },
        success:function(res){
          console.log(res);
          let sig1=true;
          try{
              var data=JSON.parse(res);
              console.log(data);
          }catch(e) {
              sig1=false;
              console.log(e,res);
          }
          if(sig1){
            let vec=data.vec;
            $("#sltAlmPosArt").empty();
            let html='<option selected="">Choose...</option>';
            for(let d=0;d<vecSitios.length;d++){
                let alm=vecSitios[d];
                let ok=true;
                for(let f=0;f<vec.length;f++){
                  let row=vec[f];
                  if(row.id_aloj==alm.id){
                    ok=false;
                    break;
                  }
                }
                if(ok){
                  html=html+'<option value="'+alm.id+'">'+alm.nom+'</option>';
                }
            }
            $("#sltAlmPosArt").append(html);
            $("#"+obj.id_aloj).remove(); 
          }  
          closeLoad();
        },  
        error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
        },
    }); 
}
/************************************\ARTICULOS*************************************************/
/************************************MARCAS*************************************************/
  function fn_getMarcas(){
    let obj={"op":15};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){},
          success:function(res){
            //console.log(res);
            let sig1=true;
            try{
                var data=JSON.parse(res);
            }catch(e) {
                sig1=false;
                console.log(e,res);
            }
            if(sig1){
              vecMarcas=data.marcas;  
              try{
                 $("#frm_newEle_marca").autocomplete("destroy");
              }catch(e){}
              $("#frm_newEle_marca").autocomplete({
                      appendTo: "#mdl_newElemt"
                      ,source: vecMarcas
                      ,minLength:1
                      ,messages: {noResults: '',results: function() {}}
                      ,select: function (event, ui) {
                          console.log(ui.item);  
                      }
              });
            }  

          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
      }); 
  }
/************************************\MARCAS*************************************************/
/************************************MAPA*************************************************/
  function fn_viewMapa(){
    let obj={"op":16};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){},
          success:function(res){
            //console.log(res);
            let sig1=true;
            try{
                var data=JSON.parse(res);
            }catch(e) {
                sig1=false;
                console.log(e,res);
            }
            if(sig1){
              fn_mdlMapa(data);
            }  
          },  
          error: function (request, status, error) {
              console.log(request.responseText);
              closeLoad();
          },
      }); 
  }
/************************************\MAPA*************************************************/  

  function fn_updateArch(){
    console.log(vecPrec);
    if(vecPrec.length>0){
      let data={"op":18,"vec":JSON.stringify(vecPrec)};
      $.ajax({
          data:data,
          url:"../Code/controlPHP.php",
          type:'post',
           beforeSend:function(){
              showLoad();
            },
            success:function(res){
              //console.log(res);
              let sig1=true;
              try{
                 var obj=JSON.parse(res);
                 //console.log("edit",obj);
              }catch(e) {
                sig1=false;
                console.log(e,res);
              }
              
              if(sig1){
                if(obj.error){
                  console.log("Error",obj);
                }else{
                  
                  fn_actListCatego(obj,1);
                  $("#menu_cat_0").focus();
                }
              }
              $("#mdl_ExcelUrl").modal('hide');
              closeLoad();
            },  
            error: function (request, status, error) {
                console.log(request.responseText);
                closeLoad();
                $("#mdl_ExcelUrl").modal('hide');
            },
      }); 
    }
  }