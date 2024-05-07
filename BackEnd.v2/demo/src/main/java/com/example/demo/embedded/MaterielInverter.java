package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;


@Data
@Embeddable
public class MaterielInverter {

    private String modelInverter;
    private Integer quantityInverter;
    private Float priceInverter;
    private Integer tvaInverter;
    private Float totalInverter;

}
