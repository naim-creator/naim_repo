package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.ConstructionDto;
import com.example.demo.Dto.CustomerDto;
import com.example.demo.Dto.DevisDto;
import com.example.demo.models.Company;
import com.example.demo.models.Construction;
import com.example.demo.models.Customer;
import com.example.demo.models.Devis;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConstructionDtoConverter {

    private final ModelMapper modelMapper;
    private final CustomerDtoConverter customerDtoConverter;
    private final CompanyDtoConverter companyDtoConverter;
    private final DevisDtoConverter devisDtoConverter;

    public ConstructionDto ConstructionToDto(Construction construction) {
        ConstructionDto constructionDto = modelMapper.map(construction, ConstructionDto.class);
        if (construction.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(construction.getCompany());
            constructionDto.setCompanyDto(companyDto);
        }
        if (construction.getCustomer() != null) {
            CustomerDto customerDto = customerDtoConverter.CustomerToDto(construction.getCustomer());
            constructionDto.setCustomerDto(customerDto);
        }
        if (construction.getDevis() != null) {
            DevisDto devisDto = devisDtoConverter.DevisToDto(construction.getDevis());
            constructionDto.setDevisDto(devisDto);
        }
        return constructionDto;
    }

    public Construction DtoToConstruction(ConstructionDto constructionDto) {
        Construction construction = modelMapper.map(constructionDto, Construction.class);
        if (constructionDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(constructionDto.getCompanyDto());
            construction.setCompany(company);
        }
        if (constructionDto.getCustomerDto() != null) {
            Customer customer = customerDtoConverter.DtoToCustomer(constructionDto.getCustomerDto());
            construction.setCustomer(customer);
        }
        if (constructionDto.getDevisDto() != null) {
            Devis devis = devisDtoConverter.DtoToDevis(constructionDto.getDevisDto());
            construction.setDevis(devis);
        }
        return construction;
    }

}
