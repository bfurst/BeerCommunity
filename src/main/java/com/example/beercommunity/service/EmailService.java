package com.example.beercommunity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

    public void sendHtmlMessage(String to, String copy, String subject, String body) throws MessagingException {
        MimeMessage mailMessage = mailSender.createMimeMessage();
        mailMessage.setFrom(new InternetAddress("admin@revbeer.info"));
        mailMessage.setRecipients(MimeMessage.RecipientType.TO, to);
        mailMessage.setRecipients(MimeMessage.RecipientType.CC, copy);
        mailMessage.setSubject(subject);
        mailMessage.setContent(body, "text/html; charset=utf-8");
        mailSender.send(mailMessage);
    }

    public String getAutoResponseHtmlTemplate() {
        String emailTemplate = springTemplateEngine.process("auto-response-template", new Context());
        return emailTemplate;
    }

    public String getEmailVerificationHtmlTemplate(String token) {
        String url = "https://localhost:3000/verify-email/" + token;
        Context context = new Context();
        context.setVariable("url", url);

        String emailTemplate = springTemplateEngine.process("email-verification-template", context);
        return emailTemplate;
    }

    public String getEmailResetHtmlTemplate(String token) {
        String url = "https://localhost:3000/change-email/" + token;
        Context context = new Context();
        context.setVariable("url", url);

        String emailTemplate = springTemplateEngine.process("email-reset-verification-template", context);
        return emailTemplate;
    }

    public String getPasswordResetHtmlTemplate(String token) {
        String url = "https://localhost:3000/reset-password/" + token;
        Context context = new Context();
        context.setVariable("url", url);

        String emailTemplate = springTemplateEngine.process("password-reset-verification-template", context);
        return emailTemplate;
    }

    public String getAccountDeleteHtmlTemplate(String token) {
        String url = "https://localhost:3000/delete-account/" + token;
        Context context = new Context();
        context.setVariable("url", url);

        String emailTemplate = springTemplateEngine.process("account-delete-verification-template", context);
        return emailTemplate;
    }

    public String getReviewDeleteHtmlTemplate(String username, String reviewDescription, String reviewPostingDate,
            String adminDescription) {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("reviewDescription", reviewDescription);
        context.setVariable("reviewPostingDate", reviewPostingDate);
        context.setVariable("adminDescription", adminDescription);

        String emailTemplate = springTemplateEngine.process("review-deletion-template", context);
        return emailTemplate;
    }

    public String getRestrictionHtmlTemplate(String username, String restrictionDescription, String creationDate, String expireDate) {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("restrictionDescription", restrictionDescription);
        context.setVariable("creationDate", creationDate);
        context.setVariable("expireDate", expireDate);

        String emailTemplate = springTemplateEngine.process("user-restriction-template", context);
        return emailTemplate;
    }

    public String getPermanentRestrictionHtmlTemplate(String username, String restrictionDescription) {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("restrictionDescription", restrictionDescription);

        String emailTemplate = springTemplateEngine.process("user-permanent-restriction-template", context);
        return emailTemplate;
    }

    public String getAccountReactivationHtmlTemplate(String username) {
        Context context = new Context();
        context.setVariable("username", username);

        String emailTemplate = springTemplateEngine.process("account-reactivation-template", context);
        return emailTemplate;
    }
}
