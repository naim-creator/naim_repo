package com.example.demo.embedded;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class MaterielSolarPanel {
    private String modelSolarPanel;
    private Integer quantitySolarPanel;
    private Float priceSolarPanel;
    private Integer tvaSolarPanel;
    private Float totalSolarPanel;
}
