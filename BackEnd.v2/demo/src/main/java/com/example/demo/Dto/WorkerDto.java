package com.example.demo.Dto;


import com.example.demo.models.Company;
import com.example.demo.models.Licence;
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
public class WorkerDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String profession;
    private String image;
    private CompanyDto companyDto;
    private LicenceDto licenceDto;
    private List<ActivityDto> activityDtos;
}
