package org.generation.fsdteamwellow.component;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;

/**
 * Azure Blob Storage quickstart
 */

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;

public class FileUploadUtil {

    // MultipartFile is a SpringBoot class that represents an uploaded file as an object
    public static void saveFile(String uploadDir1, String fileName,
                                MultipartFile multipartFile) throws IOException {


        /* This is the test setup using Local storage */
        // directory to setup the path to save the image
        Path uploadPath1 = Paths.get(uploadDir1);
        try (InputStream inputStream = multipartFile.getInputStream()) {

            Path filePath1 = uploadPath1.resolve(fileName);
            Files.copy(inputStream, filePath1, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }


        /* This is the setup using Azure storage to upload images
        *  updated 26th May with Azure Blob string key
        * */
       String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=wellowimage;AccountKey=/Nud8V7H2XkCvKDxqHmKdLpFri/ntCWxRheus6pqcRKCLpiGhETcqW8JFMtzgohfSTLVrfGSumK2+ASt3uZkHw==;EndpointSuffix=core.windows.net";

        // create a connection between this web application with the storage container that we created in Azure
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();

        /* specify which container we want to get the images from
         * updated 26th May with Azure Blob folder name
        * */
        String containerName = "productimages";

        // to get the container with the images
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        // fileName refers to which image fileName that we want to upload (eg. t-shirt_new.jpg)
        BlobClient blobClient = containerClient.getBlobClient(fileName);
        InputStream inputStream = multipartFile.getInputStream();
        blobClient.upload(inputStream);
    }
}
