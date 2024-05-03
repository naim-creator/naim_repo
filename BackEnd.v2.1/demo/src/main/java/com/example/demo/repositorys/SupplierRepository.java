package com.example.demo.repositorys;

import com.example.demo.models.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface SupplierRepository extends JpaRepository<Supplier, UUID> {
    @Query("SELECT s FROM Supplier s WHERE s.company.id = :companyId")
    Page<Supplier> findBySupplierCompanyId(@Param("companyId") UUID companyId,Pageable pageable);

    @Query("SELECT count(s.id) FROM Supplier s WHERE s.company.id = :companyId")
    BigDecimal findByTotalSupplierByCompanyId(@Param("companyId") UUID companyId);

    @Query("SELECT sup FROM Supplier sup WHERE sup.company.id = :companyId AND (sup.firstName LIKE %:search% OR sup.lastName LIKE %:search% OR sup.companyName LIKE %:search% OR sup.email LIKE %:search% OR sup.phone LIKE %:search% )")
    Page<Supplier> findBySupplierCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);
}
