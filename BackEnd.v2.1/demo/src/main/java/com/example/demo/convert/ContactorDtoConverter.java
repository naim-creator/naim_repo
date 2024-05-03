package com.example.demo.convert;


import com.example.demo.Dto.ContactorDto;
import com.example.demo.models.Contactor;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContactorDtoConverter {

    private final ModelMapper modelMapper;

    public ContactorDto ContactorToDto(Contactor contactor) {
        return modelMapper.map(contactor, ContactorDto.class);
    }

    public Contactor DtoToContactor(ContactorDto contactorDto) {
        return modelMapper.map(contactorDto, Contactor.class);
    }

}
