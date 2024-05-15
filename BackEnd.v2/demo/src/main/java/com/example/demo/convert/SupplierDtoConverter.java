package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.SupplierDto;
import com.example.demo.models.Company;
import com.example.demo.models.Supplier;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SupplierDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public SupplierDto SupplierToDto(Supplier supplier) {
        SupplierDto supplierDto = modelMapper.map(supplier, SupplierDto.class);
        if (supplier.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(supplier.getCompany());
            supplierDto.setCompanyDto(companyDto);
        }
        return supplierDto;
    }

    public Supplier DtoToSupplier(SupplierDto supplierDto) {
        Supplier supplier = modelMapper.map(supplierDto, Supplier.class);
        if (supplierDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(supplierDto.getCompanyDto());
            supplier.setCompany(company);
        }
        return supplier;
    }
}
