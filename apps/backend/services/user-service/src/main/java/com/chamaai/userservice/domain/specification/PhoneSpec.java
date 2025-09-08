package com.chamaai.userservice.domain.specification;

import java.util.regex.Pattern;

public class PhoneSpec {
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d{10,11}$");

    public static boolean isValid(String phone) {
        return phone != null && PHONE_PATTERN.matcher(phone).matches();
    }
}
