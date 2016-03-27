package com.mx.webservices;
import com.google.gson.Gson;
import com.publicidad.entities.Articulo;
import com.publicidad.entities.ImageTemp;
import com.publicidad.entities.Images;
import com.publicidad.entities.Negocios;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.List;
import javax.management.Query;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jettison.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import javax.ws.rs.core.Response;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
@Path("/v1/status")
public class NegociosWebServicesLogic {
    @Autowired
    HibernateTemplate hibernateTemplate;
    @GET
    @Path("/get2")
    @Produces("application/json")
    public String   guardarNegocio()   {
        StringBuilder result = new StringBuilder();
        
        try{
            /*Gson gson = new Gson();
            Negocios neg = gson.fromJson(negocio, Negocios.class);
           hibernateTemplate.save(neg);
           result.append(gson.toJson(negocio));*/
            result.append("The input you sent is :guardarNegocio() ");
           
        }catch (Exception e){
           result.append(getStackTrace(e));
        }
        JSONObject json = new JSONObject();
 JSONArray array=new JSONArray();
    array.put("1");
    array.put("2");
        try {
            json.put("friends", array);
             System.out.println(json.toString(2));
        } catch (JSONException ex) {
            Logger.getLogger(NegociosWebServicesLogic.class.getName()).log(Level.SEVERE, null, ex);
        }

   


   
    
       //return Response.status(200).entity(result.toString()).build();
        return array.toString();
        
   }
    /*
     /rest/v1/status/post
     */
   @POST
    @Path("/post")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String guardarNegocio2(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        Negocios neg = gson.fromJson(crunchifyBuilder, Negocios.class);
        System.out.println("New Negocio object created: " + neg);
        neg.setImage(Base64.decode(neg.getLogotipo()));
        hibernateTemplate.saveOrUpdate(neg);
        // return HTTP response 200 in case of success
        return resArray();
   }

   @GET
    @Path("/get3")
    public Response  guardarNegocio3()   {
        StringBuilder result = new StringBuilder();
        
        try{
            /*Gson gson = new Gson();
            Negocios neg = gson.fromJson(negocio, Negocios.class);
           hibernateTemplate.save(neg);
           result.append(gson.toJson(negocio));*/
            result.append("The input you sent is :guardarNegocio() ");
           
        }catch (Exception e){
           result.append(getStackTrace(e));
        }
       return Response.status(200).entity(result.toString()).build();
        
   }

   
   /* @POST
    @Path("/post")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String allNegocios(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        Negocios neg = gson.fromJson(crunchifyBuilder, Negocios.class);
        System.out.println("New Negocio object created: " + neg);
        hibernateTemplate.save(neg);
        // return HTTP response 200 in case of success
        return resArray();
   }
   */
   
   
   






    public HibernateTemplate getHibernateTemplate() {
        return hibernateTemplate;
    }

