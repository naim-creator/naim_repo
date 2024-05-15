package com.example.demo.convert;

import com.example.demo.Dto.AmendmentDto;
import com.example.demo.Dto.ConstructionDto;
import com.example.demo.models.Amendment;
import com.example.demo.models.Construction;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AmendmentDtoConverter {

    private final ModelMapper modelMapper;
    private final ConstructionDtoConverter constructionDtoConverter;

    public AmendmentDto AmendmentToDto(Amendment amendment) {
        AmendmentDto amendmentDto = modelMapper.map(amendment, AmendmentDto.class);
        if (amendment.getConstruction() != null) {
            ConstructionDto constructionDto = constructionDtoConverter.ConstructionToDto(amendment.getConstruction());
            amendmentDto.setConstructionDto(constructionDto);
        }
        return amendmentDto;
    }

    public Amendment DtoToAmendment(AmendmentDto amendmentDto) {
        Amendment amendment = modelMapper.map(amendmentDto, Amendment.class);
        if (amendmentDto.getConstructionDto() != null) {
            Construction construction = constructionDtoConverter.DtoToConstruction(amendmentDto.getConstructionDto());
            amendment.setConstruction(construction);
        }
        return amendment;
    }

}
