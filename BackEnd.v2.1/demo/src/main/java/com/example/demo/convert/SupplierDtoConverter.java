package com.example.demo.convert;


import com.example.demo.Dto.SupplierDto;
import com.example.demo.models.Supplier;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SupplierDtoConverter {

    private final ModelMapper modelMapper;

    public SupplierDto SupplierToDto(Supplier supplier) {
        return modelMapper.map(supplier, SupplierDto.class);
    }

    public Supplier DtoToSupplier(SupplierDto supplierDto) {
        return modelMapper.map(supplierDto, Supplier.class);
    }
}
