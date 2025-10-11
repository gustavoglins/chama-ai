package com.chamaai.userservice.application.ports.out;

import java.util.List;

// TODO: check if this is the best package for this interface
public interface UserValidationPort {
    List<String> validateUniqueFields(String taxId, String email);
}
