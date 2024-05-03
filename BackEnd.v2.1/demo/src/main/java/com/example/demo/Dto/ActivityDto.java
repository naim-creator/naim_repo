package com.example.demo.Dto;


import com.example.demo.models.*;
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
    private Construction construction;
    private Company company;
    private List<Worker> workers;
    private List<Spot> spots;
}
