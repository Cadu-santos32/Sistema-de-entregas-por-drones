import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DroneForm({ drone, setDrone, onCadastroSucesso }) {

    const[drones, setDrones] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/drone/listartodos")
        .then((result) => {
            setDrones(result.data)    
        }).catch((err) => {
            console.error("Erro ao buscar drones", err)
        });
    }, []); 
  
  const cadastrarDrone = async (e) => {
    e.preventDefault(); 
    if (!drone.nome || !drone.cargaMax || !drone.kmMax) {
      alert("Preencha todos os campos!");
      return;
    }
    const carga = Number(drone.cargaMax);
    const km = Number(drone.kmMax);
    if (isNaN(carga) || carga <= 0 || isNaN(km) || km <= 0) {
      alert("Carga máxima e km máximo devem ser números positivos!");
      return;
    }
    const payload = {
      nome: drone.nome,
      cargaMax: carga,
      capacidadeMaxKm: km,
    };
    

    axios.post("http://localhost:8080/drone/criar", payload)
    .then(() => {
        alert("Drone criado com sucesso!")
        window.location.reload()
    })
    .catch((err) => {
        alert("Erro ao cadastrar drone!")
    })
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Cadastrar Drone</h2>
      <form onSubmit={cadastrarDrone} className="space-y-2">
        {/* ... campos de input (mantidos) ... */}
        <input
          type="text"
          placeholder="Nome do Drone"
          value={drone.nome}
          onChange={(e) => setDrone({ ...drone, nome: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          min="0.1"
          step="0.1"
          placeholder="Carga Máxima (kg)"
          value={drone.cargaMax}
          onChange={(e) => setDrone({ ...drone, cargaMax: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Distância Máxima (km)"
          value={drone.kmMax}
          onChange={(e) => setDrone({ ...drone, kmMax: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Adicionar Drone
        </button>
      </form>

      <ul className="mt-4 text-sm">
        <li className="font-bold border-b pb-1 mb-1">Drones cadastrados:</li>
        {/* 4. Usando a prop 'drones' para renderizar */}
        {drones.map((d) => (
          <li key={d.id}>
            {d.nome} - {d.cargaMax}kg - {d.capacidadeMaxKm}km
          </li>
        ))}
      </ul>
    </div>
  );
}