/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.publicidad.entities;

/**
 *
 * @author jorge
 */
public class ImageTemp {
    private int idArticulo;
    private int idImagen;
    private byte[] imagen;
    private String imagenString;

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

    public String getImagenString() {
        return imagenString;
    }

    public void setImagenString(String imagenString) {
        this.imagenString = imagenString;
    }
    
}
