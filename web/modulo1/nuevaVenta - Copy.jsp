<script src="scripts/nuevaVenta.js"> </script>
<link href="styles/tables.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.eliminarBoton {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-weight: bold;
}
.msgCampos {color: #FF0000;font-size: small;}
.msgs {color: #FF0000;}
.descripcion{
	font-size: 30px;
	font-weight: bold;
}
.kilogramos{
	font-size: 20px;
	font-weight: bold;
	color: #777;
	height: 28px;
	padding-left: 10px;
	text-decoration: none;
	background-repeat: repeat-x;
	border:1px solid #777;
	border-radius:5px
}
.pieza{
	font-size: 20px;
	font-weight: bold;
	color: #777;
	height: 28px;
	padding-left: 10px;
	text-decoration: none;
	background-repeat: repeat-x;
	border:1px solid #777;
	border-radius:5px
}
.pago{
	font-size: 20px;
	font-weight: bold;
	border:1;
}
-->
</style>
	<div id="gettingInfo" title="Obteniedo informacion" class="pago">
		<p>Espere mientras se obtiene la informacion de los productos</p>
	</div>
	<div id="getPago" title="Pago!">
		<table border="0">
			<tr><td class="pago">
				<div id="jsTotal"></div>
				</td>
			</tr>
			<tr>
				<td>
				Va a pagar con:<input type="text" maxlength="10" size="8" id="jsPago2"/><div id="msgPago" class="msgCampos"></div>
				</td>
			</tr>
			<tr>
				<td class="pago">
					<div id="msgCambio"></div>
				</td>
			</tr>
		</table>
	</div>

	<table class="hovertable" width="100%">
	 <tr>
		<td width="150" align="right">Nombre producto: </td>
		<td width="150" align="left">
			<input type="text" maxlength="9" id="autocompletar" size="30" border="1"/>
			<form id="myform2">
				<input name="nombre" type="hidden" id="nombree"/>
			</form>
		</td>
		<td width="500" align="left">
			<div id="detallesProducto"></div>
		</td>
	  </tr>
	</table>
<div style="display:none">
	<form id="form3">
		<input name="totalVenta" type="hidden" id="jsTotalVenta"/>
		<input name="usuario" value="1" type="hidden" id="jsUsuario"/>
		<input name="productos" value="1" type="hidden" id="jsDetalles"/>
	</form>
</div>
	<hr>
	<table class="hovertable" width="100%">
	  <tr>
		<th colspan="6"><div align="center">Detalles de venta </div></th>
	  </tr>
	  <tr class="encabezado">
		<th>#</th>
		<th>Producto</th>
		<th>Pieza/Gramos</th>
		<th>Precio</th>
		<th>Total</th>
	  </tr>
	  <tr class="granTotal">
		<th colspan="4"><div align="right">Gran total </div></th>
		<th><div id="jsGranTotal"></div></th>
	  </tr>
	  <tr>
		<td colspan="5" class="msgCampos">
			Enter = Cambiar de articulo<br>
			C = Cobrar<br>
			B = Borrar articulo de la venta<br>
			N = Nueva venta<br>
		</td>
	  </tr>
	</table>