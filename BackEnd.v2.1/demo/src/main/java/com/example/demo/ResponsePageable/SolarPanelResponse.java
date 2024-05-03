package com.example.demo.ResponsePageable;

import com.example.demo.Dto.SolarPanelDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SolarPanelResponse {

    private List<SolarPanelDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
