package com.example.demo.controllers;


import com.example.demo.Dto.LicenceDto;
import com.example.demo.ResponsePageable.LicenceReponse;
import com.example.demo.services.LicenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("licence")
@RequiredArgsConstructor
public class LicenceController {

    private final LicenceService licenceService;

    @GetMapping("get")
    public LicenceReponse getAllLicence(@RequestParam(value = "pageNo", required = false, defaultValue = "0") int page,
                                        @RequestParam(value = "pageSize", required = false, defaultValue = "0") int size) {
        return licenceService.getAllLicences(page, size);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<?> getLicenceById(@PathVariable("id") UUID id) {
        return licenceService.getLicenceById(id);
    }

    @PostMapping("add")
    public ResponseEntity<?> saveLicence(@RequestBody int number) {
        return licenceService.saveLicence(number);
    }

    @PutMapping("update")
    public ResponseEntity<?> updateLicence(@RequestBody LicenceDto licenceDto, @RequestParam(value = "number", defaultValue = "0", required = false) int number) {
        return licenceService.updateLicence(number, licenceDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteLicence(@PathVariable UUID id) {
        return licenceService.deleteLicenceById(id);
    }
}
