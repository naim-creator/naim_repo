package com.example.demo.Dto;

import com.example.demo.embedded.*;
import com.example.demo.models.Company;
import com.example.demo.models.Construction;
import com.example.demo.models.ContactorRequest;
import com.example.demo.models.DevisRequest;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DevisDto {

    private UUID id;
    private Date date;
    private String ref;
    private String status;
    private Float total;
    private Construction construction;
    private Company company;
    private MaterielSolarPanel solarPanel;
    private MaterielInverter inverter;
    private MaterielSystemFixing systemFixing;
    private MaterielCable cable;
    private MaterielBattery battery;
    private MaterielMeter meter;
    private DevisRequest devisRequest;
}
