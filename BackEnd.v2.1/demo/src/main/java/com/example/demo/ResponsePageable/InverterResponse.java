package com.example.demo.ResponsePageable;


import com.example.demo.Dto.InverterDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InverterResponse {

    private List<InverterDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
