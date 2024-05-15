package com.example.demo.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue
    private UUID id;
    private String companyName;
    private String address;
    private String contact;
    @OneToOne
    private Contactor contactor;
    @OneToMany(mappedBy = "company")
    private List<Worker> workers;
    @OneToMany(mappedBy = "company")
    private List<Devis> devisList;
    @OneToMany(mappedBy = "company")
    private List<DevisRequest> devisRequestList;
    @OneToMany(mappedBy = "company")
    private List<SolarPanel> SolarePanelList;
    @OneToMany(mappedBy = "company")
    private List<Meter> meterList;
    @OneToMany(mappedBy = "company")
    private List<SystemFixing> systemFixingList;
    @OneToMany(mappedBy = "company")
    private List<Inverter> inverterList;
    @OneToMany(mappedBy = "company")
    private List<Supplier> supplierList;
    @OneToMany(mappedBy = "company")
    private List<Battery> batteryList;
    @OneToMany(mappedBy = "company")
    private List<Cable> cableList;
    @OneToMany(mappedBy = "company")
    private List<Customer> customerList;
    @OneToMany(mappedBy = "company")
    private List<Activity> activityList;
    @OneToMany(mappedBy = "company")
    private List<Construction> constructionList;
}
