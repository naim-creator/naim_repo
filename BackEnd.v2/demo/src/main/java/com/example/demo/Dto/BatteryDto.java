package com.example.demo.Dto;


import com.example.demo.models.Company;
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
public class BatteryDto {
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
    private String image;
    private CompanyDto companyDto;
}
