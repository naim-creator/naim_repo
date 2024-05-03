package com.example.demo.controllers;


import com.example.demo.Dto.BillDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.BillResponse;
import com.example.demo.services.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("bill")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;


    @GetMapping("get/{id}")
    public BillResponse getBillsByCompany(@PathVariable UUID id,
                                              @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                              @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.billService.getBillsByCompany(id,page,size);
    }

    @GetMapping("get/filter/{id}")
    public BillResponse getBillsBYCompany(@PathVariable UUID id,
                                                 @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                 @RequestParam(value = "filter", defaultValue = "0", required = false) String filter) {
        return this.billService.getBillByCompanyFiltered(id, page, size, filter);
    }

    @GetMapping("get/quantity/{id}")
    public BigDecimal getTotalBills(@PathVariable UUID id) {
        return billService.getTotalBills(id);
    }


    @GetMapping("get/one/{id}")
    public BillDto getBillByConstruction(@PathVariable UUID id) throws Exception {
        return this.billService.getBillByConstruction(id);
    }

    @GetMapping("get/all/{id}")
    public List<BillDto> getAllBillsByCompany(@PathVariable UUID id) {
        return this.billService.getBillsByCompany(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveBill(@RequestBody BillDto billDto) {
        return this.billService.saveBill(billDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable UUID id) {
        return this.billService.deleteBill(id);
    }

}
