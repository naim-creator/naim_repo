package com.example.demo.controllers;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.ResponsePageable.CompanyResponse;
import com.example.demo.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("get")
    public CompanyResponse getAllCompanies(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                           @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.companyService.getAllCompanies(page, size);
    }

    @GetMapping("get/{id}")
    public CompanyDto getCompanyById(@PathVariable UUID id) throws Exception {
        return this.companyService.getCompanyById(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveCompany(@RequestBody CompanyDto companyDto) {
        return this.companyService.saveCompany(companyDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateCompany(@RequestBody CompanyDto companyDto) {
        return this.companyService.updateCompany(companyDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable UUID id) {
        return this.companyService.deleteCompanyById(id);
    }

}
