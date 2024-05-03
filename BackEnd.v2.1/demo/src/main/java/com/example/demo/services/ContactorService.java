package com.example.demo.services;


import com.example.demo.Dto.ContactorDto;
import com.example.demo.ResponsePageable.ContactorResponse;
import com.example.demo.convert.ContactorDtoConverter;
import com.example.demo.models.Contactor;
import com.example.demo.repositorys.ContactorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactorService {

    private final ContactorRepository contactorRepository;
    private final ContactorDtoConverter contactorDtoConverter;

    public ContactorResponse getAllContactors(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Contactor> contactors = contactorRepository.findAll(pageable);
        List<ContactorDto> content = contactors.getContent().stream()
                .map(contactorDtoConverter::ContactorToDto)
                .collect(Collectors.toList());
        ContactorResponse contactorResponse = new ContactorResponse();
        contactorResponse.setContent(content);
        contactorResponse.setPageNo(contactors.getNumber());
        contactorResponse.setPageSize(contactors.getSize());
        contactorResponse.setTotalElements(contactors.getTotalElements());
        contactorResponse.setTotalPages(contactors.getTotalPages());
        contactorResponse.setLast(contactors.isLast());
        return contactorResponse;
    }

    public ContactorResponse getContactorByFilter(String searchFilter,int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Contactor> contactors = contactorRepository.findByCustom(searchFilter,pageable);
        List<ContactorDto> content = contactors.getContent().stream()
                .map(contactorDtoConverter::ContactorToDto)
                .collect(Collectors.toList());
        ContactorResponse contactorResponse = new ContactorResponse();
        contactorResponse.setContent(content);
        contactorResponse.setPageNo(contactors.getNumber());
        contactorResponse.setPageSize(contactors.getSize());
        contactorResponse.setTotalElements(contactors.getTotalElements());
        contactorResponse.setTotalPages(contactors.getTotalPages());
        contactorResponse.setLast(contactors.isLast());
        return contactorResponse;
    }

    public ContactorDto getContactorByEmail(String email) {
        Optional<Contactor> contactor = contactorRepository.findByEmail(email);
        if (contactor.isPresent()) {
            return contactorDtoConverter.ContactorToDto(contactor.get());
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contactor not found");
        }
    }

    public ResponseEntity<String> saveContactor(ContactorDto contactorDto) {
        Contactor contactor = contactorDtoConverter.DtoToContactor(contactorDto);
        this.contactorRepository.save(contactor);
        return ResponseEntity.ok("Data saved");
    }

    public ResponseEntity<String> updateContactor(ContactorDto contactorDto) {
        Contactor contactor = contactorDtoConverter.DtoToContactor(contactorDto);
        this.contactorRepository.save(contactor);
        return ResponseEntity.ok("Data updated");
    }

    public ResponseEntity<String> deleteContactor(UUID id) {
        this.contactorRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
