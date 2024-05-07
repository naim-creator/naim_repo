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
public class RegistrationRequest {

    @NotEmpty(message = "Firstname should not be empty")
    @NotBlank(message = "Firstname should not be blank")
    private String firstName;
    @NotEmpty(message = "Lastname should not be empty")
    @NotBlank(message = "Lastname should not be blank")
    private String lastName;
    @NotEmpty(message = "Email should not be empty")
    @NotBlank(message = "Email should not be blank")
    @Email(message  ="Email is not formatted")
    private String email;
    @NotEmpty(message = "Password should not be empty")
    @NotBlank(message = "Password should not be blank")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;
    private String role;
}
