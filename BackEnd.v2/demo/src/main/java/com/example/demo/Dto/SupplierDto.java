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
public class SupplierDto {
    private UUID id;
    private String Name;
    private String phone;
    private String email;
    private CompanyDto companyDto;
}
