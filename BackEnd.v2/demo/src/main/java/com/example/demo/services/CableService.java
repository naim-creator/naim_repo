package com.example.demo.services;


import com.example.demo.Dto.CableDto;
import com.example.demo.ResponsePageable.CableResponse;
import com.example.demo.convert.CableDtoConverter;
import com.example.demo.models.Cable;
import com.example.demo.repositorys.CableRepository;
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
public class CableService {

    private final CableRepository cableRepository;
    private final CableDtoConverter cableDtoConverter;

    public CableResponse getCablesByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cable> cables = cableRepository.findCablesByCompanyId(id, pageable);
        List<CableDto> cableDtos =cables .stream()
                .map(cableDtoConverter::CableToDto)
                .collect(Collectors.toList());

        CableResponse cableResponse = new CableResponse();
        cableResponse.setContent(cableDtos);
        cableResponse.setPageNo(cables.getNumber());
        cableResponse.setPageSize(cables.getSize());
        cableResponse.setTotalElements(cables.getTotalElements());
        cableResponse.setTotalPages(cables.getTotalPages());
        cableResponse.setLast(cables.isLast());
        return cableResponse;
    }

    public BigDecimal getTotalCables(UUID id) {
        return cableRepository.findCablesTotalByCompanyId(id);
    }

    public CableResponse getCablesByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cable> cables = cableRepository.findByCableCompanyIdFiltered(id, filter, pageable);
        List<CableDto> cableDtos = cables.stream()
                .map(cableDtoConverter::CableToDto)
                .collect(Collectors.toList());

        CableResponse cableResponse = new CableResponse();
        cableResponse.setContent(cableDtos);
        cableResponse.setPageNo(cables.getNumber());
        cableResponse.setPageSize(cables.getSize());
        cableResponse.setTotalElements(cables.getTotalElements());
        cableResponse.setTotalPages(cables.getTotalPages());
        cableResponse.setLast(cables.isLast());
        return cableResponse;

    }

    public ResponseEntity<String> saveCable(CableDto cableDto) {
        Cable cable = this.cableDtoConverter.DtoToCable(cableDto);
        this.cableRepository.save(cable);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateCable(CableDto cableDto) {
        Cable cable = this.cableDtoConverter.DtoToCable(cableDto);
        this.cableRepository.save(cable);
        return ResponseEntity.ok("Data update");
    }

    public ResponseEntity<String> deleteCable(UUID id) {
        this.cableRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

}
