package com.example.demo.models;

import com.example.demo.embedded.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "devis")
@Data
public class Devis {
    @Id
    @GeneratedValue
    private UUID idDevis;
    private LocalDate date;
    private String ref;
    private String about;
    @Embedded
    private MaterielSolarPanel solarPanel;
    @Embedded
    private MaterielInverter inverter;
    @Embedded
    private MaterielSystemFixing systemFixing;
    @Embedded
    private MaterielCable cable;
    @Embedded
    private MaterielBattery battery;
    @Embedded
    private MaterielMeter meter;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToOne
    private DevisRequest devisRequest;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToOne(mappedBy = "devis")
    private Construction construction;
    private Float total;
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @ManyToOne
    private Company company;
}
