package com.genspark.clientprojectmanagement;

import com.genspark.clientprojectmanagement.DAO.DishRepository;
import com.genspark.clientprojectmanagement.entity.Dish;
import com.genspark.clientprojectmanagement.entity.Restaurant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest(showSql = false)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class DishRepositoryTests {
/*
    @Autowired
    private DishRepository dishRepository;

    @Test
    public void testFindByName() {
        List<Dish> list = dishRepository.findByNameContaining("pizza");

        list.forEach(System.out::println);

        assertThat(list.size()).isGreaterThan(0);
    }*/
}
