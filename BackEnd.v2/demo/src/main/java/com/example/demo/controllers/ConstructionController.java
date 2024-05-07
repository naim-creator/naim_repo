package com.example.demo.controllers;


import com.example.demo.Dto.ConstructionDto;
import com.example.demo.services.ConstructionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("constructor")
@RequiredArgsConstructor
public class ConstructionController {

    private final ConstructionService constructionService;

    @GetMapping("get/{id}")
    public List<ConstructionDto> getConstructionByCompany(@PathVariable UUID id) {
        return this.constructionService.getConstructionsByCompany(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> saveConstruction(@RequestBody ConstructionDto constructionDto) {
        return this.constructionService.saveConstruction(constructionDto);
    }

    @PutMapping("update")
    public ResponseEntity<String> updateConstruction(@RequestBody ConstructionDto constructionDto) {
        return this.constructionService.updateConstruction(constructionDto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteConstruction(@PathVariable UUID id) {
        return this.constructionService.deleteConstruction(id);
    }

}
