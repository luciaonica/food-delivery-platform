package com.genspark.clientprojectmanagement.controller;

import com.genspark.clientprojectmanagement.entity.User;
import com.genspark.clientprojectmanagement.service.UserInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

    private UserInfoService userInfoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserRestController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    // GET /users endpoint for getting all users
    @GetMapping("/users")
    public List<User> findAll() {
        return userInfoService.findAll();
    }

    //  GET users/{username} endpoint for getting single user info
    @GetMapping("/users/{username}")
    public User getUser(@PathVariable String username) {
        User user = userInfoService.findByUserName(username);
        if (user == null) {
            throw new RuntimeException("Username not found: " + username);
        }

        return user;
    }

    // POST /users/dev for adding a new user
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {

        User dbUser = userInfoService.saveUser(user);

        return dbUser;
    }

    // POST /users/dev for adding a new developer
    @PostMapping("/dev")
    public User addAdmin(@RequestBody User user) {

        User dbUser = userInfoService.saveDeveloper(user);

        return dbUser;
    }

    // POST /users/login for checking if the user details are correct (user for login in front-end)

    @PostMapping("/users/login")
    public User checkUser(@RequestBody User user) {
        User dbUser = userInfoService.findByUserName(user.getUsername());
        if (dbUser.getUsername() == null) {
            return new User();
        }
        if (dbUser.getUsername().equals(user.getUsername()) && passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return dbUser;
        } else {
            return new User(); //returns null user
        }
    }

    // DELETE /users/{username} for adding delete
    @DeleteMapping("/users/{username}")
    public List<User> deleteUser(@PathVariable String username){
        User temp = userInfoService.findByUserName(username);
        if(temp == null){
            throw new RuntimeException("Username not found: " + username);
        }
        List<User> rv = userInfoService.deleteByUsername(username);
        return rv;
    }

    // PUT /users/{username} for updating password
    @PutMapping("/users/{username}")
    public User updatePassword(@PathVariable String username, @RequestBody User user){
        User dbUser = userInfoService.findByUserName(user.getUsername());
        if (dbUser.getUsername() == null) {
            return new User();
        }
        return userInfoService.updatePassword(user);
    }
}
