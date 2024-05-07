package com.example.demo.convert;

import com.example.demo.Dto.AmendmentDto;
import com.example.demo.models.Amendment;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AmendmentDtoConverter {

    private final ModelMapper modelMapper;

    public AmendmentDto AmendmentToDto(Amendment amendment) {
        return modelMapper.map(amendment, AmendmentDto.class);
    }

    public Amendment DtoToAmendment(AmendmentDto amendmentDto) {
        return modelMapper.map(amendmentDto, Amendment.class);
    }

}
