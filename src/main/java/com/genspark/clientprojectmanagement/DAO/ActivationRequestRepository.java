package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.ActivationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationRequestRepository extends JpaRepository<ActivationRequest, Integer> {
}
