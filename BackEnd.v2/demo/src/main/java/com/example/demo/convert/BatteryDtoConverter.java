package com.example.demo.convert;


import com.example.demo.Dto.BatteryDto;
import com.example.demo.Dto.CompanyDto;
import com.example.demo.models.Battery;
import com.example.demo.models.Company;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BatteryDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public BatteryDto BatteryToDto(Battery battery) {
        BatteryDto batteryDto = modelMapper.map(battery, BatteryDto.class);
        if (battery.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(battery.getCompany());
            batteryDto.setCompanyDto(companyDto);
        }
        return batteryDto;
    }

    public Battery DtoToBattery(BatteryDto batteryDto) {
        Battery battery = modelMapper.map(batteryDto, Battery.class);
        if (batteryDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(batteryDto.getCompanyDto());
            battery.setCompany(company);
        }
        return battery;
    }
}
