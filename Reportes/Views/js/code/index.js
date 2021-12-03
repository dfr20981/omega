var tabVales,tb_genVale,tabSitios,tabSitSit,tabValEnc,tabPreci,tabCosto;
var vecVales=[],vecgenVale=[],vecValEnc=[];
var vecSitios=[],vecSitSit=[],vecPreci=[],vecCosto=[];
var tabIndex=0;//ESTA VARIABLE ES PARA IDENTIFICAR EN QUE TAB ESTOY
window.onload = function() {//Se activa al momento de que cargue la pagina.
	fn_tabSitios();
	fn_tabVales();  
	fn_tabPreci();
	fn_tabCosto();
  	fn_setIndexTab(0);
  	startTime();
  	
  	let h=$(window).height();
    let height=(h*1.025641026)-220.77;
    $("#menuPrin").height(height);

    
}

async function fn_setIndexTab(op){
  tabIndex=op;
  if(tabIndex==0){//Sitios
  	await sleep(200);
  	fn_listSit();  
   	tabSitios.columns.adjust().draw();
  }else if(tabIndex==1){//Vales
  	await sleep(200);
  	fn_listEnc();  
    tabVales.columns.adjust().draw();
  }else if(tabIndex==2){//Precios
  	await sleep(200);
  	fn_listPreci();  
    tabPreci.columns.adjust().draw();
  }else if(tabIndex==3){//Precios
  	await sleep(200);
  	fn_listAlma();  
    tabCosto.columns.adjust().draw();
  }else{
    console.log("No se reconoce esa opción");
  }
}

function fn_tabSitios(){
	let h=$(window).height();
	var height=(h*0.974358974)-163.23;
    //var height=560;
	tabSitSit=	$("#tabSitSit").DataTable({
  			order: vecSitSit,
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
 			columns: [
				 { data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1" style="cursor:pointer;">'+(meta.row+1)+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1" style="cursor:pointer;">'+data.nom+'</span>';//clave
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1" style="cursor:pointer;">'+((data.fecha_fin=="")?"Abierto":"Cerrado")+'</span>';
					} 
				},
			],
			createdRow: function (row, data, index) {
			    $('td', row).eq(0).addClass('centerTD');
			    $('td', row).eq(1).addClass('centerTD');
			    $('td', row).eq(2).addClass('centerTD');
			}
	});
	$('#tabSitSit tbody').on( 'click', 'tr', function () {
		let data=tabSitSit.row( this ).data();
		//console.log(data);
		$(".blockBtns2 span").text("Sitio:"+data.nom);
		$("#btn_excelSit").attr("onclick","fn_excelReportSit('"+data.id+"')"); 
		$("#btn_printSit").attr("onclick","fn_printReportSit('"+data.id+"')"); 
		fn_listCantArt(data.id);
	} );
	
	$('input.col_filSitSit').on( 'keyup click', function () {
	    fn_filCol('tabSitSit',$(this).parents('th').attr('data-column'),'SitSit');
	});
	
	tabSitios = $("#tabSitios").DataTable({
  			order: vecSitios,
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
 			columns: [
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+(meta.row+1)+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">('+data.id_art+')'+data.descr+'</span>';//clave
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.tipo+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.marca+'</span>';//sitio
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  let cant=data.cant01;
					  return '<span class="textTb1">'+cant.toFixed(2)+'pz</span>';//fecha
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  let cant=data.cant01;
					  return '<span class="textTb1">'+(cant*data.capacidad).toFixed(2)+''+data.uni_cap+'</span>';//partidas
					} 
				},
			],
			dom: '<"toolsSit">frtip',
			/*buttons: [
		        'excel', 'pdf'
		    ],*/
			createdRow: function (row, data, index) {
			    $('td', row).eq(0).addClass('centerTD');
			    $('td', row).eq(1).addClass('leftTD');
			    $('td', row).eq(2).addClass('centerTD');
			    $('td', row).eq(3).addClass('centerTD');
			    $('td', row).eq(4).addClass('centerTD');
			    $('td', row).eq(5).addClass('leftTD');
			    $('td', row).eq(6).addClass('rightTD');
			}
	});

	$('input.col_filSitios').on( 'keyup click', function () {
	    fn_filCol('tabSitios',$(this).parents('th').attr('data-column'),'Sitios');
	});
	fn_btnToolsSit('.toolsSit');

}

