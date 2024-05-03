package com.example.demo.convert;


import com.example.demo.Dto.SpotDto;
import com.example.demo.models.Spot;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpotDtoConverter {

    private final ModelMapper modelMapper;

    public SpotDto SpotToDto(Spot spot) {
        return modelMapper.map(spot, SpotDto.class);
    }

    public Spot dtoToSpot(SpotDto spotDto) {
        return modelMapper.map(spotDto, Spot.class);
    }
}
