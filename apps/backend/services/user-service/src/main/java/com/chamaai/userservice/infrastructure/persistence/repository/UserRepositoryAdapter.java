package com.chamaai.userservice.infrastructure.persistence.repository;

import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.repository.UserRepositoryPort;
import com.chamaai.userservice.infrastructure.persistence.entity.UserEntity;
import com.chamaai.userservice.infrastructure.persistence.mapper.UserEntityMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final SpringDataUserRepository springDataUserRepository;
    private final UserEntityMapper userEntityMapper;

    public UserRepositoryAdapter(SpringDataUserRepository springDataUserRepository, UserEntityMapper userEntityMapper) {
        this.springDataUserRepository = springDataUserRepository;
        this.userEntityMapper = userEntityMapper;
    }

    @Override
    public User save(User user) {
        UserEntity entity = userEntityMapper.toEntity(user);
        UserEntity saved = springDataUserRepository.save(entity);
        return userEntityMapper.toDomain(saved);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return springDataUserRepository.findById(id)
                .map(userEntityMapper::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return springDataUserRepository.findByEmail(email)
                .map(userEntityMapper::toDomain);
    }

    @Override
    public Optional<User> findByPhoneNumber(String phoneNumber) {
        return springDataUserRepository.findByPhoneNumber(phoneNumber)
                .map(userEntityMapper::toDomain);
    }

    @Override
    public Optional<User> findByTaxId(String taxId) {
        return springDataUserRepository.findByTaxId(taxId)
                .map(userEntityMapper::toDomain);
    }

    @Override
    public List<User> findAll() {
        return springDataUserRepository.findAll()
                .stream()
                .map(userEntityMapper::toDomain)
                .toList();
    }

    @Override
    public void delete(User user) {
        UserEntity entity = userEntityMapper.toEntity(user);
        springDataUserRepository.delete(entity);
    }

    @Override
    public boolean existsByEmail(String email) {
        return springDataUserRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByTaxId(String taxId) {
        return springDataUserRepository.existsByTaxId(taxId);
    }

    @Override
    public boolean existsByPhoneNumber(String phoneNumber) {
        return springDataUserRepository.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public boolean existsByEmailOrTaxId(String email, String taxId) {
        return springDataUserRepository.existsByEmailOrTaxId(email, taxId);
    }
}
