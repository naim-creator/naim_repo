package com.example.demo.repositorys;

import com.example.demo.models.DevisRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface DevisRequestRepository extends JpaRepository<DevisRequest, UUID> {

    @Query("SELECT dr FROM DevisRequest dr WHERE dr.company.id = :companyId")
    Page<DevisRequest> findDevisRequestByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT dr FROM DevisRequest dr WHERE dr.company.id = :companyId AND (dr.firstName LIKE %:search% OR dr.lastName LIKE %:search% OR dr.email LIKE %:search% OR dr.phone LIKE %:search% OR dr.location LIKE %:search% OR dr.post_code LIKE %:search% OR dr.roof_type LIKE %:search% OR dr.status LIKE %:search%)")
    Page<DevisRequest> findDevisRequestByCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT count(dr) FROM DevisRequest dr WHERE dr.company.id = :companyId")
    BigDecimal CountDevisRequestByCompanyId(@Param("companyId") UUID companyId);
}
