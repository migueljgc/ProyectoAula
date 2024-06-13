package com.proyecto.Aula.Persistence.Repository;


import com.proyecto.Aula.Persistence.Entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
}
