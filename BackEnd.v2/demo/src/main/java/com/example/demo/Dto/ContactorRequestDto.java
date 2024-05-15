package com.example.demo.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactorRequestDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String companyName;
    private String companyAddress;
    private String message;
    private String status;
    private LocalDate date;
}
