var tb_Pers;
var vecPers=[];
var indexTab=0;
window.onload = function() {//Se activa al momento de que cargue la pagina.
  fn_tb_Pers();
  fn_setIndexTab(indexTab);
  startTime();

  let h=$(window).height();
  let height=(h*1.025641026)-220.77;
  $("#menuPrin").height(height);
  fn_h_listKits();

  fn_consultArts();

  fn_evenModals();
}

function fn_setIndexTab(index){
	indexTab=index;
	if(index==0){
		fn_consultPersBD();
	}else if(index==1){
    fn_consultKits();
	}
}


/*********************************USUARIOS***************************************************************/
  function fn_tb_Pers(){
      let h=$(window).height();
      var height=(h*0.736842105)-48.63;
      //var height=(($("#cont_tb_Pers").height()*0.80));
      tb_Pers=$('#tb_Pers').DataTable({
        scrollY:height,
        deferRender: true, /*Velocidad de procedemiento tabla */
        data: vecPers,
        info:     false,
        orderCellsTop: true,
        //columnDefs: [ {"visible": false,"targets":vecColCot}],
        columns: [
          { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+(meta.row+1)+'</span>';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+data.nom+'</span>';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                  return '<span class="textTb1">'+data.email+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                  let html='<span class="textTb1">'+data.permisos[0].des+'</span>';
                                    
                  return html;
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                    return '<span class="textTb1">'+data.reg+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
                return '<span class="textTb1">'+(
                        (data.estado==2) 
                          ?  'Inactivo'
                          : (data.estado==1) 
                              ?  'Activo'
                              :  'Descansando'
                     )+'</span>';
              } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return ' <img src="./img/editar.png" class="iconTab editar" onclick="" id_per="'+data.id+'" >';
            } 
          },
          { data: null,render: function ( data, type, row, meta ) {
              return ' <img src="./img/x.png" class="iconTab removeP" onclick=""  id_per="'+data.id+'" nomP="'+data.nom+'" >';
            } 
          }
        ],
        paging: false,
        dom:'<"toolsBar">frtip',
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Spanish.json"
        },createdRow: function (row, data, index) {
                 $('td', row).eq(0).addClass('centerTD');
                 $('td', row).eq(1).addClass('leftTD');
                 $('td', row).eq(2).addClass('leftTD');
                 $('td', row).eq(3).addClass('centerTD');
                 $('td', row).eq(4).addClass('centerTD');
                 $('td', row).eq(5).addClass('centerTD');
                 $('td', row).eq(6).addClass('centerTD');
                 $('td', row).eq(7).addClass('centerTD');

        }
      }); 

      $('input.col_filPers').on( 'keyup click', function () {
        fn_filCol('tb_Pers',$(this).parents('th').attr('data-column'),'Pers');
      });
      $('#tb_Pers tbody').on( 'click', 'img.editar', function() {
          let clave=$(this).parents('tr').prevObject[0].attributes.id_per.nodeValue;
          id_personal=clave;
          fn_mdlPerso(1);
      });
      $('#tb_Pers tbody').on( 'click', 'img.removeP', function() {
          let clave=$(this).parents('tr').prevObject[0].attributes.id_per.nodeValue;
          let nom=$(this).parents('tr').prevObject[0].attributes.nomP.nodeValue;
          id_personal=clave;
          xPersonal_mdl(nom);
      });
      

  }
  async function fn_llenarUsua(vec){
    vecPers=vec;
    tb_Pers.clear().draw();
    tb_Pers.rows.add(vecPers).draw();
    await sleep(200);
    tb_Pers.columns.adjust().draw();
  }

  function newPersonal_mdl(vec){
      $("#tit_mdlPer").text("Nuevo personal");
      $("#usu_mdlPer").empty();

      let html='<option selected="">Choose...</option>';
      for(let d=0;d<vec.length;d++){
        html=html+'<option value="'+(d+1)+'">'+(vec[d].descr)+'</option>';
      }

      $("#usu_mdlPer").append(html);

      $("#btnSave_mdlPer").attr("onclick","fn_newPer()");

      $("#mdl_personal").modal("show");
  }

  function editPersonal_mdl(vec,tips){
      let obj=vec[0];
      $("#tit_mdlPer").text("Editar datos de "+obj.nom);
      $("#nom_mdlPer").val(obj.nom);
      $("#email_mdlPer").val(obj.email);
      $("#pass_mdlPer").val("123456");
      $("#est_mdlPer").val(obj.estado);
      $("#btnSave_mdlPer").attr("onclick","fn_editPer("+obj.id+")");

      $("#usu_mdlPer").empty();
      let html='<option selected="">Choose...</option>';
      for(let d=0;d<tips.length;d++){
        html=html+'<option value="'+(d+1)+'">'+(tips[d].descr)+'</option>';
      }
      $("#usu_mdlPer").append(html);
      $("#usu_mdlPer").val(obj.permisos[0].id);

      $("#mdl_personal").modal("show");
  }

  function xPersonal_mdl(nom){
    $("#mdl_xPers").modal('show');
    $("#title_mdlXPers").text("Borrar Usuario ("+id_personal+") "+nom);
    $("#btn_xPers").attr("onclick","fn_removePers("+id_personal+")");
  }

  function fn_clearmdlPers(){
     $("#nom_mdlPer").val("");
     $("#email_mdlPer").val("");
     $("#est_mdlPer").val(1);
     $("#pass_mdlPer").val("");
  }






