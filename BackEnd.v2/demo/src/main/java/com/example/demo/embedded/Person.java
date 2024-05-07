package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Person {
    private String firstName;
    private String lastName;
    private Integer age;
    private String address;
}
