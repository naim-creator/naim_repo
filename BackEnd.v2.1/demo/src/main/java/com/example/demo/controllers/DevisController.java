package com.example.demo.controllers;


import com.example.demo.Dto.DevisDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.DevisResponse;
import com.example.demo.services.DevisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RequestMapping("devis")
@RestController
@RequiredArgsConstructor
public class DevisController {

    private final DevisService devisService;

    @GetMapping("get")
    public DevisResponse getDevisByCompany(@RequestParam(value = "id", defaultValue = "0", required = false) UUID id,
                                           @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                           @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.devisService.getDevisByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public DevisResponse getDevisBYCompany(@PathVariable UUID id,
                                                 @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                 @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.devisService.getDevisByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getTotalDevis(@PathVariable UUID id) {
        return devisService.getTotalDevis(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveDevis(@RequestBody DevisDto devisDto) {
        return this.devisService.saveDevis(devisDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateDevis(@RequestBody DevisDto devisDto) {
        return this.devisService.updateDevis(devisDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteDevis(@PathVariable UUID id) {
        return this.devisService.deleteDevis(id);
    }

}
