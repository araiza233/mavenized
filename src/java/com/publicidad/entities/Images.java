/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.publicidad.entities;
/**
 * Created by jorge on 3/19/2016.
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
@Table(name = "imagen")
@XmlRootElement
public class Images {
    public Images() {} // JAXB needs this
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idarticulo")
    private int idArticulo;
    @Column(name = "idimagen")
    private int idImagen;
    @Column(name = "imagen")
    private byte[] imagen;

    public int getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(int idArticulo) {
        this.idArticulo = idArticulo;
    }

    public int getIdImagen() {
        return idImagen;
    }

    public void setIdImagen(int idImagen) {
        this.idImagen = idImagen;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    @Override
    public String toString(){
        StringBuilder str = new StringBuilder("idArticulo: ");
        str.append(getIdArticulo());
        str.append(", idImagen: ");
        str.append(getIdImagen());
        return str.toString();
    }
}
