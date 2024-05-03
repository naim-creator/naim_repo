package com.example.demo.repositorys;

import com.example.demo.models.Battery;
import com.example.demo.models.Inverter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface BatteryRepository extends JpaRepository<Battery, UUID> {

    @Query("SELECT sum(b.quantity) FROM Battery b WHERE b.company.id = :companyId")
    BigDecimal findBatteriesQuantityByCompanyId(@Param("companyId") UUID companyId);
    @Query("SELECT b FROM Battery b WHERE b.company.id = :companyId")
    Page<Battery> findBatteryByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);
    @Query("SELECT ba FROM Battery ba WHERE ba.company.id = :companyId AND (ba.model LIKE %:search% OR ba.type LIKE %:search% OR CONCAT(ba.storage_capacity, '') LIKE %:search% OR CONCAT(ba.nominal_voltage, '') LIKE %:search% OR CONCAT(ba.maximum_load_voltage, '') LIKE %:search% OR CONCAT(ba.maximum_discharge_voltage, '') LIKE %:search% OR ba.life_cycle LIKE %:search% OR  CONCAT(ba.operating_temperature, '') LIKE %:search% OR ba.lifespan LIKE %:search% OR CONCAT(ba.date_manufacture, '') LIKE %:search% OR CONCAT(ba.price, '') LIKE %:search% OR CONCAT(ba.quantity, '') LIKE %:search% )")
    Page<Battery> findByBatteryCompanyIdFiltered(@Param("companyId") UUID companyId,@Param("search") String search, Pageable pageable);
}
