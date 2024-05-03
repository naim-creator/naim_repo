package com.example.demo.repositorys;

import com.example.demo.models.Customer;
import com.example.demo.models.SolarPanel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    @Query("SELECT c FROM Customer c WHERE c.company.id = :companyId")
    Page<Customer> findCustomersByCompanyId(@Param("companyId") UUID companyId, Pageable pageable);
    @Query("SELECT cus FROM Customer cus WHERE cus.company.id = :companyId AND (cus.firstName LIKE %:search% OR cus.lastName LIKE %:search% OR cus.email LIKE %:search% OR cus.phone LIKE %:search% )")
    Page<Customer> findByCustomerCompanyIdFiltered(@Param("companyId") UUID companyId, @Param("search") String search, Pageable pageable);

    @Query("SELECT count (cu.id) FROM Customer cu WHERE cu.company.id = :companyId")
    BigDecimal findTotalCustomerByCompanyId(@Param("companyId") UUID companyId);
}
