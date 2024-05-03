package com.example.demo.convert;


import com.example.demo.Dto.ContactorRequestDto;
import com.example.demo.models.ContactorRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContactorRequestDtoConverter {

    private final ModelMapper modelMapper;

    public ContactorRequestDto ContactorRequestToDto(ContactorRequest contactorRequest) {
        return modelMapper.map(contactorRequest, ContactorRequestDto.class);
    }

    public ContactorRequest DtoToContactorRequest(ContactorRequestDto contactorRequestDto) {
        return modelMapper.map(contactorRequestDto, ContactorRequest.class);
    }
}
