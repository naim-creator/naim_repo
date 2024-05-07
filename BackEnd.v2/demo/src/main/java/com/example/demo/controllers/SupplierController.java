package com.example.demo.controllers;


import com.example.demo.Dto.SupplierDto;
import com.example.demo.ResponsePageable.SolarPanelResponse;
import com.example.demo.ResponsePageable.SupplierResponse;
import com.example.demo.services.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("supplier")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping("get/{id}")
    public SupplierResponse getSuppliersBYCompany(@PathVariable UUID id,
                                                    @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                    @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.supplierService.getAllSuppliersByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public SupplierResponse getSuppliersBYCompanyFiltered(@PathVariable UUID id,
                                                      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                      @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                      @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.supplierService.getAllSupplierByCompanyFiltered(id, page, size, filter);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveSupplier(@RequestBody SupplierDto supplierDto){
        return this.supplierService.saveSupplier(supplierDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateSupplier(@RequestBody SupplierDto supplierDto){
        return this.supplierService.updateSupplier(supplierDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable UUID id){
        return this.supplierService.deleteSupplier(id);
    }
}
