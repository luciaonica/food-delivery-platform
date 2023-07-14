package com.genspark.clientprojectmanagement.service;
import com.genspark.clientprojectmanagement.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserInfoService extends UserDetailsService {

    List<User> findAll();

    User findByUserName(String username);

    User saveUser(User user);

    User saveDeveloper(User user);

    List<User> deleteByUsername(String username);

    User updatePassword(User user);

    User updateUser(User user);
}
