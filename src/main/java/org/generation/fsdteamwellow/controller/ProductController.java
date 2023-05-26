package org.generation.fsdteamwellow.controller;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;

import org.generation.fsdteamwellow.service.ProductService;
import org.generation.fsdteamwellow.repository.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Value;
import org.generation.fsdteamwellow.component.FileUploadUtil;
import org.generation.fsdteamwellow.controller.dto.ProductDTO;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/product")

public class ProductController {
    @Value("${image.folder}")
    private String imageFolder;

    private final ProductService productService;

    // Dependency Injection of the ItemService object so that the controller can call any methods in the ItemServiceMySQL class
    public ProductController( @Autowired ProductService productService )
    {
        this.productService = productService;
    }


    // 1) API endpoint to get all items to display on the frontend
    // Front-end will issue a GET http request to this endpoint

    // without CrossOrigin, the frontend will not be able to call this endpoint as it is not a valid domain (eg. tp.edu.sg, generation.org)
    // localhost is not a valid domain
    @CrossOrigin
    @GetMapping( "/all" )
    public Iterable<Product> getItems()
    {
        //@@ Local Dev - To display images from local folder
//        for (Product image: productService.all())
//        {
//            String setURL = imageFolder + "/" + image.getImage1();
//            image.setImage1(setURL);
//        }



        /* @@ Deploy Azure Cloud - To display images from the Server Container
        * 26 May updated with Azure Blob string key
        * */
        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=wellowimage;AccountKey=/Nud8V7H2XkCvKDxqHmKdLpFri/ntCWxRheus6pqcRKCLpiGhETcqW8JFMtzgohfSTLVrfGSumK2+ASt3uZkHw==;EndpointSuffix=core.windows.net";
//System.out.println("Connect String: " + connectStr2);
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
        String containerName = "productimages";
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
//        BlobClient blobClient = containerClient.getBlobClient(ProductService.all().get(0).getImageUrl());
        BlobClient blobClient = containerClient.getBlobClient(productService.all().iterator().next().getImage1());

//Loop through the ArrayList of itemService.all() and append the Blob url to the imageUrl
        for (Product image: productService.all()) {
            String setURL = blobClient.getAccountUrl() + "/" + containerName + "/" + image.getImage1();
            image.setImage1(setURL);
        }

        // return in the Controller is the response to the frontend/Client
        return productService.all();
    }
    // the id value will be sent from the frontend through the API URL parameter
    @CrossOrigin
    @GetMapping( "/{id}" )
    public Product findItemById( @PathVariable Integer id )
    {
        return productService.findById( id );
    }



    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id )
    {
        productService.delete( id );
    }

    @CrossOrigin
    @PostMapping("/add")
    public void save(  @RequestParam(name="category", required = true) String category,
                       @RequestParam(name="keywords", required = true) String keywords,
                       @RequestParam(name="name", required = true) String name,
                       @RequestParam(name="image1", required = true) String image1,
                       @RequestParam(name="img_credit_1", required = true) String imageCredit1,
                       @RequestParam(name="image2", required = false) String image2,
                       @RequestParam(name="img_credit_2", required = false) String imageCredit2,
                       @RequestParam(name="stock_count", required = true) Integer stock_count,
                       @RequestParam(name="price_unit", required = true) String price_unit,
                       @RequestParam(name="price_value", required = true) Double price_value,
                       @RequestParam(name="summary", required = true) String summary,
                       @RequestParam(name="description", required = true) String description,
                       @RequestParam("imagefile") MultipartFile multipartFile) throws IOException
    {
        // eg. t_shirts.jpg
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());

        // productimages, t_shirts.jpg, object
        FileUploadUtil.saveFile(imageFolder, fileName, multipartFile);

        //String fullPath = imageFolder + "/" + imageUrl;

        ProductDTO productDto = new ProductDTO( category,  keywords,  name,  image1,  imageCredit1, image2, imageCredit2,  stock_count,  price_unit,  price_value,  summary,  description);
        productService.save(new Product(productDto));
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public void update(  @RequestParam(name="category", required = true) String category,
                       @RequestParam(name="keywords", required = true) String keywords,
                       @RequestParam(name="name", required = true) String name,
                       @RequestParam(name="image1", required = true) String image1,
                       @RequestParam(name="img_credit_1", required = true) String imageCredit1,
                       @RequestParam(name="image2", required = false) String image2,
                       @RequestParam(name="img_credit_2", required = false) String imageCredit2,
                       @RequestParam(name="stock_count", required = true) Integer stock_count,
                       @RequestParam(name="price_unit", required = true) String price_unit,
                       @RequestParam(name="price_value", required = true) Double price_value,
                       @RequestParam(name="summary", required = true) String summary,
                       @RequestParam(name="description", required = true) String description,
                       @RequestParam("imagefile") MultipartFile multipartFile) throws IOException
    {
        // eg. t_shirts.jpg
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());

        // productimages, t_shirts.jpg, object
        FileUploadUtil.saveFile(imageFolder, fileName, multipartFile);

        //String fullPath = imageFolder + "/" + imageUrl;

        ProductDTO productDto = new ProductDTO( category,  keywords,  name,  image1,  imageCredit1, image2, imageCredit2,  stock_count,  price_unit,  price_value,  summary,  description);
        productService.save(new Product(productDto));
    }
}
