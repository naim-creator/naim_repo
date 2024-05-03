package com.example.demo;

import com.example.demo.models.Role;
import com.example.demo.repositorys.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository){
		return args -> {
			if (roleRepository.findByNom("SECRETAIRE").isEmpty()){
				roleRepository.save(
						Role.builder().nom("SECRETAIRE").build()
				);
			}
			if (roleRepository.findByNom("TECHNICIEN").isEmpty()){
				roleRepository.save(
						Role.builder().nom("TECHNICIEN").build()
				);
			}
			if(roleRepository.findByNom("GESTIONNAIRE").isEmpty()){
				roleRepository.save(
						Role.builder().nom("GESTIONNAIRE").build()
				);
			}
			if(roleRepository.findByNom("ENTREPRENEUR").isEmpty()){
				roleRepository.save(
						Role.builder().nom("ENTREPRENEUR").build()
				);
			}
			if(roleRepository.findByNom("ADMIN").isEmpty()){
				roleRepository.save(
						Role.builder().nom("ADMIN").build()
				);
			}
		};
	}
}
