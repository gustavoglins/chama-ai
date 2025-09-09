package com.chamaai.userservice.infrastructure.adapters.persistence.repository;

import com.chamaai.userservice.infrastructure.adapters.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpringDataUserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByTaxId(String taxId);

    Optional<UserEntity> findByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);

    boolean existsByTaxId(String taxId);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByEmailOrTaxId(String email, String taxId);
}
