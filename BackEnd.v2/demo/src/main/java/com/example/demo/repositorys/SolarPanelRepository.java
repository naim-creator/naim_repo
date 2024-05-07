package com.example.demo.repositorys;

import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface SolarPanelRepository extends JpaRepository<SolarPanel, UUID> {

    @Query("SELECT sp FROM SolarPanel sp WHERE sp.company.id = :companyId")
    Page<SolarPanel> findBySolarPanelCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT sp FROM SolarPanel sp WHERE sp.company.id = :companyId AND (sp.model LIKE %:search% OR CONCAT(sp.maximum_current, '') LIKE %:search% OR CONCAT(sp.nominal_power, '') LIKE %:search% OR CONCAT(sp.maximum_voltage, '') LIKE %:search% OR CONCAT(sp.width, '') LIKE %:search% OR CONCAT(sp.height, '') LIKE %:search% OR CONCAT(sp.weight, '') LIKE %:search% OR CONCAT(sp.quantity, '') LIKE %:search% OR CONCAT(sp.price, '') LIKE %:search% OR sp.type_cell LIKE %:search%)")
    Page<SolarPanel> findBySolarPanelCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT sum(sp.quantity) FROM SolarPanel sp WHERE sp.company.id = :companyId")
    BigDecimal findTotalSolarPanelQuantityByCompanyId(@Param("companyId") UUID companyId);
}
