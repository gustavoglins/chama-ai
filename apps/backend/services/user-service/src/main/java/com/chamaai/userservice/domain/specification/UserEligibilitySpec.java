package com.chamaai.userservice.domain.specification;

import com.chamaai.userservice.domain.model.User;

import java.time.LocalDate;
import java.time.Period;

public class UserEligibilitySpec {
    private static final int MINIMUM_AGE = 18;

    public boolean isAdult(User user) {
        if (user.getDateOfBirth() == null) return false;
        return Period.between(user.getDateOfBirth(), LocalDate.now()).getYears() >= MINIMUM_AGE;
    }
}
