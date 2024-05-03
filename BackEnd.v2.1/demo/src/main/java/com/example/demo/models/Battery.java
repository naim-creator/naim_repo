package com.example.demo.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "battery")
public class Battery {
    @Id
    @GeneratedValue
    private UUID id;
    private String model;
    private String type;
    private Float storage_capacity;
    private Float nominal_voltage;
    private Float maximum_load_voltage;
    private Float maximum_discharge_voltage;
    private String life_cycle;
    private Float operating_temperature;
    private String lifespan;
    private Date date_manufacture;
    private Float price;
    private Integer quantity;
    @Lob
    @Column(name = "image", length = 500000000)
    private String image;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne
    private Company company;
}
