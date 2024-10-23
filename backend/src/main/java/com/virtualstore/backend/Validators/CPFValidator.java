package com.virtualstore.backend.Validators;

import org.springframework.stereotype.Component;

@Component("cpfValidator")
public class CPFValidator implements Validator<String> {
    private static final String CPF_PATTERN = "\\d{11}";

    @Override
    public void validate(String cpf) {
        if (cpf == null || !cpf.matches(CPF_PATTERN)) {
            throw new IllegalArgumentException("CPF inválido!");
        }
    }
}