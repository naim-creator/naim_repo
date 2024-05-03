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
public class BillDto {
    private UUID id;
    private String ref;
    private Date date;
    private Double total;
    private Construction construction;
    private Company company;
}
