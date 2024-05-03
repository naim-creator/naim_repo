package com.example.demo.repositorys;

import com.example.demo.models.Worker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

public interface WorkerRepository extends JpaRepository<Worker, UUID> {

    @Query("SELECT w FROM Worker w WHERE w.email LIKE :email")
    Optional<Worker> findByEmail(@Param("email") String email);

    @Query("SELECT w FROM Worker w WHERE w.company.id = :companyId")
    Page<Worker> findWorkersByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT w FROM Worker w WHERE w.company.id = :companyId and ( " +
            "UPPER(w.firstName) like %:search% OR UPPER(w.lastName) like %:search% OR UPPER(w.email) like %:search% OR UPPER(w.address) like %:search% OR w.phone like %:search% OR w.profession like %:search%)")
    Page<Worker> findByCustom(@Param("search") String search,@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT count (w.id) FROM Worker w WHERE w.company.id = :companyId")
    BigDecimal findTotalWorkersByCompanyId(@Param("companyId") UUID companyId);
}
