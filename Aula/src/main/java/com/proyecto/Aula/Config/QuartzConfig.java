package com.proyecto.Aula.Config;


import com.proyecto.Aula.Domain.Service.LimpiezaUserJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuartzConfig {
    @Bean
    public JobDetail limpiezaUSerJobDetail(){
        return JobBuilder.newJob(LimpiezaUserJob.class)
                .withIdentity("limpiezaUserJob")
                .storeDurably()
                .build();
    }
    @Bean
    public Trigger limpiezaUSerJobTrogger(){
        SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule()
                .withIntervalInSeconds(60)
                .repeatForever();

        return TriggerBuilder.newTrigger()
                .forJob(limpiezaUSerJobDetail())
                .withIdentity("limpiezaUserTrigger")
                .withSchedule(scheduleBuilder)
                .build();
    }


}
