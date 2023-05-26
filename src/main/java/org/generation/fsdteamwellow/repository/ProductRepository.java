package org.generation.fsdteamwellow.repository;

import org.generation.fsdteamwellow.repository.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {
}
