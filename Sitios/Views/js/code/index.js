var tabIndex=0;//ESTA VARIABLE ES PARA IDENTIFICAR EN QUE TAB ESTOY
window.onload = function() {//ESTA FUNCION ES UN EVENTO SE ACTIVA CUANDO TERMINE DE CARGAR LA PAGINA
  fn_tabSitios();
  fn_setIndexTab(tabIndex);
  startTime();
  fn_tabVales();
  fn_tabEncargado();
 

  fn_tamInicio();
}  


function fn_tamInicio(){
  let h = $(window).height(); 
  console.log(h);
  let m1=0.996168582;
  let b1=-212.2988506;
  $("#menuPrin").css("height",(((h*m1)+b1))+"px");

}

function fn_setIndexTab(op){//ESTA FUNCION REALIZA EL CAMBIO DE OPCIÓN
  tabIndex=op;
  if(tabIndex==0){//Sitios
    fn_actTabSitios();
    fn_ajustaTabSleep();
  }else if(tabIndex==1){//Sitios
    fn_valeTab();    
  }else if(tabIndex==2){//Sitios
    fn_encargadoTab();    
  }else{
    console.log("No se reconoce esa opción");
  }
}

function fn_valeTab(){
  fn_actTabVales();
  fn_ajustaTabSleep1();
}

function fn_encargadoTab(){
  fn_actTabEncargado();
  fn_ajustaTabSleep2();
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
