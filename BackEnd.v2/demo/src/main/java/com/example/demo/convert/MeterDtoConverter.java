package com.example.demo.convert;


import com.example.demo.Dto.MeterDto;
import com.example.demo.models.Meter;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MeterDtoConverter {

    private final ModelMapper modelMapper;

    public MeterDto MeterToDto(Meter meter) {
        return modelMapper.map(meter, MeterDto.class);
    }

    public Meter DtoToMeter(MeterDto meterDto) {
        return modelMapper.map(meterDto, Meter.class);
    }
}
