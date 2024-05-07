package com.example.demo.repositorys;

import com.example.demo.models.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BillRepository extends JpaRepository<Bill, UUID> {

    @Query("SELECT f FROM Bill f JOIN f.construction c WHERE c.id = :ConstructionId")
    Optional<Bill> findByConstructionId(@Param("ConstructionId") UUID ConstructionId);

    @Query("SELECT f FROM Bill f JOIN f.company c WHERE c.id = :CompanyId")
    List<Bill> findAllByCompanyId(@Param("CompanyId") UUID CompanyId);
}
