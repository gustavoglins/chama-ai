package com.chamaai.userservice.domain.repository;

import com.chamaai.userservice.domain.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepositoryPort {

    User save(User user);

    Optional<User> findById(UUID id);

    Optional<User> findByEmail(String email);

    Optional<User> findByTaxId(String taxId);

    Optional<User> findByPhoneNumber(String phoneNumber);

    List<User> findAll();

    void delete(User user);

    boolean existsByEmail(String email);

    boolean existsByTaxId(String taxId);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByEmailOrTaxId(String email, String taxId);
}
