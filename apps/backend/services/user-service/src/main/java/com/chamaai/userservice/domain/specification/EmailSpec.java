package com.chamaai.userservice.domain.specification;

import java.util.regex.Pattern;

public class EmailSpec {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[\\w.-]+@[\\w.-]+\\.\\w+$");

    public static boolean isValid(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
}
