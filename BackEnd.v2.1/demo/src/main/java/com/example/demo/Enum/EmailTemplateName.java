package com.example.demo.Enum;


import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account");
    private final String nom;

    EmailTemplateName(String nom){
        this.nom = nom;
    }
}
