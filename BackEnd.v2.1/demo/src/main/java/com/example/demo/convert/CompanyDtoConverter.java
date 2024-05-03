package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.models.Company;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CompanyDtoConverter {

    private final ModelMapper modelMapper;

    public CompanyDto CompanyToDto(Company company) {
        return modelMapper.map(company, CompanyDto.class);
    }

    public Company DtoToCompany(CompanyDto companyDto) {
        return modelMapper.map(companyDto, Company.class);
    }
}
