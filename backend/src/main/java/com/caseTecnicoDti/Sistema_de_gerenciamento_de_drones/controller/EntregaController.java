package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.controller;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.EntregaModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service.EntregaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/entregas")
@AllArgsConstructor
public class EntregaController {

    private final EntregaService entregaService;

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<EntregaModel> finalizarEntrega(@PathVariable Long id) {
        EntregaModel entrega = entregaService.buscarEntrega(id);
        entrega.setDataEntrega(LocalDateTime.now());
        return ResponseEntity.ok(entregaService.salvar(entrega));
    }


    @PostMapping("/criar")
    public ResponseEntity<EntregaModel> criarEntrega(
            @RequestParam("droneId") Long droneId,
            @RequestParam("pedidoId") Long pedidoId) {
        return ResponseEntity.ok(entregaService.criarEntrega(droneId, pedidoId));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<EntregaModel>> listarEntregas() {
        return ResponseEntity.ok(entregaService.listarEntregas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntregaModel> buscarEntrega(@PathVariable Long id) {
        return ResponseEntity.ok(entregaService.buscarEntrega(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarEntrega(@PathVariable Long id) {
        entregaService.deletarEntrega(id);
        return ResponseEntity.ok("Entrega deletada com sucesso!");
    }
}
