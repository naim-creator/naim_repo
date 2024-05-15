package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.ContactorDto;
import com.example.demo.models.Company;
import com.example.demo.models.Contactor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CompanyDtoConverter {

    private final ModelMapper modelMapper;
    private final ContactorDtoConverter contactorDtoConverter;

    public CompanyDto CompanyToDto(Company company) {
        CompanyDto companyDto = modelMapper.map(company, CompanyDto.class);
        if (company.getContactor() != null) {
            ContactorDto contactorDto = contactorDtoConverter.ContactorToDto(company.getContactor());
            companyDto.setContactorDto(contactorDto);
        }
        return companyDto;
    }

    public Company DtoToCompany(CompanyDto companyDto) {
        Company company = modelMapper.map(companyDto, Company.class);
        if (companyDto.getContactorDto() != null) {
            Contactor contactor = contactorDtoConverter.DtoToContactor(companyDto.getContactorDto());
            company.setContactor(contactor);
        }
        return company;
    }
}
