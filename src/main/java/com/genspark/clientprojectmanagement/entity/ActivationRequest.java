package com.genspark.clientprojectmanagement.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "activation_request")
public class ActivationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    private Date requestDate;

    private String status;

    public ActivationRequest() {
    }

    public ActivationRequest(int id, Restaurant restaurant, Date requestDate, String status) {
        this.id = id;
        this.restaurant = restaurant;
        this.requestDate = requestDate;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
