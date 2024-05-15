package com.example.demo.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private CompanyDto companyDto;
    private List<ConstructionDto> constructionDtoList;
}
