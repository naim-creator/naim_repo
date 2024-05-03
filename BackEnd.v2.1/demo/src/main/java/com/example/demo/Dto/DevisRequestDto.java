package com.example.demo.Dto;

import com.example.demo.models.Company;
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
public class DevisRequestDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String location;
    private String post_code;
    private String building_type;
    private Integer available_area;
    private String roof_type;
    private Boolean electricity_access;
    private Float consumption;
    private String status;
    private Devis devis;
    private Company company;
}
