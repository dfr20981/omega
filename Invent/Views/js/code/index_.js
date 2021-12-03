var tb_Vales,tb_genVale,tb_genVale2;
var vecVales=[],vecgenVale=[];
var fechas={"ini":'',"fin":'',"vale":""};
var vecMarcas=[];

window.onload = function() {//Se activa al momento de que cargue la pagina.
  fn_mdlValesBtnFch(3);
  fn_MedidasAll();
  fn_tb_Vales();
  fn_tb_genVale()

  fn_getVales();  
  fn_getMarcas();
  fn_viewCategos(0);//->funciones.js
  fn_evenModals();
}

var menuOp=0;
function fn_selectMenu(op){
  menuOp=op;
  fn_ajustaTabSleep();
}  

async function fn_ajustaTabSleep(){
  await sleep(200);
  tb_Vales.columns.adjust().draw();
}

/***********************************VALES*********************************************************/
  function fn_tb_Vales(){
      let h=$(window).height();
      var height=(h*0.736842105)-48.63;
      tb_Vales=$('#tb_Vales').DataTable({
        scrollY:height,
        deferRender: true, /*Velocidad de procedemiento tabla */
        data: vecVales,
        info:     false,
        orderCellsTop: true,
        columnDefs: [ {"visible": false,"targets":parametors.viewColVales}],
        columns: [
          { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+(meta.row+1)+'</span>';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+data.id_doc+'</span>';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                    return '<span class="textTb1">'+((data.tipo=='S')?'Salida':'Entrada')+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                    return '<span class="textTb1">'+data.sitio+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                    return '<span class="textTb1">'+data.fecha+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                return '<span class="textTb1">'+data.num+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return ' <img src="./img/editar.png" class="iconTab" onclick="fn_editTab(this)" id_vale="'+data.id_doc+'" >';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return ' <img src="./img/impresora.png" class="iconTab" onclick="fn_impVale(this)"  id_vale="'+data.id_doc+'"  >';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return ' <img src="./img/x.png" class="iconTab delete" id_vale="'+data.id_doc+'">';
            } 
          }
        ],
        paging: false,
        dom:'<"toolsBar">frtip',
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Spanish.json"
        },createdRow: function (row, data, index) {
                 $('td', row).eq(0).addClass('centerTD');
                 $('td', row).eq(1).addClass('centerTD');
                 $('td', row).eq(2).addClass('leftTD');
                 $('td', row).eq(3).addClass('centerTD');
                 $('td', row).eq(4).addClass('centerTD');
                 $('td', row).eq(5).addClass('centerTD');
                 $('td', row).eq(6).addClass('centerTD');
                 $('td', row).eq(7).addClass('centerTD');
                 $('td', row).eq(8).addClass('centerTD');
        }
      });
      $('#tb_Vales tbody').on( 'click', 'img.delete', function () {
        let id_vale=$(this).parents('tr').prevObject[0].attributes.id_vale.nodeValue;
        console.log(id_vale);
        $("#mdl_borrarVale").modal("show");
        $("#tit_mdlBorrVale").text("Borrar vale "+id_vale);
        $("#text_mdlBorrarVale").text("¿Seguro de eliminar el vale "+id_vale+" del sistema?");
        $("#btnDlt_mdlBrrVale").attr("id_vale",id_vale);
      }); 

      $('input.col_filVales').on( 'keyup click', function () {
        fn_filCol('tb_Vales',$(this).parents('th').attr('data-column'),'Vales');
      } );
  }

  var vecScroll=[];
  function fn_tb_genVale(){
    var height=(($(".mdl_body_b").height()*1.012820513))-87.42;
    tb_genVale=$('#tb_genVale').DataTable({
        scrollY:height,
        deferRender: true, /*Velocidad de procedemiento tabla */
        data: vecgenVale,
        info:     false,
        orderCellsTop: true,
        //searching: false,
        //columnDefs: [ {"visible": false,"targets":vecColCot}],
        columns: [
          { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+(meta.row+1)+'</span>';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+data.id+'</span>';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                    return '<span class="textTb1">'+data.nom+'</span>';
              } 
          },
          
          { data: null,render: function ( data, type, row, meta ) {
                    return '<span class="textTb1">'+data.catego+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                    let vec = data.marcas.split(",");
                    let html='';
                    for(let d=0;d<vec.length;d++){
                      html=html+'<option value="'+vec[d]+'">'+vec[d]+'</option>';
                    }
                    html='<select class="form-control form-control-sm" style="font-size: 12px;">'+html+'</select>'
                    return html;
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                //console.log("->",data.cant);
                return `<div class="input-group input-group-sm">
                          <input id="cant_`+data.id+`" type="text" class="form-control" 
                              value="`+((data.cant==0)?``:data.cant)+`" onclick="fn_insertCant(this,event)" 
                              onkeyup="fn_insertCant(this,event)"  clave="`+data.id+`" 
                              style="text-align: right; font-size: 12px;" >
                          <div class="input-group-append">
                            <button class="btn btn-info" type="button"  style=" font-size: 12px;" id="" title="calcular porciones"
                                id_art="`+data.id+`" capacidad="`+data.capacidad+`" uni_cap="`+data.uni_cap+`" onclick="fn_mdlPorciones(this)">
                              0.0
                            </button>
                          </div>
                        </div>`
                ;
                return ``;
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                return '<input type="text" class="form-control form-control-sm" value="'+data.obs+'" onclick="fn_insertObs(this,event)" onkeyup="fn_insertObs(this,event)"  clave="'+data.id+'" style="font-size: 12px;" >';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return ' <img src="./img/x.png" class="iconTab" clave="'+data.id+'"  >';
            } 
          }
        ],
        paging: false,
        dom:'<"toolsBar">frtip',
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Spanish.json"
        },createdRow: function (row, data, index) {
                 $('td', row).eq(0).addClass('centerTD');
                 $('td', row).eq(1).addClass('centerTD');
                 $('td', row).eq(2).addClass('leftTD');
                 $('td', row).eq(3).addClass('centerTD');
                 $('td', row).eq(4).addClass('centerTD');
                 $('td', row).eq(5).addClass('centerTD');
                 $('td', row).eq(6).addClass('centerTD');
                 $('td', row).eq(7).addClass('centerTD');
        }
      });


    $('#tb_genVale tbody').on( 'click', 'img.iconTab', function () {
        /*tb_genCot.row( $(this).parents('tr') ).remove().draw();*/
        showLoad();
        //if(actElemDocs){
        let clave=$(this).parents('tr').prevObject[0].attributes.clave.nodeValue;

        var index=0;

        console.log(vecgenVale);
        for(let m=0;m<vecgenVale.length;m++){
            console.log(clave+'=='+vecgenVale[m].id);
            if(clave==vecgenVale[m].id){
              index=m;          
              break;  
            }
        }
        /**/
        vecgenVale.splice(index,1);
        console.log(vecgenVale);

        tb_genVale.clear().draw();
        if(vecgenVale.length>0){
          tb_genVale.rows.add(vecgenVale).draw(); 
        }  
        /**/      
        /*tb_genVale.fixedColumns().update();*/
        closeLoad();
      //} 
    });

    $('input.col_filgenVale').on( 'keyup click', function () {
        fn_filCol('tb_genVale',$(this).parents('th').attr('data-column'),'genVale');
    } );
  }

  function fn_mdlPorciones(id){
    let id_art=$(id).attr("id_art");
    let capacidad=$(id).attr("capacidad");
    let uni_cap=$(id).attr("uni_cap");
    $("#mdl_porcion").modal("show");
    $("#tit_mdlPorcion").text("Porción del producto "+id_art);
    $("#capa_01").val(capacidad);
    $("#capa_02").val("");
    $("#capa_03").val("");
    $("#uni_01").text(uni_cap);
    $("#uni_02").text(uni_cap);

    $("#btn_mdlProcion").attr("onclick","fn_setPorcion('"+id_art+"')");
  }

  function fn_insertCapa(){
    let capacidad=$("#capa_01").val();
    let capa=($("#capa_02").val()=='')?'0':$("#capa_02").val();
    let res=(capa=='0')?0:(parseFloat(capa)/parseFloat(capacidad));

    $("#capa_03").val(res.toFixed(2));
  }

  function fn_setPorcion(id){
    let vl=$("#cant_"+id).val();
    let capa=$("#capa_03").val();

    let res=(vl=='')
                ?((capa=='')?0:parseFloat(capa))
                : parseFloat(vl)+((capa=='')?0:parseFloat(capa));  
    //console.log(id);            
    let vec=vecgenVale;
    let tam=vec.length;
    for(let d=0;d<tam;d++){
      let row=vec[d];
      if(row.id==id){
        vecgenVale[d].cant=parseFloat(res.toFixed(2));
        break;
      }
    }

    $("#cant_"+id).val(res.toFixed(2));
    $("#mdl_porcion").modal("hide");
  }


  function fn_medidas_mdlVales(){
    let h=$(window).height();
    let w=$(window).width();    
    $("#mdl_vales").css("height",h+"px");
    $("#mdl_vales").css("width",w+"px"); 

    let alto=h-36-37;
    $(".mdl_body").css("height",alto+"px");

    let alto2=alto-$(".mdl_body_h").height();
    $(".mdl_body_b").css("height",alto2+"px");  
  }

  function fn_shown_mdlVales(){
    $("#mdl_vales").css("display","block");
    tb_genVale.columns.adjust().draw();
    $("#col1_genVale").val("");
    $("#col2_genVale").val("");
    $("#col2_genVale").trigger("click");

    let f2=new Date();
    let mes2 = f2.getMonth()+1; //obteniendo mes
    let dia2 = f2.getDate(); //obteniendo dia
    let ano2 = f2.getFullYear(); //obteniendo año
    if(dia2<10)
      dia2='0'+dia2; //agrega cero si el menor de 10
    if(mes2<10)
      mes2='0'+mes2; //agrega cero si el menor de 10

    fechas.vale=ano2+"-"+mes2+"-"+dia2;
    document.getElementById('inpVale_fech').value=ano2+"-"+mes2+"-"+dia2;
  }

  function fn_hidden_mdlVales(){
    $("#mdl_vales").css("display","none"); 
    vecgenVale=[];
    tb_genVale.clear().draw(); 
    tb_genVale.columns.adjust().draw();

    fn_cleanDatosForm();
  }

  function fn_cleanDatosForm(){
    $("#inpVale_Idvale").val("");
    $("#inpVale_art").val("");
    $("#inpVale_sitio1").val("");
    $("#inpVale_sitio2").val("");
    $("#inpVale_obs").val("");
  }

  function fn_insertCant(id,e){
    let enterKey = 13;
    if (e.which == enterKey){
      $("#inpVale_art").val("");
      $("#inpVale_art").focus();
    }else{
      for(let f=0;f<vecgenVale.length;f++){
        if(vecgenVale[f].id==$(id).attr("clave")){
            vecgenVale[f].cant=parseFloat((($(id).val()=='')?0:$(id).val()));
            //console.log(vecgenVale[f]);
            break;
        }
      }
    }  
  }

  function fn_insertObs(id,e){
    let enterKey = 13;
    if (e.which == enterKey){
      $("#inpVale_art").val("");
      $("#inpVale_art").focus();
    }else{
      for(let f=0;f<vecgenVale.length;f++){
        if(vecgenVale[f].id==$(id).attr("clave")){
            vecgenVale[f].obs=$(id).val();
            //console.log(vecgenVale[f]);
            break;
        }
      } 
    }  
  }

  function fn_clkBoxSltAKit(id){
    let idArt=$(id).attr("idArt");
    let check=$(id).prop('checked');
    for(let d=0;d<listKits.length;d++){
      let row=listKits[d];
      if(row.id==idArt){
        listKits[d].ok=check;
        break;
      }
    }
  }

  function fn_agregarArtKits(){
    $("#mdl_kits").modal('hide');
    //console.log(listKits);
    for(let d=0;d<listKits.length;d++){
      let row=listKits[d];
      if(row.ok){
        console.log(infoArt);
        for(let d=0;d<infoArt.length;d++){
          let row2=infoArt[d];
          if(row.id==row2.id){
            var obj=row2;
            obj.cant=0; obj.obs='';
            let ok=true;
            for(let d=0;d<vecgenVale.length;d++){
             if(vecgenVale[d].id==obj.id){
                ok=false;
                break;
              }
            }
            if(ok){
              vecgenVale.push(obj);
              tb_genVale.row.add(obj).draw();  
              tb_genVale.columns.adjust().draw();
              setTimeout(function(){ $("#cant_"+obj.id).focus(); },350);
            }else{
              $("#msgAlert_mdlVale").text("Artículo ya ingresado en el vale");
              setTimeout(function(){ $("#msgAlert_mdlVale").text(""); },5000);  
            }
          }  
        }  
      }
    } 
  }
