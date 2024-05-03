package com.example.demo.services;


import com.example.demo.Dto.AmendmentDto;
import com.example.demo.convert.AmendmentDtoConverter;
import com.example.demo.models.Amendment;
import com.example.demo.repositorys.AmendmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AmendmentService {

    private final AmendmentRepository amendmentRepository;
    private final AmendmentDtoConverter amendmentDtoConverter;


    public ResponseEntity<String> saveAmendment(AmendmentDto amendmentDto) {
        Amendment amendment = this.amendmentDtoConverter.DtoToAmendment(amendmentDto);
        this.amendmentRepository.save(amendment);
        return ResponseEntity.ok("Data saved");
    }


    public List<AmendmentDto> getAmendmentsByConstruction(UUID id) {
        List<Amendment> amendments = this.amendmentRepository.getAmendmentsByConstructionId(id);
        return amendments.stream()
                .map(amendmentDtoConverter::AmendmentToDto)
                .collect(Collectors.toList());
    }
}
