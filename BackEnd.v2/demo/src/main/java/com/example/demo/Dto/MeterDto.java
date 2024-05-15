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
public class MeterDto {
    private UUID id;
    private String model;
    private String type;
    private String connexion_type;
    private Float capacity;
    private Float price;
    private Integer quantity;
    private String image;
    private CompanyDto companyDto;
}
