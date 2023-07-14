package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDaoImpl implements RoleDao{

    private EntityManager entityManager;

    public RoleDaoImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public Role findRoleByName(String roleName) {
        TypedQuery<Role> query = entityManager.createQuery("from Role where name=:roleName", Role.class);
        query.setParameter("roleName", roleName);

        try {
            Role role =  query.getSingleResult();
            return role;
        } catch (Exception e){
            return null;
        }
    }
}
