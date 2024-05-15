package com.example.demo.repositorys;

import com.example.demo.models.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    @Query("SELECT c FROM Company c WHERE c.contactor.id = :contactorId")
    Optional<Company> findByContactorId(@Param("contactorId") UUID contactorId);

    @Query("SELECT c FROM Company c WHERE c.address LIKE %:search% OR c.contact LIKE %:search% OR c.companyName LIKE %:search% OR c.contactor.lastName LIKE %:search% OR c.contactor.firstName LIKE %:search% OR c.contactor.licence.status like %:search% OR concat( c.contactor.licence.expiredAt,'') LIKE %:search%")
    Page<Company> findCompaniesFiltered(@Param("search") String search, Pageable pageable);
}