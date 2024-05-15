package com.example.demo.services;

import com.example.demo.Dto.LicenceDto;
import com.example.demo.ResponsePageable.LicenceReponse;
import com.example.demo.convert.LicenceDtoConverter;
import com.example.demo.models.Licence;
import com.example.demo.repositorys.LicenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LicenceService {

    private final LicenceRepository licenceRepository;
    private final LicenceDtoConverter licenceDtoConverter;

    public ResponseEntity<LicenceDto> saveLicence(int number) {
        Licence licence = new Licence();
        licence.setStatus("activer");
        licence.setStartedAt(LocalDate.now());
        licence.setExpiredAt(LocalDate.now().plusMonths(number));
        Licence licence1 = licenceRepository.save(licence);
        return ResponseEntity.ok(licenceDtoConverter.licenceToDto(licence1));
    }

    public LicenceReponse getAllLicences(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Licence> licences = licenceRepository.findAll(pageable);
        for (Licence licence : licences.getContent()) {
            if (licence.getExpiredAt().equals(LocalDate.now())) {
                licence.setStatus("expirer");
                licenceRepository.save(licence);
            }
        }
        List<LicenceDto> licenceDtos = licences.getContent()
                .stream()
                .map(licenceDtoConverter::licenceToDto)
                .collect(Collectors.toList());

        LicenceReponse licenceReponse = new LicenceReponse();
        licenceReponse.setContent(licenceDtos);
        licenceReponse.setTotalPages(licences.getTotalPages());
        licenceReponse.setTotalElements(licences.getTotalElements());
        licenceReponse.setPageSize(licenceReponse.getPageSize());
        licenceReponse.setPageNo(licenceReponse.getPageNo());
        licenceReponse.setLast(licenceReponse.isLast());
        return licenceReponse;
    }

    public ResponseEntity<LicenceDto> getLicenceById(UUID id) {
        Optional<Licence> licence = licenceRepository.findById(id);
        return licence.map(value -> ResponseEntity.ok(licenceDtoConverter.licenceToDto(value))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<String> deleteLicenceById(UUID id) {
        Optional<Licence> licence = licenceRepository.findById(id);
        return ResponseEntity.ok("Licence est supprimé");
    }

    public ResponseEntity<String> updateLicence(int number, LicenceDto licenceDto) {
        if (licenceDto.getStatus().equals("expirer")) {
            licenceDto.setExpiredAt(LocalDate.now().plusMonths(number));
        } else {
            licenceDto.setExpiredAt(licenceDto.getExpiredAt().plusMonths(number));
        }
        licenceDto.setStatus("activer");
        Licence licence = licenceDtoConverter.dtoToLicence(licenceDto);
        licenceRepository.save(licence);
        return ResponseEntity.ok("Licence est mise à jour");
    }
}
