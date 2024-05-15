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

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DevisDto {

    private UUID idDevis;
    private LocalDate date;
    private String ref;
    private String about;
    private Float total;
    private MaterielSolarPanel solarPanel;
    private MaterielInverter inverter;
    private MaterielSystemFixing systemFixing;
    private MaterielCable cable;
    private MaterielBattery battery;
    private MaterielMeter meter;
    private DevisRequestDto devisRequestDto;
    private CompanyDto companyDto;
}
