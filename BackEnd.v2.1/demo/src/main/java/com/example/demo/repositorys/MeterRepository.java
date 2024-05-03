package com.example.demo.repositorys;

import com.example.demo.models.Bill;
import com.example.demo.models.Meter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface MeterRepository extends JpaRepository<Meter, UUID> {

    @Query("SELECT m FROM Meter m WHERE m.company.id = :companyId")
    Page<Meter> findMeterByCompanyId(@Param("companyId") UUID companyId,Pageable pageable);
    @Query("SELECT me FROM Meter me WHERE me.company.id = :companyId AND ( me.model LIKE %:search% OR me.type LIKE %:search% OR me.connexion_type LIKE %:search% OR CONCAT(me.capacity, '') LIKE %:search% OR CONCAT(me.quantity, '') LIKE %:search% OR CONCAT(me.price, '') LIKE %:search%)")
    Page<Meter> findByMeterCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT sum(me.quantity) FROM Meter me WHERE me.company.id = :companyId")
    BigDecimal findMeterQuantityByCompanyId(@Param("companyId") UUID companyId);
}
