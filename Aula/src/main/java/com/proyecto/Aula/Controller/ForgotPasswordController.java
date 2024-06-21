package com.proyecto.Aula.Controller;

import com.proyecto.Aula.Domain.Service.EmailServiceImpl;
import com.proyecto.Aula.Domain.Service.JwtService;
import com.proyecto.Aula.Domain.Service.UserService;
import com.proyecto.Aula.Persistence.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailServiceImpl emailService;


    @PostMapping("/envio")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> payload) {
        String email=payload.get("email");
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("No se encontró un usuario con ese correo electrónico.");
        }

        // Generar token JWT para restablecer la contraseña
        String token = jwtService.genereteToken1(user.getEmail());

        // Construir el enlace para restablecer la contraseña
        String resetLink = "http://localhost:5173/reset-password/" + token;

        // Enviar correo electrónico con el enlace de restablecimiento
        String message = String.format("<h1>Para restablecer tu contraseña, haz clic en este enlace: <h1/>" + "<a href=\"%s\">Restablecer Contraseña</a>",resetLink );
        emailService.sendEmails(
                new String[]{email},
                "Recuperación de contraseña",
                message);

        return ResponseEntity.ok("Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.");
    }

    @PostMapping("/reset/{token}")
    public ResponseEntity<String> resetPassword(@PathVariable String token, @RequestBody Map<String, String> payload) {
        String newPassword=payload.get("newPassword");
        if (jwtService.validateTokenForPasswordReset(token)) {
            String username = jwtService.getUserName(token);
            userService.resetPassword(username, newPassword);

            return ResponseEntity.ok("Contraseña restablecida exitosamente.");
        } else {
            return ResponseEntity.badRequest().body("El enlace de restablecimiento de contraseña es inválido o ha expirado.");
        }
    }
}