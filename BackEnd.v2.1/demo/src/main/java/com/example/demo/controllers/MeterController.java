package com.example.demo.controllers;


import com.example.demo.Dto.MeterDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.MeterResponse;
import com.example.demo.services.MeterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("meter")
@RequiredArgsConstructor
public class MeterController {

    private final MeterService meterService;

    @GetMapping("get/{id}")
    public MeterResponse getMeterByCompany(@PathVariable UUID id,
                                               @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                               @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.meterService.getMeterByCompany(id,page,size);
    }

    @GetMapping("get/filter/{id}")
    public MeterResponse getMeterBYCompany(@PathVariable UUID id,
                                                 @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                 @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.meterService.getMeterByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getMeterStockLevel(@PathVariable UUID id) {
        return meterService.getMeterStockLevel(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveMeter(@RequestBody MeterDto meterDto) {
        return this.meterService.saveMeter(meterDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateMeter(@RequestBody MeterDto meterDto) {
        return this.meterService.updateMeter(meterDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMeterById(@PathVariable UUID id) {
        return this.meterService.deleteMeterById(id);
    }

}
