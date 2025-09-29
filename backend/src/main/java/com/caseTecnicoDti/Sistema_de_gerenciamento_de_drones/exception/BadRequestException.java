package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String message){
        super(message);
    }
}
