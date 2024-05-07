package com.example.demo.controllers;


import com.example.demo.Dto.CustomerDto;
import com.example.demo.ResponsePageable.CustomerResponse;
import com.example.demo.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("customer")
@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;


    @GetMapping("get")
    public CustomerResponse getCustomersByCompany(@RequestParam(value = "id", defaultValue = "0", required = false) UUID id,
                                                  @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                  @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.customerService.getCustomersByCompany(id, page, size);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveCustomer(@RequestBody CustomerDto customerDto) {
        return customerService.saveCustomer(customerDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateCustomer(@RequestBody CustomerDto customerDto) {
        return customerService.updateCustomer(customerDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable UUID id) {
        return customerService.deleteCustomer(id);
    }
}
