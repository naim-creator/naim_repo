package com.example.demo.controllers;


import com.example.demo.Dto.AmendmentDto;
import com.example.demo.models.Amendment;
import com.example.demo.services.AmendmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("amendment")
@RequiredArgsConstructor
public class AmendmentController {

    private final AmendmentService amendmentService;


    @GetMapping("get/{id}")
    public List<AmendmentDto> getAmendmentsByConstruction(@PathVariable UUID id) {
        return this.amendmentService.getAmendmentsByConstruction(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveAmendment(@RequestBody AmendmentDto amendmentDto) {
        return this.amendmentService.saveAmendment(amendmentDto);
    }

}
