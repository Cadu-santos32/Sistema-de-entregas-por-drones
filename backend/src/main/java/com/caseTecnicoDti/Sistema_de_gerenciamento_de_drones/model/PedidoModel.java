package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Transient;

@Entity
@Data
public class PedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double pesoPacote;
    private int localEntregaX;
    private int localEntregaY;
    private Prioridade prioridade;
    private boolean entregue;
    @JoinColumn
    @ManyToOne
    private DroneModel drone;

}
