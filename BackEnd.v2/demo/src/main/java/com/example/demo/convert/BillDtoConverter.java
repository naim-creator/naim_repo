package com.example.demo.convert;


import com.example.demo.Dto.BillDto;
import com.example.demo.models.Bill;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BillDtoConverter {

    private final ModelMapper modelMapper;

    public BillDto BillToDto(Bill bill) {
        return modelMapper.map(bill, BillDto.class);
    }

    public Bill DtoToBill(BillDto billDto) {
        return modelMapper.map(billDto, Bill.class);
    }
}
