package com.example.demo.repositorys;

import com.example.demo.models.SystemFixing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface SystemFixingRepository extends JpaRepository<SystemFixing, UUID> {

    @Query("SELECT sf FROM SystemFixing sf WHERE sf.company.id = :companyId")
    Page<SystemFixing> findSystemFixingByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT sf FROM SystemFixing sf WHERE sf.company.id = :companyId AND (CONCAT(sf.height, '') LIKE %:search% OR CONCAT(sf.width, '') LIKE %:search%  OR CONCAT(sf.price, '') LIKE %:search% OR CONCAT(sf.quantity, '') LIKE %:search% OR CONCAT(sf.charge, '') LIKE %:search% OR sf.installation_method LIKE %:search% OR sf.type LIKE %:search% OR sf.model LIKE %:search% OR sf.adaptability LIKE %:search% OR sf.installation_method LIKE %:search%)")
    Page<SystemFixing> findSystemFixingByCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT sum(sf.quantity) FROM SystemFixing sf WHERE sf.company.id = :companyId")
    BigDecimal findTotalSystemFixingQuantityByCompanyId(@Param("companyId") UUID companyId);
}
