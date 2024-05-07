package com.example.demo.services;

import com.example.demo.Enum.EmailTemplateName;
import com.example.demo.models.*;
import com.example.demo.repositorys.RoleRepository;
import com.example.demo.repositorys.UserRepository;
import com.example.demo.security.JwtService;
import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailSenderService emailSenderService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    public void register(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByNom(request.getRole())
                .orElseThrow(() -> new IllegalStateException("Role was not initialized"));
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();
        userRepository.save(user);
        sendValidationEmail(user);

    }

    private void sendValidationEmail(User user) throws MessagingException {

        var newtoken = generateAndSaveActivationToken(user);
        String activationUrl = "http://localhost:4200/activate-account";
        emailSenderService.sendEmailAuth(
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newtoken,"Account activation"
        );

    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateAndSaveActivationCode(4);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(10))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateAndSaveActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0 ; i < length; i++){
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = ((User)auth.getPrincipal());
        claims.put("fullName", user.fullName());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public User getAccount(String email){
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<String> activateAccountEntrepreneurByAdmin(Contactor contactor){
        User user = this.userRepository.findByEmail(contactor.getEmail());
        user.setEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok("Compte utilisateur a été activer");
    }

    public ResponseEntity<String> disableAccountEntrepreneurByAdmin(Contactor contactor){
        User user = this.userRepository.findByEmail(contactor.getEmail());
        user.setEnabled(false);
        userRepository.save(user);
        return ResponseEntity.ok("Compte utilisateur a été désactiver");
    }

    public ResponseEntity<String> disableAccountWorker(Worker worker){
        User user = this.userRepository.findByEmail(worker.getEmail());
        user.setEnabled(false);
        userRepository.save(user);
        return ResponseEntity.ok("Compte utilisateur a été désactiver");
    }

    public ResponseEntity<String> activateAccountWorker(Worker worker){
        User user = this.userRepository.findByEmail(worker.getEmail());
        user.setEnabled(true);
        userRepository.save(user);
        return ResponseEntity.ok("Compte utilisateur a été activer");
    }

    public ResponseEntity<String> deleteAccount(String email){
        User user = this.userRepository.findByEmail(email);
        this.userRepository.deleteById(user.getId());
        return ResponseEntity.ok("Compte utilisateur a été supprimer");
    }



    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(()-> new RuntimeException("Invalid Token"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiredAt())){
            sendValidationEmail(savedToken.getUser());
            throw  new RuntimeException("Activation token has expired. A new token has been sent to the same email address");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }
}