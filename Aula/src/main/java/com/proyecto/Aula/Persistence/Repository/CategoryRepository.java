package com.proyecto.Aula.Persistence.Repository;


import com.proyecto.Aula.Persistence.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
