package com.example.demo.convert;


import com.example.demo.Dto.BatteryDto;
import com.example.demo.models.Battery;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BatteryDtoConverter {

    private final ModelMapper modelMapper;

    public BatteryDto BatteryToDto(Battery battery) {
        return modelMapper.map(battery, BatteryDto.class);
    }

    public Battery DtoToBattery(BatteryDto batteryDto) {
        return modelMapper.map(batteryDto, Battery.class);
    }
}
