package com.proyecto.Aula.Persistence.Repository;


import com.proyecto.Aula.Persistence.Entity.RequestState;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface RequestStateRepository extends JpaRepository<RequestState, Long> {
}
