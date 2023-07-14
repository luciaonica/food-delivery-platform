package com.genspark.clientprojectmanagement.controller;

import com.genspark.clientprojectmanagement.entity.*;
import com.genspark.clientprojectmanagement.service.AmazonS3Util;
import com.genspark.clientprojectmanagement.service.DishService;
import com.genspark.clientprojectmanagement.service.RestaurantService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class DishController {
    @Autowired
    private DishService dishService;

    @GetMapping("/dishes")
    public List<Dish> getAllDishes() {
        return dishService.getAllDishes();
    }

    @PostMapping("/dishes")
    public Dish saveDish(@RequestBody Dish dish) {
        return dishService.saveDish(dish);
    }

    @GetMapping("/restaurants/dishes/{restaurantId}")
    public List<Dish> getDishesByRestaurantId(@PathVariable int restaurantId) {
        return dishService.getDishesByRestaurantId(restaurantId);
    }

    @PostMapping("dishes/uploadImage/{dishId}")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable String dishId) throws IOException {
        //int clientId = 1;

        Dish dish = dishService.getDishById(Integer.parseInt(dishId));

        if (!file.isEmpty()) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            System.out.println(fileName + "     ttttttttttttttttttttttttttttttttttttttttt");

            dish.setPicture(fileName);
            dishService.saveDish(dish);
            System.out.println(dish);
            String uploadDir = "dish-images/" + dishId;

            AmazonS3Util.removeFolder(uploadDir);
            AmazonS3Util.uploadFile(uploadDir, fileName, file.getInputStream());
        }
        return ResponseEntity.ok("File uploaded successfully");
    }

    @GetMapping("/dishes/getImageUrl/{dishId}")
    public String getImageUrl(@PathVariable(name="dishId") String dishId) {
        // Logic to retrieve the image URL
        Integer id = Integer.parseInt(dishId);

        Dish dish = dishService.getDishById(id);

        String imageUrl = Constants.S3_BASE_URI + "/dish-images/" + id + "/" + dish.getPicture();

        return imageUrl;
    }

    @GetMapping("/dishes/{dishId}")
    public Dish getDishById(@PathVariable String dishId) {
        return dishService.getDishById(Integer.parseInt(dishId));
    }

    @PutMapping("/dishes")
    public Dish updateDish(@RequestBody Dish dish) {
        return dishService.updateDish(dish);
    }

    @DeleteMapping("/dishes/{dishId}")
    public String deleteDish(@PathVariable String dishId) {
        return dishService.deleteDish(Integer.parseInt(dishId));
    }

    @GetMapping("/search/findByName")
    public List<Dish> searchDishes(@Param("name") String name) {
        return dishService.gsearchDishes(name);
    }

}
