package com.example.demo.Dto;

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
    private ConstructionDto constructionDto;
}
