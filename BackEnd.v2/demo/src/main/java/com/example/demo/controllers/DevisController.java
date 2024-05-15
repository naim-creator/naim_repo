package com.example.demo.controllers;


import com.example.demo.Dto.DevisDto;
import com.example.demo.ResponsePageable.DevisResponse;
import com.example.demo.services.DevisService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
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

    @GetMapping("get/filter/{id}")
    public DevisResponse getDevisByCompanyFiltered(@PathVariable UUID id,
                                           @RequestParam(value = "filter", defaultValue = "",required = false) String filter,
                                           @RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                           @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.devisService.getDevisByCompanyFiltered(id, page, size, filter);
    }

    @PostMapping("/print")
    public ResponseEntity<byte[]> printDevis(@RequestBody DevisDto devisDto) throws DocumentException {
        byte[] pdfData = devisService.printDevis(devisDto);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment()
                .filename("devis.pdf").build());
        return new ResponseEntity<>(pdfData, headers, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveDevis(@RequestBody DevisDto devisDto) {
        return this.devisService.saveDevis(devisDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateDevis(@RequestBody DevisDto devisDto) {
        return this.devisService.updateDevis(devisDto);
    }

    @GetMapping("accept/{id}")
    public ResponseEntity<String> acceptDevis(@PathVariable UUID id, @RequestParam(value = "companyId") UUID companyId) {
        return this.devisService.acceptDevis(id, companyId);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteDevis(@PathVariable UUID id) {
        return this.devisService.deleteDevis(id);
    }

}
