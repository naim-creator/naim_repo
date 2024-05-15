package com.example.demo.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "licence")
@RequiredArgsConstructor
@NoArgsConstructor
public class    Licence {

    @Id
    @GeneratedValue
    private UUID id;
    @NonNull
    private LocalDate startedAt;
    @NonNull
    private LocalDate expiredAt;
    @NonNull
    private String status;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @OneToOne(mappedBy = "licence")
    private Contactor contactor;
    @OneToMany
    private List<Worker> workers;
}
