package com.genspark.clientprojectmanagement.controller;

import com.genspark.clientprojectmanagement.entity.*;
import com.genspark.clientprojectmanagement.service.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private ActivationRequestService activationRequestService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/restaurants")
    public Restaurant saveRestaurant(@RequestBody Restaurant restaurant) {

        return restaurantService.saveRestaurant(restaurant);
    }

    @PutMapping("/restaurants")
    public Restaurant updateRestaurant(@RequestBody Restaurant restaurant) {
        //User user = new User(restaurant.getUsername());
        //user.setPassword(passwordEncoder.encode(restaurant.getPassword()));
        //userInfoService.updateUser(user);

        return restaurantService.updateRestaurant(restaurant);
    }

    @GetMapping("/restaurants")
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/restaurants/{restaurantId}")
    public Restaurant getRestaurantById(@PathVariable String restaurantId) {
        return restaurantService.getRestaurantById(Integer.parseInt(restaurantId));
    }

    @PostMapping("restaurants/uploadLicense/{restaurantId}")
    public ResponseEntity<String> uploadLicenseFile(@RequestParam("file") MultipartFile file, @PathVariable String restaurantId) throws IOException {
        //int clientId = 1;

        Restaurant restaurant = restaurantService.getRestaurantById(Integer.parseInt(restaurantId));

        if (!file.isEmpty()) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            restaurant.setLicense(fileName);
            restaurantService.saveRestaurant(restaurant);

            String uploadDir = "license-files/" + restaurantId;

            AmazonS3Util.removeFolder(uploadDir);
            AmazonS3Util.uploadFile(uploadDir, fileName, file.getInputStream());
        }
        return ResponseEntity.ok("File uploaded successfully");
    }

    @PostMapping("restaurants/uploadImage/{restaurantsId}")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable String restaurantsId) throws IOException {
        //int clientId = 1;

        Restaurant restaurant = restaurantService.getRestaurantById(Integer.parseInt(restaurantsId));

        if (!file.isEmpty()) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            restaurant.setPicture(fileName);
            restaurantService.updateRestaurant(restaurant);
            System.out.println(restaurant);
            String uploadDir = "profile-images/" + restaurantsId;

            AmazonS3Util.removeFolder(uploadDir);
            AmazonS3Util.uploadFile(uploadDir, fileName, file.getInputStream());
        }
        return ResponseEntity.ok("File uploaded successfully");
    }

    @GetMapping("/restaurants/client_by_username/{username}")
    public Restaurant getRestaurantByUsername(@PathVariable String username) {
        return restaurantService.getRestaurantByUsername(username);
    }

    @GetMapping("/restaurants/{restaurantId}/update_status/{status}")
    public String updateRestaurantStatus(@PathVariable(name="restaurantId") String restaurantId, @PathVariable(name="status") boolean status,
                                      HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        Integer restId = Integer.parseInt(restaurantId);
        Restaurant restaurant = restaurantService.getRestaurantById(restId);
        restaurantService.updateRestaurantStatus(restId, status);

        String action = status ? "enabled" : "disabled";
        String message = "Restaurant " + restaurant.getName() + " was " + action;

        sendEmail(request, restId, message);
        return "Status updated";
    }

    public String sendEmail(HttpServletRequest request, Integer restId, String content)
            throws MessagingException, UnsupportedEncodingException {
        Restaurant restaurant = restaurantService.getRestaurantById(restId);

        JavaMailSenderImpl mailSender = MailSenderUtility.prepareMailSender();

        String toAddress = restaurant.getEmail();
        String subject = "Hello";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("tatiana56guzun@gmail.com", "Administrator");
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content);

        mailSender.send(message);

        return "Sent successfully";
    }

    @GetMapping("/restaurants/getImageUrl/{restaurantId}")
    public String getImageUrl(@PathVariable(name="restaurantId") String restaurantId) {
        // Logic to retrieve the image URL
        Integer id = Integer.parseInt(restaurantId);

        Restaurant restaurant = restaurantService.getRestaurantById(id);

        String imageUrl = Constants.S3_BASE_URI + "/profile-images/" + id + "/" + restaurant.getPicture();

        return imageUrl;
    }

    @PostMapping("activation-requests")
    public ActivationRequest createActivationRequest(@RequestBody ActivationRequest activationRequest) {
        Restaurant restaurant = restaurantService.getRestaurantById(activationRequest.getRestaurant().getId());
        restaurantService.saveRequest(restaurant, true);
        return activationRequestService.saveActivationRequest(activationRequest);
    }

    @GetMapping("activation-requests")
    public List<ActivationRequest> getAllActivationRequest() {
        return activationRequestService.getAllRequests();
    }

    @GetMapping("approve/{requestId}")
    public String approveRequest(@PathVariable(name="requestId") String requestId, HttpServletRequest httpServletRequest)
            throws MessagingException, UnsupportedEncodingException {
        Integer id = Integer.parseInt(requestId);
        ActivationRequest request = activationRequestService.getRequestById(id);
        Restaurant restaurant = request.getRestaurant();
        restaurantService.updateRestaurantStatus(restaurant.getId(), true);
        restaurantService.saveRequest(restaurant, false);
        activationRequestService.approveRequest(id);
        String message = "Restaurant " + restaurant.getName() + " was Enabled";
        sendEmail(httpServletRequest, restaurant.getId(), message);
        return "Request approved";

    }
}
