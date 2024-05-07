package com.example.demo.ResponsePageable;

import com.example.demo.Dto.WorkerDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkerResponse {

    private List<WorkerDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
