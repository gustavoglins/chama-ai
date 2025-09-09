package com.chamaai.userservice.application.ports.in;

import java.util.List;

public interface UserValidationPort {
    List<String> validateUniqueFields(String taxId, String email, String phone);
}
