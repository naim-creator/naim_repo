package com.example.demo.controllers;


import com.example.demo.Dto.SystemFixingDto;
import com.example.demo.ResponsePageable.SystemFixingResponse;
import com.example.demo.services.SystemFixingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("systemFixing")
@RequiredArgsConstructor
public class SystemFixingController {

    private final SystemFixingService systemFixingService;

    @GetMapping("get/{id}")
    public SystemFixingResponse getSystemFixingsByCompany(@PathVariable UUID id,
                                                          @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                          @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.systemFixingService.getSystemFixingsByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public SystemFixingResponse getSystemFixingsByCompanyFiltered(@PathVariable UUID id,
                                                                  @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                                  @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                                  @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.systemFixingService.getSystemFixingsByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getSystemFixingsStockLevel(@PathVariable UUID id) {
        return systemFixingService.getSystemFixingStockLevel(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveSystemFixing(@RequestBody SystemFixingDto systemFixingDto) {
        return this.systemFixingService.saveSystemFixing(systemFixingDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateSystemFixing(@RequestBody SystemFixingDto systemFixingDto) {
        return this.systemFixingService.updateSystemFixing(systemFixingDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteSystemFixing(@PathVariable UUID id) {
        return this.systemFixingService.deleteSystemFixing(id);
    }

}
