package com.example.demo.controllers;


import com.example.demo.Dto.BillDto;
import com.example.demo.services.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("bill")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

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
