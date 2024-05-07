package com.example.demo.repositorys;

import com.example.demo.models.Inverter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface InverterRepository extends JpaRepository<Inverter, UUID> {

    @Query("SELECT i FROM Inverter i WHERE i.company.id = :companyId")
    Page<Inverter> findInverterByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT i FROM Inverter i WHERE i.company.id = :companyId AND ( CONCAT(i.nominal_power, '') LIKE %:search% OR CONCAT(i.maximum_circuit_voltage, '') LIKE %:search% OR CONCAT(i.minimal_circuit_current, '') LIKE %:search% OR CONCAT(i.price, '') LIKE %:search% OR CONCAT(i.quantity, '') LIKE %:search% OR CONCAT(i.frequency, '') LIKE %:search% OR CONCAT(i.phase_number, '') LIKE %:search% OR CONCAT(i.tension, '') LIKE %:search% OR i.type LIKE %:search% OR i.model LIKE %:search%)")
    Page<Inverter> findInverterByCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT sum(i.quantity) FROM Inverter i WHERE i.company.id = :companyId")
    BigDecimal findTotalInverterQuantityByCompanyId(@Param("companyId") UUID companyId);
}
