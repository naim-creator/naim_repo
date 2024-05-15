package com.example.demo.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConstructionDto {
    private UUID id;
    private String description;
    private String location;
    private CustomerDto customerDto;
    private DevisDto devisDto;
    private CompanyDto companyDto;
}
