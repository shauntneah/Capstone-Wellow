package org.generation.fsdteamwellow.controller.dto;

public class ProductDTO {

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

    public ProductDTO(String category, String keywords, String name, String image1, String imageCredit1, String image2, String imageCredit2, Integer stock_count, String price_unit, Double price_value, String summary, String description) {
        this.category = category;
        this.keywords = keywords;
        this.name = name;
        this.image1 = image1;
        this.img_credit_1 = imageCredit1;
        this.image2 = image2;
        this.img_credit_2 = imageCredit2;
        this.stock_count = stock_count;
        this.price_unit = price_unit;
        this.price_value = price_value;
        this.summary = summary;
        this.description = description;
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

    public String getImg_credit_1()
    {
        return img_credit_1;
    }

    public void setImg_credit_1( String img_credit_1 )
    {
        this.img_credit_1 = img_credit_1;
    }

    public String getImg_credit_2()
    {
        return img_credit_2;
    }

    public void setImg_credit_2( String img_credit_2 )
    {
        this.img_credit_2 = img_credit_2;
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

}
