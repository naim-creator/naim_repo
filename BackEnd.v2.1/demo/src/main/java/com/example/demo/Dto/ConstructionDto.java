package com.example.demo.Dto;


import com.example.demo.models.Company;
import com.example.demo.models.Customer;
import com.example.demo.models.Devis;
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
    private Customer customer;
    private Devis devis;
    private Company company;
}
