package com.chamaai.userservice.domain.services;

import com.chamaai.userservice.domain.exceptions.InvalidUserException;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.specification.CpfSpec;
import com.chamaai.userservice.domain.specification.EmailSpec;
import com.chamaai.userservice.domain.specification.PhoneSpec;
import com.chamaai.userservice.domain.specification.UserEligibilitySpec;
import org.springframework.stereotype.Service;

@Service
public class UserDomainService {

    private final UserEligibilitySpec eligibilitySpec;

    public UserDomainService() {
        this.eligibilitySpec = new UserEligibilitySpec();
    }

    public void validateNewUser(User user) {
        if (user == null) throw new InvalidUserException("User cannot be null");

        if (!EmailSpec.isValid(user.getEmail())) throw new InvalidUserException("Invalid email");
        if (!CpfSpec.isValid(user.getTaxId())) throw new InvalidUserException("Invalid CPF");
        if (!PhoneSpec.isValid(user.getPhoneNumber())) throw new InvalidUserException("Invalid phone number");
        if (!eligibilitySpec.isAdult(user)) throw new InvalidUserException("User must be adult");

        if (user.getAuthProvider() == null) throw new InvalidUserException("AuthProvider cannot be null");
        if (user.getFirstName() == null || user.getFirstName().isEmpty())
            throw new InvalidUserException("FirstName cannot be null");
        if (user.getLastName() == null || user.getLastName().isEmpty())
            throw new InvalidUserException("LastName cannot be null");
        if (user.getAccountType() == null || user.getAccountType().isEmpty())
            throw new InvalidUserException("AccountType cannot be null");
        if (user.getRole() == null) throw new InvalidUserException("Role cannot be null");
    }
}