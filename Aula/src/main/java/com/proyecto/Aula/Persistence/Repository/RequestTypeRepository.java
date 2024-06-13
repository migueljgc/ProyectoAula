package com.proyecto.Aula.Persistence.Repository;


import com.proyecto.Aula.Persistence.Entity.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface RequestTypeRepository extends JpaRepository<RequestType, Long> {
}
