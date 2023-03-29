
var saldo = [];
var interes = [];
var acumulado = [];
var inicial;
var totalAhorrado;
var ganancia;
var fechas = [];
const dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sept','Oct','Nov','Dic'];

 function actualiza(){
   var opcion = document.getElementById("opcion").value;
   var etiqueta = document.getElementById("etiqueta");
   var etiqueta2 = document.getElementById("etiqueta2");

   etiqueta.removeChild(etiqueta.firstChild);
   etiqueta2.removeChild(etiqueta2.firstChild);
   if(opcion == 0){
      etiqueta.innerHTML = '<label>Dias:</label>';
      etiqueta2.innerHTML = '<label>Monto diario:</label>';
   }else if(opcion == 1){
      etiqueta.innerHTML = '<label>Semanas:</label>';
      etiqueta2.innerHTML = '<label>Monto semanal:</label>';
   }else if(opcion == 2){
      etiqueta.innerHTML = '<label>Quincenas:</label>';
      etiqueta2.innerHTML = '<label>Monto quincenal:</label>';
   }else if(opcion == 3){
      etiqueta.innerHTML = '<label>Meses:</label>';
      etiqueta2.innerHTML = '<label>Monto mensual:</label>';
   }else if(opcion == 4){
      etiqueta.innerHTML = '<label>Trimestres:</label>';
      etiqueta2.innerHTML = '<label>Monto trimestral:</label>';
   }else if(opcion == 5){
      etiqueta.innerHTML = '<label>Años:</label>';
      etiqueta2.innerHTML = '<label>Monto anual:</label>';
   }
 }

 function valida(semana,sald,ini){
   var validar = false;
   if(semana < 1 || semana == 'e'){
      alert('La semana debe ser un numero positivo');
   }else if(sald < 1 || sald == 'e'){
      alert('El saldo debe ser un numero positivo');
   } else if(inicial < 0 || inicial == 'e'){
      alert('El monto inicial debe ser un numero positivo o igual a 0');
   }else{
      validar = true;
   }

   return validar;
 }

 function calcula()
 {
   var texto = '';
   const tabla = '<table><th>Fecha</th><th>Monto</th><th>Saldo</th><th>Interes</th><th>Total</th>';
   var result = '<table><th>Tasa</th><th>Total Invertido</th><th>Ganancia</th>';
   totalAhorrado = 0;
   ganancia = 0;
   limpiaArreglos();
    const semanas = document.getElementById("Semanas").value;
    saldo[0] = document.getElementById("IInicial").value;
    inicial = document.getElementById("MSemanal").value;
    const opcion = document.getElementById("opcion").value;
    fechas[0] = new Date();
    let tasa = calculaTasa(opcion);
    var contador = 0;

    if(valida(semanas,saldo[0],inicial))
{  
   limpiar();
   for(var i = 1; i<parseFloat(semanas)+1;i++)
    {
      texto += '<tr>';
      fechas[i] = calculaFecha(fechas[i-1], opcion);
      texto += '<td>'+muestraFecha(fechas[i])+'</td>';

      if(i>1){
         texto += '<td>'+parseFloat(inicial).toFixed(2)+'</td>';
         saldo[i] = parseFloat(acumulado[i-1]) + parseFloat(inicial);
         texto += '<td>'+saldo[i].toFixed(2)+'</td>';
      }else{
         texto += '<td>'+parseFloat(saldo[i-1]).toFixed(2)+'</td>';
         saldo[i] = parseFloat(saldo[i-1]) + parseFloat(inicial);
         texto += '<td>'+saldo[i].toFixed(2)+'</td>';
      }
      interes[i] = (parseFloat(saldo[i]) * parseFloat(tasa));
      acumulado[i] = parseFloat(interes[i]) + parseFloat(saldo[i]);
      texto += '<td>'+interes[i].toFixed(3)+'</td>';
      texto += '<td>'+acumulado[i].toFixed(2)+'</td>';

      texto += '</tr>';
   }

   totalAhorrado = (parseFloat(semanas) * parseFloat(inicial)) + parseFloat(saldo[0]);
   ganancia = parseFloat(acumulado[acumulado.length-1])-parseFloat(totalAhorrado);
   result += '<tr><td>10%</td><td>'+totalAhorrado.toFixed(2)+'</td><td>'+ganancia.toFixed(2)+'</td></tr></tr>'
   imprimir(tabla,result,texto);
}  
}

function imprimir(tabla, result,texto)
{
   const div = document.getElementById("CONT");
   const div2 = document.getElementById("result");
   div2.innerHTML = result + '</table><br>';
   div.innerHTML = tabla + texto + '</table>';
}

function calculaFecha(fecha, opcion){
   if(opcion == 0){
      return new Date(fecha.setDate(fecha.getDate()+1));
   }else if(opcion == 1){
      return new Date(fecha.setDate(fecha.getDate()+7));
   }else if(opcion == 2){
      return new Date(fecha.setDate(fecha.getDate()+15));
   }else if(opcion == 3){
      return new Date(fecha.setDate(fecha.getDate()+30));
   }else if(opcion == 4){
      return new Date(fecha.setDate(fecha.getDate()+90));
   }else if(opcion == 5){
      return new Date(fecha.setDate(fecha.getDate()+360));
   }
   
}

function muestraFecha(fecha){
   return dias[fecha.getDay()]+', '+meses[fecha.getMonth()]+' '+fecha.getDate()+', '+fecha.getFullYear();
}

function calculaTasa(opcion){
   let tasaF;

   if(opcion == 0){
      tasaF = 0.10 / 360;
   }else if(opcion == 1){
      tasaF = 0.10 / (360 * 7);
   }else if(opcion == 2){
      tasaF = 0.10 / (360 * 15);
   }else if(opcion == 3){
      tasaF = 0.10 / (360 * 30);
   }else if(opcion == 4){
      tasaF = 0.10 / (360 * 90);
   }else if(opcion == 5){
      tasaF = 0.10;
   }

   return tasaF;
}

function limpiar(){
   var etiqueta = document.getElementById("result");
   var etiqueta2 = document.getElementById("CONT");
   document.getElementById("Semanas").value = '';
   document.getElementById("IInicial").value = '';
   document.getElementById("MSemanal").value = '';
   document.getElementById("opcion").value = 1;

   if(etiqueta.hasChildNodes() && etiqueta2.hasChildNodes()){
      etiqueta.removeChild(etiqueta.firstChild);
      etiqueta2.removeChild(etiqueta2.firstChild);
   }
}

function limpiaArreglos(){
   while(fechas.length != 0){
      fechas.pop();
   }
   while(saldo.length != 0){
      saldo.pop();
   }
   while(interes.length != 0){
      interes.pop();
   }
   while(acumulado.length != 0){
      acumulado.pop();
   }
}
   