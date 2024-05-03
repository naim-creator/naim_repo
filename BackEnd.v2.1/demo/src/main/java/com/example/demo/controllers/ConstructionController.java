package com.example.demo.controllers;


import com.example.demo.Dto.ConstructionDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.ConstructionResponse;
import com.example.demo.services.ConstructionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("constructor")
@RequiredArgsConstructor
public class ConstructionController {

    private final ConstructionService constructionService;

    @GetMapping("get/{id}")
    public ConstructionResponse getConstructionsByCompany(@PathVariable UUID id,
                                                          @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                          @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.constructionService.getConstructionsByCompany(id,page,size);
    }

    @GetMapping("get/filter/{id}")
    public ConstructionResponse getConstructionsBYCompany(@PathVariable UUID id,
                                                 @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                 @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.constructionService.getConstructionsByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getTotalConstructions(@PathVariable UUID id) {
        return constructionService.getTotalConstructions(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveConstruction(@RequestBody ConstructionDto constructionDto) {
        return this.constructionService.saveConstruction(constructionDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateConstruction(@RequestBody ConstructionDto constructionDto) {
        return this.constructionService.updateConstruction(constructionDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteConstruction(@PathVariable UUID id) {
        return this.constructionService.deleteConstruction(id);
    }

}
