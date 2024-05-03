package com.example.demo.controllers;


import com.example.demo.models.*;
import com.example.demo.services.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PutMapping("/activate-account/contactor")
    public ResponseEntity<?> activateAccount(@RequestBody Contactor contactor) {
        return this.authenticationService.activateAccountEntrepreneurByAdmin(contactor);
    }

    @PutMapping("/disable-account/contactor")
    public ResponseEntity<?> disableAccount(@RequestBody Contactor contactor) {
        return this.authenticationService.disableAccountEntrepreneurByAdmin(contactor);
    }

    @PutMapping("/activate-account/worker")
    public ResponseEntity<?> activateAccountWorker(@RequestBody Worker worker) {
        return this.authenticationService.activateAccountWorker(worker);
    }

    @PutMapping("/disable-account/worker")
    public ResponseEntity<?> disableAccountWorker(@RequestBody Worker worker) {
        return this.authenticationService.disableAccountWorker(worker);
    }

    @GetMapping("get/account/{email}")
    public User getAccount(@PathVariable String email) {
        return this.authenticationService.getAccount(email);
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activateAccount(token);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteAccount(@PathVariable String email) {
        return this.authenticationService.deleteAccount(email);
    }
}
