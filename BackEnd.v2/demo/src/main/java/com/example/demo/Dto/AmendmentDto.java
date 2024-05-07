package com.example.demo.Dto;


import com.example.demo.models.Construction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AmendmentDto {
    private UUID id;
    private String ref;
    private Date date;
    private Float price;
    private String status;
    private Construction construction;
}
