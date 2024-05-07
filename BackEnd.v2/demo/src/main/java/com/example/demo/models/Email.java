package com.example.demo.models;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class Email {
    private String adresse;
    private String subject;
    private String body;
    private MultipartFile[] attchement;
}
