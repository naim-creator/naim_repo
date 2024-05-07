package com.example.demo.services;

import com.example.demo.Dto.BillDto;
import com.example.demo.convert.BillDtoConverter;
import com.example.demo.models.Bill;
import com.example.demo.repositorys.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final BillDtoConverter billDtoConverter;

    public BillDto getBillByConstruction(UUID id) throws Exception {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isPresent()) {
            return this.billDtoConverter.BillToDto(bill.get());
        } else
            throw new Exception("Bill not found");
    }

    public ResponseEntity<String> saveBill(BillDto billDto) {
        Bill bill = this.billDtoConverter.DtoToBill(billDto);
        this.billRepository.save(bill);
        return ResponseEntity.ok("Data saved");
    }

    public List<BillDto> getBillsByCompany(UUID id) {
        List<Bill> bills = this.billRepository.findAllByCompanyId(id);
        return bills.stream()
                .map(billDtoConverter::BillToDto)
                .collect(Collectors.toList());
    }

    public ResponseEntity<String> deleteBill(UUID id) {
        this.billRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }

}
