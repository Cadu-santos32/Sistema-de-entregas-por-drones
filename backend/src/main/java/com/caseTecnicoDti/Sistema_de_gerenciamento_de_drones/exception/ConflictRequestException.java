package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception;

public class ConflictRequestException extends RuntimeException{
    public ConflictRequestException(String message) {
        super(message);
    }
}
