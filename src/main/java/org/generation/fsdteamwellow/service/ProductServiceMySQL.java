package org.generation.fsdteamwellow.service;

import org.generation.fsdteamwellow.repository.ProductRepository;
import org.generation.fsdteamwellow.repository.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ProductServiceMySQL implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceMySQL(@Autowired ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }



    @Override
    public Product save(Product product)
    {
        // since we have done the dependency injection of the ItemRepository interface, therefore now we can any methods from the CrudRepository class
        return productRepository.save(product);
    }


    @Override
    public void delete(int productId)
    {
        productRepository.deleteById(productId);
    }  // dependency object(s) CRUDRepository class object


    @Override
    public ArrayList<Product> all()
    {
        //1) @Query - Query class provided by SpringBoot : select * from item
        //2) Repository class provided by SpringBoot : we do not need to write a single query
        ArrayList<Product> result = new ArrayList<>();
        productRepository.findAll().forEach(result::add);
        return result;
    }


    @Override
    public Product findById(int productId)
    {
        // Optional is a list that accept either 0 or 1 item
        Optional<Product> product = productRepository.findById(productId);
        Product productResponse = product.get();
        return productResponse;
    }

}
