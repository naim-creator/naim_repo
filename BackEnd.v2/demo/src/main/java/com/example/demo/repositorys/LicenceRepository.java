package com.example.demo.repositorys;


import com.example.demo.models.Licence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LicenceRepository extends JpaRepository<Licence, UUID> {
}
