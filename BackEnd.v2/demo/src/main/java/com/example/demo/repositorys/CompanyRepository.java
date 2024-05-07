package com.example.demo.repositorys;

import com.example.demo.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    @Query("SELECT c FROM Company c WHERE c.contactor.id = :contactorId")
    Optional<Company> findByContactorId(@Param("contactorId") UUID contactorId);
}
