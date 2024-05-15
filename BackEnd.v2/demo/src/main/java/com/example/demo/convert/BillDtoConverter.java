package com.example.demo.convert;


import com.example.demo.Dto.BillDto;
import com.example.demo.Dto.ConstructionDto;
import com.example.demo.models.Bill;
import com.example.demo.models.Construction;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BillDtoConverter {

    private final ModelMapper modelMapper;
    private final ConstructionDtoConverter constructionDtoConverter;

    public BillDto BillToDto(Bill bill) {
        BillDto billDto = modelMapper.map(bill, BillDto.class);
        if (bill.getConstruction() != null) {
            ConstructionDto constructionDto = constructionDtoConverter.ConstructionToDto(bill.getConstruction());
            billDto.setConstructionDto(constructionDto);
        }
        return billDto;
    }

    public Bill DtoToBill(BillDto billDto) {
        Bill bill = modelMapper.map(billDto, Bill.class);
        if (billDto.getConstructionDto() != null) {
            Construction construction = constructionDtoConverter.DtoToConstruction(billDto.getConstructionDto());
            bill.setConstruction(construction);
        }
        return bill;
    }
}
