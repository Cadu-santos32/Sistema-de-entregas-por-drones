package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.BadRequestException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.ConflictRequestException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.NotFoundException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.PedidoModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.Prioridade;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.DroneRepository;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final DroneRepository droneRepository;

    public void criarPedido(PedidoModel pedido) {

        if (pedido.getPrioridade() != Prioridade.ALTA &&
                pedido.getPrioridade() != Prioridade.MEDIA &&
                pedido.getPrioridade() != Prioridade.BAIXA) {
            throw new BadRequestException("Pedido com prioridade inválida");
        }

        if (pedido.getPesoPacote() <= 0) {
            throw new ConflictRequestException("Pedido com peso inválido");
        }

        DroneModel drone = pedido.getDrone();


        pedidoRepository.save(pedido);
    }

    public List<PedidoModel> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public PedidoModel buscarPedidoId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pedido inexistente"));
    }

    public List<PedidoModel> pedidosPorDrone(Long id) {
        DroneModel drone = droneRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Drone inexistente"));
        return pedidoRepository.findByDrone(drone);
    }
}
