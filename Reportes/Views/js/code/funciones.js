
/***********************DAN*************************************************************************************************************/

function fn_listSit(){
	let obj={"op":0};
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
             //console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              vecSitSit=obj.sitios;
              
              tabSitSit.clear().draw();
              tabSitSit.rows.add(vecSitSit).draw();
              tabSitSit.columns.adjust().draw();
              
            }
          }
          /**/
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    });
}

function fn_listEnc(){
	let obj={"op":1};
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
             //console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              vecValEnc=obj.personal;
              //console.log(vecValEnc);
              tabValEnc.clear().draw();
              tabValEnc.rows.add(vecValEnc).draw();
              tabValEnc.columns.adjust().draw();
            }
          }
          /**/
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    });
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fn_listCantArt(id){
  let obj={"op":2,"id_aloj":id};
  $.ajax({
        data:obj,
        url:"../Code/controlPHP.php",
        type:'post',
        beforeSend:function(){
          showLoad();
        },
        success:function(res){
          //console.log(res);
          /**/
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
              vecSitios=obj.repor;
              //console.log(vecSitios);
              tabSitios.clear().draw();
              tabSitios.rows.add(vecSitios).draw();
              tabSitios.columns.adjust().draw();
              /*
              if(vecSitios.length==1){
                 if(vecSitios[0].art==null){
                    vecSitios=[];
                 }
              }
              let tipos=[];
              for(let d=0;d<vecSitios.length;d++){
                 let row=vecSitios[d];
                 let ok=true;
                 for(let f=0;f<tipos.length;f++){
                    if(tipos[f]==row.catego){
                      ok=false;
                    }
                 }
                 if(ok){
                   tipos.push(row.catego);
                 }
              }
              tipos.sort();
              //console.log(tipos);
              var vec=vecSitios;
              var list1=[];
              for(let d=0;d<tipos.length;d++){
                let marcas=[];
                for(let m=0;m<vec.length;m++){
                    let row=vec[m];
                    if(row.catego==tipos[d]){
                        let ok=true;
                        for(let f=0;f<marcas.length;f++){
                            if(marcas[f]==row.marca){
                              ok=false;
                            }
                        }
                        if(ok){
                           marcas.push(row.marca);
                        }   
                    }
                }
                marcas.sort();
                //console.log(tipos[d],marcas);
                for(let y=0;y<marcas.length;y++){
                  for(let m=0;m<vec.length;m++){
                    let row=vec[m];
                    if(row.catego==tipos[d]){
                        if(row.marca==marcas[y]){
                          list1.push(row);
                        } 
                    }
                  }     
                }
              }
              //console.log(list1);
              
              tabSitios.clear().draw();
              tabSitios.rows.add(list1).draw();
              tabSitios.columns.adjust().draw();
              */
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

function fn_listSitVale(id){
  let obj={"op":3,"id_per":id};
  $.ajax({
        data:obj,
        url:"../Code/controlPHP.php",
        type:'post',
        beforeSend:function(){
          showLoad();
        },
        success:function(res){
          console.log(res);
          /**/
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
              vecVales=obj.repor;
              console.log(vecVales);
              if(vecVales.length==1){
                 if(vecVales[0].id_doc==null){
                    vecVales=[];
                 }
              }
              
              tabVales.clear().draw();
              tabVales.rows.add(vecVales).draw();
              tabVales.columns.adjust().draw();
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

function fn_listPreci(id){
  let obj={"op":4};
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
              vecPreci=obj.precios;
              
              tabPreci.clear().draw();
              tabPreci.rows.add(vecPreci).draw();
              tabPreci.columns.adjust().draw();
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

var objCosto={id_s:"",fin:null,ini:null};
function fn_listAlma(){
  let obj={"op":0};
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
             //console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          if(sig1){
            if(obj.error){
              console.log("Error",obj.msg);
            }else{
              let vec=[];  
              for(let d=0;d<obj.sitios.length;d++){
                let row=obj.sitios[d];
                vec.push({ label:row.nom, value:row.nom, id:row.id });
              }
              //console.log(obj.sitios);

              $("#inpAlmaCosto").autocomplete({
                      appendTo: ".toolsCosto"
                      ,source:vec
                      ,minLength:1
                      ,messages: {noResults: '',results: function() {}}
                      ,select: function (event, ui) {
                          objCosto.id_s=ui.item.id;

                     }
              });
            }
          }
          /**/
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    }); 
}


function fn_btnConsulCosto(){
  //console.log(objCosto);
  if(objCosto.id_s=="" || objCosto.ini==null || objCosto.fin==null){
    alert("Faltan datos en su consulta");
  }else{
    let obj={"op":5,"obj":JSON.stringify(objCosto)};
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
             var vec=JSON.parse(res);
             //console.log(obj);
          }catch(e) {
            sig1=false;
            console.log(e,res);
          }
          if(sig1){
            //console.log("reporte 4",vec);
            let vec1=[];  
            let vec2=[];
            for(let d=0;d<vec.length;d++){
              let info=vec[d];
              /*Borrar este if*/
              if(info.art.indexOf('A001731')>-1){
                console.log(info);
              }
              /**/
              if(info.f1==''){
                vec2.push(info);
              }else{
                vec1.push(info);
              }
            }

            for(let f=0;f<vec1.length;f++){
              let info=vec1[f];
              let ok=false;
              let num=0;
              for(let m=0;m<vec2.length;m++){
                let info2=vec2[m];
                 if(info.art==info2.art){
                  vec1[f].f2=vec2[m].f2;
                  num=m;
                  ok=true;  
                  break;
                 } 
              }
              if(ok){
                vec2.splice(num,1);
              }
            }
            vecCosto=vec1;
            //console.log(vecCosto);
            tabCosto.clear().draw();
            tabCosto.rows.add(vecCosto).draw();
            tabCosto.columns.adjust().draw();

          }
          /**/
        },  
        error: function (request, status, error) {
              console.log(request.responseText);
        },
    }); 
  }

}


function fn_impVale(id){
  console.log("fn_impVale",$(id).attr("id_vale"));
  window.open("../Code/formatos/impVale.php?idVale="+$(id).attr("id_vale"));
}


function fn_excelReportSit(id){
  console.log(id);
  window.open("../Code/formatos/excelReport.php?id="+id);
}

function fn_printReportSit(id){
  console.log(id);
  window.open("../Code/formatos/impReport.php?id="+id);
}



/***********************\DAN*************************************************************************************************************/



