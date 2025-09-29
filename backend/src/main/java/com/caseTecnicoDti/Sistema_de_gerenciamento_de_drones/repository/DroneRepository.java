package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.repository;

import com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model.DroneModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DroneRepository extends JpaRepository<DroneModel, Long> {
    @Query(value = "SELECT * FROM drone WHERE drone.nome LIKE %:nome%", nativeQuery = true)
    Optional<List<DroneModel>> buscarParteNome(String nome);
    boolean existsByNome(String nome);
}
