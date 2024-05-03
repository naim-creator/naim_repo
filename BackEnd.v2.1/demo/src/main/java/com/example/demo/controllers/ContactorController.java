package com.example.demo.controllers;


import com.example.demo.Dto.ContactorDto;
import com.example.demo.ResponsePageable.ContactorResponse;
import com.example.demo.services.ContactorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("contactor")
@RequiredArgsConstructor
public class ContactorController {

    private final ContactorService contactorService;


    @GetMapping("get")
    public ContactorResponse getAllContactors(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                              @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.contactorService.getAllContactors(page, size);
    }

    @GetMapping("get/filter")
    public ContactorResponse getAllContactorsByFilter(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                      @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                      @RequestParam(value = "filter", defaultValue = "", required = false) String filter) {
        return this.contactorService.getContactorByFilter(filter,page, size);
    }

    @GetMapping("get/by-email/{email}")
    public ContactorDto getContactorByEmail(@PathVariable String email) {
        return this.contactorService.getContactorByEmail(email);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveContactor(@RequestBody ContactorDto contactorDto) {
        return this.contactorService.saveContactor(contactorDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateContactor(@RequestBody ContactorDto contactorDto) {
        return this.contactorService.updateContactor(contactorDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteContactor(@PathVariable UUID id) {
        return this.contactorService.deleteContactor(id);
    }
}
