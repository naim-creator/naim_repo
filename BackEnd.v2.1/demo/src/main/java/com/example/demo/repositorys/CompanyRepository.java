package com.example.demo.repositorys;

import com.example.demo.models.Company;
import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    @Query("SELECT co FROM Company co WHERE co.id = :companyId AND (co.name LIKE %:search% OR co.address LIKE %:search% OR co.contact LIKE %:search% )")
    Page<Company> findByCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);
}
