package com.example.demo.convert;


import com.example.demo.Dto.ContactorDto;
import com.example.demo.Dto.LicenceDto;
import com.example.demo.models.Contactor;
import com.example.demo.models.Licence;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContactorDtoConverter {

    private final ModelMapper modelMapper;

    public ContactorDto ContactorToDto(Contactor contactor) {
        ContactorDto contactorDto = modelMapper.map(contactor, ContactorDto.class);
        if (contactor.getLicence() != null) {
            contactorDto.setLicenceDto(modelMapper.map(contactor.getLicence(), LicenceDto.class));
        }
        return contactorDto;
    }

    public Contactor DtoToContactor(ContactorDto contactorDto) {
        Contactor contactor = modelMapper.map(contactorDto, Contactor.class);
        if (contactorDto.getLicenceDto() != null) {
            contactor.setLicence(modelMapper.map(contactorDto.getLicenceDto(), Licence.class));
        }
        return contactor;
    }

}
