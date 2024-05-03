package com.example.demo.Dto;

import com.example.demo.models.Company;
import com.example.demo.models.Construction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DevisDto {

    private UUID id;
    private Date date;
    private String ref;
    private String status;
    private Float total;
    private Construction construction;
    private Company company;
}
