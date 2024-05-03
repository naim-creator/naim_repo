package com.example.demo.models;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "worker")
public class Worker {
    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String lastName;
    private String address;
    @Column(unique = true)
    private String email;
    private String phone;
    private String profession;
    @Lob
    @Column( name = "image", length = 1000000000)
    private String image;
    @ManyToMany
    private List<Activity> activities;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne
    private Company company;
}
