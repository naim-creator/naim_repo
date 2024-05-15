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
public class SystemFixingDto {
    private UUID id;
    private String model;
    private String type;
    private String materiel;
    private Float charge;
    private Float height;
    private Float width;
    private String installation_method;
    private String adaptability;
    private Float price;
    private Integer quantity;
    private String image;
    private CompanyDto companyDto;
}
