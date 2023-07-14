package com.genspark.clientprojectmanagement.DAO;

import java.util.List;
import com.genspark.clientprojectmanagement.entity.User;

public interface UserDao {
    User findByUsername(String username);

    User save(User user);

    List<User> getAllUsers();

    void deleteByUsername(String userName);

    User updatePassword(User user);
}
