package com.example.demo.ResponsePageable;

import com.example.demo.Dto.ContactorRequestDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class ContactorRequestResponse {
    private List<ContactorRequestDto> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
