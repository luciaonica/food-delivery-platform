package com.genspark.clientprojectmanagement;

import com.genspark.clientprojectmanagement.service.AmazonS3Util;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

public class AmazonS3UtilTests {

   /* @Test
    public void testListFolder() {
        String folderName = "dish-images";
        List<String> list =  AmazonS3Util.listFolder(folderName);
        list.forEach(System.out::println);
    }

    @Test
    public void testUploadFile() throws FileNotFoundException {
        String folderName = "dish-images/1";
        String fileName = "agla.png";
        String filePath = "E:\\Plant_photos\\samples\\" + fileName;

        InputStream inputStream = new FileInputStream(filePath);

        AmazonS3Util.uploadFile(folderName,fileName,inputStream);
    }

    @Test
    public void testDeleteFile()  {
        String fileName = "dish-images/agla.png";
        AmazonS3Util.deleteFile(fileName);
    }

    @Test
    public void testRemoveFolder()  {
        String folderName = "test-pack";
        AmazonS3Util.removeFolder(folderName);
    }*/
}
