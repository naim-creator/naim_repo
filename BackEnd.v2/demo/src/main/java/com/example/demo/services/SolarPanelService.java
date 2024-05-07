package com.example.demo.services;

import com.example.demo.Dto.SolarPanelDto;
import com.example.demo.ResponsePageable.SolarPanelResponse;
import com.example.demo.convert.SolarPanelDtoConverter;
import com.example.demo.models.SolarPanel;
import com.example.demo.repositorys.SolarPanelRepository;
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
public class SolarPanelService {

    private final SolarPanelRepository solarPanelRepository;
    private final SolarPanelDtoConverter solarPanelDtoConverter;

    public SolarPanelResponse getSolarPanelsByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SolarPanel> solarPanels = solarPanelRepository.findBySolarPanelCompanyId(id, pageable);
        List<SolarPanelDto> solarPanelDtos = solarPanels.stream()
                .map(solarPanelDtoConverter::SolarPanelToDto)
                .collect(Collectors.toList());

        SolarPanelResponse solarPanelResponse = new SolarPanelResponse();
        solarPanelResponse.setContent(solarPanelDtos);
        solarPanelResponse.setPageNo(solarPanels.getNumber());
        solarPanelResponse.setPageSize(solarPanels.getSize());
        solarPanelResponse.setTotalElements(solarPanels.getTotalElements());
        solarPanelResponse.setTotalPages(solarPanels.getTotalPages());
        solarPanelResponse.setLast(solarPanels.isLast());
        return solarPanelResponse;

    }

    public BigDecimal getSolarPanelStockLevel(UUID id) {
        return solarPanelRepository.findTotalSolarPanelQuantityByCompanyId(id);
    }

    public SolarPanelResponse getSolarPanelsByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SolarPanel> solarPanels = solarPanelRepository.findBySolarPanelCompanyIdFiltered(id, filter, pageable);
        List<SolarPanelDto> solarPanelDtos = solarPanels.stream()
                .map(solarPanelDtoConverter::SolarPanelToDto)
                .collect(Collectors.toList());

        SolarPanelResponse solarPanelResponse = new SolarPanelResponse();
        solarPanelResponse.setContent(solarPanelDtos);
        solarPanelResponse.setPageNo(solarPanels.getNumber());
        solarPanelResponse.setPageSize(solarPanels.getSize());
        solarPanelResponse.setTotalElements(solarPanels.getTotalElements());
        solarPanelResponse.setTotalPages(solarPanels.getTotalPages());
        solarPanelResponse.setLast(solarPanels.isLast());
        return solarPanelResponse;

    }

    public ResponseEntity<String> saveSolarPanel(SolarPanelDto solarPanelDto) {
        SolarPanel solarPanel = solarPanelDtoConverter.DtoToSolarPanel(solarPanelDto);
        this.solarPanelRepository.save(solarPanel);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateSolarPanel(SolarPanelDto solarPanelDto) {
        SolarPanel solarPanel = solarPanelDtoConverter.DtoToSolarPanel(solarPanelDto);
        this.solarPanelRepository.save(solarPanel);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteSolarPanelById(UUID id) {
        this.solarPanelRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

}