async function fn_btnToolsSit(cla) {
  while(!$(cla).length){
        await sleep(2);
  }

  $(cla).empty();
  let html=`
  		<div style="float: left;">
  			<table>
  				<tr>
  					<td><button id="btn_excelSit" type="button" class="btn btn-success" title="Excel"><i class="fa fa-file-excel-o"></i></button></td>
  					<td><button id="btn_printSit" type="button" class="btn btn-light" title="Imprimir"><i class="fa fa-print"></i></button></td>
  				</tr>
  			</table>
  		</div>
  		<div class="blockBtns blockBtns2">
  			<span></span>
        </div>`;

  $(cla).append(html);            
}


function fn_tabVales(){
	let h=$(window).height();
	var height=(h*0.974358974)-163.23;
	tabValEnc= $("#tabValEnc").DataTable({
  			order: vecValEnc,
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
 			columns: [
				 { data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+(meta.row+1)+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.nom+'</span>';//clave
					} 
				},
			],
			createdRow: function (row, data, index) {
			    $('td', row).eq(0).addClass('centerTD');
			    $('td', row).eq(1).addClass('centerTD');
			}
	});

	$('#tabValEnc tbody').on( 'click', 'tr', function () {
		let data=tabValEnc.row( this ).data();
		console.log(data);
		fn_listSitVale(data.id);
	} );

	$('input.col_filValEnc').on( 'keyup click', function () {
	    fn_filCol('tabValEnc',$(this).parents('th').attr('data-column'),'ValEnc');
	});


	tabVales = $("#tabVales").DataTable({
  			order: vecVales,
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
 			columns: [
				 { data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+(meta.row+1)+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">('+data.id_aloj+') '+data.nom+'</span>';//clave
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.id_doc+'</span>';//fecha
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.fecha+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.par+'</span>';//partidas
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+((data.tipo=='E')?'Entrada':'Salida')+'</span>';//partidas
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return ' <img src="./img/impresora.png" class="iconTab" onclick="fn_impVale(this)"  id_vale="'+data.id_doc+'"  >';
					} 
				},	
			],
			dom: 'Bfrtip',
			buttons: [
		        'excel', 'pdf'
		    ],	
			createdRow: function (row, data, index) {
			    $('td', row).eq(0).addClass('centerTD');
			    $('td', row).eq(1).addClass('centerTD');
			    $('td', row).eq(2).addClass('centerTD');
			    $('td', row).eq(3).addClass('centerTD');
			    $('td', row).eq(4).addClass('centerTD');
			    $('td', row).eq(5).addClass('centerTD');
			}
	});

	$('input.col_filVales').on( 'keyup click', function () {
	    fn_filCol('tabVales',$(this).parents('th').attr('data-column'),'Vales');
	});
}

function fn_tabPreci(){
	let h=$(window).height();
	var height=(h*0.974358974)-163.23;
	tabPreci = $("#tabPreci").DataTable({
  			order: vecPreci,
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
 			columns: [
				 { data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+(meta.row+1)+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">('+data.id+') '+data.nom+'</span>';//clave
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.categoria+'</span>';//fecha
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.marca+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.cap+''+data.uni+'</span>';//partidas
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+fn_notaPrecio(data.precio.toFixed(2))+'</span>';//partidas
					} 
				},		
			],
			dom: 'Bfrtip',
			buttons: [
		        'excel', 'pdf'
		    ],	
			createdRow: function (row, data, index) {
			    $('td', row).eq(0).addClass('centerTD');
			    $('td', row).eq(1).addClass('leftTD');
			    $('td', row).eq(2).addClass('leftTD');
			    $('td', row).eq(3).addClass('leftTD');
			    $('td', row).eq(4).addClass('leftTD');
			    $('td', row).eq(5).addClass('rightTD');
			}
	});

	$('input.col_filPreci').on( 'keyup click', function () {
	    fn_filCol('tabPreci',$(this).parents('th').attr('data-column'),'Preci');
	});
	
}

