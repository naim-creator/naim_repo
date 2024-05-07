package com.example.demo.services;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.ResponsePageable.CompanyResponse;
import com.example.demo.convert.CompanyDtoConverter;
import com.example.demo.models.Company;
import com.example.demo.repositorys.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyDtoConverter companyDtoConverter;

    public CompanyResponse getAllCompanies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Company> companies = companyRepository.findAll(pageable);
        List<CompanyDto> companyDtos = companies.getContent().stream()
                .map(companyDtoConverter::CompanyToDto)
                .collect(Collectors.toList());
        CompanyResponse companyResponse = new CompanyResponse();
        companyResponse.setContent(companyDtos);
        companyResponse.setPageNo(companies.getNumber());
        companyResponse.setPageSize(companies.getSize());
        companyResponse.setTotalElements(companies.getTotalElements());
        companyResponse.setTotalPages(companies.getTotalPages());
        companyResponse.setLast(companies.isLast());
        return companyResponse;
    }

    public CompanyDto getCompanyById(UUID id) throws Exception {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isPresent()) {
            return companyDtoConverter.CompanyToDto(company.get());
        } else
            throw new Exception("Company not found!");
    }

    public CompanyDto getCompanyByContactorId(UUID id) throws Exception {
        Optional<Company> company = companyRepository.findByContactorId(id);
        if (company.isPresent()) {
            return companyDtoConverter.CompanyToDto(company.get());
        } else
            throw new Exception("Company not found!");
    }

    public ResponseEntity<String> updateCompany(CompanyDto companyDto) {
        Company company = companyDtoConverter.DtoToCompany(companyDto);
        companyRepository.save(company);
        return ResponseEntity.ok("Data Updated");
    }

    public ResponseEntity<String> saveCompany(CompanyDto companyDto) {
        Company company = companyDtoConverter.DtoToCompany(companyDto);
        companyRepository.save(company);
        return ResponseEntity.ok("Data Saved");
    }

    public ResponseEntity<String> deleteCompanyById(UUID id) {
        companyRepository.deleteById(id);
        return ResponseEntity.ok("Data Deleted");
    }


}
