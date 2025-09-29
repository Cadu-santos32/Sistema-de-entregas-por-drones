package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.ConflictRequestException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.NotFoundException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.ObjetoInalteradoException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.Status;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.DroneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class DroneService {

    private final DroneRepository droneRepository;

    public void cadastrarDrone(DroneModel drone){
        if(droneRepository.existsByNome(drone.getNome())){
            throw new ConflictRequestException("Já existe um drone com esse nome.");
        }
        droneRepository.save(drone);
    }

    public List<DroneModel> listarTodos(){
        return droneRepository.findAll();
    }


    public void editarDrone(Long id, DroneModel drone){
        DroneModel droneModel = droneRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Drone não encontrado com esse id."));

        boolean alterado = false;

        if(drone.getNome() != null && !droneModel.getNome().equals(drone.getNome())){
            droneModel.setNome(drone.getNome());
            alterado = true;
        }
        if(drone.getCapacidadeMaxKm() != 0.0 && droneModel.getCapacidadeMaxKm() != drone.getCapacidadeMaxKm()){
            droneModel.setCapacidadeMaxKm(drone.getCapacidadeMaxKm());
            alterado = true;
        }
        if (drone.getCargaMax() != 0.0 && drone.getCargaMax() != droneModel.getCargaMax()) {
            droneModel.setCargaMax(drone.getCargaMax());
            alterado = true;
        }
        if (!alterado) {
            throw new ObjetoInalteradoException("Não há alterações a serem feitas");
        }
        droneRepository.save(droneModel);
    }
}