function fn_tabCosto(){
	let h=$(window).height();
	var height=(h*0.974358974)-163.23;
	tabCosto = $("#tabCosto").DataTable({
  			order: vecCosto,
  			autoWidth: true,
  			processing:true,
  			deferRender: true,
  			orderCellsTop: true,
  			lengthChange: true,
  			paging:false,
  			info: false,
  			scrollY:height-20,
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
					  return '<span class="textTb1">'+data.catego+'</span>';//clave
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.art+'</span>';//fecha
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.f1+'</span>';
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.f2+'</span>';//partidas
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  return '<span class="textTb1">'+data.cant+'</span>';//partidas
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					  let uniPreci=fn_calRentaPreci(data);	
					  return '<span class="textTb1">'+fn_notaPrecio(uniPreci.toFixed(2))+'</span>';//partidas
					} 
				},
				{ data: null,render: function ( data, type, row, meta ) {
					let uniPreci=fn_calRentaPreci(data);	
					return '<span class="textTb1">'+fn_notaPrecio((uniPreci*data.cant).toFixed(2))+'</span>';//partidas
					} 
				},		
			],
			dom: '<"toolsCosto">Bfrtip',
			buttons: [
		        'excel', 'pdf'
		    ],
		    footerCallback: function ( row, data, start, end, display ) {
		    		var api = this.api(), data;
		 
		            var intVal = function ( i ) {
		                return typeof i === 'string' ?
		                    i.replace(/[\$,]/g, '')*1 :
		                    typeof i === 'number' ?
		                        i : 0;
		            };
		            //console.log(display);//ESTE REGRESA UN VECTOR DE LOS ELEMENTO QUE SE VIZUALIZAN EN LA TABLA CUANDO HAY UN CAMBIO 
		            //console.log("data",data);
		            total = api
		                .column( 7 )
		                .data()
		                .reduce( function (a, b) {
		                	let res=0;
		                	for(let f=0;f<display.length;f++){
		                		let info=data[display[f]];
		                		if(info.art==b.art){
		                			let uniPreci=fn_calRentaPreci(b);
		                			res=intVal((uniPreci*b.cant));
		                			break;
		                		}
		                	}
		                	return intVal(a) +res;
		                }, 0 );
		 			//console.log(total);
		            // Update footer
		            $( api.column( 7 ).footer() ).html(
		               fn_notaPrecio(total.toFixed(2))
		            );
		        },	
			createdRow: function (row, data, index) {
			    $('td', row).eq(0).addClass('centerTD');
			    $('td', row).eq(1).addClass('leftTD');
			    $('td', row).eq(2).addClass('leftTD');
			    $('td', row).eq(3).addClass('centerTD');
			    $('td', row).eq(4).addClass('centerTD');
			    $('td', row).eq(5).addClass('centerTD');
			    $('td', row).eq(6).addClass('rightTD');
			    $('td', row).eq(7).addClass('rightTD');
			}
	});

	$('input.col_filCosto').on( 'keyup click', function () {
	    fn_filCol('tabCosto',$(this).parents('th').attr('data-column'),'Costo');
	});
	
	fn_btnToolsCosto('.toolsCosto');
}

function fn_calRentaPreci(obj){
	let uniPreci=0;
	if(obj.gasto=="RE"){
		let fini=new Date(obj.f1+' 01:00:00').getTime();
		let ffin=new Date(obj.f2+' 01:00:00').getTime();
		let dias=(ffin-fini)/(1000*60*60*24);
		uniPreci=((dias+1)*obj.renta)/obj.tim_rent;
	}else{
		uniPreci=obj.preci;	
	} 	
	return uniPreci; 
}


async function fn_btnToolsCosto(cla) {
  while(!$(cla).length){
        await sleep(2);
  }

  $(cla).empty();
  let html=`
  		<div class="mr-2">
  			<table>
  				<tr>
  					<td>
  						<div class="input-group input-group-sm">
						  <div class="input-group-prepend">
						    <span class="input-group-text" id="">Almacen:</span>
						  </div>
						  <input id="inpAlmaCosto" type="text" class="form-control">
						</div>
  					</td>
  					<td>
  						<div class="input-group input-group-sm">
						  <div class="input-group-prepend">
						    <span class="input-group-text" id="">Inicial:</span>
						  </div>
						  <input id="inpDateCosto1" class="form-control form-control-sm" type="date">
						</div>
  					</td>
  					<td>
  						<div class="input-group input-group-sm">
						  <div class="input-group-prepend">
						    <span class="input-group-text" id="">Final:</span>
						  </div>
						  <input id="inpDateCosto2" class="form-control form-control-sm" type="date">
						</div>
  					</td>
  					<td><button type="button" class="btn btn-success btn-sm" onclick="fn_btnConsulCosto()">Consultar</button></td>
  				</tr>
  			</table>
  		</div>`;

  $(cla).css("float","left");
        
  $(cla).append(html);       

  $("#inpDateCosto1").change(function (){
  	console.log($(this).val());
  	objCosto.ini=$(this).val();
  });

  $("#inpDateCosto2").change(function (){
  	console.log($(this).val());
  	objCosto.fin=$(this).val();
  });
}

function fn_notaPrecio(numS){
	let entero=numS.substring(0,numS.indexOf('.'));
	let decimal=numS.substring(numS.indexOf('.')+1,numS.length);
	let res='';
	let cont=0;
	for(let d=(entero.length-1);d>-1;d--){
		if(cont==3){
			res=entero[d]+','+res;
			cont=1;
		}else{
			res=entero[d]+res;
			cont++;
		}
	}
	return '$'+res+'.'+decimal;
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
