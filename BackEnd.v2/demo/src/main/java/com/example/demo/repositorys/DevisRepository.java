package com.example.demo.repositorys;

import com.example.demo.models.Devis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface DevisRepository extends JpaRepository<Devis, UUID> {

    @Query("SELECT d FROM Devis d WHERE d.company.id = :companyId")
    Page<Devis> findByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);
    @Query("SELECT d FROM Devis d WHERE d.company.id = :companyId AND (d.battery.modelBattery Like %:search% OR d.inverter.modelInverter Like %:search% OR d.solarPanel.modelSolarPanel LIKE %:search% OR d.cable.modelCable LIKE %:search% OR d.meter.modelMeter LIKE %:search% OR d.devisRequest.firstName LIKE %:search% OR d.devisRequest.lastName LIKE %:search% OR d.about LIKE %:search%)")
    Page<Devis> findByCompanyIdFiltered(@Param("companyId") UUID companyId,@Param("search") String search, Pageable pageable);

}
