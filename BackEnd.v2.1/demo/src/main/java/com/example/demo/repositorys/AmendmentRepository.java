package com.example.demo.repositorys;

import com.example.demo.models.Amendment;
import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface AmendmentRepository extends JpaRepository<Amendment, UUID> {

    @Query("SELECT A FROM Amendment A  WHERE A.construction.id =:constructionId")
    List<Amendment> getAmendmentsByConstructionId(@Param("constructionId") UUID constructionId);

}
