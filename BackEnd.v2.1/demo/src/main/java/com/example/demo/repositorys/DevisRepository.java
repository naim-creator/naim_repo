package com.example.demo.repositorys;

import com.example.demo.models.Bill;
import com.example.demo.models.Devis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface DevisRepository extends JpaRepository<Devis, UUID> {

    @Query("SELECT d FROM Devis d WHERE d.company.id = :companyId")
    Page<Devis> findByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT de FROM Devis de WHERE de.company.id = :companyId AND (CONCAT(de.date, '') LIKE %:search% OR de.ref LIKE %:search% OR de.status LIKE %:search%)")
    Page<Devis> findByDevisCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT count (d.id) FROM Devis d WHERE d.company.id = :companyId")
    BigDecimal findTotalDevisByCompanyId(@Param("companyId") UUID companyId);
}
