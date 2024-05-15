package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.DevisDto;
import com.example.demo.Dto.DevisRequestDto;
import com.example.demo.models.Company;
import com.example.demo.models.Devis;
import com.example.demo.models.DevisRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DevisDtoConverter {

    private final ModelMapper modelMapper;
    private final DevisRequestDtoConverter devisRequestDtoConverter;
    private final CompanyDtoConverter companyDtoConverter;

    public DevisDto DevisToDto(Devis devis) {
        DevisDto devisDto = modelMapper.map(devis, DevisDto.class);
        if (devis.getDevisRequest() != null) {
            DevisRequestDto devisRequestDto = devisRequestDtoConverter.DevisRequestToDto(devis.getDevisRequest());
            devisDto.setDevisRequestDto(devisRequestDto);
        }
        if (devis.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(devis.getCompany());
            devisDto.setCompanyDto(companyDto);
        }
        return devisDto;
    }

    public Devis DtoToDevis(DevisDto devisDto) {
        Devis devis = modelMapper.map(devisDto, Devis.class);
        if (devisDto.getDevisRequestDto() != null) {
            DevisRequest devisRequest = devisRequestDtoConverter.DtoToDevisRequest(devisDto.getDevisRequestDto());
            devis.setDevisRequest(devisRequest);
        }
        if (devisDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(devisDto.getCompanyDto());
            devis.setCompany(company);
        }
        return devis;
    }
}
