package com.example.demo.Dto;


import com.example.demo.models.Contactor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {
    private UUID id;
    private String name;
    private String address;
    private String contact;
    private Contactor contactor;
}
