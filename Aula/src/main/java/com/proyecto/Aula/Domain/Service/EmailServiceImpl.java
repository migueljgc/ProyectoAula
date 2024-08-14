package com.proyecto.Aula.Domain.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;


import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.springframework.core.io.ClassPathResource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class EmailServiceImpl implements  IEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String[] toUser, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("miguelgaviriam.8@gmail.com");
        mailMessage.setTo(toUser);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }

    @Override
    public void sendEmailWithFile(String[] toUser, String Subject, String message, File file) {

    }

    @Override
    public void sendEmails(String[] toUser, String subject, String message) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom("miguelgaviriam.8@gmail.com");
            helper.setTo(toUser);
            helper.setSubject(subject);
            helper.setText(message, true);  // Aquí se especifica que el contenido es HTML
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Manejar la excepción apropiadamente según tu aplicación
        }
    }



    private void createPdf(ByteArrayOutputStream outputStream, String content) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        // Cargar la fuente Arial desde el classpath
        ClassPathResource fontResource = new ClassPathResource("fonts/arial.ttf");
        PDType0Font font = PDType0Font.load(document, fontResource.getInputStream());
            
        PDPageContentStream contentStream = new PDPageContentStream(document, page);
        contentStream.setFont(font, 12); // Establecer la fuente y el tamaño
        contentStream.setLeading(14.5f); // Espaciado entre líneas

        // Posición inicial para el texto
        float textX = 100;
        float textY = 700;

        contentStream.beginText();
        contentStream.newLineAtOffset(textX, textY);

        // Dividir el contenido por líneas y mostrarlo en el PDF
        String[] lines = content.split("\n");
        for (String line : lines) {
            contentStream.showText(line);
            contentStream.newLine(); // Agregar salto de línea
        }

        contentStream.endText();
        contentStream.close();

        document.save(outputStream);
        document.close();
    }

    @Override
    public void sendEmailWithPdf(String to, String subject, String text, String pdfContent){
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            String subjecte =String.format(subject);
            helper.setTo(to);
            helper.setSubject(subjecte);
            helper.setText(text, true);

            // Create PDF document with the provided content
            ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
            createPdf(pdfOutputStream, pdfContent);

            // Attach PDF to email
            InputStreamSource pdfSource = new ByteArrayResource(pdfOutputStream.toByteArray());
            helper.addAttachment("document.pdf", pdfSource);

            mailSender.send(message);
        }
        catch (MessagingException | IOException e) {
            e.printStackTrace();
            // Manejar la excepción apropiadamente según tu aplicación
        }

    }
}
