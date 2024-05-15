package com.example.demo.controllers;


import com.example.demo.Dto.BillDto;
import com.example.demo.Dto.DevisDto;
import com.example.demo.services.BillService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/print")
    public ResponseEntity<byte[]> printBill(@RequestBody BillDto billDto) throws DocumentException {
        byte[] pdfData = billService.printBill(billDto);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment()
                .filename("facture.pdf").build());
        return new ResponseEntity<>(pdfData, headers, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveBill(@RequestBody BillDto billDto) {
        return this.billService.saveBill(billDto);
    }


    @PutMapping("update")
    public ResponseEntity<String> updateBill(@RequestBody BillDto billDto) {
        return this.billService.updateBill(billDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable UUID id) {
        return this.billService.deleteBill(id);
    }

}
