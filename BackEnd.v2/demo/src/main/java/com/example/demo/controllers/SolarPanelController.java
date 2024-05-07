package com.example.demo.controllers;


import com.example.demo.Dto.SolarPanelDto;
import com.example.demo.ResponsePageable.SolarPanelResponse;
import com.example.demo.services.SolarPanelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("solarPanel")
@RequiredArgsConstructor
public class SolarPanelController {

    private final SolarPanelService solarPanelService;

    @GetMapping("get/{id}")
    public SolarPanelResponse getSolarPanelsBYCompany(@PathVariable UUID id,
                                                      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                      @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.solarPanelService.getSolarPanelsByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public SolarPanelResponse getSolarPanelsBYCompany(@PathVariable UUID id,
                                                      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                      @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                      @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.solarPanelService.getSolarPanelsByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getSolarPanelStockLevel(@PathVariable UUID id) {
        return solarPanelService.getSolarPanelStockLevel(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveSolarPanel(@RequestBody SolarPanelDto solarPanelDto) {
        return this.solarPanelService.saveSolarPanel(solarPanelDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateSolarPanel(@RequestBody SolarPanelDto solarPanelDto) {
        return this.solarPanelService.updateSolarPanel(solarPanelDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteSolarPanelById(@PathVariable UUID id) {
        return this.solarPanelService.deleteSolarPanelById(id);
    }

}
