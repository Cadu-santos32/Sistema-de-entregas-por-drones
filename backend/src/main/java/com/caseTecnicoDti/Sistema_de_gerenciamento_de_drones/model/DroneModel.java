package com.caseTecnicoDti.Sistema_de_gerenciamento_de_drones.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import jakarta.persistence.Transient;

@Entity
@Data
@Table(name = "drone")
public class DroneModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "nome não pode ficar em branco")
    private String nome;
    @NotNull(message = "carga maxima deve ser preenchida")
    @Column(name = "carga_maxima")
    private double cargaMax;
    @NotNull(message = "capacidade maxima deve ser preenchida")
    @Column(name = "capacidade_km")
    private double capacidadeMaxKm;
    private Status status;
    @Max(value = 100, message = "Bateria não deve exceder 100")
    private double bateria;
    private int localizacaoAtualX;
    private int localizacaoAtualY;
}
