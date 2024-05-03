package com.example.demo.convert;

import com.example.demo.Dto.CableDto;
import com.example.demo.models.Cable;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CableDtoConverter {

    private ModelMapper modelMapper;

    public CableDto CableToDto(Cable cable) {
        return modelMapper.map(cable, CableDto.class);
    }

    public Cable DtoToCable(CableDto cableDto) {
        return modelMapper.map(cableDto, Cable.class);
    }

}
