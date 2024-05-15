package com.example.demo.repositorys;

import com.example.demo.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    @Query("SELECT c FROM Customer c WHERE c.company.id = :companyId")
    Page<Customer> findCustomersByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE c.company.id = :companyId AND (c.firstName LIKE %:search% OR c.lastName LIKE %:search% OR c.email LIKE %:search% OR c.phone LIKE %:search%)")
    Page<Customer> findCustomersByCompanyIdFiltered(@Param("companyId") UUID companyId,@Param("search") String search, Pageable pageable);
}
