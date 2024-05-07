package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class MaterielMeter {

    private String modelMeter;
    private Integer quantityMeter;
    private Float priceMeter;
    private Integer tvaMeter;
    private Float totalMeter;
}
