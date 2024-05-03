package com.example.demo.convert;


import com.example.demo.Dto.ConstructionDto;
import com.example.demo.models.Construction;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConstructionDtoConverter {

    private final ModelMapper modelMapper;

    public ConstructionDto ConstructionToDto(Construction construction) {
        return modelMapper.map(construction, ConstructionDto.class);
    }

    public Construction DtoToConstruction(ConstructionDto constructionDto) {
        return modelMapper.map(constructionDto, Construction.class);
    }

}
