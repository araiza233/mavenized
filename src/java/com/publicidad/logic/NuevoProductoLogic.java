/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.publicidad.logic;
import com.publicidad.dao.NuevoProductoDao;
import com.publicidad.entities.DetalleVentas;
import com.publicidad.entities.Producto;
import com.publicidad.entities.Ventas;
import java.util.List;
public class NuevoProductoLogic implements NuevoProductoLogicInterface{
    private NuevoProductoDao nuevoProductoDao;
    @Override
    public String guardar(Producto producto){
        return nuevoProductoDao.guardar(producto);
    }
    public NuevoProductoDao getNuevoProductoDao() {
        return nuevoProductoDao;
    }
    public void setNuevoProductoDao(NuevoProductoDao nuevoProductoDao) {
        this.nuevoProductoDao = nuevoProductoDao;
    }
    @Override
    public List buscarProducto(String text, int op) {
        return nuevoProductoDao.buscarProducto(text, op);
    }
    public String editar(Producto producto){
        return nuevoProductoDao.editar(producto);
    }
    public String guardarVenta(Ventas ventas){
        return nuevoProductoDao.guardarVenta(ventas);
    }
    public String guardarDetalleVentas(DetalleVentas detalles){
        return nuevoProductoDao.guardarDetalleVentas(detalles);
    }
}