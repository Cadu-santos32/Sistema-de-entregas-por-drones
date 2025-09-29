package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.EntregaModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.PedidoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntregaRepository extends JpaRepository<EntregaModel, Long> {
    List<EntregaModel> findByDrone(DroneModel drone);
    List<EntregaModel> findByPedido(PedidoModel pedido);
}
