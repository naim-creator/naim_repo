package com.example.demo.convert;
import com.example.demo.Dto.DevisRequestDto;
import com.example.demo.models.DevisRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DevisRequestDtoConverter {

    private final ModelMapper modelMapper;

    public DevisRequestDto DevisRequestToDto(DevisRequest devisRequest) {
        return modelMapper.map(devisRequest, DevisRequestDto.class);
    }

    public DevisRequest DtoToDevisRequest(DevisRequestDto devisRequestDto) {
        return modelMapper.map(devisRequestDto, DevisRequest.class);
    }
}
