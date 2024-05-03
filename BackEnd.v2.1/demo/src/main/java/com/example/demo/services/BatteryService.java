package com.example.demo.services;


import com.example.demo.Dto.BatteryDto;
import com.example.demo.Dto.SolarPanelDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.SolarPanelResponse;
import com.example.demo.convert.BatteryDtoConverter;
import com.example.demo.models.Battery;
import com.example.demo.models.SolarPanel;
import com.example.demo.repositorys.BatteryRepository;
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
public class BatteryService {

    private final BatteryRepository batteryRepository;
    private final BatteryDtoConverter batteryDtoConverter;


    public BatteryResponse getBatteriesByCompany(UUID id, int page,int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Battery> batteries = batteryRepository.findBatteryByCompanyId(id, pageable);
        List<BatteryDto> batteryDtos =batteries .stream()
                .map(batteryDtoConverter::BatteryToDto)
                .collect(Collectors.toList());

        BatteryResponse batteryResponse = new BatteryResponse();
        batteryResponse.setContent(batteryDtos);
        batteryResponse.setPageNo(batteries.getNumber());
        batteryResponse.setPageSize(batteries.getSize());
        batteryResponse.setTotalElements(batteries.getTotalElements());
        batteryResponse.setTotalPages(batteries.getTotalPages());
        batteryResponse.setLast(batteries.isLast());
        return batteryResponse;
    }

    public BigDecimal getBatteryStockLevel(UUID id) {
        return batteryRepository.findBatteriesQuantityByCompanyId(id);
    }

    public BatteryResponse getBatteryByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Battery> batteries = batteryRepository.findByBatteryCompanyIdFiltered(id, filter, pageable);
        List<BatteryDto> batteryDtos = batteries.stream()
                .map(batteryDtoConverter::BatteryToDto)
                .collect(Collectors.toList());

        BatteryResponse batteryResponse = new BatteryResponse();
        batteryResponse.setContent(batteryDtos);
        batteryResponse.setPageNo(batteries.getNumber());
        batteryResponse.setPageSize(batteries.getSize());
        batteryResponse.setTotalElements(batteries.getTotalElements());
        batteryResponse.setTotalPages(batteries.getTotalPages());
        batteryResponse.setLast(batteries.isLast());
        return batteryResponse;

    }

    public ResponseEntity<String> saveBattery(BatteryDto batteryDto) {
        Battery battery = this.batteryDtoConverter.DtoToBattery(batteryDto);
        this.batteryRepository.save(battery);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateBattery(BatteryDto batteryDto) {
        Battery battery = this.batteryDtoConverter.DtoToBattery(batteryDto);
        this.batteryRepository.save(battery);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteBattery(UUID id) {
        this.batteryRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
