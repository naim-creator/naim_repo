package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class PotentialCustomer {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
