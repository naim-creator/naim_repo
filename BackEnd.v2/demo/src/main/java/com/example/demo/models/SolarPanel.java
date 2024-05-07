package com.example.demo.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "solarPanel")
public class SolarPanel {

    @Id
    @GeneratedValue
    private UUID id;
    private String model;
    private Float nominal_power;
    private Float maximum_voltage;
    private Float maximum_current;
    private Float height;
    private Float width;
    private Float weight;
    private String type_cell;
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
