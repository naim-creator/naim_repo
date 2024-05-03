package com.example.demo.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "spot")
public class Spot {

    @Id
    @GeneratedValue
    private UUID id;
    private String description;
    @ManyToMany
    private List<Activity> activities;
}
