package com.example.demo.services;


import com.example.demo.Dto.BatteryDto;
import com.example.demo.Dto.SupplierDto;
import com.example.demo.ResponsePageable.BatteryResponse;
import com.example.demo.ResponsePageable.SupplierResponse;
import com.example.demo.convert.SupplierDtoConverter;
import com.example.demo.models.Battery;
import com.example.demo.models.Supplier;
import com.example.demo.repositorys.SupplierRepository;
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
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierDtoConverter supplierDtoConverter;
    public SupplierResponse getSuppliersByCompany(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supplier> suppliers = supplierRepository.findBySupplierCompanyId(id, pageable);
        List<SupplierDto> supplierDtos =suppliers .stream()
                .map(supplierDtoConverter::SupplierToDto)
                .collect(Collectors.toList());

        SupplierResponse supplierResponse = new SupplierResponse();
        supplierResponse.setContent(supplierDtos);
        supplierResponse.setPageNo(suppliers.getNumber());
        supplierResponse.setPageSize(suppliers.getSize());
        supplierResponse.setTotalElements(suppliers.getTotalElements());
        supplierResponse.setTotalPages(suppliers.getTotalPages());
        supplierResponse.setLast(suppliers.isLast());
        return supplierResponse;
    }

    public BigDecimal getTotalSuppliers(UUID id) {
        return supplierRepository.findByTotalSupplierByCompanyId(id);
    }

    public SupplierResponse getSuppliersByCompanyFiltered(UUID id, int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Supplier> suppliers = supplierRepository.findBySupplierCompanyIdFiltered(id, filter, pageable);
        List<SupplierDto> supplierDtos = suppliers.stream()
                .map(supplierDtoConverter::SupplierToDto)
                .collect(Collectors.toList());

        SupplierResponse supplierResponse = new SupplierResponse();
        supplierResponse.setContent(supplierDtos);
        supplierResponse.setPageNo(suppliers.getNumber());
        supplierResponse.setPageSize(suppliers.getSize());
        supplierResponse.setTotalElements(suppliers.getTotalElements());
        supplierResponse.setTotalPages(suppliers.getTotalPages());
        supplierResponse.setLast(suppliers.isLast());
        return supplierResponse;

    }
    public ResponseEntity<String> saveSupplier(SupplierDto supplierDto) {
        Supplier supplier = supplierDtoConverter.DtoToSupplier(supplierDto);
        this.supplierRepository.save(supplier);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateSupplier(SupplierDto supplierDto) {
        Supplier supplier = supplierDtoConverter.DtoToSupplier(supplierDto);
        this.supplierRepository.save(supplier);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteSupplier(UUID id) {
        this.supplierRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
