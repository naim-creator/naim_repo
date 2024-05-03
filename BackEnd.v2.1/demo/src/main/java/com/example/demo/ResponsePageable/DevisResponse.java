package com.example.demo.ResponsePageable;

import com.example.demo.Dto.DevisDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DevisResponse {

    private List<DevisDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;

}
