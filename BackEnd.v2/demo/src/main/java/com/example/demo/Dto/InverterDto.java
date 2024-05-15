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
public class InverterDto {
    private UUID id;
    private String model;
    private Float nominal_power;
    private Float tension;
    private String frequency;
    private String type;
    private Integer phase_number;
    private Float maximum_circuit_voltage;
    private Float minimal_circuit_current;
    private Float price;
    private Integer quantity;
    private String image;
    private CompanyDto companyDto;
}
