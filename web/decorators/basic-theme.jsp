<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?xml version="1.0" encoding="UTF-8" ?>
<link rel="stylesheet" href="scripts/css/ui-lightness/jquery-ui-1.10.3.custom.css" />
<script src="scripts/js/jquery-1.10.2.min.js"></script>
<script src="scripts/js/jquery-ui-1.10.3.custom.min.js"></script> 
<link rel="stylesheet" href="css/menu/style.css" type="text/css" media="screen"/>


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title><decorator:title default="Sistema de tienditas"/></title>
</head>
<body>
	<ul id="nav">
		<li><a href="#">Nueva venta</a>
			<ul class="sub">
				<li><a href="nuevaVenta">Nueva venta</a></li>
			</ul>
		</li>
	
		<li>
			<a href="#">Productos</span></a>
			<ul>
				<li><a href="buscarProducto" id="link" target="_parent">Editar producto</a></li>
			</ul>
		</li>
	
	</ul><br><hr>
    <decorator:body/>
	<img src="images/footer.jpg"/>
</body>
</html>