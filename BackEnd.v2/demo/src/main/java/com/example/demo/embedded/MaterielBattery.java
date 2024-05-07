package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class MaterielBattery {
    private String modelBattery;
    private Integer quantityBattery;
    private Float priceBattery;
    private Integer tvaBattery;
    private Float totalBattery;
}
