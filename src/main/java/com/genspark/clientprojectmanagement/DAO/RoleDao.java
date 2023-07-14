package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Role;

public interface RoleDao {

    public Role findRoleByName(String roleName);
}
