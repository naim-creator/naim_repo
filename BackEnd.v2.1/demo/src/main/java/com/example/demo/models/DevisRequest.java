package com.example.demo.models;
import com.example.demo.embedded.PotentialCustomer;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "devisRequest")
public class DevisRequest {
    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String location;
    private String post_code;
    private String building_type;
    private Integer available_area;
    private String roof_type;
    private Boolean electricity_access;
    private Float consumption;
    private String status;
    @OneToOne(mappedBy = "devisRequest")
    private Devis devis;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne
    private Company company;
}
