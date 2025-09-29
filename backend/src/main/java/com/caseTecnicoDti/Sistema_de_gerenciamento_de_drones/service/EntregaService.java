package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.NotFoundException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.EntregaModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.PedidoModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.EntregaRepository;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.DroneRepository;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class EntregaService {

    private final EntregaRepository entregaRepository;
    private final DroneRepository droneRepository;
    private final PedidoRepository pedidoRepository;

    public EntregaModel salvar(EntregaModel entrega) {
        return entregaRepository.save(entrega);
    }

    public EntregaModel criarEntrega(Long droneId, Long pedidoId) {
        DroneModel drone = droneRepository.findById(droneId)
                .orElseThrow(() -> new NotFoundException("Drone não encontrado"));

        PedidoModel pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));

        EntregaModel entrega = new EntregaModel();
        entrega.setDrone(drone);
        entrega.setPedido(pedido);
        entrega.setDataEntrega(LocalDateTime.now());

        return entregaRepository.save(entrega);
    }

    public List<EntregaModel> listarEntregas() {
        return entregaRepository.findAll();
    }

    public EntregaModel buscarEntrega(Long id) {
        return entregaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Entrega não encontrada"));
    }

    public void deletarEntrega(Long id) {
        EntregaModel entrega = buscarEntrega(id);
        entregaRepository.delete(entrega);
    }
}
