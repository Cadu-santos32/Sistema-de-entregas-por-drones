package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.DTO;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import lombok.Data;

@Data
public class MoverParaDTO {

    private DroneModel drone;
    private int x;
    private int y;

}
