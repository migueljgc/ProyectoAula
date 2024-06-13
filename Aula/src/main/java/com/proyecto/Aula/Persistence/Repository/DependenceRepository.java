package com.proyecto.Aula.Persistence.Repository;


import com.proyecto.Aula.Persistence.Entity.Dependence;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface DependenceRepository extends JpaRepository<Dependence, Long> {
}
