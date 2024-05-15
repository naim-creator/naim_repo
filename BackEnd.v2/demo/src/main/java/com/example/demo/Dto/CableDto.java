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
public class CableDto {

    private UUID id;
    private String model;
    private String type;
    private Float length;
    private Float diameter;
    private Float nominal_voltage;
    private String section_transversal;
    private String material;
    private String isolation;
    private Float resistance;
    private Float price;
    private Integer quantity;
    private String image;
    private CompanyDto companyDto;
}
