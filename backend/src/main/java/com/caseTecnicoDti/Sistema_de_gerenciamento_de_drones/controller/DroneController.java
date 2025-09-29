package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.controller;


import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.Status;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service.DroneService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drone")
@AllArgsConstructor
public class DroneController {

    private final DroneService droneService;

    @PostMapping("/criar")
    public ResponseEntity<String> criar(@RequestBody DroneModel droneModel){
        droneModel.setLocalizacaoAtualX(0);
        droneModel.setLocalizacaoAtualY(0);
        droneModel.setStatus(Status.DISPONIVEL);
        droneModel.setBateria(100);
        droneService.cadastrarDrone(droneModel);
        return ResponseEntity.ok("Drone criado com sucesso!");
    }

    @PutMapping("/alterar")
    public ResponseEntity<DroneModel> alterar(@RequestBody DroneModel droneModel){
        return ResponseEntity.ok(droneModel);
    }

    @GetMapping("/listartodos")
    public ResponseEntity<List<DroneModel>> listarTodos() {
        return ResponseEntity.ok().body(droneService.listarTodos());
    }






}
