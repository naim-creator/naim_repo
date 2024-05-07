package com.example.demo.ResponsePageable;

import com.example.demo.Dto.SystemFixingDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SystemFixingResponse {

    private List<SystemFixingDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
