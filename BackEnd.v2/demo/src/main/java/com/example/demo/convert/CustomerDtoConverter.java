package com.example.demo.convert;


import com.example.demo.Dto.CustomerDto;
import com.example.demo.models.Customer;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomerDtoConverter {

    private final ModelMapper modelMapper;

    public CustomerDto CustomerToDto(Customer customer) {
        return modelMapper.map(customer, CustomerDto.class);
    }

    public Customer DtoToCustomer(CustomerDto customerDto) {
        return modelMapper.map(customerDto, Customer.class);
    }
}
