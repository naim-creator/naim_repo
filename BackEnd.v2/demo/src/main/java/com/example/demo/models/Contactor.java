package com.example.demo.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;


@Data
@Entity
@Table(name = "contactor")
public class Contactor {

    @Id
    @GeneratedValue
    private UUID id;
    @NotBlank(message = "nom est ")
    private String firstName;
    @Size(min = 3, max = 12)
    private String lastName;
    @Column(unique = true)
    private String email;
    private String phone;
    private String address;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @OneToOne(mappedBy = "contactor")
    private Company company;
    @OneToOne
    private Licence licence;
}
