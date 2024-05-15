package com.example.demo.repositorys;

import com.example.demo.models.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface SupplierRepository extends JpaRepository<Supplier, UUID> {
    @Query("SELECT s FROM Supplier s WHERE s.company.id = :companyId")
    Page<Supplier> findBySupplierCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT s FROM Supplier s WHERE s.company.id = :companyId AND (s.firstName LIKE %:search% OR s.lastName LIKE %:search% OR s.email like %:search% OR s.phone LIKE %:search% OR s.companyName LIKE %:search%)")
    Page<Supplier> findBySupplierCompanyIdFiltered(@Param("companyId") UUID companyId,@Param("search") String search, Pageable pageable);
}
