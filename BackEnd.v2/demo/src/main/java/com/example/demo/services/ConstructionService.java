package com.example.demo.services;


import com.example.demo.Dto.ConstructionDto;
import com.example.demo.convert.ConstructionDtoConverter;
import com.example.demo.models.Construction;
import com.example.demo.repositorys.ConstructionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConstructionService {

    private final ConstructionRepository constructionRepository;
    private final ConstructionDtoConverter constructionDtoConverter;

    public List<ConstructionDto> getConstructionsByCompany(UUID id) {
        List<Construction> constructions = constructionRepository.findConstructionsByCompanyId(id);
        return constructions.stream()
                .map(constructionDtoConverter::ConstructionToDto)
                .collect(Collectors.toList());
    }

    public ResponseEntity<String> saveConstruction(ConstructionDto constructionDto) {
        Construction construction = constructionDtoConverter.DtoToConstruction(constructionDto);
        this.constructionRepository.save(construction);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateConstruction(ConstructionDto constructionDto) {
        Construction construction = constructionDtoConverter.DtoToConstruction(constructionDto);
        this.constructionRepository.save(construction);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteConstruction(UUID id) {
        this.constructionRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
