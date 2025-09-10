package com.chamaai.userservice.infrastructure.adapters.validation;

import com.chamaai.userservice.application.ports.out.UserValidationPort;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;

import java.util.ArrayList;
import java.util.List;

public class UserValidatorService implements UserValidationPort {

    private final UserRepositoryPort userRepositoryPort;

    public UserValidatorService(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    public List<String> validateUniqueFields(String taxId, String email, String phone) {
        List<String> conflicts = new ArrayList<>();

        if (taxId != null && userRepositoryPort.findByTaxId(taxId).isPresent()) {
            conflicts.add("Tax ID already registered");
        }
        if (email != null && userRepositoryPort.findByEmail(email).isPresent()) {
            conflicts.add("Email already registered");
        }
        if (phone != null && userRepositoryPort.findByPhoneNumber(phone).isPresent()) {
            conflicts.add("Phone number already registered");
        }
        return conflicts;
    }
}
