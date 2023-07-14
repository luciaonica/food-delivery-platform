package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.DAO.ActivationRequestRepository;
import com.genspark.clientprojectmanagement.entity.ActivationRequest;
import com.genspark.clientprojectmanagement.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivationRequestService {

    @Autowired
    private ActivationRequestRepository repository;

    public ActivationRequest saveActivationRequest(ActivationRequest activationRequest) {

        return repository.save(activationRequest);
    }

    public List<ActivationRequest> getAllRequests() {
        return repository.findAll();
    }

    public ActivationRequest getRequestById(Integer requestId) {
        Optional<ActivationRequest> r = repository.findById(requestId);
        ActivationRequest request = null;
        if (r.isPresent()){
            request = r.get();
        } else {
            throw new RuntimeException("Request ID " + requestId + " not found");
        }
        return request;
    }

    public void approveRequest(Integer requestId) {
        ActivationRequest request = repository.findById(requestId).get();
        request.setStatus("approved");
        repository.save(request);
    }
}
