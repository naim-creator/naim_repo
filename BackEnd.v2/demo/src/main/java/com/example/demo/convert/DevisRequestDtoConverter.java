package com.example.demo.convert;

import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.DevisRequestDto;
import com.example.demo.models.Company;
import com.example.demo.models.DevisRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DevisRequestDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public DevisRequestDto DevisRequestToDto(DevisRequest devisRequest) {
        DevisRequestDto devisRequestDto = modelMapper.map(devisRequest, DevisRequestDto.class);
        if (devisRequest.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(devisRequest.getCompany());
            devisRequestDto.setCompanyDto(companyDto);
        }
        return devisRequestDto;
    }

    public DevisRequest DtoToDevisRequest(DevisRequestDto devisRequestDto) {
        DevisRequest devisRequest = modelMapper.map(devisRequestDto, DevisRequest.class);
        if (devisRequestDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(devisRequestDto.getCompanyDto());
            devisRequest.setCompany(company);
            devisRequest.setDevis(null);
        }
        return devisRequest;
    }
}
