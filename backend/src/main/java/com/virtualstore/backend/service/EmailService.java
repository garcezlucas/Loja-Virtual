package com.virtualstore.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender JavaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendTextEmail(String receiver, String title, String message) {

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(sender);
            simpleMailMessage.setTo(receiver);
            simpleMailMessage.setSubject(title);
            simpleMailMessage.setText(message);

            JavaMailSender.send(simpleMailMessage);

            return "Email Enviado";

        } catch (Exception e) {
            return "Erro ao enviar o email";
        }
    }

}
