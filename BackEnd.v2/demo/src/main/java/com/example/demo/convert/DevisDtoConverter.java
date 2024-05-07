package com.example.demo.convert;


import com.example.demo.Dto.DevisDto;
import com.example.demo.models.Devis;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DevisDtoConverter {

    private final ModelMapper modelMapper;

    public DevisDto DevisToDto(Devis devis) {
        return modelMapper.map(devis, DevisDto.class);
    }

    public Devis DtoToDevis(DevisDto devisDto) {
        return modelMapper.map(devisDto, Devis.class);
    }
}
