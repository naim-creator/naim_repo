package com.example.demo;

import com.example.demo.models.AuthenticationRequest;
import com.example.demo.models.RegistrationRequest;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repositorys.RoleRepository;
import com.example.demo.repositorys.UserRepository;
import com.example.demo.services.AuthenticationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@RequiredArgsConstructor
public class DemoApplication {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationService authenticationService;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }


    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByNom("SECRETAIRE").isEmpty()) {
                roleRepository.save(
                        Role.builder().nom("SECRETAIRE").build()
                );
            }
            if (roleRepository.findByNom("TECHNICIEN").isEmpty()) {
                roleRepository.save(
                        Role.builder().nom("TECHNICIEN").build()
                );
            }
            if (roleRepository.findByNom("GESTIONNAIRE").isEmpty()) {
                roleRepository.save(
                        Role.builder().nom("GESTIONNAIRE").build()
                );
            }
            if (roleRepository.findByNom("ENTREPRENEUR").isEmpty()) {
                roleRepository.save(
                        Role.builder().nom("ENTREPRENEUR").build()
                );
            }
            if (roleRepository.findByNom("ADMIN").isEmpty()) {
                roleRepository.save(
                        Role.builder().nom("ADMIN").build()
                );
            }
        };
    }

    @EventListener(ApplicationReadyEvent.class)
    public void registerAdmin() throws MessagingException {
        if (userRepository.findByEmail("cherifayman4545@gmail.com") == null) {
            var request = RegistrationRequest.builder()
                    .firstName("ayman")
                    .lastName("cherif")
                    .email("cherifayman4545@gmail.com")
                    .password("adminPassword")
                    .role("ADMIN").build();
            System.out.println(request);
            authenticationService.register(request);
        } else if (userRepository.findByEmail("naimbenali666@gmail.com")==null) {
            var request=RegistrationRequest.builder()
                    .firstName("naim")
                    .lastName("benali")
                    .email("naimbenali666@gmail.com")
                    .password("naimmbb66")
                    .role("ADMIN").build();
            System.out.println(request);
            authenticationService.register(request);
        }
    }
}
