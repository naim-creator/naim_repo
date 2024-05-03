package com.example.demo.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Table(name = "requestContactor")
@Entity
public class ContactorRequest {
    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String companyName;
    private String companyAddress;
    private String message;
    private Date date;
}
