package com.example.demo.convert;


import com.example.demo.Dto.SolarPanelDto;
import com.example.demo.models.SolarPanel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SolarPanelDtoConverter {

    private final ModelMapper modelMapper;

    public SolarPanelDto SolarPanelToDto(SolarPanel solarPanel) {
        return modelMapper.map(solarPanel, SolarPanelDto.class);
    }

    public SolarPanel DtoToSolarPanel(SolarPanelDto solarPanelDto) {
        return modelMapper.map(solarPanelDto, SolarPanel.class);
    }
}
