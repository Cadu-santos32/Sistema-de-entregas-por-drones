package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class EntregaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "drone_id")
    private DroneModel drone;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private PedidoModel pedido;

    private LocalDateTime dataEntrega;
}
