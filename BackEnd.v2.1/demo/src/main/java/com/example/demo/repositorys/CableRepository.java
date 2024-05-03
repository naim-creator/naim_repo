package com.example.demo.repositorys;

import com.example.demo.models.Bill;
import com.example.demo.models.Cable;
import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface CableRepository extends JpaRepository<Cable, UUID> {

    @Query("SELECT c FROM Cable c WHERE c.company.id = :companyId")
    List<Cable> findCableByCompanyId(@Param("companyId") UUID companyId);
    @Query("SELECT ca FROM Cable ca WHERE ca.company.id = :companyId AND (ca.model LIKE %:search% OR ca.type LIKE %:search% OR CONCAT(ca.length, '') LIKE %:search% OR CONCAT(ca.diameter, '') LIKE %:search% OR CONCAT(ca.nominal_voltage, '') LIKE %:search% OR ca.section_transversal LIKE %:search% OR ca.material LIKE %:search% OR ca.isolation LIKE %:search% OR CONCAT(ca.resistance, '') LIKE %:search% OR CONCAT(ca.price, '') LIKE %:search% OR CONCAT(ca.quantity, '') LIKE %:search% )")
    Page<Cable> findByCableCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT sum(ca.quantity) FROM Cable ca WHERE ca.company.id = :companyId")
    BigDecimal findCablesTotalByCompanyId(@Param("companyId") UUID companyId);
    @Query("SELECT ca FROM Cable ca WHERE ca.company.id = :companyId")
    Page<Cable> findCablesByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);
}
