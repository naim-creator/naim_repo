package com.example.demo.services;


import com.example.demo.Dto.ConstructionDto;
import com.example.demo.ResponsePageable.ConstructionResponse;
import com.example.demo.convert.ConstructionDtoConverter;
import com.example.demo.models.Construction;
import com.example.demo.repositorys.ConstructionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public ConstructionResponse getConstructionsByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Construction> constructions = constructionRepository.findConstructionsByCompanyId(id, pageable);
        List<ConstructionDto> constructionDtos = constructions.stream()
                .map(constructionDtoConverter::ConstructionToDto)
                .toList();
        ConstructionResponse constructionResponse = new ConstructionResponse();
        constructionResponse.setContent(constructionDtos);
        constructionResponse.setPageNo(constructions.getNumber());
        constructionResponse.setPageSize(constructions.getTotalPages());
        constructionResponse.setTotalElements(constructions.getTotalElements());
        constructionResponse.setTotalPages(constructions.getTotalPages());
        constructionResponse.setLast(constructionResponse.isLast());
        return constructionResponse;
    }

    public ConstructionResponse getConstructionsByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Construction> constructions = constructionRepository.findConstructionByCompanyIdFiltered(id, filter, pageable);
        List<ConstructionDto> constructionDtos = constructions.stream()
                .map(constructionDtoConverter::ConstructionToDto)
                .toList();
        ConstructionResponse constructionResponse = new ConstructionResponse();
        constructionResponse.setContent(constructionDtos);
        constructionResponse.setPageNo(constructions.getNumber());
        constructionResponse.setPageSize(constructions.getTotalPages());
        constructionResponse.setTotalElements(constructions.getTotalElements());
        constructionResponse.setTotalPages(constructions.getTotalPages());
        constructionResponse.setLast(constructionResponse.isLast());
        return constructionResponse;
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
