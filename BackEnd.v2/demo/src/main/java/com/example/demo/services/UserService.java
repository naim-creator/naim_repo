package com.example.demo.services;


import com.example.demo.embedded.ChangePasswordRequest;
import com.example.demo.models.User;
import com.example.demo.repositorys.UserRepository;
import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final TokenRepository tokenRepository;

    public void changePassword(ChangePasswordRequest request) throws MessagingException {
        var user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new BadCredentialsException("email non valide");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new BadCredentialsException("confirmation password incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private String generatePasswordCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    private String generateAndSaveActivationCode(User user) {
        String generatedToken = generatePasswordCode(4);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(10))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    public void confirmCode(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Code Invalid"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiredAt())) {
            sendConfirmationEmail(savedToken.getUser().getEmail());
            throw new RuntimeException("Code d'activation a expirée. nouvelle code a été envoyer ç votre email");
        }
    }

    public void sendConfirmationEmail(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        var newtoken = generateAndSaveActivationCode(user);
        emailSenderService.sendEmailPasswordChange(
                user.getEmail(),
                "Changer Password",
                "Votre code de confirmation : ",
                newtoken
        );
    }

    public ResponseEntity<?> activateAccount(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        user.setEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok("compte activé");
    }

    public ResponseEntity<?> disableAccount(String email) throws MessagingException {
        User user = userRepository.findByEmail(email);
        user.setEnabled(false);
        userRepository.save(user);
        return ResponseEntity.ok("compte désactivé");
    }

    public User getAccount(String email) {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<?> deleteAccount(String email){
        User user = this.userRepository.findByEmail(email);
        this.userRepository.deleteById(user.getId());
        return ResponseEntity.ok("Compte supprimé");
    }

}
