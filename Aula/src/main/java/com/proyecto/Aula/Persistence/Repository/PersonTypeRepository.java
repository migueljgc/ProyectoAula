package com.proyecto.Aula.Persistence.Repository;

import com.proyecto.Aula.Persistence.Entity.PersonType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonTypeRepository extends JpaRepository<PersonType, Long> {
}
