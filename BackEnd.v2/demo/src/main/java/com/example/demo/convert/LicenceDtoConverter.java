package com.example.demo.convert;

import com.example.demo.Dto.LicenceDto;
import com.example.demo.models.Licence;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LicenceDtoConverter {

    private final ModelMapper modelMapper;

    public LicenceDto licenceToDto(Licence licence) {
        return modelMapper.map(licence, LicenceDto.class);
    }

    public Licence dtoToLicence(LicenceDto licenceDto) {
        return modelMapper.map(licenceDto, Licence.class);
    }
}
