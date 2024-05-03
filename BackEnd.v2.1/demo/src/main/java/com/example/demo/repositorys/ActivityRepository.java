package com.example.demo.repositorys;

import com.example.demo.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
    @Query("SELECT ac FROM Activity ac JOIN ac.workers w WHERE w.id = :workerId")
    List<Activity> findActivitiesByWorkerId(@Param("workerId") UUID workerId);

    @Query("SELECT ac FROM Activity ac WHERE ac.company.id = :companyId")
    List<Activity> findActivitiesByCompanyId(@Param("companyId") UUID companyId);
}
