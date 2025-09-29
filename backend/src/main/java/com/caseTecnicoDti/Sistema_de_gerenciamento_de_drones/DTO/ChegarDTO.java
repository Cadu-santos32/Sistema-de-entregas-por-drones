package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.DTO;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.PedidoModel;
import lombok.Data;

@Data
public class ChegarDTO {
    private PedidoModel pedido;
    private DroneModel drone;
}
