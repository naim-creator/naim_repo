package com.example.demo.controllers;


import com.example.demo.Dto.ContactorRequestDto;
import com.example.demo.ResponsePageable.ContactorRequestResponse;
import com.example.demo.services.ContactorRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("contactorRequest")
@RequiredArgsConstructor
public class ContactorRequestController {

    private final ContactorRequestService contactorRequestService;

    @GetMapping("get")
    public ContactorRequestResponse getContactorRequests(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                         @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size) {
        return this.contactorRequestService.getContactorRequests(page, size);
    }

    @GetMapping("get/filter")
    public ContactorRequestResponse getContactorRequestsByFilter(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int page,
                                                                 @RequestParam(value = "pageSize", defaultValue = "0", required = false) int size,
                                                                 @RequestParam(value = "filter", defaultValue = "", required = false) String filter) {
        return this.contactorRequestService.getContactorRequestByFilter(filter,page, size);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveContactorRequest(@RequestBody ContactorRequestDto contactorRequestDto) {
        return this.contactorRequestService.saveContactorRequest(contactorRequestDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteContactorRequest(@PathVariable UUID id) {
        return this.contactorRequestService.deleteContactorRequest(id);
    }
}
