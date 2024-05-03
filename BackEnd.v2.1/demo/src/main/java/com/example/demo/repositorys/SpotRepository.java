package com.example.demo.repositorys;


import com.example.demo.models.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SpotRepository extends JpaRepository<Spot, UUID> {

}
