//$(document).ready( function () {
  var tabSitios;
  var vecSitiso=[];

  function fn_tabSitios(){
    let h=$(window).height();
    var height=(h*0.736842105)-48.63;

    tabSitios = $("#tabSitios").DataTable({
      order: vecSitiso,
      autoWidth: true,
      processing:false,
      deferRender: true,
      orderCellsTop: true,
      lengthChange: true,
      paging:false,
      info: false,
      scrollY:height,
      scrollCollapse: false,
      language: {
       url: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Spanish.json"
      },
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
            var html="";
            for (let i = data.pers.length - 1; i >= 0; i--) {
              if (data.pers[i].fecha_fin==data.fecha_fin) {
                html='<span class="textTb1">'+data.pers[i].nom+'</span>';
              }
            }
            return html ;
          } 
        },
        { data: null,render: function ( data, type, row, meta ) {
              return '<span class="textTb1">'+data.calle+' '+data.num_int+''+data.num_ext+' '
                      +data.col+' '+data.del+' '+data.est+' '+data.pais+'</span>';
          } 
        },
        { data: null,render: function ( data, type, row, meta ) {
            return '<span class="textTb1">'+data.descr+'</span>';
          } 
        },
        { data: null,render: function ( data, type, row, meta ) {
            return '<span class="textTb1">'+data.fecha_ini+'</span>';
          } 
        },
        { data: null,render: function ( data, type, row, meta ) {
            return '<span class="textTb1">'+data.fecha_fin+'</span>';
          } 
        },
        { data: null,render: function ( data, type, row, meta ) {
            return   `<span class="textTb1">
                            <button style=" type="button" class="btn btn-warning custom-btn"data-toggle="modal" data-target="#modaleditar" 
                                  onclick="fn_editSitioP(this)" id_aloj="`+data.pers[0].id_aloj+`">
                                <span class="glyphicon glyphicon-trash">
                                <img width="20px" src="img/editar.png" id="imggra" style="  float: center;" ></span> 
                            </button>
                      </span>`;
          } 
        },
        { data: null,render: function ( data, type, row, meta ) {
          return  `<span class="textTb1">
                    <center>
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch`+(meta.row+1)+`"
                         `+((data.fecha_fin=="")? "": "checked")+` onclick="fn_editFinSitio(this)" 
                          id_aloj="`+data.pers[0].id_aloj+`">
                        <label class="custom-control-label" for="customSwitch`+(meta.row+1)+`">
                        </label>
                      </div>
                    <center> 
                  </span>`;
          } 
        },
      ], 
      dom:'<"toolsSit">frtip',
      createdRow: function (row, data, index) {
               $('td', row).eq(0).addClass('centerTD');
               $('td', row).eq(1).addClass('centerTD');
               $('td', row).eq(2).addClass('centerTD');
               $('td', row).eq(3).addClass('centerTD');
               $('td', row).eq(4).addClass('centerTD');
               $('td', row).eq(5).addClass('centerTD');
               $('td', row).eq(6).addClass('centerTD');
               $('td', row).eq(7).addClass('centerTD');
               $('td', row).eq(8).addClass('centerTD');
               //$('td', row).eq(9).addClass('centerTD');
      }
});
   $(".dataTables_filter input").css({ "background" :"" });
   $(".dataTables_filter input").css({ "padding-top" :"0px" });
   $('#container').css( 'display', 'block' );
  // tabSitios.columns.adjust().draw();
  fn_btnToolsSit('.toolsSit');

  $('input.col_filSitios').on( 'keyup click', function () {
      fn_filCol('tabSitios',$(this).parents('th').attr('data-column'),'Sitios');
  });

};



async function fn_btnToolsSit(cla) {
  while(!$(cla).length){
        await sleep(2);
  }

  $(cla).empty();
  let html=`<div class="blockBtns blockBtns2">
                <button type="button" class="btn btn-info btn-sm"
                      data-toggle="modal" onclick="fn_openModalNewSitio()" id="botondardealta">
                  <img width="15px" src="img/mas.png"id="imggra" style="">
                  &nbsp&nbspDar de alta sitio
                </button>
              </div>`;

  $(cla).append(html);            
}



var tabVales;
var vecVales=[];

