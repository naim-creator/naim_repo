package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.MeterDto;
import com.example.demo.models.Company;
import com.example.demo.models.Meter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MeterDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public MeterDto MeterToDto(Meter meter) {
        MeterDto meterDto = modelMapper.map(meter, MeterDto.class);
        if (meter.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(meter.getCompany());
            meterDto.setCompanyDto(companyDto);
        }
        return meterDto;
    }

    public Meter DtoToMeter(MeterDto meterDto) {
        Meter meter = modelMapper.map(meterDto, Meter.class);
        if (meterDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(meterDto.getCompanyDto());
            meter.setCompany(company);
        }
        return meter;
    }
}
