package com.example.demo.controllers;


import com.example.demo.embedded.ChangePasswordRequest;
import com.example.demo.services.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PatchMapping("change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) throws MessagingException {
        userService.changePassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send-code")
    public ResponseEntity<?> sendConfirmationCode(@RequestBody String email) throws MessagingException {
        userService.sendConfirmationEmail(email);
        return ResponseEntity.ok("Code a été envoyer à votre email");
    }

    @PostMapping("/confirm-code")
    public ResponseEntity<?> confirmCode(@RequestBody String code) throws MessagingException {
        userService.confirmCode(code);
        return ResponseEntity.ok("Code bien confirmer");
    }

    @GetMapping("/get-account/{email}")
    public ResponseEntity<?> getAccount(@PathVariable String email) {
        return ResponseEntity.ok(userService.getAccount(email));
    }

    @PutMapping("/activate-account")
    public ResponseEntity<?> activateAccount(@RequestBody String email) throws MessagingException {
        return userService.activateAccount(email);
    }

    @PutMapping("/disable-account")
    public ResponseEntity<?> disableAccount(@RequestBody String email) throws MessagingException {
        return userService.disableAccount(email);
    }

    @DeleteMapping("/delete-account/{email}")
    public ResponseEntity<?> deleteAccount(@PathVariable String email) {
        return userService.deleteAccount(email);
    }
}
