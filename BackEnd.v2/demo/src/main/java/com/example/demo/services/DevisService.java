package com.example.demo.services;

import com.example.demo.Dto.DevisDto;
import com.example.demo.ResponsePageable.DevisResponse;
import com.example.demo.convert.DevisDtoConverter;
import com.example.demo.models.Devis;
import com.example.demo.repositorys.DevisRepository;
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
public class DevisService {

    private final DevisRepository devisRepository;
    private final DevisDtoConverter devisDtoConverter;

    public DevisResponse getDevisByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Devis> devisList = devisRepository.findByCompanyId(id, pageable);
        List<DevisDto> devisDtos = devisList.getContent().stream()
                .map(devisDtoConverter::DevisToDto)
                .collect(Collectors.toList());
        DevisResponse devisResponse = new DevisResponse();
        devisResponse.setContent(devisDtos);
        devisResponse.setPageNo(devisList.getNumber());
        devisResponse.setPageSize(devisList.getSize());
        devisResponse.setTotalElements(devisList.getTotalElements());
        devisResponse.setTotalPages(devisList.getTotalPages());
        devisResponse.setLast(devisList.isLast());
        return devisResponse;
    }

    public ResponseEntity<String> saveDevis(DevisDto devisDto) {
        Devis devis = devisDtoConverter.DtoToDevis(devisDto);
        devisRepository.save(devis);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateDevis(DevisDto devisDto) {
        Devis devis = devisDtoConverter.DtoToDevis(devisDto);
        devisRepository.save(devis);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteDevis(UUID id) {
        this.devisRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
