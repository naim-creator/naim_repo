package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.InverterDto;
import com.example.demo.models.Company;
import com.example.demo.models.Inverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InverterDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public InverterDto InverterToDto(Inverter inverter) {
        InverterDto inverterDto = modelMapper.map(inverter, InverterDto.class);
        if (inverter.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(inverter.getCompany());
            inverterDto.setCompanyDto(companyDto);
        }
        return inverterDto;
    }

    public Inverter DtoToInverter(InverterDto inverterDto) {
        Inverter inverter = modelMapper.map(inverterDto, Inverter.class);
        if (inverterDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(inverterDto.getCompanyDto());
            inverter.setCompany(company);
        }
        return inverter;
    }
}
