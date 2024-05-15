package com.example.demo.convert;

import com.example.demo.Dto.CableDto;
import com.example.demo.Dto.CompanyDto;
import com.example.demo.models.Cable;
import com.example.demo.models.Company;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CableDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public CableDto CableToDto(Cable cable) {
        CableDto cableDto = modelMapper.map(cable, CableDto.class);
        if (cable.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(cable.getCompany());
            cableDto.setCompanyDto(companyDto);
        }
        return cableDto;
    }

    public Cable DtoToCable(CableDto cableDto) {
        Cable cable = modelMapper.map(cableDto, Cable.class);
        if (cable.getCompany() != null) {
            Company company = companyDtoConverter.DtoToCompany(cableDto.getCompanyDto());
            cable.setCompany(company);
        }
        return cable;
    }

}
