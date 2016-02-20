package org.apache.struts.publicidad.action;
import com.sun.media.jai.codec.SeekableStream;
import java.awt.RenderingHints;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.media.jai.JAI;
import javax.media.jai.OpImage;
import javax.media.jai.RenderedOp;
/**
 *
 * @author Jorge
 */
public class ImageCompressor {
    public static void compress(String fileOriginal,String fileCopy ) throws IOException {
        File infile = new File(fileOriginal);
        File outfile = new File(fileCopy);

        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(
                infile));
        BufferedOutputStream bos = new BufferedOutputStream(
                new FileOutputStream(outfile));

        SeekableStream s = SeekableStream.wrapInputStream(bis, true);

        RenderedOp image = JAI.create("stream", s);
        ((OpImage) image.getRendering()).setTileCache(null);

        RenderingHints qualityHints = new RenderingHints(
                RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);

        RenderedOp resizedImage = JAI.create("SubsampleAverage", image, 0.05,0.05, qualityHints);

        JAI.create("encode", resizedImage, bos, "JPEG", null);

    }
/*
    public static void main(String[] args) throws IOException {

        new ImageCompressor().compress();
    }*/
    static
    {
    System.setProperty("com.sun.media.jai.disableMediaLib", "true");
    }
    /*
    public static void  main(String[] args){
        String file1 = "c:\\nada\\imagen1.jpg";
        String file2 = file1.replaceAll(".jpg", "-2.jpg");
        System.out.println("file2: "+file2);
    }*/
}
