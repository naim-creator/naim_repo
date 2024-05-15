package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.SystemFixingDto;
import com.example.demo.models.Company;
import com.example.demo.models.SystemFixing;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SystemFixingDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public SystemFixingDto SystemFixingToDto(SystemFixing systemFixing) {
        SystemFixingDto systemFixingDto = modelMapper.map(systemFixing, SystemFixingDto.class);
        if (systemFixing.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(systemFixing.getCompany());
            systemFixingDto.setCompanyDto(companyDto);
        }
        return systemFixingDto;
    }

    public SystemFixing DtoToSystemFixing(SystemFixingDto systemFixingDto) {
        SystemFixing systemFixing = modelMapper.map(systemFixingDto, SystemFixing.class);
        if (systemFixingDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(systemFixingDto.getCompanyDto());
            systemFixing.setCompany(company);
        }
        return systemFixing;
    }
}
