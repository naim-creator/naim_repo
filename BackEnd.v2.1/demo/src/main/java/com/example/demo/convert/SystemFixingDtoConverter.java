package com.example.demo.convert;


import com.example.demo.Dto.SystemFixingDto;
import com.example.demo.models.SystemFixing;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SystemFixingDtoConverter {

    private final ModelMapper modelMapper;

    public SystemFixingDto SystemFixingToDto(SystemFixing systemFixing) {
        return modelMapper.map(systemFixing, SystemFixingDto.class);
    }

    public SystemFixing DtoToSystemFixing(SystemFixingDto systemFixingDto) {
        return modelMapper.map(systemFixingDto, SystemFixing.class);
    }
}
