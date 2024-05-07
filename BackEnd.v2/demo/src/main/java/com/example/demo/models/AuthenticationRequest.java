package com.example.demo.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class AuthenticationRequest {
    @NotEmpty(message = "Email est vide")
    @NotBlank(message = "Email est invalid")
    @Email(message  ="Email n'est pas bien formatter")
    private String email;
    @NotEmpty(message = "Password is est vide")
    @NotBlank(message = "Password is invalid")
    @Size(min = 8, message = "Password doit etre 8 characters de longueur minimum")
    private String password;
}
