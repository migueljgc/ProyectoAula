package com.proyecto.Aula.Controller;


import com.proyecto.Aula.Controller.models.AuthResponse;
import com.proyecto.Aula.Controller.models.AuthenticationRequest;
import com.proyecto.Aula.Controller.models.RegisterRequest;
import com.proyecto.Aula.Domain.Service.AuthService;
import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    UserRepository userRepository;

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

    @PutMapping("/editar")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser, Authentication authentication) {
        return ResponseEntity.ok(authService.updateUser(updatedUser, authentication));
    }

}
