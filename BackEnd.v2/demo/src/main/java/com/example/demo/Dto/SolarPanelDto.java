package com.example.demo.Dto;


import com.example.demo.models.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SolarPanelDto {
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
    private String image;
    private Company company;
}
