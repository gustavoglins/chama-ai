package com.chamaai.userservice.domain.services;

import com.chamaai.userservice.domain.exceptions.InvalidUserException;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.specification.CpfSpec;
import com.chamaai.userservice.domain.specification.EmailSpec;
import com.chamaai.userservice.domain.specification.PhoneSpec;
import com.chamaai.userservice.domain.specification.UserEligibilitySpec;

public class UserDomainService {

    private final UserEligibilitySpec eligibilitySpec;

    public UserDomainService(UserEligibilitySpec eligibilitySpec) {
        this.eligibilitySpec = eligibilitySpec;
    }

    //TODO: remove duplicates validation (e.g. email, cpf, phone)
    public void validateUser(User user) {
        if (!EmailSpec.isValid(user.getEmail())) throw new InvalidUserException("Invalid email");
        if (!CpfSpec.isValid(user.getTaxId())) throw new InvalidUserException("Invalid CPF");
        if (!PhoneSpec.isValid(user.getPhoneNumber())) throw new InvalidUserException("Invalid phone number");
        if (!eligibilitySpec.isAdult(user)) throw new InvalidUserException("User must be of legal age");
        if (user.getAuthProvider() == null) throw new InvalidUserException("AuthProvider cannot be null");
        if (user.getFirstName() == null || user.getFirstName().isEmpty()) throw new InvalidUserException("FirstName cannot be null");
        if (user.getLastName() == null || user.getLastName().isEmpty()) throw new InvalidUserException("LastName cannot be null");
        if (user.getAccountType() == null || user.getAccountType().isEmpty()) throw new InvalidUserException("AccountType cannot be null");
        if (user.getRole() == null) throw new InvalidUserException("Role cannot be null");
    }

    public void updateEmail(User user, String newEmail) {
        if (newEmail != null && !newEmail.equals(user.getEmail())) {
            if (!EmailSpec.isValid(newEmail)) {
                throw new InvalidUserException("Invalid email");
            }
            user.updateEmail(newEmail);
        }
    }

    public void updatePhoneNumber(User user, String newPhoneNumber) {
        if (newPhoneNumber != null && !newPhoneNumber.equals(user.getPhoneNumber())) {
            if (!PhoneSpec.isValid(newPhoneNumber)) {
                throw new InvalidUserException("Invalid phone number");
            }
            user.updatePhoneNumber(newPhoneNumber);
        }
    }
}