function fn_tabVales(){

 tabVales = $("#tabVales").DataTable({
    "order": vecVales,
    "autoWidth": true,
    "processing":true,
    deferRender: true,
    orderCellsTop: true,
    "lengthChange": true,
    "paging":false,
    "info": false,
    "scrollY":"400px",
    "scrollCollapse": false,
    language: {
     url: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Spanish.json"
    },
    columns: [
      { data: null,render: function ( data, type, row, meta ) {
        return '<span class="textTb1">'+(meta.row+1)+'</span>';
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return '<span class="textTb1">'+data.id_doc+'</span>';//clave
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return '<span class="textTb1">'+((data.tipo=='S')?'Salida':'Entrada')+'</span>';
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return '<span class="textTb1">'+data.sitio+'</span>';//sitio
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return '<span class="textTb1">'+data.fecha+'</span>';//fecha
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return '<span class="textTb1">'+data.num+'</span>';//partidas
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return   `<span class="textTb1">
        <center><button type="button" class="btn btn-light" data-toggle="modal" 
        data-target="#modaleditarsitio"> 
        <span class="glyphicon glyphicon-trash">
        <img width="20px" src="img/ojo.png" id="imggra" style="  float: center;">
        </span> 
        </button></center>
        </span>`
      } 
      },
      { data: null,render: function ( data, type, row, meta ) {
        return  `<center>
        <button type="button" class="btn btn-info" data-toggle="modal" 
        data-target="#modaleditarsitio" onclick="fn_impVale(this)"  id_vale="`+data.id_doc+`"> 
        <span class="glyphicon glyphicon-trash">
        <img width="20px" src="img/imprimir2.png" id="imggra" style="  float: center;">
        </span> 
        </button></center>`
      } 
      },
    ],
    createdRow: function (row, data, index) {
                 $('td', row).eq(0).addClass('centerTD');
                 $('td', row).eq(1).addClass('centerTD');
                 $('td', row).eq(2).addClass('centerTD');
                 $('td', row).eq(3).addClass('centerTD');
                 $('td', row).eq(4).addClass('centerTD');
                 $('td', row).eq(5).addClass('centerTD');
                 $('td', row).eq(6).addClass('centerTD');
                 $('td', row).eq(7).addClass('centerTD');
    }
});

 $(".dataTables_filter input").css({ "background" :"" });
 $(".dataTables_filter input").css({ "padding-top" :"0px" });
 $('#container').css( 'display', 'block' );


};

var tabEncargado;
var vecEncargado=[];

function fn_tabEncargado(){
  let h=$(window).height();
  var height=(h*0.736842105)-48.63;

  tabEncargado = $("#tabEncargado").DataTable({
    order: vecEncargado,
    autoWidth: true,
    processing:true,
    deferRender: true,
    orderCellsTop: true,
    lengthChange: true,
    paging:false,
    info: false,
    scrollY:height,
    scrollCollapse: false,
    language: {
       url: "//cdn.datatables.net/plug-ins/1.10.9/i18n/Spanish.json"
    },
    dom:'<"toolsEnc">frtip',
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
          return '<span class="textTb1">'+data.cargo+'</span>';
        } 
      },
      { data: null,render: function ( data, type, row, meta ) {
          return '<span class="textTb1">'+data.email+'</span>';
        } 
      },
      { data: null,render: function ( data, type, row, meta ) {
          return '<span class="textTb1">'+data.tel+'</span>';
        } 
      },
      { data: null,render: function ( data, type, row, meta ) {
          return  `<span class="textTb1">
          <center>
            <button style="" type="button" class="btn btn-warning custom-btn"
              data-target="#modaleditaruser" onclick="fn_editPersonalPa(this)" id="`+data.id+ `" >
              <span class="glyphicon glyphicon-trash">
              <img width="20px" src="img/editar.png" id="imggra" style="float: center;">
            </span> 
            </button>
            <center>
          </span>`;
        } 
      },
      { data: null,render: function ( data, type, row, meta ) {
          return  `<span class="textTb1">
          <center>
          <button type="button" class="btn btn-warning custom1-btn" onclick="fn_eliminarPers(this)" id_per="`+data.id+ `">
            <span class="glyphicon glyphicon-trash">
              <img width="20px" src="img/eliminar.png" id="imggra" style="float: center;">
            </span> 
          </button></center>
          </span>`;
        } 
      },
    ], 
  });

   $(".dataTables_filter input").css({ "background" :"" });
   $(".dataTables_filter input").css({ "padding-top" :"0px" });

  fn_btnToolsEnc('.toolsEnc');

  $('input.col_filEncar').on( 'keyup click', function () {
      fn_filCol('tabEncargado',$(this).parents('th').attr('data-column'),'Encar');
  });

};

async function fn_btnToolsEnc(cla) {
  while(!$(cla).length){
        await sleep(2);
  }

  $(cla).empty();
  let html=`<div class="blockBtns blockBtns2">
                <button  type="button" class="btn btn-info  btn-sm"  
                  data-target="#modaldardealtauser" id="" onclick="fn_openModalNewEnc()">
                    <img width="15px" src="img/mas.png"id="imggra" >
                    &nbsp&nbspDar de alta encargados
                  </button>
              </div>`;

  $(cla).append(html);            
}


function fn_filCol(id,i,table) {
  $('#'+id).DataTable().column(i).search(
    $('#col'+i+'_'+table).val(),false,true
  ).draw();
}