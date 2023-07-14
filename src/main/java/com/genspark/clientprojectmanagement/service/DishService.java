package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.DAO.DishRepository;
import com.genspark.clientprojectmanagement.entity.Dish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    public Dish saveDish(Dish dish) {

        return dishRepository.save(dish);
    }

    public List<Dish> getDishesByRestaurantId(int restaurantId) {
        return dishRepository.findByRestaurantId(restaurantId);
    }

    public Dish getDishById(int id) {
        Optional<Dish> d = dishRepository.findById(id);
        Dish dish = null;
        if (d.isPresent()) {
            dish = d.get();
        } else {
            throw new RuntimeException("Dish ID " + id + " not found");
        }
        return dish;
    }

    public Dish updateDish(Dish dish) {
        return dishRepository.save(dish);
    }

    public String deleteDish(int id) {
        dishRepository.deleteById(id);
        return "Deleted";
    }

    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }

    public List<Dish> gsearchDishes(String name) {
        return dishRepository.findByNameContaining(name);
    }
}
