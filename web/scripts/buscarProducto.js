$(document).ready(function() {
	function limpiarCampos(){
		$("#jsId").val("");
		$("#jsNombre").val("");
		$("#jsPrecio").val("");
		$("#jsDescripcion").val("");
		$("#jsCodigo").val("");
	}
	//91586-20 DENUNCIA CIUDADANA
	$("#dynamicTable").on("click",".eliminarBoton",function(){
		$("#jsId").val($(this).closest('tr').find('td:first').text());
		$("#jsNombre").val($(this).closest('tr').find('td').eq(1).text());
		$("#jsPrecio").val($(this).closest('tr').find('td').eq(2).text());
		$("#jsDescripcion").val($(this).closest('tr').find('td').eq(3).text());
		$("#jsCodigo").val($(this).closest('tr').find('td').eq(4).text());
		if ($(this).attr('alt')=='editar'){
			opciones = { autoOpen: false, modal: true, show: { effect: "blind", duration: 1000 }, hide: { effect: "explode", duration: 1000 },
				width:700,height:500,minWidth:300,minHeight:300,maxWidth:450,maxHeight:450,buttons:{ "Editar registro": editar, "Cancel": cancel }
			}
			$("#titulo").html("<h3>Editar articulo existente</h3>");
		}
		$("#showData").dialog(opciones);
		$("#showData").dialog("open");
		$(".campos").css("border","1px solid black");
		$(".msgCampos").html("");
	});
	$("#agregarRecord").click(function(){
		var opciones;
		$("#titulo").html("");
		opciones = { autoOpen: false, modal: true, show: { effect: "blind", duration: 1000 }, hide: { effect: "explode", duration: 1000 },
			width:700,height:500,minWidth:300,minHeight:300,maxWidth:450,maxHeight:450,buttons:{ "Crear registro": crear, "Cancel": cancel }
		};
		limpiarCampos();
		$("#titulo").html("<h3>Dar de alta articulo</h3>");
		$("#showData").dialog(opciones);
		$("#showData").dialog("open");
		$(".campos").css("border","1px solid black");
		$(".msgCampos").html("");
	});
	var editar = function(){
		if (validarProducto()){
			var formInput=$("#myform").serialize();
			$.getJSON('ajax/editarProducto',formInput,function(data){
				alert(data.resultado);
			});//END getJSON
		}
	}
	var crear = function(){
		if (validarProducto()){
			var formInput=$("#myform").serialize();
			$.getJSON('ajax/guardar',formInput,function(data){
				if(data.resultado=='Ok'){
					alert('Registro guardado exitosamente');
					alert('Imagen a subir: '+$("#file").val());
					if($("#file").val()==''){
						nada++;
						$("#jsNombre").val("");
						$("#jsPrecio").val("");
						$("#jsDescripcion").val("");
						$("#jsCodigo").val("");
						$("#upload").val("");
					}else{//Si el usuario selecciono una imagen se modifica el action de la forma para que se vaya a subir la imagen en el ACTION
						$("#myform").attr("action","doUpload");
						$("#myform").attr("method","post");
						$("#myform").attr("enctype", "multipart/form-data");
						//submit the form
						$("#myform").submit();
					}
				}else{
					alert('Error: '+data.resultado);
				}
			});//END getJSON
		}
	}
	var cancel = function() {
		$("#showData").dialog("close");
	}
	var dialogOpts = { autoOpen: true, modal: true, show: { effect: "blind", duration: 1000},hide: {effect: "explode", duration: 1000} }
	var dialogOpts2 = {autoOpen: false, modal: true, show: { effect: "blind", duration: 5 }, hide: { effect: "explode", duration: 5 } }
	$("#gettingInfo").dialog(dialogOpts2);
	$("#myDialog").dialog(dialogOpts);
	$("#showData").dialog(dialogOpts2);
	$("#autocompletar").keyup(function(){
		//alert('Autocompletar');
		$("#gettingInfo").html("<p>Espere mientras se obtiene la informacion de los productos</p>");
		$("#gettingInfo").dialog("open");
		var formInput=$("#myform2").serialize();
		$.getJSON('ajax/buscarProducto', formInput, function(data){
			if(data.resultado=='Ok'){
				if(data.productoList.length>0){
					$("#dynamicTable").html("");
					var htmlTable = "<table class='hovertable'>";
					htmlTable +="<tr>";
					htmlTable +="<th colspan='8'>LISTA DE PRODUCTOS</th>";						
					htmlTable +="</tr>";
					htmlTable +="<tr>";
					htmlTable +="<th>Id</th>";
					htmlTable +="<th>Nombre</th>";
					htmlTable +="<th>Precio</th>";
					htmlTable +="<th>Descripcion</th>";
					htmlTable +="<th>Codigo</th>";
					htmlTable +="<th>Unidad</th>";
					htmlTable +="<th>Editar</th>";
					//htmlTable +="<td>Eliminar</td>";
					htmlTable +="</tr>";
					for(i=0; i<data.productoList.length; i++){
						htmlTable +="<tr>";
						htmlTable +="<td>"+data.productoList[i].idProducto+"</td>";
						htmlTable +="<td>"+data.productoList[i].nombre+"</td>";
						htmlTable +="<td>"+data.productoList[i].precio+"</td>";
						htmlTable +="<td>"+$.trim(data.productoList[i].descripcion)+"</td>";
						htmlTable +="<td>"+data.productoList[i].codigo+"</td>";
						htmlTable +="<td>"+data.productoList[i].unidadDeVenta+"</td>";
						htmlTable +="<td> <img src='images/editRecord.png' width='20' height='20' class='eliminarBoton' alt='editar' title='Editar: "+data.productoList[i].nombre+"' style='cursor: pointer;'/></td> ";
						//htmlTable +="<td> <img src='images/accesoDenegado2.png' width='20' height='20' class='eliminarBoton' alt='eliminar' title='Eliminar: "+data.productoList[i].nombre+"' style='cursor: pointer;'/></td> ";
						htmlTable +="</tr>";
					}
					htmlTable +="</table>";
					$("#dynamicTable").html(htmlTable);
					$("#gettingInfo").dialog("close");
					$("#gettingInfo").html("");
				}else{
					$("#gettingInfo").html("");
					$("#gettingInfo").append("<p>No se encontaron registros</p>");
					$("#gettingInfo").dialog("close");
				}
			}else{
				$("#gettingInfo").html("");
				$("#gettingInfo").append("<p>"+data.resultado+"</p>");
			}
		});//END getJSON
	
	});
					
			
		
	
	function productoFoco(event, ui){
		//var producto = ui.item.value;
		//$("#autoc1").val(producto.label);
		//event.preventDefault();
	}
	function productoSeleccionado(event, ui){
		// recupera la informacion del producto seleccionado
		//var producto = ui.item.value;
		//alert(ui.item);
		//$("#resultado").html(producto);
		//event.preventDefault();
	}
	$("#toggle").click(function() {
		($("#myDialog").dialog("isOpen") == false) ? $("#myDialog").dialog("open") : $("#myDialog").dialog("close") ;
	});
//FUNCIONES PARA HACER VALIDACIONES
/*
Funcion que permite unicamente letras,numeros y espacios
ASCII CODE:
48:0-57:9
65:A-90:Z
97 : a - 122 : z
32 : Space
209 : Ñ
241 : ñ
46 : .
*/
	function validarPrecio(cadena){
		var nada=0;
		for(i=0;i<cadena.length;i++){
			ascii = cadena.charCodeAt(i);
			if((ascii>=48 && ascii<=57)||(ascii==46)){
				if(ascii==46){
					nada++
					if(nada>1){
						return false;
					}
				}
			}else{
				return false;
			}
		}
		if(!isNaN(cadena)){
			//alert('cadena*2= '+parseFloat(cadena)*2);
			return true;
		}else{
			return false;
		}
	}
	function validarCodigo(cadena){
		var nada=0;
		for(i=0;i<cadena.length;i++){
			ascii = cadena.charCodeAt(i);
			if((ascii>=48 && ascii<=57)){
				nada++;
			}else{
				return false;
			}
		}
		return true;
	}
	function validarNombre(cadena){
		var nada=0;
		for(i=0;i<cadena.length;i++){
			ascii = cadena.charCodeAt(i);
			if((ascii>=48 && ascii<=57)||(ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122)||(ascii==32)||(ascii==209)||(ascii==241)||(ascii==46)){
				nada++
			}else{
				return false;
			}
		}
		return true;
	}
	function emptyField(cadena){
		if(cadena=='' || cadena==null){
			return false;
		}else{
			return true
		}
	}
	function validarProducto(){
//Validacion de NOMBRE msgNombre-jsNombre
		var RESULTADO = true;
		valNombre = $("#jsNombre").val();
		if(emptyField(valNombre)){
			isNombre = validarNombre(valNombre);
			if(isNombre==false){
				$("#msgNombre").html("");
				$("#msgNombre").html("<p>Por favor capture unicamente letras y numeros</p>");
				$("#jsNombre").css("border","1px solid red");
				RESULTADO = false;
			}else{
				$("#msgNombre").html("");
				$("#jsNombre").css("border","1px solid black");
			}
		}else{
			$("#msgNombre").html("");
			$("#msgNombre").html("<p>Por favor capture un nombre</p>");
			$("#jsNombre").css("border","1px solid red");
			RESULTADO = false;
		}
//Validacion de precio msgPrecio-jsPrecio
		valPrecio = $("#jsPrecio").val();
		if(emptyField(valPrecio)){
			isPrecio = validarPrecio(valPrecio);
			if(isPrecio==false){
				$("#msgPrecio").html("");
				$("#msgPrecio").html("<p>Por favor capture unicamente valores numericos</p>");
				$("#jsPrecio").css("border","1px solid red");
				RESULTADO = false;
			}else{
				$("#msgPrecio").html("");
				$("#jsPrecio").css("border","1px solid black");
			}
		}else{
			$("#msgPrecio").html("");
			$("#msgPrecio").html("<p>Por favor capture un precio</p>");
			$("#jsPrecio").css("border","1px solid red");
			RESULTADO = false;
		}
//Validacion descripcion: jsDescripcion-msgDescripcion
		valDescripcion = $("#jsDescripcion").val();
		if(emptyField(valDescripcion)){
			isDescripcion = validarNombre(valDescripcion);
			if(isDescripcion==false){
				$("#msgDescripcion").html("");
				$("#msgDescripcion").html("<p>Por favor capture unicamente letras y numeros</p>");
				$("#jsDescripcion").css("border","1px solid red");
				RESULTADO = false;
			}else{
				$("#msgDescripcion").html("");
				$("#jsDescripcion").css("border","1px solid black");
			}
		}else{
			$("#msgDescripcion").html("");
			$("#msgDescripcion").html("<p>Por favor capture un nombre</p>");
			$("#jsDescripcion").css("border","1px solid red");
			RESULTADO = false;
		}
//Validacion codigo: jsCodigo-msgCodigo
		valCodigo = $("#jsCodigo").val();
		if(emptyField(valCodigo)){
			isCodigo = validarCodigo(valCodigo);
			if(isCodigo==false){
				$("#msgCodigo").html("");
				$("#msgCodigo").html("<p>Por favor capture unicamente numeros</p>");
				$("#jsCodigo").css("border","1px solid red");
				RESULTADO = false;
			}else{
				$("#msgCodigo").html("");
				$("#jsCodigo").css("border","1px solid black");
			}
		}else{
			$("#msgCodigo").html("");
			$("#msgCodigo").html("<p>Por favor capture un codigo</p>");
			$("#jsCodigo").css("border","1px solid red");
			RESULTADO = false;
		}
		return RESULTADO;
	}//FIN function --validarProducto--
//FIN FUNCIONES PARA HACER VALIDACIONES
	
 });//end doc ready