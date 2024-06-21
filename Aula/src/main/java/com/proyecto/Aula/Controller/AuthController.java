package com.proyecto.Aula.Controller;


import com.proyecto.Aula.Controller.models.AuthResponse;
import com.proyecto.Aula.Controller.models.AuthenticationRequest;
import com.proyecto.Aula.Controller.models.RegisterRequest;
import com. proyecto. Aula. Controller. models. AuthResponse. AuthResponseBuilder;
import com.proyecto.Aula.Domain.Dto.UserDTO;
import com.proyecto.Aula.Domain.Service.AuthService;
import com.proyecto.Aula.Domain.Service.EmailServiceImpl;
import com.proyecto.Aula.Domain.Service.JwtService;
import com.proyecto.Aula.Domain.Service.UserService;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;




    @PostMapping("/register")
    public ResponseEntity<AuthResponse> Register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/registerAd")
    public ResponseEntity<AuthResponse> RegisterAd(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerAd(request));
    }
    @PostMapping("/registerSe")
    public ResponseEntity<AuthResponse> RegisterSe(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerSe(request));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }
    @GetMapping("/editar")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(authService.getCurrentUser(authentication));
    }
    @PostMapping("/activate")
    public ResponseEntity<?> activateUser(@RequestBody UserDTO userDTO) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        userDTO.setUser(username);  // Assuming the UserDTO has a user field to store the username
        UserDTO updatedUser = userService.upda(userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        if (jwtService.validateToken(token)) {
            String username = jwtService.getUserName(token);
            userService.verifyUser(username); // Implementa la lógica para marcar al usuario como verificado
            return ResponseEntity.ok("Correo electrónico verificado correctamente.");
        } else {
            return ResponseEntity.badRequest().body("Enlace de verificación inválido o expirado.");
        }
    }


}
