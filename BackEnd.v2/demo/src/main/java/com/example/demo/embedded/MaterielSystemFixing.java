package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class MaterielSystemFixing {
    private String modelSystemFixing;
    private Integer quantitySystemFixing;
    private Float priceSystemFixing;
    private Integer tvaSystemFixing;
    private Float totalSystemFixing;
}
