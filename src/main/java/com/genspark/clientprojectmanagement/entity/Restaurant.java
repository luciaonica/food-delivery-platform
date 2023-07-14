package com.genspark.clientprojectmanagement.entity;

import jakarta.persistence.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 45, nullable = false, unique = true)
    private String name;

    @Column(length = 45, nullable = false)
    private String username;

    @Column(length = 64, nullable = false)
    private String address;

    @Column(length = 45, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 255, nullable = false)
    private String license;

    @Column(length = 255)
    private String picture;

    private Date registerDate;

    private boolean enabled;

    @Column(length = 1024)
    private String description;

    private boolean hasPendingRequest;

    public Restaurant() {
    }

    public Restaurant(String name, String username, String address, String email, String password, String license, String picture, Date registerDate, boolean enabled, String description, boolean hasPendingRequest) {
        this.name = name;
        this.username = username;
        this.address = address;
        this.email = email;
        this.password = password;
        this.license = license;
        this.picture = picture;
        this.registerDate = registerDate;
        this.enabled = enabled;
        this.description = description;
        this.hasPendingRequest = hasPendingRequest;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isHasPendingRequest() {
        return hasPendingRequest;
    }

    public void setHasPendingRequest(boolean hasPendingRequest) {
        this.hasPendingRequest = hasPendingRequest;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", license='" + license + '\'' +
                ", picture='" + picture + '\'' +
                ", registerDate=" + registerDate +
                ", enabled=" + enabled +
                '}';
    }

    @Transient
    public String getLicensePath() {
        return Constants.S3_BASE_URI + "/license-files/" + this.id + "/" + this.license;
    }

    @Transient
    public String getImageUrl() {
        return Constants.S3_BASE_URI + "/profile-images/" + this.id + "/" + this.picture;
    }
}
