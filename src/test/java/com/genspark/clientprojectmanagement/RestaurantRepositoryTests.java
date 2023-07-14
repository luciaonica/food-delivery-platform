package com.genspark.clientprojectmanagement;

import com.genspark.clientprojectmanagement.DAO.RestaurantRepository;
import com.genspark.clientprojectmanagement.entity.Restaurant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;


import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

@DataJpaTest(showSql = false)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class RestaurantRepositoryTests {
/*
    @Autowired
    private RestaurantRepository repository;

    @Test
    public void testCreateRestaurant() {
        Restaurant restaurant = new Restaurant("restaurant1", "", "", "address", "email",
                "password", "license", new Date(), true, "", false);
        Restaurant savedRestaurant = repository.save(restaurant);

        assertThat(savedRestaurant.getId()).isGreaterThan(0);
    } */
}
