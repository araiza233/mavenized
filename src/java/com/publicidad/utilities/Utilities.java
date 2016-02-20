/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.publicidad.utilities;

import com.publicidad.entities.JSONData;
import java.util.ArrayList;
import java.util.List;

public class Utilities {
    public static float String2Float(String number){
        return Float.parseFloat(number);
    }
    public static String Float2String(Float number){
        return Float.toString(number);
    }
    public static int String2int(String number){
        return Integer.parseInt(number);
    }
    public static List test(){
        ArrayList lista = new ArrayList();
        JSONData j1 = new JSONData();
        j1.setLabel("label1");
        j1.setValue("value1");
        lista.add(j1);
        
        JSONData j2 = new JSONData();
        j2.setLabel("label2");
        j2.setValue("value2");
        lista.add(j2);
        
        JSONData j3 = new JSONData();
        j3.setLabel("label3");
        j3.setValue("value3");
        lista.add(j3);
        
        JSONData j4 = new JSONData();
        j4.setLabel("label1");
        j4.setValue("value1");
        lista.add(j4);
        
        return lista;
    }
}





























