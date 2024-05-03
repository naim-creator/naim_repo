package com.example.demo.services;


import com.example.demo.Dto.SpotDto;
import com.example.demo.convert.SpotDtoConverter;
import com.example.demo.models.Spot;
import com.example.demo.repositorys.SpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpotService {

    private final SpotRepository spotRepository;
    private final SpotDtoConverter spotDtoConverter;

    public List<SpotDto> getSpots() {
        List<Spot> spots = spotRepository.findAll();
        return spots.stream()
                .map(spotDtoConverter::SpotToDto)
                .collect(Collectors.toList());
    }

    public SpotDto getSpotById(UUID id) {
        Spot spot = spotRepository.findById(id).orElse(null);
        return spotDtoConverter.SpotToDto(spot);
    }
}
