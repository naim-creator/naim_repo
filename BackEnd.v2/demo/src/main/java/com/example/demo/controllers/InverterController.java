package com.example.demo.controllers;


import com.example.demo.Dto.InverterDto;
import com.example.demo.ResponsePageable.InverterResponse;
import com.example.demo.services.InverterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("inverter")
@RequiredArgsConstructor
public class InverterController {

    private final InverterService inverterService;

    @GetMapping("get/{id}")
    public InverterResponse getInvertersByCompany(@PathVariable UUID id,
                                                  @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                  @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.inverterService.getInvertersByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public InverterResponse getInvertersByCompany(@PathVariable UUID id,
                                                  @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                  @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                  @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.inverterService.getInvertersByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getInverterStockLevel(@PathVariable UUID id) {
        return this.inverterService.getInverterStockLevel(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveInverter(@RequestBody InverterDto inverterDto) {
        return this.inverterService.saveInverter(inverterDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateInverter(@RequestBody InverterDto inverterDto) {
        return this.inverterService.updateInverter(inverterDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteInverterById(@PathVariable UUID id) {
        return this.inverterService.deleteInverterById(id);
    }
}
