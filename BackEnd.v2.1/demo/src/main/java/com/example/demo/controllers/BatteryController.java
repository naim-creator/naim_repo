package com.example.demo.controllers;


import com.example.demo.Dto.BatteryDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.SolarPanelResponse;
import com.example.demo.services.BatteryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("battery")
@RequiredArgsConstructor
public class BatteryController {

    private final BatteryService batteryService;

    @GetMapping("get/{id}")
    public BatteryResponse getBatteriesByCompany(@PathVariable UUID id,
                                                 @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.batteryService.getBatteriesByCompany(id,page,size);
    }

    @GetMapping("get/filter/{id}")
    public BatteryResponse getBatteriesBYCompany(@PathVariable UUID id,
                                                      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                      @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                      @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.batteryService.getBatteryByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getBatteryStockLevel(@PathVariable UUID id) {
        return batteryService.getBatteryStockLevel(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveBattery(@RequestBody BatteryDto batteryDto) {
        return this.batteryService.saveBattery(batteryDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateBattery(@RequestBody BatteryDto batteryDto) {
        return this.batteryService.updateBattery(batteryDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBattery(@PathVariable UUID id) {
        return this.batteryService.deleteBattery(id);
    }

}
