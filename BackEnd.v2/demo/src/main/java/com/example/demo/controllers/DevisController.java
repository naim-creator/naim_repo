package com.example.demo.controllers;


import com.example.demo.Dto.DevisDto;
import com.example.demo.ResponsePageable.DevisResponse;
import com.example.demo.services.DevisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("devis")
@RestController
@RequiredArgsConstructor
public class DevisController {

    private final DevisService devisService;

    @GetMapping("get/{id}")
    public DevisResponse getDevisByCompany(@PathVariable UUID id,
                                           @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                           @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.devisService.getDevisByCompany(id, page, size);
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
