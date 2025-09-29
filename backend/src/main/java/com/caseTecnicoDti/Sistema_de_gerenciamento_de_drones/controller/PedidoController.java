package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.controller;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.PedidoModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/pedido")
@AllArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    // --- CREATE ---
    @PostMapping("/criar")
    public ResponseEntity<String> criarPedido(@Valid @RequestBody PedidoModel pedido) {
        pedidoService.criarPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Pedido criado com sucesso!");
    }

    // --- READ ALL ---
    @GetMapping("/listar")
    public ResponseEntity<List<PedidoModel>> listarPedidos() {
        List<PedidoModel> pedidos = pedidoService.listarPedidos();
        return ResponseEntity.ok(pedidos);
    }

    // --- READ ONE BY ID ---
    @GetMapping("/{id}")
    public ResponseEntity<PedidoModel> buscarPedido(@PathVariable Long id) {
        PedidoModel pedido = pedidoService.buscarPedidoId(id);
        return ResponseEntity.ok(pedido);
    }

    // --- READ BY DRONE ---
    @GetMapping("/drone/{droneId}")
    public ResponseEntity<List<PedidoModel>> pedidosPorDrone(@PathVariable Long droneId) {
        List<PedidoModel> pedidos = pedidoService.pedidosPorDrone(droneId);
        return ResponseEntity.ok(pedidos);
    }

    // --- UPDATE ---
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<String> atualizarPedido(
            @PathVariable Long id,
            @Valid @RequestBody PedidoModel pedidoAtualizado) {

        PedidoModel pedidoExistente = pedidoService.buscarPedidoId(id);

        pedidoExistente.setPesoPacote(pedidoAtualizado.getPesoPacote());
        pedidoExistente.setLocalEntregaX(pedidoAtualizado.getLocalEntregaX());
        pedidoExistente.setLocalEntregaY(pedidoAtualizado.getLocalEntregaY());
        pedidoExistente.setPrioridade(pedidoAtualizado.getPrioridade());
        pedidoExistente.setDrone(pedidoAtualizado.getDrone());
        pedidoExistente.setEntregue(pedidoAtualizado.isEntregue());

        pedidoService.criarPedido(pedidoExistente); // Reaplica validações e salva

        return ResponseEntity.ok("Pedido atualizado com sucesso!");
    }

    // --- DELETE ---
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarPedido(@PathVariable Long id) {
        PedidoModel pedido = pedidoService.buscarPedidoId(id);
        pedidoService.criarPedido(pedido);
        return ResponseEntity.ok("Pedido deletado com sucesso!");
    }
}