/************************************\VALES******************************************************/
/***********************************CATEGORIAS***************************************************/
  var vecCategos=[];
  var listArt_1=[];
  function fn_actListCatego(obj,op){
    $(".list_categos").remove();
    $(".cont_listCategos").remove();
    let html='', html2='', html3='';
    vecCategos=obj.catego;
    listArt_1=obj.arts;
    let tipos=obj.catego;
    let vec=obj.arts;
    //console.log(tipos);
    //console.log(vec);
    tipos.sort(function (a, b) {
       return a.nom.localeCompare(b.nom);
    });

    tipos.unshift({"id":0,"nom":"Todos","descr":""});
    for(let d=0;d<tipos.length;d++){
      let tipo=tipos[d];
      let cont=(tipo.id==0)?vec.length:0;
      for(let f=0;f<vec.length;f++){
        if(tipo.id==vec[f].id_tipo){
          cont++;
        }
      }
      html=html+fn_puthtmlCat(tipos[d],d,cont);
    }

    html2=html2+`<div class="tab-pane fade cont_listCategos" id="content_menu_Catego"  style="height:680px; max-height:680px;" >
                    <div class="panelBtn_prin">
                        <div class="container-fluid">
                          <div class="row">
                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <button class="btn btn-info mt-2" onclick="fn_newElemt()" title="Agregar Nuevo Elemento">
                                    <i class="fa fa-plus-circle"></i> Agregar
                                  </button>
                            </div>
                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <div class="input-group input-group-sm mt-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="inputGroup-sizing-sm">Nombre:</span>
                                </div>
                                <input id="inpBuscarNom_" type="text" class="form-control" aria-label="Sizing example input" 
                                   aria-describedby="inputGroup-sizing-sm" placeholder="Buscar por Nombre"
                                   onkeyup="fn_buscarElemt()">
                              </div>
                            </div>
                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <div class="input-group input-group-sm mt-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="inputGroup-sizing-sm">Marca:</span>
                                </div>
                                <input id="inpBuscarMarc_" type="text" class="form-control" aria-label="Sizing example input" 
                                   aria-describedby="inputGroup-sizing-sm" placeholder="Buscar por Marca"
                                   onkeyup="fn_buscarMarca()">
                              </div>
                            </div>
                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                              <button id="btnExcel_" class="btn btn-info mt-2" onclick="fn_docExcel()" 
                               title="Reporte Excel">
                                <i class="fa fa-file-excel-o"></i>
                              </button>
                              <button class="btn btn-info mt-2" onclick="fn_docinfoImp()" 
                                title="Imprimir Concentrado">
                                <i class="fa fa-print"></i>
                              </button>
                              <button class="btn btn-info mt-2" onclick="fn_viewMapa()" 
                                title="Ver Ubicación">
                                <i class="fa fa-map"></i>
                              </button>
                              <button class="btn btn-info mt-2" onclick="fn_viewMapa()" 
                                title="Subir Lista Precios">
                                $<i class="fa fa-cloud-upload"></i>
                              </button>
                            </div>
                          </div>      
                        </div>
                     </div>           
                     <div class="contenido_prin contTarjets">
                        <div id="" class="container-fluid" data-spy="scroll">
                            `+ html3+`                        
                        </div>
                     </div>
                  </div>`;      

    $("#li_categos").append(html);
    $("#content_menu").append(html2);

    fn_filtTipo(0);

    //console.log(tipos);
    feather.replace();

    if(op==1){
      $( "#menu_cat_"+menuOp ).trigger( "click" );
    }

    let h=$(window).height(); 
    $(".contTarjets").css("height",((h*0.977653631)-103.66)+"px");

    for(let f=0;f<vec.length;f++){
      if(vecScroll[f]!=null || vecScroll[f]!=undefined){
           $("#content_menu_Catego"+f+" .contTarjets").scrollTop(vecScroll[f]);
      }
      $("#content_menu_Catego"+f+" .contTarjets").scroll(function(){
        vecScroll[f]=$(this).scrollTop();
      });
    } 

    fn_ajustaTabSleep();//PARA ACTUALIZAR 
  }

  function fn_filtTipo(id){
    menuOp=id;
    //console.log(menuOp);
    let vec=listArt_1;
    let list=[];
    //if(menuOp>0){
      for(let d=0;d<vec.length;d++){
        let art=vec[d];
        if(menuOp==art.id_tipo){
          list.push(art);
        }
      }
      if(list.length==0){
        list=vec;
      }  
      list.sort(function (a, b) {
        return a.nom.localeCompare(b.nom);
      });
      
      $("#content_menu_Catego .contenido_prin .container-fluid").empty();
      let html3=''
      let cont=1;
      for(let f=0;f<list.length;f++){
        let row=list[f];
        html3=html3+
                  ((cont==1)?`<div class="row">`:``)
                   +`<div class="col-sm-6 col-md-6 col-lg-3 col-xl-3">
                        <div class="tabCard">
                          <div class="h_tabCard">
                            <table style="width: 100%; font-size: 0.8em;">
                                  <tbody>
                                    <tr  class="">
                                      <th colspan="4" rowspan="1"><h5 class="card-title" style="margin-bottom: 0rem; font-size: 1rem;">(`+row.id+`)`+row.nom+`</h5> </th>
                                    </tr>
                                    <tr>
                                      <th>Marcas:</th>
                                      <td colspan="2">`+row.marcas+`</td>
                                      <td  idE="`+row.id+`" numImg="`+f+`" close="0" onclick="fn_expandirInfoElemt(this)" class="tdIcon" title="Expandir">
                                        <img id="`+f+`_imgArrow" src="img/arrow_2.png"  style="width:13px;"/>
                                      </td>
                                    </tr>
                                  </tbody>
                            </table>
                          </div>  
                          <div id="" class="b_tabCard `+row.id+`">
                            <table style="width: 100%; font-size: 0.8em;">
                              <tbody>
                                <tr>
                                 <th>Modelo:</th>
                                 <td>`+row.modelo+`</td>
                                 <th>Unidad:</th>
                                 <td>`+row.uni+`</td>
                                </tr>
                                <tr>
                                  <th colspan="4">Observación:</th>
                                </tr>
                                <tr>
                                  <td colspan="4">`+row.obs+`</td>
                                </tr>
                                <tr>
                                 <th title="Capacidad">Capac.:</th>
                                 <td>`+row.capacidad+``+row.uni_cap+`</td>
                                 <th>Costo:</th>
                                 <td>`+row.costo+`</td>
                                </tr>
                                <tr>
                                  <th>Altura:</th>
                                  <td>`+row.alt+`</td>
                                  <th>Ancho:</th>
                                  <td>`+row.anc+`</td>
                                </tr>
                                <tr>
                                  <th>Profund.:</th>
                                  <td>`+row.prof+`</td>
                                  <th>Peso:</th>
                                  <td>`+row.peso+`</td>
                                  </tr>
                                </tbody>
                            </table>
                          </div>  
                          <div class="f_tabCard">
                            <table style="width: 100%; font-size: 0.9em;">
                              <thead>
                                <tr>
                                  <th colspan="2">Total Cant.:</th>
                                  <td colspan="2">`+row.cant.toFixed(1)+` pz`+
                                 `</td>
                                </tr>
                                <tr>
                                  <th colspan="2">Total.:</th>
                                  <td colspan="2">`+(row.cant*row.capacidad).toFixed(1)+` `+row.uni_cap+`</td>
                                </tr>
                                `+((parametors.usu=='M')
                                      ?`<tr>
                                          <th colspan="2">Total $:</th>
                                          <td colspan="2">`+(row.costo*row.cant).toFixed(2)+`</td>
                                        </tr>`
                                      :`<tr><th colspan="2"></th><th colspan="2"></th></tr>`
                                  )+`
                                <tr>
                                  <td class="tdIcon" title="" onclick="fn_editElemt(this)" 
                                        cantE="`+row.cant+`" nomE="`+row.nom+`" uniE="`+row.uni+`" altE="`+row.alt+`"
                                        profE="`+row.prof+`" ancE="`+row.anc+`" pesoE="`+row.peso+`" bateE="`+row.alt+`"
                                        electE="`+row.elect+`" obsE="`+row.obs+`" marcasE="`+row.marcas+`" costoE="`+row.costo+`"
                                        id_catego="`+row.id_tipo+`" idE="`+row.id+`" capacidad="`+row.capacidad+`" uni_cap="`+row.uni_cap+`"
                                        modelo="`+row.modelo+`" >
                                        <img id="`+f+`_imgEditar" src="img/editar_1.png"  style="width:13px;" title="Editar Articulo"/>
                                  </td>
                                  <td class="tdIcon" title="Localizar Articulo" onclick="fn_mdlSearchArt(this)"
                                        idE="`+row.id+`" numImg="`+f+`" nomArt="`+row.nom+`">
                                        <img id="`+f+`_imgBuscar" src="img/buscar_1.png"  style="width:13px;" 
                                          title="Buscar Articulo"/>
                                  </td>
                                  <td class="tdIcon" title="Posicion en almacen" onclick="fn_infoMdlPosArt(this)" idE="`+row.id+`" numImg="`+f+`">
                                        <span id="`+f+`_imgPosic" data-feather="map-pin" title="Posicion en almacen"></span>
                                  </td>
                                  `+((parametors.usu=='M')
                                      ?`<td class="tdIcon" title="Borrar Articulo"  onclick="fn_mdl_borrarArt(this)" idE="`+row.id+`" nomArt="`+row.nom+`" numImg="`+f+`">
                                            <span id="`+f+`_imgBorrar" data-feather="trash-2" title="Borrar Articulo"></span>
                                        </td>`
                                      :``
                                  )+`
                                </tr>
                              </thead>
                            </table>  
                          </div>  
                        </div>
                     </div>`+
                  ((cont==4 || f==(list.length-1))?`</div>`:``)+``;
        cont=((cont==4)?1:cont+1);   
      }        

      $("#content_menu_Catego .contenido_prin .container-fluid").append(html3);
     
    //}
    feather.replace();
  }

  function fn_newCatego(){
    //console.log("que onda!!");
    $('#mdl_newCatego').modal('show');
    $("#titModalCatego").text("Agregar Categoria");
    $("#btnModalCat").attr("onclick","fn_saveNewCatego()");
  }

  function fn_puthtmlCat(tipo,d,num){
      return `<li class="nav-item list_categos">
                    <a id="menu_cat_`+tipo.id+`" class="nav-link"  href="#content_menu_Catego"  data-toggle="tab">
                      <table style="width: 100%;">
                        <tr>
                          <td id="td_`+tipo.id+`" onclick="fn_filtTipo(`+tipo.id+`)"> <span data-feather="file-text"></span> </td>
                          <td onclick="fn_filtTipo(`+tipo.id+`)">`+tipo.nom+`</td>
                          <td><span class="badge badge-info badge-pill">`+num+`</span></td>
                          <td title="Editar" onclick="fn_editCat(this)" idCat="`+tipo.id+`" nomCat="`+tipo.nom+`" descrCat="">
                            <span data-feather="edit"></span>
                          </td>
                        </tr>
                      </table>    
                    </a>
                </li>`;
  }

  function fn_buscarCategos(){
    var catego=$("#inpSearchCat").val();
    $(".list_categos").remove();
    let html='';
    //console.log(vecCategos);
    let first=true;
    let menuOp=0;
    for(let d=0;d<vecCategos.length;d++){
      let row=vecCategos[d];
      let list1=[];
      for(let m=0;m<listArt_1.length;m++){
          let row2=listArt_1[m];
          if(d==0){
            list1.push(row2);
          }else{
            if(row2.id_tipo==row.id){
               list1.push(row2);
            }
          }  
      }
      let num=row.nom.toLowerCase().indexOf(catego.toLowerCase());
      if(num>-1){
        html=html+fn_puthtmlCat(row,d,list1.length);          
        if(first){
          menuOp=row.id;
          first=false;
        }
      }  
    } 
    $("#li_categos").append(html);

    feather.replace();

    $( "#menu_cat_"+menuOp+" tr td#td_"+menuOp).trigger( "click" );
  }

  function fn_editCat(id){
    $('#mdl_newCatego').modal('toggle');

    $("#inp_nomNewCatego").val($(id).attr("nomCat"));
    $("#inp_descNewCatego").val($(id).attr("descrCat"));

    $("#btnModalCat").attr("idCat",$(id).attr("idCat"));
    $("#btnModalCat").attr("onclick","fn_editCatBD(this)");

    $("#titModalCatego").text("Editar Categoria");
  }

  var vec_posArt=[];
  function fn_masPosArt(){
    let alm=$("#sltAlmPosArt").val();
    let posicion=$("#inpPosPosArt").val();
    //console.log(alm,posicion);
    let tam=vecSitios.length;
    if(posicion!=''){
      $("#sltAlmPosArt").empty();
      let html1=``;
      let html2='<option selected="">Choose...</option>';
      let obj={}
      for(let d=0;d<tam;d++){
          let sitio=vecSitios[d];
          if(sitio.id==alm){
            obj.id_aloj=alm;        
            obj.pos=posicion;
            obj.id_art=$("#mdl_PosicionElemt_Title").attr('idArt');        
            html1=`<tr id="`+alm+`"><td>(`+alm+`) `+sitio.nom+`</td>
                      <td style="text-align: center;"> `+posicion+`</td>
                      <td style="text-align: center;" idAlm="`+alm+`" idArt="`+obj.id_art+`"
                          onclick="fn_borrarPosArt(this)">
                          <span id="" data-feather="trash-2" title="Borrar Posición"></span>
                      </td></tr>`;   
          }else{
            html2=html2+'<option value="'+sitio.id+'">'+sitio.nom+'</option>';  
          }
      }

      $("#sltAlmPosArt").append(html2);
      $("#tb_Posiciones").append(html1);
      $("#inpPosPosArt").val("");
      feather.replace();//PARA LOS ICONOS "data-feather"     
      fn_savePosArt(obj);
    }else{
      console.log("Revisar la posición no puede ir vacia");
    }
  }
