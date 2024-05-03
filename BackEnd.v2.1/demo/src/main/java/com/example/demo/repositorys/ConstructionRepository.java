package com.example.demo.repositorys;

import com.example.demo.models.Battery;
import com.example.demo.models.Construction;
import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ConstructionRepository extends JpaRepository<Construction, UUID> {

    @Query("SELECT c FROM Construction c WHERE c.company.id = :companyId")
    List<Construction> findConstructionsByCompanyId(@Param("companyId") UUID companyId);

    @Query("SELECT count(cs.id) FROM Construction cs WHERE cs.company.id = :companyId")
    BigDecimal findTotalConstructionsByCompanyId(@Param("companyId") UUID companyId);
    @Query("SELECT cs FROM Construction cs WHERE cs.company.id = :companyId")
    Page<Construction> findConstructionByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);
    @Query("SELECT cs FROM Construction cs WHERE cs.company.id = :companyId AND (cs.description LIKE %:search% OR cs.location LIKE %:search% )")
    Page<Construction> findByConstructionCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

}
