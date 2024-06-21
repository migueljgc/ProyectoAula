package com.proyecto.Aula.Controller;


import com.proyecto.Aula.Domain.Dto.EmailDTO;
import com.proyecto.Aula.Domain.Dto.EmailFileDTO;
import com.proyecto.Aula.Domain.Service.IEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/send")
public class MailController {

    @Autowired
    private IEmailService iEmailService;


    @PostMapping("/message")
    public ResponseEntity<?> receiveEmail(@RequestBody EmailDTO emailDTO) {
        System.out.println("mensaje recibido " + emailDTO);
        iEmailService.sendEmails(
                emailDTO.getToUser(),
                emailDTO.getSubject(),
                emailDTO.getMessage()
        );
        return ResponseEntity.ok().build();

    }

    @PostMapping("/messageFile")
    public ResponseEntity<?> receiveEmailFile(@ModelAttribute EmailFileDTO emailFileDTO) {
        try {
            String fileName = emailFileDTO.getFile().getOriginalFilename();

            Path path = Paths.get("src/main/resources/files/" + fileName);

            Files.createDirectories(path.getParent());
            Files.copy(emailFileDTO.getFile().getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            File file = path.toFile();

            iEmailService.sendEmailWithFile(emailFileDTO.getToUser(), emailFileDTO.getSubject(), emailFileDTO.getMessage(), file);

            Map<String, String> response = new HashMap<>();
            response.put("estado", "Enviado");
            response.put("archivo", fileName);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el Email con el archivo. " + e.getMessage());
        }
    }

    @PostMapping("/sendEmailWithPdf")
    public ResponseEntity<?> sendEmailWithPdf(@RequestBody EmailFileDTO emailPdfDTO) {
        iEmailService.sendEmailWithPdf(
                emailPdfDTO.getToUser()[0], // Asumiendo que siempre hay al menos un destinatario
                emailPdfDTO.getSubject(),
                emailPdfDTO.getMessage(),
                emailPdfDTO.getPdfContent()
        );

        return ResponseEntity.ok("Email sent successfully!");
    }
}



