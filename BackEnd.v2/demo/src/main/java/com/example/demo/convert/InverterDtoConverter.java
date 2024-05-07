package com.example.demo.convert;


import com.example.demo.Dto.InverterDto;
import com.example.demo.models.Inverter;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InverterDtoConverter {

    private final ModelMapper modelMapper;

    public InverterDto InverterToDto(Inverter inverter) {
        return modelMapper.map(inverter, InverterDto.class);
    }

    public Inverter DtoToInverter(InverterDto dto) {
        return modelMapper.map(dto, Inverter.class);
    }
}
