package com.example.demo.controllers;


import com.example.demo.Dto.CableDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.CableResponse;
import com.example.demo.services.CableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("cable")
@RequiredArgsConstructor
public class CableController {

    private final CableService cableService;


    @GetMapping("get/{id}")
    public CableResponse getCablesByCompany(@PathVariable UUID id,
                                               @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                               @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.cableService.getCablesByCompany(id,page,size);
    }

    @GetMapping("get/filter/{id}")
    public CableResponse getCablesBYCompany(@PathVariable UUID id,
                                                 @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                 @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.cableService.getCablesByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getCablesStockLevel(@PathVariable UUID id) {
        return cableService.getTotalCables(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveCable(@RequestBody CableDto cableDto) {
        return this.cableService.saveCable(cableDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateCable(@RequestBody CableDto cableDto) {
        return this.cableService.updateCable(cableDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteCable(@PathVariable UUID id) {
        return this.cableService.deleteCable(id);
    }
}
