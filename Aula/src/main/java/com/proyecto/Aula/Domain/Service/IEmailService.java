package com.proyecto.Aula.Domain.Service;

import jakarta.mail.MessagingException;

import java.io.File;
import java.io.IOException;

public interface IEmailService {
    void sendEmail(String[] toUser, String Subject, String message);
    void sendEmailWithFile(String[] toUser, String Subject, String message, File file);
    void sendEmails(String[] toUser, String subject, String message);

    void sendEmailWithPdf(String to, String subject, String text, String pdfContent);
}
