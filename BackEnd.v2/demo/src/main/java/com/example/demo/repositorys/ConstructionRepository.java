package com.example.demo.repositorys;

import com.example.demo.models.Construction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ConstructionRepository extends JpaRepository<Construction, UUID> {

    @Query("SELECT c FROM Construction c WHERE c.company.id = :companyId")
    Page<Construction> findConstructionsByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT c FROM Construction c WHERE c.company.id = :companyId AND (c.location LIKE %:search%)")
    Page<Construction> findConstructionByCompanyIdFiltered(@Param("companyId") UUID companyId,@Param("search") String search ,Pageable pageable);

}
