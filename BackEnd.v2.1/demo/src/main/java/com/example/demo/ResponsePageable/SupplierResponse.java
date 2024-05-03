package com.example.demo.ResponsePageable;

import com.example.demo.Dto.SolarPanelDto;
import com.example.demo.Dto.SupplierDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class SupplierResponse {
    private List<SupplierDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
