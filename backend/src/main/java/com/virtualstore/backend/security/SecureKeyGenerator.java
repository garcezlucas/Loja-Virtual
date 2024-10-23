package com.virtualstore.backend.security;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class SecureKeyGenerator {
    public static void main(String[] args) {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA512");
            keyGen.init(256);
            SecretKey secretKey = keyGen.generateKey();

            String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
            System.out.println("Chave Secreta Gerada: " + encodedKey);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
}
