package com.example.demo.services;


import com.example.demo.Dto.InverterDto;
import com.example.demo.ResponsePageable.InverterResponse;
import com.example.demo.convert.InverterDtoConverter;
import com.example.demo.models.Inverter;
import com.example.demo.repositorys.InverterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InverterService {

    private final InverterRepository inverterRepository;
    private final InverterDtoConverter inverterDtoConverter;

    public InverterResponse getInvertersByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Inverter> inverters = inverterRepository.findInverterByCompanyId(id, pageable);
        List<InverterDto> inverterDtos = inverters.stream()
                .map(inverterDtoConverter::InverterToDto)
                .collect(Collectors.toList());
        InverterResponse inverterResponse = new InverterResponse();
        inverterResponse.setContent(inverterDtos);
        inverterResponse.setPageNo(inverters.getNumber());
        inverterResponse.setPageSize(inverters.getSize());
        inverterResponse.setTotalElements(inverters.getTotalElements());
        inverterResponse.setTotalPages(inverters.getTotalPages());
        inverterResponse.setLast(inverters.isLast());

        return inverterResponse;
    }

    public InverterResponse getInvertersByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Inverter> inverters = inverterRepository.findInverterByCompanyIdFiltered(id, filter, pageable);
        List<InverterDto> inverterDtos = inverters.stream()
                .map(inverterDtoConverter::InverterToDto)
                .collect(Collectors.toList());
        InverterResponse inverterResponse = new InverterResponse();
        inverterResponse.setContent(inverterDtos);
        inverterResponse.setPageNo(inverters.getNumber());
        inverterResponse.setPageSize(inverters.getSize());
        inverterResponse.setTotalElements(inverters.getTotalElements());
        inverterResponse.setTotalPages(inverters.getTotalPages());
        inverterResponse.setLast(inverters.isLast());

        return inverterResponse;
    }

    public BigDecimal getInverterStockLevel(UUID id) {
        return inverterRepository.findTotalInverterQuantityByCompanyId(id);
    }

    public ResponseEntity<String> saveInverter(InverterDto inverterDto) {
        Inverter inverter = inverterDtoConverter.DtoToInverter(inverterDto);
        this.inverterRepository.save(inverter);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateInverter(InverterDto inverterDto) {
        Inverter inverter = inverterDtoConverter.DtoToInverter(inverterDto);
        this.inverterRepository.save(inverter);
        return ResponseEntity.ok("Data update");
    }

    public ResponseEntity<String> deleteInverterById(UUID id) {
        this.inverterRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

}
