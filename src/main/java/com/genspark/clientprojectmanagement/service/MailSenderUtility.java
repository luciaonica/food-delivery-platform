package com.genspark.clientprojectmanagement.service;

import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class MailSenderUtility {

    public static JavaMailSenderImpl prepareMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("tatiana56guzun@gmail.com");
        mailSender.setPassword("ncxapssmldtempaw");

        Properties mailProperties = new Properties();
        mailProperties.setProperty("mail.smtp.auth", String.valueOf(true));
        mailProperties.setProperty("mail.smtp.starttls.enable", String.valueOf(true));

        mailSender.setJavaMailProperties(mailProperties);

        return mailSender;
    }
}
