window.onload = function() {
	fn_tamInicio();
};


function fn_tamInicio(){
	let h = $(window).height();	
	$(".omega_body").height((h-70));

	let m1=0.251336898;
	let b1=253.2085561;
	let m2=0.374331551;
	let b2=-161.6042781;
	$(".sec1").height(((h*m2)+b2));
	$(".sec2").height(((h*m1)+b1));
	$(".sec3").height(((h*m2)+b2));
	

	$(".textVer").css("margin-top",(((h*m2)+b2-26))+"px");

	$(".btnCircle").height($(".col-sm-3").width());


	let m3=0.067567568;
	let b3=-17.27027027;
	$(".textTitBtn").css("font-size",((h*m3)+b3)+"px");

	console.log(h);
	/**/
	let m4=0.371621622;
	let b4=-118.9864865;
	$(".imgbtn").css("width",((h*m4)+b4)+"px");
	/**/
}


function fn_openModalIngresar(op){
	$('#modalIngresar').modal('show');
	$("#form_set").attr("action",(
		(op==0) 
			? "../../Sitios/index.php"
			: (op==1) 
				? "../../Invent/index.php"
				: (op==2) 
					? "../../Reportes/index.php"
					: "../../Config/index.php"
	));
}


