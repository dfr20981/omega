var vec_categos=[];
var vec_arts=[];
var time1;


function reload_fn(){
	time1=setInterval(function() {
		reload_arts();
		reload_categos();	 
	},4000);
}


function reload_arts(){
	//console.log("reload");
	let obj={"op":20};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){
          },
          success:function(res){
            //console.log(res);
            let sig1=true;
            try{
               var obj=JSON.parse(res);
            //   console.log(obj);
            }catch(e) {
              sig1=false;
              console.log(e,res);
            }
            if(sig1){
              if(obj.error){
                console.log("Error",obj.msg);
              }else{
          		vec_arts=obj.arts;
          		//console.log(vec_arts);
              }
            }
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
          },
      });
}


function reload_categos(){
	let obj={"op":21};
    $.ajax({
          data:obj,
          url:"../Code/controlPHP.php",
          type:'post',
          beforeSend:function(){
          },
          success:function(res){
            //console.log(res);
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
          		vec_categos=obj.catego;
          		//console.log(vec_categos);
              }
            }
          },  
          error: function (request, status, error) {
            console.log(request.responseText);
          },
      });	
}


