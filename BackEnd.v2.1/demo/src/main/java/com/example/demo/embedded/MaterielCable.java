package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class MaterielCable {
    private String modelCable;
    private Integer quantityCable;
    private Float priceCable;
    private Integer tvaCable;
    private Float totalCable;
}
