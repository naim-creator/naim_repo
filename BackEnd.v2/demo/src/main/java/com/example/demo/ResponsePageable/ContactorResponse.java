package com.example.demo.ResponsePageable;

import com.example.demo.Dto.ContactorDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContactorResponse {

    private List<ContactorDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
