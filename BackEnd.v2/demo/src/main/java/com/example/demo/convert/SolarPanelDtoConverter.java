package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.SolarPanelDto;
import com.example.demo.models.Company;
import com.example.demo.models.SolarPanel;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SolarPanelDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;
    public SolarPanelDto SolarPanelToDto(SolarPanel solarPanel) {
        SolarPanelDto solarPanelDto = modelMapper.map(solarPanel, SolarPanelDto.class);
        if (solarPanel.getCompany() != null){
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(solarPanel.getCompany());
            solarPanelDto.setCompanyDto(companyDto);
        }
        return solarPanelDto;
    }

    public SolarPanel DtoToSolarPanel(SolarPanelDto solarPanelDto) {
        SolarPanel solarPanel = modelMapper.map(solarPanelDto, SolarPanel.class);
        if (solarPanelDto.getCompanyDto() != null){
            Company company = companyDtoConverter.DtoToCompany(solarPanelDto.getCompanyDto());
            solarPanel.setCompany(company);
        }
        return solarPanel;
    }
}
