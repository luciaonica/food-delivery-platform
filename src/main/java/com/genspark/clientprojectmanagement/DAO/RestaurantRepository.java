package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    @Query("select r from Restaurant r where r.username = ?1")
    Restaurant findByUsername(String username);


    @Query(value = "update restaurants set picture = ?2  WHERE id = ?1", nativeQuery = true)
    @Modifying
    void updatePicture(String restaurantsId, String fileName);
}
