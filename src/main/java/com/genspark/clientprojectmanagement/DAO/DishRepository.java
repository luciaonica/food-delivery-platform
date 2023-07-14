package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DishRepository extends JpaRepository<Dish, Integer> {

    @Query("select d from Dish d where d.restaurant.id= ?1")
    List<Dish> findByRestaurantId(int restaurantId);

    List<Dish> findByNameContaining(@Param("name") String name);
}
