package com.example.demo.services;


import com.example.demo.Dto.DevisRequestDto;
import com.example.demo.ResponsePageable.DevisRequestResponse;
import com.example.demo.convert.DevisRequestDtoConverter;
import com.example.demo.models.DevisRequest;
import com.example.demo.repositorys.DevisRequestRepository;
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
public class DevisRequestService {

    private final DevisRequestRepository devisRequestRepository;
    private final DevisRequestDtoConverter devisRequestDtoConverter;


    public DevisRequestResponse getDevisRequestsByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DevisRequest> devisRequests = devisRequestRepository.findDevisRequestByCompanyId(id, pageable);
        List<DevisRequestDto> devisRequestDtos = devisRequests.getContent().stream()
                .map(devisRequestDtoConverter::DevisRequestToDto)
                .collect(Collectors.toList());
        DevisRequestResponse devisRequestResponse = new DevisRequestResponse();
        devisRequestResponse.setContent(devisRequestDtos);
        devisRequestResponse.setPageNo(devisRequests.getNumber());
        devisRequestResponse.setTotalPages(devisRequests.getTotalPages());
        devisRequestResponse.setTotalElements(devisRequests.getTotalElements());
        devisRequestResponse.setPageSize(devisRequests.getSize());
        devisRequestResponse.setLast(devisRequests.isLast());
        return devisRequestResponse;
    }

    public DevisRequestResponse getDevisRequestsByCompanyFiltered(UUID id, String filter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DevisRequest> devisRequests = devisRequestRepository.findDevisRequestByCompanyIdFiltered(id, filter, pageable);
        List<DevisRequestDto> devisRequestDtos = devisRequests.getContent().stream()
                .map(devisRequestDtoConverter::DevisRequestToDto)
                .collect(Collectors.toList());
        DevisRequestResponse devisRequestResponse = new DevisRequestResponse();
        devisRequestResponse.setContent(devisRequestDtos);
        devisRequestResponse.setPageNo(devisRequests.getNumber());
        devisRequestResponse.setTotalPages(devisRequests.getTotalPages());
        devisRequestResponse.setTotalElements(devisRequests.getTotalElements());
        devisRequestResponse.setPageSize(devisRequests.getSize());
        devisRequestResponse.setLast(devisRequests.isLast());
        return devisRequestResponse;
    }

    public BigDecimal getTotalDevisRequests(UUID id) {
        return devisRequestRepository.CountDevisRequestByCompanyId(id);
    }

    public ResponseEntity<String> saveDevisRequest(DevisRequestDto devisRequestDto) {
        DevisRequest devisRequest = devisRequestDtoConverter.DtoToDevisRequest(devisRequestDto);
        this.devisRequestRepository.save(devisRequest);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateDevisRequest(DevisRequestDto devisRequestDto) {
        DevisRequest devisRequest = devisRequestDtoConverter.DtoToDevisRequest(devisRequestDto);
        this.devisRequestRepository.save(devisRequest);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteDevisRequestById(UUID id) {
        this.devisRequestRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

}
