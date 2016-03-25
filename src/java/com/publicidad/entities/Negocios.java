package com.publicidad.entities;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.xml.bind.annotation.XmlRootElement;
@Entity
@Table(name = "negocio")
@XmlRootElement  
public class Negocios {
    public Negocios() {} // JAXB needs this
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idNegocio;
    private String nombreNegocio;
    private String direccion;
    private String coordenadas;
    private String logotipo;
    private byte[] image;
    public String getCoordenadas() {
        return coordenadas;
    }

    public void setCoordenadas(String coordenadas) {
        this.coordenadas = coordenadas;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getIdNegocio() {
        return idNegocio;
    }

    public void setIdNegocio(Long idNegocio) {
        this.idNegocio = idNegocio;
    }

    public String getLogotipo() {
        return logotipo;
    }

    public void setLogotipo(String logotipo) {
        this.logotipo = logotipo;
    }

    public String getNombreNegocio() {
        return nombreNegocio;
    }

    public void setNombreNegocio(String nombreNegocio) {
        this.nombreNegocio = nombreNegocio;
    }

    @Override
    public String toString() {
        return "idNegocio: "+getIdNegocio()+", nombreNegocio: "+getNombreNegocio()+", direccion: "+getDireccion()+", coordenadas: "+getCoordenadas()+", logotipo"+getLogotipo();
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    
}
