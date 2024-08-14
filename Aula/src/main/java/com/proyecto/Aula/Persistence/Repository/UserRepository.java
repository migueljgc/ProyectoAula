package com.proyecto.Aula.Persistence.Repository;

import com.proyecto.Aula.Persistence.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUser(String user);

    User findByUser(String username);
    User findByEmail(String email);
    List<User> findByStateUserAndFechaRegistro(String stateUser, LocalDateTime fechaRegistro);

}
