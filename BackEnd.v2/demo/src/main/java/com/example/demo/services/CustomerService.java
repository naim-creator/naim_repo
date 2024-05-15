package com.example.demo.services;


import com.example.demo.Dto.CustomerDto;
import com.example.demo.ResponsePageable.CustomerResponse;
import com.example.demo.convert.CustomerDtoConverter;
import com.example.demo.models.Customer;
import com.example.demo.repositorys.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerDtoConverter customerDtoConverter;

    public CustomerResponse getCustomersByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Customer> customers = customerRepository.findCustomersByCompanyId(id, pageable);
        List<CustomerDto> content = customers.getContent().stream()
                .map(customerDtoConverter::CustomerToDto)
                .collect(Collectors.toList());

        CustomerResponse customerResponse = new CustomerResponse();
        customerResponse.setContent(content);
        customerResponse.setPageNo(customers.getNumber());
        customerResponse.setPageSize(customers.getSize());
        customerResponse.setTotalElements(customers.getTotalElements());
        customerResponse.setTotalPages(customers.getTotalPages());
        customerResponse.setLast(customers.isLast());

        return customerResponse;
    }

    public CustomerResponse getCustomersByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Customer> customers = customerRepository.findCustomersByCompanyIdFiltered(id, filter, pageable);
        List<CustomerDto> content = customers.getContent().stream()
                .map(customerDtoConverter::CustomerToDto)
                .collect(Collectors.toList());
        CustomerResponse customerResponse = new CustomerResponse();
        customerResponse.setContent(content);
        customerResponse.setPageNo(customers.getNumber());
        customerResponse.setPageSize(customers.getSize());
        customerResponse.setTotalElements(customers.getTotalElements());
        customerResponse.setTotalPages(customers.getTotalPages());
        customerResponse.setLast(customers.isLast());

        return customerResponse;
    }

    public ResponseEntity<String> saveCustomer(CustomerDto customerDto) {
        Customer customer = customerDtoConverter.DtoToCustomer(customerDto);
        customerRepository.save(customer);
        return ResponseEntity.ok("Data Saved");
    }

    public ResponseEntity<String> updateCustomer(CustomerDto customerDto) {
        Customer customer = customerDtoConverter.DtoToCustomer(customerDto);
        customerRepository.save(customer);
        return ResponseEntity.ok("Data update");
    }

    public ResponseEntity<String> deleteCustomer(UUID id) {
        this.customerRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

}
