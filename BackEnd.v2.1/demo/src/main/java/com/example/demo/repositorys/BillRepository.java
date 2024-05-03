package com.example.demo.repositorys;

import com.example.demo.models.Battery;
import com.example.demo.models.Bill;
import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BillRepository extends JpaRepository<Bill, UUID> {

    @Query("SELECT f FROM Bill f JOIN f.construction c WHERE c.id = :ConstructionId")
    Optional<Bill> findByConstructionId(@Param("ConstructionId") UUID ConstructionId);

    @Query("SELECT sum(bi.total) FROM Bill bi WHERE bi.company.id = :companyId")
    BigDecimal findBillsTotalByCompanyId(@Param("companyId") UUID companyId);
    @Query("SELECT bi FROM Bill bi WHERE bi.company.id = :companyId")
    Page<Bill> findBillByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);
    @Query("SELECT f FROM Bill f JOIN f.company c WHERE c.id = :CompanyId")
    List<Bill> findAllByCompanyId(@Param("CompanyId") UUID CompanyId);
    @Query("SELECT bi FROM Bill bi WHERE bi.company.id = :companyId AND (CONCAT(bi.ref, '') LIKE %:search% OR CONCAT(bi.total, '') LIKE %:search% OR CONCAT(bi.date, '') LIKE %:search%)")
    Page<Bill> findByBillCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);
}
