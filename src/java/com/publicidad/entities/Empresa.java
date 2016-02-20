package com.publicidad.entities;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "empresa")
public class Empresa{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_empresa;
    private String nombre;
    private String direccion;
    private String telefonos;
    private String contactos;
    private String notas;
    private String facebook_url;
    private String twitter_url;
    
    public Empresa(){
        this.contactos = "jorge";
        this.direccion="pirules";
        this.facebook_url="facebook.com";
        this.nombre="Ferreteria martinez";
        this.notas="pinzas, fidel velazquez";
        this.telefonos="9772242";
        this.twitter_url="twitter.com";
        this.id_empresa=1L;
    }
    public Empresa(String nombre,String direccion, String telefonos, String contactos, String notas, String facebook_url, String twitter_url){
        this.contactos = contactos;
        this.direccion= direccion;
        this.facebook_url= facebook_url;
        this.nombre= nombre;
        this.notas= notas;
        this.telefonos= telefonos;
        this.twitter_url= twitter_url;
        this.id_empresa=1L;
    }
    
    public String getContactos() {
        return contactos;
    }

    public void setContactos(String contactos) {
        this.contactos = contactos;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFacebook_url() {
        return facebook_url;
    }

    public void setFacebook_url(String facebook_url) {
        this.facebook_url = facebook_url;
    }

    public Long getId_empresa() {
        return id_empresa;
    }

    public void setId_empresa(Long id_empresa) {
        this.id_empresa = id_empresa;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public String getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(String telefonos) {
        this.telefonos = telefonos;
    }

    public String getTwitter_url() {
        return twitter_url;
    }

    public void setTwitter_url(String twitter_url) {
        this.twitter_url = twitter_url;
    }
}