    public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
        this.hibernateTemplate = hibernateTemplate;
    }
   
     public String getStackTrace(Throwable aThrowable) {
        final Writer result = new StringWriter();
        final PrintWriter printWriter = new PrintWriter(result);
        aThrowable.printStackTrace(printWriter);
        return result.toString();
    }
     public String resArray(){
         JSONObject json = new JSONObject();
         JSONArray array=new JSONArray();
        array.put("1");
        array.put("2");
        try {
            json.put("friends", array);
             System.out.println(json.toString(2));
        } catch (JSONException ex) {
            Logger.getLogger(NegociosWebServicesLogic.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json.toString();
     }
     public String receiveNegocioObject(InputStream incomingData){
        StringBuilder crunchifyBuilder = new StringBuilder();
        try {
                BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
                String line = null;
                while ((line = in.readLine()) != null) {
                        crunchifyBuilder.append(line);
                }
        } catch (Exception e) {
                System.out.println("Error Parsing: - ");
        }
        System.out.println("Data Received: " + crunchifyBuilder.toString());
        return crunchifyBuilder.toString();
     }
     
     public List buscarNegocios(String text, int op){
        //List results = hibernateTemplate.find("from Producto where upper(nombre) like '%"+text.toUpperCase()+"%' or codigo ='"+text+"'");
       String queryHQL = "SELECT count(DISTINCT vta.idVentas) FROM Ventas vta";
       /*Query query = hibernateTemplate.getSessionFactory().openSession().createQuery(queryHQL);
       List bounds = query.list();
       Long maxId = (Long)bounds.get(0);
       int ventasAlMomento = maxId.intValue();
       if(ventasAlMomento<=7000){
           if(op==1){
               List results = hibernateTemplate.find("from Producto where upper(nombre) like '%"+text.toUpperCase()+"%'");
               return results;
           }else if(op==2){
               List results = hibernateTemplate.find("from Producto where codigo ='"+text+"'");
               return results;
           }
       }else{
           return null;
       }*/
       return null;
   }
    @POST
    @Path("/getNegocios")
    @Produces(MediaType.APPLICATION_JSON)
    public String getNegocios()  {
        Gson gson = new Gson();
        List<Negocios> products  = (List<Negocios>) hibernateTemplate.find("from Negocios");
        System.out.println("New Negocio object created: " + products);
        // return HTTP response 200 in case of success
        String json = gson.toJson(products );
        System.out.println("Json products: " + json);
        return json;
   }
    /*
     /rest/v1/status/post
     */
   @POST
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateNegocio(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        Negocios neg = gson.fromJson(crunchifyBuilder, Negocios.class);
        System.out.println("New Negocio object created: " + neg);
        neg.setImage(Base64.decode(neg.getLogotipo()));
        hibernateTemplate.update(neg);
        // return HTTP response 200 in case of success
        return resArray();
   }
   /*
     /rest/v1/status/post
     */
   @POST
    @Path("/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteNegocio(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        Negocios neg = gson.fromJson(crunchifyBuilder, Negocios.class);
        System.out.println("Negocio object deleted: " + neg);
        neg.setImage(Base64.decode(neg.getLogotipo()));
        hibernateTemplate.delete(neg);
        // return HTTP response 200 in case of success
        return resArray();
   }
    @POST
    @Path("/saveItem")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String guardarArticulo(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        Articulo item = gson.fromJson(crunchifyBuilder, Articulo.class);
        System.out.println("New Negocio object created: " + item);
        item.setImagen(Base64.decode(item.getImagenString()));
        hibernateTemplate.saveOrUpdate(item);
        // return HTTP response 200 in case of success
        return resArray();
   }
    @POST
    @Path("/saveImages")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String guardarImagen(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        ImageTemp imagesTemp = gson.fromJson(crunchifyBuilder, ImageTemp.class);
        System.out.println("New Negocio object created: " + imagesTemp);
         Images images = new Images();
        images.setImagen(Base64.decode(imagesTemp.getImagenString()));
        images.setIdArticulo(imagesTemp.getIdArticulo());
        hibernateTemplate.saveOrUpdate(images);
        // return HTTP response 200 in case of success
        return resArray();
   }
    @POST
    @Path("/getArticulos")
    @Produces(MediaType.APPLICATION_JSON)
    public String getArticulos()  {
        Gson gson = new Gson();
        List<Articulo> articulos  = (List<Articulo>) hibernateTemplate.find("from Articulo");
        System.out.println("lista de articulos: " + articulos);
        // return HTTP response 200 in case of success
        String json = gson.toJson(articulos );
        System.out.println("Json products: " + json);
        return json;
   }
    @POST
    @Path("/getImages")
    @Produces(MediaType.APPLICATION_JSON)
    public String getImagenes()  {
        Gson gson = new Gson();
        List<Images> imagenes  = (List<Images>) hibernateTemplate.find("from Images");
        System.out.println("lista de imagenes: " + imagenes);
        // return HTTP response 200 in case of success
        String json = gson.toJson(imagenes );
        System.out.println("Json imagenes: " + json);
        return json;
   }
    @POST
    @Path("/updateItem")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateArticulo(InputStream incomingData)  {
        String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        Articulo item = gson.fromJson(crunchifyBuilder, Articulo.class);
        System.out.println("New Negocio object created: " + item);
        item.setImagen(Base64.decode(item.getImagenString()));
        hibernateTemplate.update(item);
        // return HTTP response 200 in case of success
        return resArray();
   }
    @POST
    @Path("/updateImages")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateImagen(InputStream incomingData)  {
       String crunchifyBuilder = receiveNegocioObject(incomingData);
        Gson gson = new Gson();
        ImageTemp imagesTemp = gson.fromJson(crunchifyBuilder, ImageTemp.class);
        System.out.println("New Negocio object created: " + imagesTemp);
         Images images = new Images();
        images.setImagen(Base64.decode(imagesTemp.getImagenString()));
        images.setIdArticulo(imagesTemp.getIdArticulo());
        images.setIdImagen(imagesTemp.getIdImagen());
        hibernateTemplate.update(images);
        // return HTTP response 200 in case of success
        return resArray();
   }
}
