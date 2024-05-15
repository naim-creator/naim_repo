package com.example.demo.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDto {
    private UUID id;
    private Date start_date;
    private Date end_date;
    private String text;
    private ConstructionDto constructionDto;
    private CompanyDto companyDto;
    private List<WorkerDto> workerDtoList;
}
