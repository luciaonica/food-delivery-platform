package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.DAO.RestaurantRepository;
import com.genspark.clientprojectmanagement.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private PasswordEncoder encoder;

    public Restaurant saveRestaurant(Restaurant restaurant) {
        restaurant.setEnabled(true);
        restaurant.setPassword(encoder.encode(restaurant.getPassword()));
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Restaurant restaurant) {
        System.out.println("PASSWORD     " + restaurant.getPassword());
        if (restaurant.getPassword() == null) {
            Restaurant existingRestaurant = restaurantRepository.findById(restaurant.getId())
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            restaurant.setPassword(existingRestaurant.getPassword());

        } else {
            restaurant.setPassword(encoder.encode(restaurant.getPassword()));
        }

        return restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(int restaurantId) {
        Optional<Restaurant> r = restaurantRepository.findById(restaurantId);
        Restaurant restaurant = null;
        if (r.isPresent()){
            restaurant = r.get();
        } else {
            throw new RuntimeException("Restaurant ID " + restaurantId + " not found");
        }
        return restaurant;
    }

    public Restaurant getRestaurantByUsername(String username) {
        Restaurant restaurant = restaurantRepository.findByUsername(username);
        return restaurant;
    }

    public void updateRestaurantStatus(Integer restId, boolean status) {
        Restaurant restaurant = restaurantRepository.findById(restId).get();
        restaurant.setEnabled(status);
        restaurantRepository.save(restaurant);
    }


    public void updatePicture(String restaurantsId, String fileName) {
        restaurantRepository.updatePicture(restaurantsId, fileName);
    }

    public void saveRequest(Restaurant restaurant, boolean status) {
        restaurant.setHasPendingRequest(status);
        restaurantRepository.save(restaurant);
    }
}
