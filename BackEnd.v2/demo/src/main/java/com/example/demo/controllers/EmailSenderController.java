package com.example.demo.controllers;


import com.example.demo.services.EmailSenderService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("mail")
@RequiredArgsConstructor
public class EmailSenderController {

    private final EmailSenderService emailSenderService;

    @PostMapping("send")
    public String send(@RequestParam(value = "attachment", required = false) MultipartFile[] attchement, String to, String body, String subject) throws MessagingException, IOException {
        this.emailSenderService.sendEmail(to, subject, body, attchement);
        return "Votre devis a été bien envoier";
    }
}
