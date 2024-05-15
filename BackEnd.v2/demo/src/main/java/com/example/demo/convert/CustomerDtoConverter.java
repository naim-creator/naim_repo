package com.example.demo.convert;


import com.example.demo.Dto.CompanyDto;
import com.example.demo.Dto.CustomerDto;
import com.example.demo.models.Company;
import com.example.demo.models.Customer;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomerDtoConverter {

    private final ModelMapper modelMapper;
    private final CompanyDtoConverter companyDtoConverter;

    public CustomerDto CustomerToDto(Customer customer) {
        CustomerDto customerDto = modelMapper.map(customer, CustomerDto.class);
        if (customer.getCompany() != null) {
            CompanyDto companyDto = companyDtoConverter.CompanyToDto(customer.getCompany());
            customerDto.setCompanyDto(companyDto);
        }
        return customerDto;
    }

    public Customer DtoToCustomer(CustomerDto customerDto) {
        Customer customer = modelMapper.map(customerDto, Customer.class);
        if (customerDto.getCompanyDto() != null) {
            Company company = companyDtoConverter.DtoToCompany(customerDto.getCompanyDto());
            customer.setCompany(company);
        }
        return customer;
    }
}
