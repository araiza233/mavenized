package org.apache.struts.publicidad.action;
import com.opensymphony.xwork2.ActionSupport;
import com.publicidad.entities.DetalleVentas;
import com.publicidad.entities.Producto;
import com.publicidad.entities.Ventas;
import com.publicidad.logic.NuevoProductoLogicInterface;
import com.publicidad.utilities.Utilities;
import java.util.List;
public class NuevoProductoAction extends ActionSupport{
    private String                          nombre;
    private String                          precio;
    private String                          descripcion;
    private String                          codigo;
    private Producto                        producto;
    private String                          resultado;
    private List                            productoList;
    private NuevoProductoLogicInterface     nuevoProductoLogicInterface;
    private String                          json;
    private String                          unidaddeventa;
    private String                          usuario;
    private int                             idProducto;
    //atributos de venta
    private int vendidoPor;
    private float totalVenta;
    private String productos;
    private Ventas ventas;
    private DetalleVentas detalleVentas;
    public String guardar(){
        producto.setDescripcion(descripcion);
        producto.setNombre(nombre);
        producto.setPrecio(Utilities.String2Float(precio));
        producto.setCodigo(Utilities.String2int(codigo));
        producto.setUnidadDeVenta(unidaddeventa);
        java.util.Date date = new java.util.Date();
        java.sql.Timestamp timestamp = new java.sql.Timestamp(date.getTime());
        producto.setFechaActualizacion(timestamp );
        producto.setActualizadoPor(usuario);
        producto.setFechaCreacion(timestamp);
        producto.setCreadoPor(usuario);
        try{
            setResultado(nuevoProductoLogicInterface.guardar(producto));
        }catch(Exception e){
            setResultado("Ocurrio el siguiente error al tratar de guardar en la base de datos: "+e.getMessage());
        }
        return ActionSupport.SUCCESS;
    }
    public String buscarProducto(){
        try{
            List lista = nuevoProductoLogicInterface.buscarProducto(nombre,1);
            if(lista==null){
                setResultado("La version de prueba a terminado, por favor pongase en contacto con su proveedor del sistema");
            }else{
                setProductoList(lista);
                setResultado("Ok");
            }
        }catch(Exception e){
            setResultado("Ocurrio un error: "+e.getMessage());
        }
        return ActionSupport.SUCCESS;
    }
    public String buscarProductoVenta(){
        try{
            setProductoList(nuevoProductoLogicInterface.buscarProducto(nombre,1));
            setResultado("Ok");
        }catch(Exception e){
            setResultado("Ocurrio un error: "+e.getMessage());
        }
        return ActionSupport.SUCCESS;
    }
    public String editarProducto(){
        producto.setDescripcion(descripcion);
        producto.setNombre(nombre);
        producto.setPrecio(Utilities.String2Float(precio));
        producto.setCodigo(Utilities.String2int(codigo));
        producto.setUnidadDeVenta(unidaddeventa);
        java.util.Date date = new java.util.Date();
        java.sql.Timestamp timestamp = new java.sql.Timestamp(date.getTime());
        producto.setFechaActualizacion(timestamp );
        producto.setActualizadoPor(usuario);
        producto.setIdProducto(idProducto);
        try{
            setResultado(nuevoProductoLogicInterface.editar(producto));
        }catch(Exception e){
            setResultado("Ocurrio el siguiente error al tratar de guardar en la base de datos: "+e.getMessage());
        }
        return ActionSupport.SUCCESS;
    }
    
    public String guardarVenta(){
        try{
            java.util.Date date = new java.util.Date();
            java.sql.Timestamp timestamp = new java.sql.Timestamp(date.getTime());
            ventas.setFechaDeVenta(timestamp);
            ventas.setTotalVenta(totalVenta);
            ventas.setVendidoPor(Utilities.String2int(usuario));
            setResultado(nuevoProductoLogicInterface.guardarVenta(ventas));
            String[] valores = productos.split("@");
            for(int i=0;i<valores.length;i++){
                String[] valores1 = valores[i].split(";");
                detalleVentas.setIdProducto(Utilities.String2int(valores1[0]));
                detalleVentas.setCantidad(Utilities.String2Float(valores1[1]));
                detalleVentas.setTotal(Utilities.String2Float(valores1[2]));
                nuevoProductoLogicInterface.guardarDetalleVentas(detalleVentas);
            }
            setResultado("Ok");
        }catch(Exception e){
            setResultado("Ocurrio el siguiente error al tratar de guardar en la base de datos: "+e.getMessage());
        }
        return ActionSupport.SUCCESS;
    }
    public String buscarProductoCodigo(){
        try{
            List lista = nuevoProductoLogicInterface.buscarProducto(nombre,2);
            if(lista==null){
                setResultado("La version de prueba a terminado, por favor pongase en contacto con su proveedor del sistema");
            }else{
                setProductoList(lista);
                setResultado("Ok");
            }
        }catch(Exception e){
            setResultado("Ocurrio un error: "+e.getMessage());
        }
        return ActionSupport.SUCCESS;
    }
    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public NuevoProductoLogicInterface getNuevoProductoLogicInterface() {
        return nuevoProductoLogicInterface;
    }

    public void setNuevoProductoLogicInterface(NuevoProductoLogicInterface nuevoProductoLogicInterface) {
        this.nuevoProductoLogicInterface = nuevoProductoLogicInterface;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public List getProductoList() {
        return productoList;
    }

    public void setProductoList(List productoList) {
        this.productoList = productoList;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getUnidaddeventa() {
        return unidaddeventa;
    }
    public void setUnidaddeventa(String unidaddeventa) {
        this.unidaddeventa = unidaddeventa;
    }

    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }
    //getters and setters de venta

    public String getProductos() {
        return productos;
    }

    public void setProductos(String productos) {
        this.productos = productos;
    }

    public float getTotalVenta() {
        return totalVenta;
    }

    public void setTotalVenta(float totalVenta) {
        this.totalVenta = totalVenta;
    }

    public int getVendidoPor() {
        return vendidoPor;
    }
    public void setVendidoPor(int vendidoPor) {
        this.vendidoPor = vendidoPor;
    }

    public DetalleVentas getDetalleVentas() {
        return detalleVentas;
    }

    public void setDetalleVentas(DetalleVentas detalleVentas) {
        this.detalleVentas = detalleVentas;
    }

    public Ventas getVentas() {
        return ventas;
    }

    public void setVentas(Ventas ventas) {
        this.ventas = ventas;
    }
}