package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.controller;


import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.BadRequestException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.ConflictRequestException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleException(Exception ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(ConflictRequestException.class)
    public ResponseEntity<String> handleConflictException(Exception ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(Exception ex){
        return ResponseEntity.notFound().build();
    }
}
