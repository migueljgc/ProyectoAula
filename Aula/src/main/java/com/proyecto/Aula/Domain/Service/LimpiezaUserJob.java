package com.proyecto.Aula.Domain.Service;

import com.proyecto.Aula.Persistence.Entity.User;
import com.proyecto.Aula.Persistence.Repository.UserRepository;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class LimpiezaUserJob implements Job {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        LocalDateTime tiempoLimite = LocalDateTime.now().minusMinutes(30);
        List<User> userInactivo = userRepository.findByStateUserAndFechaRegistro("INACTIVO", tiempoLimite);
        userRepository.deleteAll(userInactivo);
    }
}
