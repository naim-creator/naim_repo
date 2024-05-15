package com.example.demo.models;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "construction")
public class Construction {
    @Id
    @GeneratedValue
    private UUID id;
    private String description;
    private String location;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToMany(mappedBy = "construction")
    private List<Bill> billList;
    @OneToMany(mappedBy = "construction")
    private List<Activity> activities;
    @OneToMany(mappedBy = "construction")
    private List<Amendment> amendment;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToOne
    private Devis devis;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne
    private Customer customer;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne
    private Company company;
}