/************************************\CATEGORIAS*************************************************/
/************************************ARTICULOS*************************************************/
  var categoriaId=0;
  function fn_newElemt(){
    let vec=[];
    for(let d=0;d<vecCategos.length;d++){
      if(d>0){
        vec.push({"id":vecCategos[d].id,"value":vecCategos[d].nom,"label":vecCategos[d].nom,});
      }  
    }

    $("#frm_newEle_catego").autocomplete({
      appendTo: "#mdl_newElemt"
      ,source: vec
      ,minLength:1
      ,messages: {noResults: '',results: function() {}}
      ,select: function (event, ui) {
        //console.log(ui.item);  
        categoriaId=ui.item.id;
      }
    });

    $('#mdl_newElemt').modal('toggle');
    //$("#frm_newEle_btnSave").attr("id_catego",id);  
    $("#frm_newEle_btnSave").attr("onclick","fn_saveElemt(this)");  
    $("#exampleModalScrollableTitle").text("Registro");
    $( "#frm_newEle_marca" ).prop( "disabled", false );
    $("#frm_newEle_nom").focus();

    if(parametors.usu=="O"){
      $("#frm_newEle_precio").prop( "disabled", true );
    }
  }

  function fn_clean_mdlNewElemt(){
    $("#frm_newEle_nom").val("");
    $("#frm_newEle_marca").val("");
    $("#frm_newEle_precio").val("");
    $("#frm_newEle_alt").val("");
    $("#frm_newEle_ancho").val("");
    $("#frm_newEle_prof").val("");
    $("#frm_newEle_peso").val("");
    $("#frm_newEle_uni").val("");
    $("#frm_newEle_bate").val(0);
    $("#frm_newEle_elect").val(0);
    $("#frm_newEle_obs").val("");
    $("#frm_newEle_catego").val("");
    $("#frm_newEle_capaci").val("");
    $("#frm_newEle_modelo").val("");

  }
  function fn_editElemt(id){
    $('#mdl_newElemt').modal('toggle');
    let idCat=$(id).attr("id_catego");
    let idE=$(id).attr("idE");
    categoriaId=$(id).attr("id_catego");

    let vec=[];
    for(let d=0;d<vecCategos.length;d++){
      if(d>0){
        vec.push({"id":vecCategos[d].id,"value":vecCategos[d].nom,"label":vecCategos[d].nom,});
      }  
    }
    $("#frm_newEle_catego").autocomplete({
      appendTo: "#mdl_newElemt"
      ,source: vec
      ,minLength:1
      ,messages: {noResults: '',results: function() {}}
      ,select: function (event, ui) {
        //console.log(ui.item);  
        
        categoriaId=ui.item.id;
      }
    });

    for(let d=0;d<vecCategos.length;d++){
        if(categoriaId==vecCategos[d].id){
            $("#frm_newEle_catego").val(vecCategos[d].nom);
            break;
        }
    }
    
    $("#frm_newEle_btnSave").attr("id_catego",idCat);  
    $("#frm_newEle_btnSave").attr("idE",idE);
    $("#frm_newEle_btnSave").attr("onclick","fn_editElemtBD(this)");  

    $("#frm_newEle_nom").val($(id).attr("nomE"));
    $("#frm_newEle_nom").focus();
    $("#frm_newEle_marca").val($(id).attr("marcasE"));
    //$("#frm_newEle_marca" ).prop( "disabled", true );
    $("#frm_newEle_precio").val($(id).attr("costoE"));
    $("#frm_newEle_alt").val($(id).attr("altE"));
    $("#frm_newEle_ancho").val($(id).attr("ancE"));
    $("#frm_newEle_prof").val($(id).attr("profE"));
    $("#frm_newEle_peso").val($(id).attr("pesoE"));
    $("#frm_newEle_uni").val($(id).attr("uni_cap"));
    $("#frm_newEle_capaci").val($(id).attr("capacidad"));
    $("#frm_newEle_modelo").val($(id).attr("modelo"));

    $("#frm_newEle_bate").val($(id).attr("bateE"));
    $("#frm_newEle_elect").val($(id).attr("electE"));
    $("#frm_newEle_obs").val($(id).attr("obsE"));
    $("#exampleModalScrollableTitle").text("Actualizar");
    if(parametors.usu=="O"){
      $("#frm_newEle_precio").prop( "disabled", true );
    }
  }

  function fn_buscarElemt(){
    let vec=listArt_1;
    let list0=[];
    //if(menuOp>0){
      for(let d=0;d<vec.length;d++){
        let art=vec[d];
        if(menuOp==art.id_tipo){
          list0.push(art);
        }
      }
      if(list0.length==0){
        list0=vec;
      }  
      var arts=($("#inpBuscarNom_").val()=='')?[]:$("#inpBuscarNom_").val().split(" ");
      var marcs=($("#inpBuscarMarc_").val()=='')?[]:$("#inpBuscarMarc_").val().split(" ");
      
      let list=[];
      if(arts.length>0){
        for(let f=0;f<list0.length;f++){
          let art=list0[f];
          let ok=false;
          for(let a=0;a<arts.length;a++){
            ok=art.nom.toLowerCase().includes(arts[a].toLowerCase());
            if(!ok){ break; }
          }
          if(ok){
            list.push(art);
          } 
        }
        if(marcs.length>0){
          let vec=list;
          list=[];
          for(let f=0;f<vec.length;f++){
            let art=vec[f];
            let ok=false;
            for(let a=0;a<marcs.length;a++){
              ok=art.marcas.toLowerCase().includes(marcs[a].toLowerCase());
              if(!ok){ break; }
            }
            if(ok){
              list.push(art);
            } 
          }
        }  
      }else{
        if(marcs.length>0){
          for(let f=0;f<list0.length;f++){
              let art=list0[f];
              let ok=false;
              for(let a=0;a<marcs.length;a++){
                ok=art.marcas.toLowerCase().includes(marcs[a].toLowerCase());
                if(!ok){ break; }
              }
              if(ok){
                list.push(art);
              } 
          }
        }else{
          list=list0;
        }
      }  
    //      console.log(list);
    /**/
        list.sort(function (a, b) {
          return a.nom.localeCompare(b.nom);
        });

        $("#content_menu_Catego .contenido_prin .container-fluid").empty();
        let html3=''
        let cont=1;
        for(let f=0;f<list.length;f++){
          let row=list[f];
          html3=html3+
                    ((cont==1)?`<div class="row">`:``)
                     +`<div class="col-sm-6 col-md-6 col-lg-3 col-xl-3">
                          <div class="tabCard">
                            <div class="h_tabCard">
                              <table style="width: 100%; font-size: 0.8em;">
                                    <tbody>
                                      <tr  class="">
                                        <th colspan="4" rowspan="1"><h5 class="card-title" style="margin-bottom: 0rem; font-size: 1rem;">(`+row.id+`)`+row.nom+`</h5> </th>
                                      </tr>
                                      <tr>
                                        <th>Marcas:</th>
                                        <td colspan="2">`+row.marcas+`</td>
                                        <td  idE="`+row.id+`" numImg="`+f+`" close="0" onclick="fn_expandirInfoElemt(this)" class="tdIcon" title="Expandir">
                                          <img id="`+f+`_imgArrow" src="img/arrow_2.png"  style="width:13px;"/>
                                        </td>
                                      </tr>
                                    </tbody>
                              </table>
                            </div>  
                            <div id="" class="b_tabCard `+row.id+`">
                              <table style="width: 100%; font-size: 0.8em;">
                                <tbody>
                                  <tr>
                                   <th>Modelo:</th>
                                   <td>`+row.modelo+`</td>
                                   <th>Unidad:</th>
                                   <td>`+row.uni+`</td>
                                  </tr>
                                  <tr>
                                    <th colspan="4">Observación:</th>
                                  </tr>
                                  <tr>
                                    <td colspan="4">`+row.obs+`</td>
                                  </tr>
                                  <tr>
                                   <th title="Capacidad">Capac.:</th>
                                   <td>`+row.capacidad+``+row.uni_cap+`</td>
                                   <th>Costo:</th>
                                   <td>`+row.costo+`</td>
                                  </tr>
                                  <tr>
                                    <th>Altura:</th>
                                    <td>`+row.alt+`</td>
                                    <th>Ancho:</th>
                                    <td>`+row.anc+`</td>
                                  </tr>
                                  <tr>
                                    <th>Profund.:</th>
                                    <td>`+row.prof+`</td>
                                    <th>Peso:</th>
                                    <td>`+row.peso+`</td>
                                    </tr>
                                  </tbody>
                              </table>
                            </div>  
                            <div class="f_tabCard">
                              <table style="width: 100%; font-size: 0.9em;">
                                <thead>
                                  <tr>
                                    <th colspan="2">Total Cant.:</th>
                                    <td colspan="2">`+row.cant.toFixed(1)+` pz`+
                                    `</td>
                                  </tr>
                                  <tr>
                                    <th colspan="2">Total Cant.:</th>
                                    <td colspan="2">`+(row.cant*row.capacidad).toFixed(1)+` `+row.uni_cap+`</td>
                                  </tr>
                                  <tr>
                                    <th colspan="2">Total $:</th>
                                    <td colspan="2">`+(row.costo*row.cant).toFixed(2)+`</td>
                                  </tr>
                                  <tr>
                                     <td class="tdIcon" title="" onclick="fn_editElemt(this)" 
                                          cantE="`+row.cant+`" nomE="`+row.nom+`" uniE="`+row.uni+`" altE="`+row.alt+`"
                                          profE="`+row.prof+`" ancE="`+row.anc+`" pesoE="`+row.peso+`" bateE="`+row.alt+`"
                                          electE="`+row.elect+`" obsE="`+row.obs+`" marcasE="`+row.marcas+`" costoE="`+row.costo+`"
                                          id_catego="`+row.id_tipo+`" idE="`+row.id+`" capacidad="`+row.capacidad+`" uni_cap="`+row.uni_cap+`"
                                          modelo="`+row.modelo+`" >
                                          <img id="`+f+`_imgEditar" src="img/editar_1.png"  style="width:13px;" title="Editar Articulo"/>
                                    </td>
                                    <td class="tdIcon" title="Localizar Articulo" onclick="fn_mdlSearchArt(this)"
                                          idE="`+row.id+`" numImg="`+f+`" nomArt="`+row.nom+`">
                                          <img id="`+f+`_imgBuscar" src="img/buscar_1.png"  style="width:13px;" 
                                            title="Buscar Articulo"/>
                                    </td>
                                    <td class="tdIcon" title="Posicion en almacen" onclick="fn_infoMdlPosArt(this)" idE="`+row.id+`" numImg="`+f+`">
                                          <span id="`+f+`_imgPosic" data-feather="map-pin" title="Posicion en almacen"></span>
                                    </td>
                                `+((parametors.usu=='M') 
                                    ?`<td class="tdIcon" title="Borrar Articulo"  onclick="fn_mdl_borrarArt(this)" idE="`+row.id+`" nomArt="`+row.nom+`" numImg="`+f+`">
                                          <span id="`+f+`_imgBorrar" data-feather="trash-2" title="Borrar Articulo"></span>
                                      </td>`
                                    :`<td class="tdIcon" title=""  onclick=""></td>`
                                )+`
                                  </tr>
                                </thead>
                              </table>  
                            </div>  
                          </div>
                       </div>`+
                    ((cont==4 || f==(list.length-1))?`</div>`:``)+``;
          cont=((cont==4)?1:cont+1);   
        }        

        $("#content_menu_Catego .contenido_prin .container-fluid").append(html3);
       
      //}
    /**/  
    feather.replace();
  }

  function fn_infoHistArtSitios(vec){
    console.log(vec);
    $("#tbl_SitMdlSearchArt tbody").empty();
    let html='';
    for(let d=0;d<vec.length;d++){
      let row=vec[d];
      html=html+`<tr>
                  <td>`+(d+1)+`</td>
                  <td title="`+row.descr+`">(`+row.id_aloj+`) `+row.nom+`</td>
                  <td class="rightTD">`+row.cantE+`</td>
                  <td class="rightTD">`+row.cantS+`</td>
                  <td class="rightTD">`+row.total+`</td>
                </tr> `;

    }

    $("#tbl_SitMdlSearchArt tbody").append(html);
  }

  function fn_infoHistArtVales(vec){
    //console.log(vec);
    $("#tbl_ValMdlSearchArt tbody").empty();
    let html='';

    for(let d=0;d<vec.length;d++){
      let row=vec[d];
      html=html+`<tr>
                  <td>`+(d+1)+`</td>
                  <td>`+row.id_doc+`</td>
                  <td title="`+row.descr+`">(`+row.id_aloj+`) `+row.nom+`</td>
                  <td class="centerTD">`+((row.tipo=='S')?'Salida':'Entrada')+`</td>
                  <td class="rightTD">`+row.cant+`</td>
                  <td class="centerTD">`+row.fecha+`</td>
                  <td>`+row.obs3+`</td>
                </tr> `;

    }

    $("#tbl_ValMdlSearchArt tbody").append(html);
  }

  var vecSitios=[];
  function fn_mdlPositionArt(id,vec,vec2){
    //console.log(id,vec);
    vecSitios=vec;
    $("#mdl_PosicionElemt_Title").text('Posiciones de '+id+' en Almacenes');
    $("#mdl_PosicionElemt_Title").attr('idArt',id);

    $("#mdl_PosicionElemt").modal('toggle');
    $("#sltAlmPosArt").empty();
    $("#tb_Posiciones tbody").empty();
    let html='<option selected="">Choose...</option>';
    for(let d=0;d<vec.length;d++){
        let alm=vec[d];
        let ok=true;
        for(let f=0;f<vec2.length;f++){
          let row=vec2[f];
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
    if(vec2.length>0){
      let html1='';
      for(let f=0;f<vec2.length;f++){
          let row=vec2[f];
          for(let d=0;d<vec.length;d++){
            let alm=vec[d];
            if(row.id_aloj==alm.id){
              html1=`<tr id="`+alm.id+`"><td>(`+alm.id+`) `+alm.nom+`</td>
                     <td style="text-align: center;"> `+row.pos+`</td>
                     <td style="text-align: center;" idAlm="`+alm.id+`" idArt="`+row.id_art+`"
                     onclick="fn_borrarPosArt(this)">
                      <span id="" data-feather="trash-2" title="Borrar Posición"></span>
                     </td></tr>`;    
              break;       
            }
          }        
      }
      $("#tb_Posiciones tbody").append(html1);
    }
    feather.replace();//PARA LOS ICONOS "data-feather"
  }

  function fn_mdl_borrarArt(id){
    $("#mdl_borrarArt").modal("show");
    let idArt=$(id).attr("idE");
    let nomArt=$(id).attr("nomArt");
    $("#tit_mdlBorrArt").text("("+idArt+") "+nomArt);
    $("#text_mdlBorrarArt").text("Seguro de hacer esta Operación: Borrar ("+idArt+") "+nomArt);
    $("#btnDlt_mdlBrrArt").attr("idArt",idArt);
    $("#btnDlt_mdlBrrArt").attr("tipDlt","1");
  }

  function fn_expandirInfoElemt(ind){
      let id=$(ind).attr("idE");
      let close=($(ind).attr("close")=='0') ? true: false;
      if(close){
        //console.log("#"+id);
        $("."+id).css("display","block");
        $(ind).attr("close","1");
        $(ind).attr("title","Reducir");

        let numImg=$(ind).attr("numImg");

        $("#"+numImg+"_imgArrow").attr("src","img/arrow_1.png");;
      }else{
        $("."+id).css("display","none");
        $(ind).attr("close","0");
        $(ind).attr("title","Expandir");
        let numImg=$(ind).attr("numImg");
      
        $("#"+numImg+"_imgArrow").attr("src","img/arrow_2.png");;
      }
  }
/************************************\ARTICULOS*************************************************/
/************************************MARCAS*************************************************/
  function fn_buscarMarca(){
    let vec=listArt_1;
    let list0=[];
    //if(menuOp>0){
        for(let d=0;d<vec.length;d++){
          let art=vec[d];
          if(menuOp==art.id_tipo){
            list0.push(art);
          }
        }
        if(list0.length==0){
          list0=vec;
        }  
        var marcs=($("#inpBuscarMarc_").val()=='')?[]:$("#inpBuscarMarc_").val().split(" ");
        var arts=($("#inpBuscarNom_").val()=='')?[]:$("#inpBuscarNom_").val().split(" ");
              
        let list=[];
        if(marcs.length>0){
          for(let f=0;f<list0.length;f++){
              let art=list0[f];
              let ok=false;
              for(let a=0;a<marcs.length;a++){
                ok=art.marcas.toLowerCase().includes(marcs[a].toLowerCase());
                if(!ok){ break; }
              }
              if(ok){
                list.push(art);
              } 
          }
          if(arts.length>0){
            let vec=list;
            list=[];
            for(let f=0;f<vec.length;f++){
              let art=vec[f];
              let ok=false;
              for(let a=0;a<arts.length;a++){
                ok=art.nom.toLowerCase().includes(arts[a].toLowerCase());
                if(!ok){ break; }
              }
              if(ok){
                list.push(art);
              } 
            }
            
          }
        }else{
          if(arts.length>0){
            for(let f=0;f<list0.length;f++){
              let art=list0[f];
              let ok=false;
              for(let a=0;a<arts.length;a++){
                ok=art.nom.toLowerCase().includes(arts[a].toLowerCase());
                if(!ok){ break; }
              }
              if(ok){
                list.push(art);
              } 
            }
          }else{
            list=list0;  
          }
        }  
    //console.log(list);
    /**/
        list.sort(function (a, b) {
          return a.nom.localeCompare(b.nom);
        });

        $("#content_menu_Catego .contenido_prin .container-fluid").empty();
        let html3=''
        let cont=1;
        for(let f=0;f<list.length;f++){
          let row=list[f];
          html3=html3+
                    ((cont==1)?`<div class="row">`:``)
                     +`<div class="col-sm-6 col-md-6 col-lg-3 col-xl-3">
                          <div class="tabCard">
                            <div class="h_tabCard">
                              <table style="width: 100%; font-size: 0.8em;">
                                    <tbody>
                                      <tr  class="">
                                        <th colspan="4" rowspan="1"><h5 class="card-title" style="margin-bottom: 0rem; font-size: 1rem;">(`+row.id+`)`+row.nom+`</h5> </th>
                                      </tr>
                                      <tr>
                                        <th>Marcas:</th>
                                        <td colspan="2">`+row.marcas+`</td>
                                        <td  idE="`+row.id+`" numImg="`+f+`" close="0" onclick="fn_expandirInfoElemt(this)" class="tdIcon" title="Expandir">
                                          <img id="`+f+`_imgArrow" src="img/arrow_2.png"  style="width:13px;"/>
                                        </td>
                                      </tr>
                                    </tbody>
                              </table>
                            </div>  
                            <div id="" class="b_tabCard `+row.id+`">
                              <table style="width: 100%; font-size: 0.8em;">
                                <tbody>
                                  <tr>
                                   <th>Modelo:</th>
                                   <td>`+row.modelo+`</td>
                                   <th>Unidad:</th>
                                   <td>`+row.uni+`</td>
                                  </tr>
                                  <tr>
                                    <th colspan="4">Observación:</th>
                                  </tr>
                                  <tr>
                                    <td colspan="4">`+row.obs+`</td>
                                  </tr>
                                  <tr>
                                   <th title="Capacidad">Capac.:</th>
                                   <td>`+row.capacidad+``+row.uni_cap+`</td>
                                   <th>Costo:</th>
                                   <td>`+row.costo+`</td>
                                  </tr>
                                  <tr>
                                    <th>Altura:</th>
                                    <td>`+row.alt+`</td>
                                    <th>Ancho:</th>
                                    <td>`+row.anc+`</td>
                                  </tr>
                                  <tr>
                                    <th>Profund.:</th>
                                    <td>`+row.prof+`</td>
                                    <th>Peso:</th>
                                    <td>`+row.peso+`</td>
                                    </tr>
                                  </tbody>
                              </table>
                            </div>  
                            <div class="f_tabCard">
                              <table style="width: 100%; font-size: 0.9em;">
                                <thead>
                                  <tr>
                                    <th colspan="2">Total Cant.:</th>
                                     <td colspan="2">`+row.cant.toFixed(1)+` pz`+
                                    `</td>
                                  </tr>
                                  <tr>
                                    <th colspan="2">Total Cant.:</th>
                                    <td colspan="2">`+(row.cant*row.capacidad).toFixed(1)+` `+row.uni_cap+`</td>
                                  </tr>
                                  <tr>
                                    <th colspan="2">Total $:</th>
                                    <td colspan="2">`+(row.costo*row.cant).toFixed(2)+`</td>
                                  </tr>
                                  <tr>
                                    <td class="tdIcon" title="" onclick="fn_editElemt(this)" 
                                          cantE="`+row.cant+`" nomE="`+row.nom+`" uniE="`+row.uni+`" altE="`+row.alt+`"
                                          profE="`+row.prof+`" ancE="`+row.anc+`" pesoE="`+row.peso+`" bateE="`+row.alt+`"
                                          electE="`+row.elect+`" obsE="`+row.obs+`" marcasE="`+row.marcas+`" costoE="`+row.costo+`"
                                          id_catego="`+row.id_tipo+`" idE="`+row.id+`" capacidad="`+row.capacidad+`" uni_cap="`+row.uni_cap+`"
                                          modelo="`+row.modelo+`" >
                                          <img id="`+f+`_imgEditar" src="img/editar_1.png"  style="width:13px;" title="Editar Articulo"/>
                                    </td>
                                    <td class="tdIcon" title="Localizar Articulo" onclick="fn_mdlSearchArt(this)"
                                          idE="`+row.id+`" numImg="`+f+`" nomArt="`+row.nom+`">
                                          <img id="`+f+`_imgBuscar" src="img/buscar_1.png"  style="width:13px;" 
                                            title="Buscar Articulo"/>
                                    </td>
                                    <td class="tdIcon" title="Posicion en almacen" onclick="fn_infoMdlPosArt(this)" idE="`+row.id+`" numImg="`+f+`">
                                          <span id="`+f+`_imgPosic" data-feather="map-pin" title="Posicion en almacen"></span>
                                    </td>
                                    <td class="tdIcon" title="Borrar Articulo"  onclick="fn_mdl_borrarArt(this)" idE="`+row.id+`" nomArt="`+row.nom+`" numImg="`+f+`">
                                          <span id="`+f+`_imgBorrar" data-feather="trash-2" title="Borrar Articulo"></span>
                                    </td>
                                  </tr>
                                </thead>
                              </table>  
                            </div>  
                          </div>
                       </div>`+
                    ((cont==4 || f==(list.length-1))?`</div>`:``)+``;
          cont=((cont==4)?1:cont+1);   
        }        

        $("#content_menu_Catego .contenido_prin .container-fluid").append(html3);
    /**/  
    feather.replace();
  }
/************************************\MARCAS*************************************************/
  function fn_mdlMapa(obj){
    let h=$(window).height();
    $("#mapa_mdlMapa").height(((h*1.05263158)-209.47));
    
    $("#mdl_mapa").modal("show");
    $("#tit_mdlMapa").text("Ubicaciones");
    var sitios=obj.sitios;  
    try{
      $("#inp_sitioMdlMapa").autocomplete("destroy");
    }catch(e){}
    $("#inp_sitioMdlMapa").autocomplete({
        appendTo: "#mdl_mapa"
        ,source: sitios
        ,minLength:1
        ,messages: {noResults: '',results: function() {}}
        ,select: function (event, ui) {
          console.log(ui.item);  
        }
    });
    console.log(obj);
    //$("#inp_sitioMdlMapa")
  }

async function msg_aviso(obj){
  $("#mdl_errors").modal("show");
  $("#msg_mdlErrors").text(obj.msg);
  if(obj.op==0){//ERROR
    $("#mdlErr_header h5").text("Error")
    $("#mdlErr_header").attr("class","modal-header bg-danger");
  }else if(obj.op==1){//ALERTA
    $("#mdlErr_header h5").text("Alerta");
    $("#mdlErr_header").attr("class","modal-header bg-warning");
  }else{//AVISO
    $("#mdlErr_header h5").text("Aviso");
    $("#mdlErr_header").attr("class","modal-header bg-info");
  }
  
  /*
  await sleep(3000);
  $("#mdl_errors").modal("hide");
  */
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fn_evenModals(){
  $('#mdl_editVale').on('shown.bs.modal', function (e) {
    tb_genVale2.columns.adjust().draw();
  });

  $('#mdl_editVale').on('hidden.bs.modal', function (e) {
    vecgenVale=[];
    tb_genVale2.clear().draw(); 
    tb_genVale2.columns.adjust().draw();
  });

  $('#mdl_newCatego').on('hidden.bs.modal', function (e) {
    $("#inp_nomNewCatego").val("");
    $("#inp_descNewCatego").val("");
  });

  $('#mdl_newElemt').on('hidden.bs.modal', function (e) {
    $("#frm_newEle_catego").autocomplete( "destroy" );
    fn_clean_mdlNewElemt();  
  });
    
  $('#mdl_buscarVales').on('hidden.bs.modal', function (e) {
     $("#inp_sitioMdlSrc").autocomplete( "destroy" );
     idSitio3="";
     $("#inp_sitioMdlSrc").val("");
  });

  $("#inpFchIni_mdlVals").change(function() {
    fechas.ini=$(this).val();
  });

  $("#inpFchFin_mdlVals").change(function() {
    fechas.fin=$(this).val();
  });

  $("#inpVale_fech").change(function(){
    fechas.vale=$(this).val();
  });
}

function showLoad(){
  console.log("showLoad");
  $(".loadMsg").css("display","block");
}

function closeLoad(){
  $(".loadMsg").css("display","none");  
}


function fn_MedidasAll(){
  let h=$(window).height();
  //let w=$(window).width();    
  //console.log(h);
  let h1=(h*1.052631579)-133.47;
  $("#menuLeft").css("height",h1+"px");

  $(".contTarjets").css("height","400px");

  fn_medidas_mdlVales();
}
  
function fn_mdlValesBtnFch(op){
  let f1 = new Date();
  let f2 = new Date();

  switch (op) {
    case 0:
      console.log("hoy");
      break;
    case 1:
      f1.setDate(f1.getDate()-f1.getUTCDay());  
      console.log("semana",f1.getUTCDay());
    break;
    case 2:
      f1.setDate(f1.getDate()-(f1.getDate()-1));    
    break;
    case 3:
      f1.setDate(f1.getDate()-5);    
    break;
    default:
      console.log("no se reconoce la opción en la función fn_mdlValesBtnFch("+op+")");
    break;
  }
  let mes1 = f1.getMonth()+1; //obteniendo mes
  let dia1 = f1.getDate(); //obteniendo dia
  let ano1 = f1.getFullYear(); //obteniendo año
  if(dia1<10)
    dia1='0'+dia1; //agrega cero si el menor de 10
  if(mes1<10)
    mes1='0'+mes1; //agrega cero si el menor de 10

  let mes2 = f2.getMonth()+1; //obteniendo mes
  let dia2 = f2.getDate(); //obteniendo dia
  let ano2 = f2.getFullYear(); //obteniendo año
  if(dia2<10)
    dia2='0'+dia2; //agrega cero si el menor de 10
  if(mes2<10)
    mes2='0'+mes2; //agrega cero si el menor de 10

  fechas.ini=ano1+"-"+mes1+"-"+dia1;
  fechas.fin=ano2+"-"+mes2+"-"+dia2;
  document.getElementById('inpFchIni_mdlVals').value=ano1+"-"+mes1+"-"+dia1;
  document.getElementById('inpFchFin_mdlVals').value=ano2+"-"+mes2+"-"+dia2;
}

function fn_filCol(id,i,table) {
  $('#'+id).DataTable().column(i).search(
    $('#col'+i+'_'+table).val(),false,true
  ).draw();
}






