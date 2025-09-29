package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.droneService;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.ConflictRequestException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.NotFoundException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.exception.ObjetoInalteradoException;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository.DroneRepository;
import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.service.DroneService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DroneServiceTest {

    @Mock
    private DroneRepository droneRepository;

    @InjectMocks
    private DroneService droneService;

    private DroneModel drone;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        drone = new DroneModel();
        drone.setNome("Drone1");
        drone.setCapacidadeMaxKm(10.0);
        drone.setCargaMax(5.0);
    }

    @Test
    void cadastrarDrone_sucesso() {
        when(droneRepository.existsByNome(drone.getNome())).thenReturn(false);

        assertDoesNotThrow(() -> droneService.cadastrarDrone(drone));
        verify(droneRepository, times(1)).save(drone);
    }

    @Test
    void cadastrarDrone_jaExiste() {
        when(droneRepository.existsByNome(drone.getNome())).thenReturn(true);

        ConflictRequestException exception = assertThrows(ConflictRequestException.class,
                () -> droneService.cadastrarDrone(drone));

        assertEquals("Já existe um drone com esse nome.", exception.getMessage());
        verify(droneRepository, never()).save(drone);
    }

    @Test
    void listarTodos_retornaLista() {
        when(droneRepository.findAll()).thenReturn(List.of(drone));

        List<DroneModel> result = droneService.listarTodos();

        assertEquals(1, result.size());
        assertEquals("Drone1", result.get(0).getNome());
    }

    @Test
    void editarDrone_sucesso() {
        DroneModel droneAlterado = new DroneModel();
        droneAlterado.setNome("Drone2");
        droneAlterado.setCapacidadeMaxKm(15.0);

        when(droneRepository.findById(1L)).thenReturn(Optional.of(drone));

        assertDoesNotThrow(() -> droneService.editarDrone(1L, droneAlterado));
        assertEquals("Drone2", drone.getNome());
        assertEquals(15.0, drone.getCapacidadeMaxKm());
        verify(droneRepository, times(1)).save(drone);
    }

    @Test
    void editarDrone_naoEncontrado() {
        when(droneRepository.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> droneService.editarDrone(1L, drone));

        assertEquals("Drone não encontrado com esse id.", exception.getMessage());
    }

    @Test
    void editarDrone_semAlteracoes() {
        when(droneRepository.findById(1L)).thenReturn(Optional.of(drone));

        ObjetoInalteradoException exception = assertThrows(ObjetoInalteradoException.class,
                () -> droneService.editarDrone(1L, new DroneModel()));

        assertEquals("Não há alterações a serem feitas", exception.getMessage());
        verify(droneRepository, never()).save(any());
    }
}
