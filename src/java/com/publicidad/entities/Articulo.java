/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.publicidad.entities;
/**
 * Created by jorge on 3/15/2016.
 */
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
@Entity
@Table(name = "articulo")
@XmlRootElement
public class Articulo implements Serializable {
    public Articulo() {} // JAXB needs this
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idarticulo")
    private int idArticulo;
    @Column(name = "nombrearticulo")
    private String nombreArticulo;
    @Column(name = "precio")
    private double precio;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "idnegocio")
    private int idNegocio;
    @Column(name = "imagen")
    private byte[] imagen;
    private String imagenString;

    public int getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(int idArticulo) {
        this.idArticulo = idArticulo;
    }

    public String getNombreArticulo() {
        return nombreArticulo;
    }

    public void setNombreArticulo(String nombreArticulo) {
        this.nombreArticulo = nombreArticulo;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getIdNegocio() {
        return idNegocio;
    }

    public void setIdNegocio(int idNegocio) {
        this.idNegocio = idNegocio;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenString() {
        return imagenString;
    }

    public void setImagenString(String imagenString) {
        this.imagenString = imagenString;
    }
    
    @Override
    public String toString(){
        return this.nombreArticulo+", $"+this.precio+", "+this.descripcion;
    }
}