package com.example.demo.services;


import com.example.demo.Dto.SystemFixingDto;
import com.example.demo.ResponsePageable.InverterResponse;
import com.example.demo.ResponsePageable.SystemFixingResponse;
import com.example.demo.convert.SystemFixingDtoConverter;
import com.example.demo.models.SystemFixing;
import com.example.demo.repositorys.SystemFixingRepository;
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
public class SystemFixingService {

    private final SystemFixingRepository systemFixingRepository;
    private final SystemFixingDtoConverter systemFixingDtoConverter;

    public SystemFixingResponse getSystemFixingsByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SystemFixing> systemFixings = systemFixingRepository.findSystemFixingByCompanyId(id, pageable);
        List<SystemFixingDto> systemFixingDtos = systemFixings.stream()
                .map(systemFixingDtoConverter::SystemFixingToDto)
                .collect(Collectors.toList());
        SystemFixingResponse systemFixingResponse = new SystemFixingResponse();
        systemFixingResponse.setContent(systemFixingDtos);
        systemFixingResponse.setPageNo(systemFixings.getNumber());
        systemFixingResponse.setPageSize(systemFixings.getSize());
        systemFixingResponse.setTotalElements(systemFixings.getTotalElements());
        systemFixingResponse.setTotalPages(systemFixings.getTotalPages());
        systemFixingResponse.setLast(systemFixings.isLast());

        return systemFixingResponse;

    }

    public SystemFixingResponse getSystemFixingsByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SystemFixing> systemFixings = systemFixingRepository.findSystemFixingByCompanyIdFiltered(id, filter, pageable);
        List<SystemFixingDto> systemFixingDtos = systemFixings.stream()
                .map(systemFixingDtoConverter::SystemFixingToDto)
                .collect(Collectors.toList());
        SystemFixingResponse systemFixingResponse = new SystemFixingResponse();
        systemFixingResponse.setContent(systemFixingDtos);
        systemFixingResponse.setPageNo(systemFixings.getNumber());
        systemFixingResponse.setPageSize(systemFixings.getSize());
        systemFixingResponse.setTotalElements(systemFixings.getTotalElements());
        systemFixingResponse.setTotalPages(systemFixings.getTotalPages());
        systemFixingResponse.setLast(systemFixings.isLast());

        return systemFixingResponse;

    }

    public BigDecimal getSystemFixingStockLevel(UUID id) {
        return systemFixingRepository.findTotalSystemFixingQuantityByCompanyId(id);
    }

    public ResponseEntity<String> saveSystemFixing(SystemFixingDto systemFixingDto) {
        SystemFixing systemFixing = systemFixingDtoConverter.DtoToSystemFixing(systemFixingDto);
        systemFixingRepository.save(systemFixing);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateSystemFixing(SystemFixingDto systemFixingDto) {
        SystemFixing systemFixing = systemFixingDtoConverter.DtoToSystemFixing(systemFixingDto);
        systemFixingRepository.save(systemFixing);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteSystemFixing(UUID id) {
        this.systemFixingRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
