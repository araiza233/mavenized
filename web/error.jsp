<%@taglib uri="/struts-tags" prefix="s" %>
<%@taglib uri="/struts-tags" prefix="html" %>
<html>
<head>
</head>
<body>
	<div align="center">
		<table class="stable" cellspacing="2"><!--MOSTRAR DATOS DE SECCION GRAL-->
			<thead>
                  <tr>
                        <th colspan="3">
                                <strong><h1>Ha ocurrido un error</h1></strong>
                        </th>
                  </tr>
            </thead>
			<tbody>
				  
				  <tr>
					 <td>
						 <strong><h1>Mensaje</h1></strong>
					 </td>
					 <td colspan="2">
						  <strong><h1>
								<s:property value="error"/>
						  </h1></strong>
					 </td>
				  </tr>
			</tbody>
        </table>
    </div>
</body>
</html>