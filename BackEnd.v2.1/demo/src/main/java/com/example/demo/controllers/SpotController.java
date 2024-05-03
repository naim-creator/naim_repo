package com.example.demo.controllers;


import com.example.demo.Dto.SpotDto;
import com.example.demo.services.SpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("spot")
@RequiredArgsConstructor
public class SpotController {

    private final SpotService spotService;

    @GetMapping("get")
    public List<SpotDto> getSpots(){
        return this.spotService.getSpots();
    }

    @GetMapping("get/{id}")
    public SpotDto getSpotbyId(@PathVariable UUID id){
        return this.spotService.getSpotById(id);
    }
}
