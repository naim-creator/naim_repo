package com.example.demo.services;


import com.example.demo.Dto.ContactorRequestDto;
import com.example.demo.ResponsePageable.ContactorRequestResponse;
import com.example.demo.convert.ContactorRequestDtoConverter;
import com.example.demo.models.ContactorRequest;
import com.example.demo.repositorys.ContactorRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactorRequestService {

    private final ContactorRequestRepository contactorRequestRepository;
    private final ContactorRequestDtoConverter contactorRequestDtoConverter;

    public ContactorRequestResponse getContactorRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactorRequest> contactorRequests = contactorRequestRepository.findAll(pageable);
        List<ContactorRequest> contactorRequestsContent = contactorRequests.getContent();
        List<ContactorRequestDto> content = contactorRequestsContent.stream()
                .map(contactorRequestDtoConverter::ContactorRequestToDto)
                .collect(Collectors.toList());
        ContactorRequestResponse contactorRequestResponse = new ContactorRequestResponse();
        contactorRequestResponse.setContent(content);
        contactorRequestResponse.setPageNo(contactorRequests.getNumber());
        contactorRequestResponse.setPageSize(contactorRequests.getSize());
        contactorRequestResponse.setTotalElements(contactorRequests.getTotalElements());
        contactorRequestResponse.setTotalPages(contactorRequests.getTotalPages());
        contactorRequestResponse.setLast(contactorRequestResponse.isLast());
        return contactorRequestResponse;
    }

    public ContactorRequestResponse getContactorRequestByFilter(String filter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactorRequest> contactorRequests = contactorRequestRepository.findByCustom(filter, pageable);
        List<ContactorRequest> contactorRequestsContent = contactorRequests.getContent();
        List<ContactorRequestDto> content = contactorRequestsContent.stream()
                .map(contactorRequestDtoConverter::ContactorRequestToDto)
                .collect(Collectors.toList());
        ContactorRequestResponse contactorRequestResponse = new ContactorRequestResponse();
        contactorRequestResponse.setContent(content);
        contactorRequestResponse.setPageNo(contactorRequests.getNumber());
        contactorRequestResponse.setPageSize(contactorRequests.getSize());
        contactorRequestResponse.setTotalElements(contactorRequests.getTotalElements());
        contactorRequestResponse.setTotalPages(contactorRequests.getTotalPages());
        contactorRequestResponse.setLast(contactorRequestResponse.isLast());
        return contactorRequestResponse;
    }

    public ResponseEntity<String> saveContactorRequest(ContactorRequestDto contactorRequestDto) {
        ContactorRequest contactorRequest = contactorRequestDtoConverter.DtoToContactorRequest(contactorRequestDto);
        this.contactorRequestRepository.save(contactorRequest);
        return ResponseEntity.ok("data Saved");
    }

    public ResponseEntity<String> deleteContactorRequest(UUID id) {
        this.contactorRequestRepository.deleteById(id);
        return ResponseEntity.ok("Data deleted");
    }
}
