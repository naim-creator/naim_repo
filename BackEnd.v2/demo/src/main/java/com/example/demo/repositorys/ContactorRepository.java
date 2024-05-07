package com.example.demo.repositorys;


import com.example.demo.models.Contactor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ContactorRepository extends JpaRepository<Contactor, UUID> {

    Optional<Contactor> findByEmail(String email);

    @Query("SELECT c FROM Contactor c WHERE ( " +
            "UPPER(c.firstName) like %:search% OR UPPER(c.lastName) like %:search% OR UPPER(c.email) like %:search% OR UPPER(c.address) like %:search% OR c.phone like %:search%)")
    Page<Contactor> findByCustom(@Param("search") String search, Pageable pageable);

}
