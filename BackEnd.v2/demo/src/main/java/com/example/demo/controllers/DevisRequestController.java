package com.example.demo.controllers;


import com.example.demo.Dto.DevisRequestDto;
import com.example.demo.ResponsePageable.DevisRequestResponse;
import com.example.demo.services.DevisRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RequestMapping("devisRequest")
@RestController
@RequiredArgsConstructor
public class DevisRequestController {

    private final DevisRequestService devisRequestService;

    @GetMapping("get/{id}")
    public DevisRequestResponse getDevisRequestsByCompany(@PathVariable UUID id,
                                                          @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                          @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.devisRequestService.getDevisRequestsByCompany(id, page, size);
    }

    @GetMapping("get/filter/{id}")
    public DevisRequestResponse getDevisRequestsByCompanyFiltered(@PathVariable UUID id,
                                                                  @RequestParam(value = "filter", defaultValue = "", required = false) String filter,
                                                                  @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                                  @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.devisRequestService.getDevisRequestsByCompanyFiltered(id, filter, page, size);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getDevisRequestsQuantity(@PathVariable UUID id) {
        return devisRequestService.getTotalDevisRequests(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveDevisRequest(@RequestBody DevisRequestDto devisRequestDto) {
        return this.devisRequestService.saveDevisRequest(devisRequestDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateDevisRequest(@RequestBody DevisRequestDto devisRequestDto) {
        return this.devisRequestService.updateDevisRequest(devisRequestDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteDevisRequestById(@PathVariable UUID id) {
        return this.devisRequestService.deleteDevisRequestById(id);
    }

}
