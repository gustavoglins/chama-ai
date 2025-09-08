package com.chamaai.userservice.domain.specification;

import java.util.regex.Pattern;

public class CpfSpec {
    private static final Pattern CPF_PATTERN = Pattern.compile("^\\d{11}$");

    public static boolean isValid(String cpf) {
        if (cpf == null) return false;
        String digitsOnly = cpf.replaceAll("[.-]", "");
        return CPF_PATTERN.matcher(digitsOnly).matches();
    }
}
