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
public class ContactorDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private Company company;
}
