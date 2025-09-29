package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception;

public class BusinessException extends RuntimeException{
    public BusinessException(String mensage){
        super(mensage);
    }
}
