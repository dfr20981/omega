/***********************USUARIOS************************************************************************************************************/
  function fn_consultPersBD(){
    let obj={"op":0};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){/*showLoad();*/},
          success:function(res){
            //console.log(res);
            let sig1=true;
            vecPers=[];
            try{
               var vec=JSON.parse(res);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }

            if(sig1){
              fn_llenarUsua(vec);
            }else{
            	tb_Pers.clear().draw();
              tb_Pers.columns.adjust().draw();
            }
            
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
      });	
  }
  
  function fn_newPer(){
    let nom=$("#nom_mdlPer").val();
    let est=$("#est_mdlPer").val();
    let email=$("#email_mdlPer").val();
    let usu=$("#usu_mdlPer").val();
    let pass=$("#pass_mdlPer").val();
    if(nom!='' && email!='' && usu!=''){
      let per={"id":999,"nom":nom,"est":est,"email":email,"usu":usu,"pass":pass,"tip":"C"};
      let obj={"op":5,"obj":JSON.stringify(per)};
      $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){showLoad();},
          success:function(res){
            console.log(res);
            let ok=true;
            try{
              var obj=JSON.parse(res);
            }catch(e) {
              ok=false;
              console.log(e,res);
            } 

            if(ok){
              if(obj.error){
                console.log(obj.msg);
              }else{
                fn_llenarUsua(obj.list);
              }
            }else{
              tb_Pers.clear().draw();
              tb_Pers.columns.adjust().draw();
            }
            $("#mdl_personal").modal("hide");
            closeLoad();
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
            $("#mdl_personal").modal("hide");
          },
      }); 
    }else{
      console.log("No a llenado la infoamción");
    }
    
  }

  var id_personal=0;
  function fn_mdlPerso(op){
    let per={"id":((op==0)?999:id_personal),"nom":"","est":"","email":"","usu":"","pass":"","tip":"R"};
    let obj={"op":5,"obj":JSON.stringify(per)};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){showLoad();},
          success:function(res){
            console.log(res);
            let ok=true;
            try{
              var obj=JSON.parse(res);
            }catch(e) {
              ok=false;
              console.log(e,res);
            } 

             console.log(obj);
            if(ok){
              if(obj.error){
                console.log(obj.msg);
              }else{
                if(op==0){//NUEVO
                  newPersonal_mdl(obj.tips);
                }else{//EDITAR
                  editPersonal_mdl(obj.list,obj.tips);
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

  function fn_editPer(id){
    let nom=$("#nom_mdlPer").val();
    let est=$("#est_mdlPer").val();
    let email=$("#email_mdlPer").val();
    let usu=$("#usu_mdlPer").val();
    let pass=$("#pass_mdlPer").val();
    if(nom!='' && email!='' && usu!=''){
      let per={"id":id,"nom":nom,"est":est,"email":email,"usu":usu,"pass":pass,"tip":"U"};
      let obj={"op":5,"obj":JSON.stringify(per)};
      $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){showLoad();},
          success:function(res){
            console.log(res);
            let ok=true;
            try{
              var obj=JSON.parse(res);
            }catch(e) {
              ok=false;
              console.log(e,res);
            } 

            if(ok){
              if(obj.error){
                console.log(obj.msg);
              }else{
                fn_llenarUsua(obj.list);
              }
            }else{
              tb_Pers.clear().draw();
              tb_Pers.columns.adjust().draw();
            }
            $("#mdl_personal").modal("hide");
            closeLoad();
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
            $("#mdl_personal").modal("hide");
          },
      }); 
    }else{
      console.log("No a llenado la infoamción");
    }
  }

  function  fn_removePers(id){
    let per={"id":id_personal,"nom":"","est":"","email":"","usu":"","pass":"","tip":"D"};
    let obj={"op":5,"obj":JSON.stringify(per)};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){showLoad();},
          success:function(res){
            //console.log(res);
            let ok=true;
            try{
              var obj=JSON.parse(res);
            }catch(e) {
              ok=false;
              console.log(e,res);
            } 
            
            if(ok){
              if(obj.error){
                console.log(obj.msg);
              }else{
                fn_llenarUsua(obj.list);
              }
            }else{
              tb_Pers.clear().draw();
              tb_Pers.columns.adjust().draw();
            }
            closeLoad();
            $("#mdl_xPers").modal('hide');
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
            closeLoad();
          },
      }); 

  }

/***********************\USUARIOS************************************************************************************************************/
/***********************KITS************************************************************************************************************/
  var listKits=[];
  function fn_consultKits(){
    let obj={"op":1};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){/*showLoad();*/},
          success:function(res){
            //console.log(res);
            let sig1=true;
            vecPers=[];
            try{
               var obj=JSON.parse(res);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }

            if(sig1){
              console.log(obj);
              listKits=obj.arts;
              fn_listKits(obj.kits);
            }
            
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
      }); 
  }
  function fn_editSaveKit(tip){
    if(artsKit.length>0 || tip==2){
        let obj={"op":3,"tip":tip,"vec":JSON.stringify(artsKit)
                ,"id_kit":((tip==2)?$("#title_mdlKitsX").attr("id_kit"):$("#title_mdlKits").attr("id_kit"))};
        //console.log(obj);
        /**/
        $.ajax({
            data:obj,
            url:"../Code/controlPHP.php",
            type:'post',
            beforeSend:function(){showLoad();},
            success:function(res){
              //console.log(res);
              let ok=true;
              vecPers=[];
              try{
                 var obj=JSON.parse(res);
              }catch(e) {
                ok=false;
                console.log(e,res);
              }
              if(ok){
                console.log(obj);
                listKits=obj.arts;
                fn_listKits(obj.kits);
              }

              $("#mdl_kits").modal('hide');
              $("#mdl_kitsX").modal('hide');
            },  
            error: function (request, status, error) {
                  console.log(request.responseText);
            },
        });
        /**/
    }else{
        alert("No ingreso Artículos");
    }  
  }

  function fn_repExcelKit(){
    window.open("../code/excel/docExcel.php"); 
  }

  function fn_repImpKit(){
    window.open("../code/excel/docImp.php");
  }

/***********************\KITS************************************************************************************************************/
/***********************ARTICULOS************************************************************************************************************/
  var listArts=[];
  var artsKit=[];
  function fn_consultArts(){
    let obj={"op":2};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){/*showLoad();*/},
          success:function(res){
            //console.log(res);
            let sig1=true;
            vecPers=[];
            try{
               var obj=JSON.parse(res);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            if(sig1){
              //console.log(obj);
              listArts=obj.arts;
              fn_autoRowArtKits();
            }
            
          },  
          error: function (request, status, error) {
                console.log(request.responseText);
          },
      }); 
  }
/***********************\ARTICULOS************************************************************************************************************/



