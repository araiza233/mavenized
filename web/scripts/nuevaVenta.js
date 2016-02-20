$(document).ready(function() {
	var borrar = false;
	var consecutivo = 0;
	var enters = 0;
	$("#autocompletar").focus();
	$("#autocompletar").val("");
	opciones = { autoOpen: false, modal: true, show: { effect: "blind", duration: 500 }, hide: { effect: "explode", duration: 500 },
				width:250,height:200,minWidth:200,minHeight:200,maxWidth:200,maxHeight:200, position: ["left", "top"]}
	opciones2 = { autoOpen: false, modal: true, show: { effect: "blind", duration: 500 }, hide: { effect: "fadeOut", duration: 2000 },
				width:300,height:300,minWidth:300,minHeight:300,maxWidth:300,maxHeight:300, position: ["center", "center"]}
	$("#gettingInfo").dialog(opciones2);
	$("#getPago").dialog(opciones);
	imagesOpciones = { autoOpen: false, modal: true, show: { effect: "blind", duration: 500 }, hide: { effect: "fadeOut", duration: 2000 },
				width:700,height:700,minWidth:700,minHeight:700,maxWidth:700,maxHeight:700, position: ["center", "center"]}	
	$("#getImage").dialog(imagesOpciones);
	$("#autocompletar").autocomplete({
		source: arreglo()
	});
	
	function arreglo(){
		var dataArray = new Array();
		$("#nombree").val($("#autocompletar").val());
		var formInput=$("#myform2").serialize();
		$.getJSON('ajax/buscarProducto', formInput, function(data){
			if(data.resultado=='Ok'){
				signo='$';
				if(data.productoList.length>0){
					for(i=0; i<data.productoList.length; i++){
						dataArray[i]=data.productoList[i].nombre+'|'+signo+data.productoList[i].precio+'|'+data.productoList[i].unidadDeVenta+'|'+data.productoList[i].codigo+'|'+$.trim(data.productoList[i].descripcion)+'|'+data.productoList[i].idProducto;
					}
					$("#gettingInfo").dialog("close");
					$("#gettingInfo").html("");
				}else{
					dataArray[0] = "No se encontaron registros";
					$("#gettingInfo").dialog("close");
				}
			}else{
				$("#gettingInfo").html("");
				$("#gettingInfo").append("<p>"+data.resultado+"</p>");
				dataArray[0] = data.resultado;
			}
		});//END getJSON
		return dataArray;
	}
	$("#autocompletar").keypress(function(event){
		e = event.which;
		if(e==10||e==13){
			producto = $("#autocompletar").val();
			if(producto==''){
				secuencia = $(".encabezado").next().find('td').eq(0).text();
				if(validarCodigo(secuencia)){
					consecutivo = secuencia;
					$("#tot"+secuencia).focus();
				}
				return false;
			}
		}else if(e==8){
			$("#autocompletar").val("");
		}
	});

	
	
	$("#autocompletar").keydown(function(event){
		producto = $("#autocompletar").val();
		if(producto==''){
			nada++;
		}else{
			if(event.which==10||event.which==13){
				clipArray = producto.split("|");
				if(clipArray.length==6){
					if(getIds(clipArray[5])){//Si el articulo NO se encuentra EN LA TABLA
						html="<p class='descripcion'>Producto: <span class='msgs'>"+clipArray[0]+"</span>Precio: <span class='msgs'>"+clipArray[1]+"</span></p>";
						html +="<p><strong>Unidad de venta: </strong><span class='msgs'>"+clipArray[2]+" </span><strong>Codigo: </strong><span class='msgs'>"+clipArray[3]+"</span>";
						html+="<strong>Descripcion: </strong><span class='msgs'>"+clipArray[4]+"</span>";
						$("#left").html(html);
						imagen = traerImagen(clipArray[3]);
						$("#rigth").html(imagen);
						consecutivo = $(".granTotal").prev().find('td:first').text();
						if(consecutivo=='#'){
							consecutivo = 1;
						}else{
							consecutivo++;
						}
						addRow= "<tr class='productosVenta'><td>"+consecutivo+"</td><td><div class='productoId' style='display:none'>"+clipArray[5]+"</div>"+clipArray[0]+"</td><td><input type='text' size='6' maxlength='6' class='"+clipArray[2]+"' id='tot"+consecutivo+"'>"+clipArray[2]+"</td>";
						addRow+="<td><div id='precio"+consecutivo+"'>"+clipArray[1]+"</div></td><td><div id='res"+consecutivo+"' class='resultado'></div></td></tr>";
						$(".granTotal").before(addRow);
						$(".granTotal").prev().fadeOut().fadeIn();
						$("#tot"+consecutivo).val("1");
						$("#tot"+consecutivo).focus();
					}else{//fin if getId SI EL ARTICULO SI SE ENCONTRABA EN LA TABLA
						$("#gettingInfo").dialog("open");
						$("#gettingInfo").html("<h1>Articulo ya incluido en la venta</h1>");
						setTimeout("$('#gettingInfo').dialog('close')", 2000);
						volverABuscar();
					}
				}else{//fin else si si trae 6 datos
					traerProductoPorCodigo(producto);
				}//fin else sino trae 6 datos indica que se metio un numero y se va hacer una consulta para traer el codigo de ese producto
			}//fin else si se presiono ENTER
		}//fin else si producto es diferente de ''
	});
	
	function calcular(){
		total = parseFloat($("#tot"+consecutivo).val())*parseFloat($("#precio"+consecutivo).text().slice(1,$("#precio"+consecutivo).text().length));
		$("#res"+consecutivo).html("$"+formatNum(total,2));
		calcularGranTotal();
	}
	function volverABuscar(){
		$("#autocompletar").val("");
		$("#autocompletar").focus();
	}
	function guardarVenta(){
		total = validarPrimero($("#jsTotal").text())
		$("#jsTotalVenta").val(total);
		var detalles ='';
		$(".productosVenta").each(function(i){
			idProducto = $(this).find('td').eq(1).find('div').text();
			cantidad = validarUltimo($("#tot"+(i+1)).val());
			total = validarPrimero($(this).find('td').eq(4).text());
			detalles+=idProducto+';'+cantidad+';'+total+'@';
		});
		$("#jsDetalles").val(detalles);
		var formInput=$("#form3").serialize();
		$.getJSON('ajax/guardarVenta', formInput, function(data){
			if(data.resultado=='Ok'){
				nada++;
			}else{
				$("#getPago").dialog("close");
				$("#gettingInfo").html("");
				$("#gettingInfo").append("<p>"+data.resultado+"</p>");
				$("#gettingInfo").dialog("open");
			}
		});//END getJSON*/
	}
	$("#jsPago2").keypress(function(e){
		if(e.which==10 || e.which==13){
			if($(this).val==''){
				nada++;
			}else{
				if($("#jsPago2").val()==''){
					$("#jsPago2").focus();
				}else{
					pago = parseFloat($("#jsPago2").val());
					deuda = parseFloat($("#jsTotal").text().slice(1,$("#jsTotal").text().length));
					if(pago>=deuda){
						if(enters==0){
							$("#msgPago").html("");
							$("#jsPago2").css({"border-color":"#000000"});
							$("#msgCambio").html("");
							cambio = pago-deuda;
							$("#msgCambio").html("Cambio: $"+formatNum(cambio,2));
							guardarVenta();//Se manda llamar a metodo que guarda
							//$("#jsPago2").prop('disabled',true);
							enters = 777;
						}else{
							$("#jsPago2").focus();
							$("#jsPago2").css({"border-color":"#FF0000"});
							$("#jsPago2").css({"border":"2px"});
							$("#msgPago").html("La venta ya se ha guardado");
						}
					}else{
						$("#jsPago2").focus();
						$("#jsPago2").css({"border-color":"#FF0000"});
						$("#jsPago2").css({"border":"2px"});
						$("#msgPago").html("El pago debe ser mayor al total de la venta");
						$("#msgCambio").html("");
					}
				}
				//$("#getPago").dialog("close");
			}
		}
	});
	$("#jsPago2").keyup(function(){
		borrar = validarPrecio($(this).val());
		if(borrar==false){
			longitud=$(this).val().length-1;
			$(this).val($(this).val().slice(0, longitud));
			borrar =  true;
		}
	});
	function validarUltimo(gramos){
		borrare = validarPrecio(gramos);
		if(borrare==false){
			gramos = gramos.slice(0, -1);
		}
		return gramos;
	}
	function validarPrimero(totalisimo){
		totalisimo = totalisimo.slice(1, totalisimo.length);
		return totalisimo;
	}
	function getIds(idBuscar){
		var aAgregar = parseInt($.trim(idBuscar));
		var enTabla = 0 ;
		res = true;
		$(".productoId").each( function(i){
			enTabla = parseInt($(this).text());
			if(enTabla == aAgregar){
				res = false;
			}
		});
		return res;
	}
	function calcularGranTotal(){
		granTotal = 0;
		$(".resultado").each( function(i){
			longitud = $(this).text().length;
			granTotal +=parseFloat($(this).text().slice(1,longitud));
		});
		$("#jsGranTotal").html("<strong><h2>$"+formatNum(granTotal,2)+"</h2><strong>");
		$("#jsTotal").html("$"+formatNum(granTotal,2));
	}
	function formatNum(expr,decplaces) {
		var str = (Math.round(parseFloat(expr) * Math.pow(10,decplaces))).toString();
		while (str.length <= decplaces) {
			str = "0" + str;
		}
		var decpoint = str.length - decplaces;
		return str.substring(0,decpoint) + "." + 
		str.substring(decpoint,str.length);
	}
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
		if(cadena.length==0){
			return false;
		}
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
			return true;
		}else{
			return false;
		}
	}
	function validarCodigo(cadena){
		var nada=0;
		if(cadena.length==0){
			return false;
		}
		for(i=0;i<cadena.length;i++){
			ascii = cadena.charCodeAt(i);
			//alert('ascii: '+ascii);
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
/*--------------------------------------------------------------------------
INICIO FUNCIONES PARA VALIDAR QUE SE INTRODUZCAN UNIDADES Y GRAMOS
---------------------------------------------------------------------------*/	
/*$(document).on('keypress', '.kilogramos',function(){
				alert('You have clicked the kilogramos button'); 
			});*/
	$(document).on('keypress', '.kilogramos',function(e){
		if(e.which==98 || e.which==66){//b=98 & B=66, Borrar el registro de la tabla 
			$(this).parent().parent().fadeOut(1000,function(){$(this).remove();});
			volverABuscar();
			calcularGranTotal();
		}else if(e.which==99 || e.which==67){//| c=99 & C=67 Pasar a caja de Pago
			if($(this).val().length>0){
				$("#getPago").dialog("open");
				$("#jsPago2").val("");
				$("#msgPago").html("");
				$("#msgCambio").html("");
				$("#jsPago2").prop('disabled',false);
				$("#jsPago2").focus();
				enters=0;
			}
		}else if(e.which==10 || e.which==13){//Presiona Enter
			if($(this).val().length>0){
				secuencia = $(this).parent().parent().next().find('td').eq(0).text();
				if(validarCodigo(secuencia)){
					$("#tot"+secuencia).focus();
					consecutivo = secuencia;
					//alert('consecutivo: '+consecutivo);
				}else{
					$("#autocompletar").val("");
					$("#autocompletar").focus();
				}
			}
		}else if(e.which==110 || e.which==78){//110 Y 78 SON n y N para comenzar una nueva venta
			$(".productosVenta").each( function(i){
				//$(this).remove();
				$(this).fadeOut(1000,function(){$(this).remove();});
			});
			volverABuscar();
			$("#jsGranTotal").html("");
		}
	});
	
	$(document).on('keyup', '.kilogramos',function(e){
		borrar = validarPrecio($(this).val());
		if(borrar==false){
			longitud=$(this).val().length-1;
			$(this).val($(this).val().slice(0, longitud));
			borrar =  true;
		}else{
			calcular($(this));
		}
	});
	$(document).on('keyup', '.pieza',function(e){
		borrar = validarCodigo($(this).val());
		if(borrar==false){
			longitud=$(this).val().length-1;
			$(this).val($(this).val().slice(0, longitud));
			borrar =  true;
		}else{
			calcular($(this));
		}
	});
	$(document).on('keypress', '.pieza',function(e){
		if(e.which==98 || e.which==66){//b=98 & B=66, Borrar el registro de la tabla 
			$(this).parent().parent().fadeOut(1000,function(){$(this).remove();});
			volverABuscar();
			calcularGranTotal();
		}else if(e.which==99 || e.which==67){//| c=99 & C=67 Pasar a caja de Pago
			if($(this).val().length>0){
				$("#getPago").dialog("open");
				$("#jsPago2").val("");
				$("#msgPago").html("");
				$("#msgCambio").html("");
				$("#jsPago2").focus();
			}
		}else if(e.which==10 || e.which==13){//Presiona Enter
			if($(this).val().length>0){
				secuencia = $(this).parent().parent().next().find('td').eq(0).text();
				if(validarCodigo(secuencia)){
					$("#tot"+secuencia).focus();
					consecutivo = secuencia;
					//alert('consecutivo: '+consecutivo);
				}else{
					$("#autocompletar").val("");
					$("#autocompletar").focus();
				}
			}
		}else if(e.which==110 || e.which==78){//110 Y 78 SON n y N para comenzar una nueva venta
			$(".productosVenta").each( function(i){
				$(this).remove();
				$(this).fadeOut(1000,function(){$(this).remove();});
			});
			volverABuscar();
			$("#jsGranTotal").html("");
		}
	});
		
/*--------------------------------------------------------------------------
FIN FUNCIONES PARA VALIDAR QUE SE INTRODUZCAN UNIDADES Y GRAMOS
---------------------------------------------------------------------------*/			
/*------------------------------------------------------------
INICIO FUNCIONES PARA RESALTAR EL RENGLON DEL ARTICULO EN DONDE SE ENCUENTRE EL FOCOS
----------------------------------------------------*/			
		$(document).on('focus', '.pieza',function(){
			$(this).css( "border", "5px solid red");
			$(this).parent().parent().css("backgroundColor","#ffff66");
		});
		$(document).on('focusout', '.pieza',function(){
			$(this).css( "border", "1px solid black");
			$(this).parent().parent().css("backgroundColor","#c3dde0");
		});
		$(document).on('focus', '.kilogramos',function(){
			$(this).css( "border", "5px solid red");
			$(this).parent().parent().css("backgroundColor","#ffff66");
		});
		$(document).on('focusout', '.kilogramos',function(){
			$(this).css( "border", "1px solid black");
			$(this).parent().parent().css("backgroundColor","#c3dde0");
		});		
/*------------------------------------------------------------
FIN FUNCIONES PARA RESALTAR EL RENGLON DEL ARTICULO EN DONDE SE ENCUENTRE EL FOCOS
----------------------------------------------------*/			
/*
Nueva funcion para traer articulos por codigo de barras--12 de Diciembre de 2013
*/
	function traerProductoPorCodigo(codigoDeBarras){
		codigoValido = validarCodigo(codigoDeBarras);
		if(codigoValido){
			traerInfo();
		}//fin IF si el codigo esta formado unicamente de numeros
	}//fin function traerProductoPorCodigo
	function traerInfo(){
		var dataArray = new Array();
		$("#nombree").val($("#autocompletar").val());
		var formInput=$("#myform2").serialize();
		$.getJSON('ajax/buscarProductoCodigo', formInput, function(data){
			if(data.resultado=='Ok'){
				signo='$';
				if(data.productoList.length>0){
					for(i=0; i<data.productoList.length; i++){
						dataArray[i]=data.productoList[i].nombre+'|'+signo+data.productoList[i].precio+'|'+data.productoList[i].unidadDeVenta+'|'+data.productoList[i].codigo+'|'+$.trim(data.productoList[i].descripcion)+'|'+data.productoList[i].idProducto;
					}
					clipArray = dataArray[0].split("|");
					if(clipArray.length==6){
						if(getIds(clipArray[5])){//Si el articulo NO se encuentra EN LA TABLA
							html="<p class='descripcion'>Producto: <span class='msgs'>"+clipArray[0]+"</span>Precio: <span class='msgs'>"+clipArray[1]+"</span></p>";
							html +="<p><strong>Unidad de venta: </strong><span class='msgs'>"+clipArray[2]+" </span><strong>Codigo: </strong><span class='msgs'>"+clipArray[3]+"</span>";
							html+="<strong>Descripcion: </strong><span class='msgs'>"+clipArray[4]+"</span>";
							$("#detallesProducto").html(html);
							consecutivo = $(".granTotal").prev().find('td:first').text();
							if(consecutivo=='#'){
								consecutivo = 1;
							}else{
								consecutivo++;
							}
							addRow= "<tr class='productosVenta'><td>"+consecutivo+"</td><td><div class='productoId' style='display:none'>"+clipArray[5]+"</div>"+clipArray[0]+"</td><td><input type='text' size='6' maxlength='6' class='"+clipArray[2]+"' id='tot"+consecutivo+"'>"+clipArray[2]+"</td>";
							addRow+="<td><div id='precio"+consecutivo+"'>"+clipArray[1]+"</div></td><td><div id='res"+consecutivo+"' class='resultado'></div></td></tr>";
							$(".granTotal").before(addRow);
							$(".granTotal").prev().fadeOut().fadeIn();
							$("#tot"+consecutivo).val("1");
							$("#tot"+consecutivo).focus();
						}else{//fin if getId SI EL ARTICULO SI SE ENCONTRABA EN LA TABLA
							$("#gettingInfo").dialog("open");
							$("#gettingInfo").html("<h1>Articulo ya incluido en la venta</h1>");
							setTimeout("$('#gettingInfo').dialog('close')", 2000);
							volverABuscar();
						}
					}
					$("#gettingInfo").dialog("close");
					$("#gettingInfo").html("");
				}else{
					dataArray[0] = "No se encontaron registros";
					$("#gettingInfo").dialog("close");
				}
			}else{
				$("#gettingInfo").html("");
				$("#gettingInfo").append("<p>"+data.resultado+"</p>");
				dataArray[0] = data.resultado;
			}
		});//END getJSON
	}//fin funtion traerInfo
	/**FUNCION PARA OBTENER LAS IMAGENES DE LOS PRODUCTOS*/
	function traerImagen(codigo){
	   imagen = "images/imagesProducts/"+codigo+".jpg";
	   var etsiste = urlExists(imagen);
	   if (etsiste==200){
			res = '<img src="'+imagen+'" class="imagensusca" width="100" height="90" title="Ver imagen completa" style="cursor: pointer;"/>';
			$("#getImage").html("");
			$("#getImage").html("<img src='"+imagen+"' width='675' height='675'/>");
	   }else{
			res = '<img src="images/notAvailable.jpg" width="100" height="90"';
	   }
	   return res;
	}
	function urlExists(testUrl) {
	 var http = jQuery.ajax({
		type:"HEAD",
		url: testUrl,
		async: false
	  })
	  return http.status;
		  // this will return 200 on success, and 0 or negative value on error
	}
	
	$("#rigth").on("click",".imagensusca",function(){
		//alert('Mostrar imagen');
		$("#getImage").dialog("open");
	});
 });//end doc ready