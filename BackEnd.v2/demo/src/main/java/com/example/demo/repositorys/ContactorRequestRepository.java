package com.example.demo.repositorys;

import com.example.demo.models.ContactorRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ContactorRequestRepository extends JpaRepository<ContactorRequest, UUID> {

    @Query("SELECT c FROM ContactorRequest c WHERE ( " +
            "UPPER(c.firstName) like %:search% " +
            "OR UPPER(c.lastName) like %:search% " +
            "OR UPPER(c.email) like %:search% " +
            "OR UPPER(c.companyName) like %:search% " +
            "OR c.phone like %:search% OR c.companyAddress like %:search% OR c.message like %:search% OR c.status like %:search%)")
    Page<ContactorRequest> findByCustom(@Param("search") String search, Pageable pageable);
}