/*********************************\USUARIOS***************************************************************/
/*********************************KITS***************************************************************/
  function fn_h_listKits(){
    let h=$(window).height();
    $("#listKits").height(((h*0.996794872)-124.90));
  }

  function fn_listKits(kist){
    let vec=listKits;
    let html='';
    $("#listKits .list-group").empty();

    kist.sort();
    
    for(let m=0;m<kist.length;m++){
      html=html+`<a href="#" class="trjKits list-group-item list-group-item-action ">
              <div class="d-flex w-100 justify-content-between tit_trjKits">
                <h5 class="">Lista de Kit `+kist[m]+`</h5>
                <small></small>
              </div>
              <ul class="list-group">`;

      for(let d=0;d<listKits.length;d++){
        let row=listKits[d];  
        if(row.id_kit==kist[m]){
          html=html+`<li class="list-group-item  d-flex justify-content-between align-items-center li_trjKits">
                (`+row.id_art+`) `+row.descr+`  `+row.marca+`
               <span class="badge badge-primary badge-pill">`+row.part+`</span>
             </li> `;
        }
      }  

      html=html+`</ul>
             <div class="divBtn_trjKits">
                <i class="fa fa-pencil btn_trjKits" aria-hidden="true" onclick="fn_editKit(`+kist[m]+`)" title="Editar Kit"></i>
                <i class="fa fa-trash btn_trjKits" aria-hidden="true" onclick="fn_brrKit(`+kist[m]+`)" title="Borrar Kit"></i>
             </div>  
            </a>`;

    }

    $("#listKits .list-group").append(html);

  }

  function fn_nuevoKit(){
    $("#mdl_kits").modal('show');
    $("#title_mdlKits").text("Crear nuevo Kit");
    $("#title_mdlKits").attr("id_kit","0");
    $("#mdl_kits .modal-footer").empty("")
    $("#mdl_kits .modal-footer").append('<button type="button" onclick="fn_editSaveKit(0)" class="btn btn-primary">Guardar</button>')
  }

  function fn_editKit(id){
    $("#mdl_kits").modal('show');
    $("#title_mdlKits").text("Editar Kit "+id);
    $("#title_mdlKits").attr("id_kit",id);
    $("#mdl_kits .modal-footer").empty("")
    $("#mdl_kits .modal-footer").append('<button type="button"  onclick="fn_editSaveKit(1)" class="btn btn-primary">Guardar</button>')
    
    for(let d=0;d<listKits.length;d++){
      let row=listKits[d];

      if(row.id_kit==id){
        artsKit.push({"id_art":row.id_art,"part":row.part});

        fn_cdHtmlTrArtMdl(row.id_art,`(`+row.id_art+`)`+row.descr+` `+row.marca);

        $("#tr_"+row.id_art+" .sltTip_mdlKits").val(row.part);
      }
    }
  }

  function fn_brrKit(id){
    $("#mdl_kitsX").modal('show');
    $("#title_mdlKitsX").text("Borrar Kit "+id);
    $("#title_mdlKitsX").attr("id_kit",id);
    $("#mdl_kitsX .modal-footer").empty("")
    $("#mdl_kitsX .modal-footer").append('<button type="button"  onclick="fn_editSaveKit(2)" class="btn btn-primary">Aceptar</button>')
    $("#cnt_mdlKitsX").text("Desea borrar el Kit de la lista de Kits");
  }

  function fn_autoRowArtKits(){
      let vec=[];
      for(let d=0;d<listArts.length;d++){
                let row=listArts[d];
                vec.push({"label":"("+row.id+")"+row.nom+" "+row.marcas
                         ,"value":"("+row.id+")"+row.nom+" "+row.marcas
                         ,"id":row.id});
      }

      $("#inp_SelArtMdlKits").autocomplete({
          appendTo: "#mdl_kits"
          ,source: vec
          ,minLength:1
          ,messages: {noResults: '',results: function() {}}
          ,select: function (event, ui) {
            let ok=true;
            for(let d=0;d<artsKit.length;d++){
                let row=artsKit[d];
                if(row==ui.item.id){
                  ok=false;
                  break;
                }
            }  
            if(ok){
              setTimeout(function(){$("#inp_SelArtMdlKits").val(""); },350);    

              artsKit.push({"id_art":ui.item.id,"part":"A"});

              fn_cdHtmlTrArtMdl(ui.item.id,ui.item.label);

            }else{
              alert("Ya esta el la lista para el Kit");
            } 
          }
      });
  }

  function fn_cdHtmlTrArtMdl(id,descr){
    let html=`<tr id="tr_`+id+`">
                  <td class="leftTD">`+descr+`</td>
                  <td class="centerTD">
                    <select class="form-control sltTip_mdlKits form-control-sm" idArt="`+id+`" onchange="fn_chgSltMdlKits(this)">
                     <option value="A">Parte A</option>
                     <option value="B">Parte B</option>
                     <option value="C">Parte C</option>
                     <option value="D">Parte D</option>
                     <option value="1">Parte 1</option>
                     <option value="2">Parte 2</option>
                     <option value="3">Parte 3</option>
                     <option value="4">Parte 4</option>
                    </select>
                  </td>
                  <td class="centerTD">
                    <i class="fa fa-trash" idArt="`+id+`" title="Borrar Fila" onclick="fn_xFilaArtKits(this)"  aria-hidden="true" style="cursor:pointer;">
                    </i>
                  </td>
                </tr>`;

    $("#tblListArt_mdlKits tbody").append(html);
  }


  function fn_chgSltMdlKits(id){
    let val=$(id).val();
    let idArt=$(id).attr("idArt");
    for(let d=0;d<artsKit.length;d++){
      let row=artsKit[d];
      if(row.id_art==idArt){
        artsKit[d].part=val;    
        break;
      }
    }
  }

  function fn_xFilaArtKits(id){
    let idArt=$(id).attr("idArt");
    $("#tr_"+idArt).remove();

    for(let d=0;d<artsKit.length;d++){
      let row=artsKit[d];
      if(row.id_art==idArt){
        artsKit.splice(d,1);    
        break;
      }
    }  
  }

  function fn_deleteMdlKits(){
    $("#tblListArt_mdlKits tbody").empty();      
    artsKit=[];
    $("#inp_SelArtMdlKits").val("");
  }
/*********************************\KITS***************************************************************/

function fn_evenModals(){
  $('#mdl_kits').on('hidden.bs.modal', function (e) {
    fn_deleteMdlKits();
  });

  $('#mdl_personal').on('hidden.bs.modal', function (e) {
    fn_clearmdlPers();
  });
 

}  

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLoad(){
  $(".loadMsg").css("display","block");
}

function closeLoad(){
  $(".loadMsg").css("display","none");  
}

function fn_filCol(id,i,table) {
  $('#'+id).DataTable().column(i).search(
    $('#col'+i+'_'+table).val(),false,true
  ).draw();
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
 