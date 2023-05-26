package org.generation.fsdteamwellow.repository.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.generation.fsdteamwellow.controller.dto.ProductDTO;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // this is to auto increment the ID
    private Integer productid;

    //retrieve product item by ID - has to be an object
    private String category;
    private String keywords;
    private String name;
    private String image1;
    private  String img_credit_1;

    private String image2;
    private  String img_credit_2;

    private Integer stock_count;

    private String price_unit;

    private Double price_value;

    private String summary;
    private String description;
    //Item Class is used to map against the database table
    //Any CRUD operations, JPA will make use of this Item Class
    // For Read or Delete operation, the JPA requires an empty constructor to populate all the records from the database table as the Item instance

    // constructor overloading
    public Product() {}

    // DTO stands for Data Transfer Object is a setup in the Controller layer
    // Create and Update operation, JPA requires the ItemDTO object to be sent via the controller
    public Product(ProductDTO productDTO)
    {
        //Transfer the object (with the data) to Entity Class for mapping with the
        // database table columns and to be able to save the data in the columns
        this.name = productDTO.getName();
        this.description = productDTO.getDescription();
        this.image1 = productDTO.getImage1();
        this.img_credit_1 = productDTO.getImg_credit_1();
        this.image2 = productDTO.getImage2();
        this.img_credit_2 = productDTO.getImg_credit_2();
        this.category = productDTO.getCategory();
        this.keywords = productDTO.getKeywords();
        this.stock_count = productDTO.getStock_count();
        this.price_unit = productDTO.getPrice_unit();
        this.price_value = productDTO.getPrice_value();
        this.summary = productDTO.getSummary();


    }

    public Integer getId()
    {
        return productid;
    }

    public void setId( Integer id )
    {
        this.productid = id;
    }

    public String getCategory()
    {
        return category;
    }

    public void setCategory( String category )
    {
        this.category = category;
    }

    public String getKeywords()
    {
        return keywords;
    }

    public void setKeywords( String keywords )
    {
        this.keywords = keywords;
    }

    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }



    public String getImage1()
    {
        return image1;
    }

    public void setImage1( String image1 )
    {
        this.image1 = image1;
    }

    public String getImage2()
    {
        return image2;
    }

    public void setImage2( String image2 )
    {
        this.image2 = image2;
    }

    public String getImg_credit_2()
    {
        return img_credit_2;
    }

    public void setImg_credit_2( String img_credit_2 )
    {
        this.img_credit_2 = img_credit_2;
    }

    public String getImg_credit_1()
    {
        return img_credit_1;
    }

    public void setImg_credit_1( String img_credit_1 )
    {
        this.img_credit_1 = img_credit_1;
    }

    public Integer getStock_count()
    {
        return stock_count;
    }

    public void setStock_count( Integer stock_count )
    {
        this.stock_count = stock_count;
    }

    public String getPrice_unit()
    {
        return price_unit;
    }

    public void setPrice_unit( String price_unit )
    {
        this.price_unit = price_unit;
    }

    public Double getPrice_value()
    {
        return price_value;
    }

    public void setPrice_value( Double price_value )
    {
        this.price_value = price_value;
    }

    public String getSummary()
    {
        return summary;
    }

    public void setSummary( String summary )
    {
        this.summary = summary;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription( String description )
    {
        this.description = description;
    }

    @Override
    public String toString()
    {
        // return all
        return "Item{" + "id=" + productid + ", name='" + name + '\'' + ", description='" +
                description + '\'' + ", imageUrl='"
                + image1 + '\'' + ",style='" + category + '\'' + ", price='" + price_value +
                '}';
    }



}
