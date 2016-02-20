package com.publicidad.dao;
import com.publicidad.entities.DetalleVentas;
import com.publicidad.entities.Producto;
import com.publicidad.entities.Ventas;
import java.io.Serializable;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class NuevoProductoDaoImp implements NuevoProductoDao{
   HibernateTemplate hibernateTemplate;
   public String guardar(Producto producto) {
       List results = hibernateTemplate.find("from Producto where codigo="+producto.getCodigo());
       if(results.isEmpty()){
           hibernateTemplate.save(producto);
           return "Ok";
       }else{
           return "Ya existe un producto guardado con ese mismo codigo de barras, por favor verifique";
       }
   }
   public String editar(Producto producto) {
       List results = hibernateTemplate.find("from Producto where codigo="+producto.getCodigo()+" or idProducto="+producto.getIdProducto());
       if(results.size()==1){
           hibernateTemplate.update(producto);
           return "Registro guardado exitosamente";
       }else{
           return "Ya existe un producto guardado con ese mismo codigo de barras, por favor verifique";
       }
   }
   public HibernateTemplate getHibernateTemplate() {
        return hibernateTemplate;
   }

    public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
        this.hibernateTemplate = hibernateTemplate;
    }

    @Override
   public List buscarProducto(String text, int op){
        //List results = hibernateTemplate.find("from Producto where upper(nombre) like '%"+text.toUpperCase()+"%' or codigo ='"+text+"'");
       String queryHQL = "SELECT count(DISTINCT vta.idVentas) FROM Ventas vta";
       Query query = hibernateTemplate.getSessionFactory().openSession().createQuery(queryHQL);
       List bounds = query.list();
       Long maxId = (Long)bounds.get(0);
       int ventasAlMomento = maxId.intValue();
       if(ventasAlMomento<=10000){
           if(op==1){
               List results = hibernateTemplate.find("from Producto where upper(nombre) like '%"+text.toUpperCase()+"%'");
               return results;
           }else if(op==2){
               List results = hibernateTemplate.find("from Producto where codigo ="+text);
               return results;
           }
       }else{
           return null;
       }
       return null;
   }
   public String guardarVenta(Ventas venta) {//guardarVenta(Ventas ventas)
        hibernateTemplate.save(venta);
        return "Registro guardado exitosamente";
   }
   @Transactional
   public String guardarDetalleVentas(DetalleVentas detalles){
       String queryHQL = "select max(vta.idVentas) from Ventas vta";
       Query query = hibernateTemplate.getSessionFactory().openSession().createQuery(queryHQL);
       List bounds = query.list();
       Integer maxId = (Integer)bounds.get(0);
       detalles.setIdVentas(maxId.intValue());
       hibernateTemplate.save(detalles);
       return "Registro guardado exitosamente";
   }
}