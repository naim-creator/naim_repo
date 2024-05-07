package com.example.demo.services;


import com.example.demo.Dto.MeterDto;
import com.example.demo.ResponsePageable.MeterResponse;
import com.example.demo.convert.MeterDtoConverter;
import com.example.demo.models.Meter;
import com.example.demo.repositorys.MeterRepository;
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
public class MeterService {

    private final MeterRepository meterRepository;
    private final MeterDtoConverter meterDtoConverter;


    public MeterResponse getMeterByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Meter> meters = meterRepository.findMeterByCompanyId(id, pageable);
        List<MeterDto> meterDtos = meters.stream()
                .map(meterDtoConverter::MeterToDto)
                .collect(Collectors.toList());

        MeterResponse meterResponse = new MeterResponse();
        meterResponse.setContent(meterDtos);
        meterResponse.setPageNo(meters.getNumber());
        meterResponse.setPageSize(meters.getSize());
        meterResponse.setTotalElements(meters.getTotalElements());
        meterResponse.setTotalPages(meters.getTotalPages());
        meterResponse.setLast(meters.isLast());
        return meterResponse;
    }

    public BigDecimal getMeterStockLevel(UUID id) {
        return meterRepository.findMeterQuantityByCompanyId(id);
    }

    public MeterResponse getMeterByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Meter> meters = meterRepository.findByMeterCompanyIdFiltered(id, filter, pageable);
        List<MeterDto> meterDtos = meters.stream()
                .map(meterDtoConverter::MeterToDto)
                .collect(Collectors.toList());

        MeterResponse meterResponse = new MeterResponse();
        meterResponse.setContent(meterDtos);
        meterResponse.setPageNo(meters.getNumber());
        meterResponse.setPageSize(meters.getSize());
        meterResponse.setTotalElements(meters.getTotalElements());
        meterResponse.setTotalPages(meters.getTotalPages());
        meterResponse.setLast(meters.isLast());
        return meterResponse;

    }

    public ResponseEntity<String> saveMeter(MeterDto meterDto) {
        Meter meter = meterDtoConverter.DtoToMeter(meterDto);
        this.meterRepository.save(meter);
        return ResponseEntity.ok("Data Saved");
    }

    public ResponseEntity<String> updateMeter(MeterDto meterDto) {
        Meter meter = meterDtoConverter.DtoToMeter(meterDto);
        this.meterRepository.save(meter);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteMeterById(UUID id) {
        this.meterRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
