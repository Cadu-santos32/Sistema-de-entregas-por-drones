// src/components/ModalHistorico.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModalHistorico({ isOpen, onClose, drones }) {
  // Estado local para armazenar o ID do drone que o usuário selecionou no dropdown
  const [droneSelecionadoId, setDroneSelecionadoId] = useState('');
  const [entregasHistorico, setEntregasHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomeDrone, setNomeDrone] = useState('Todos');

  // Efeito para buscar as entregas sempre que o modal abrir ou o drone selecionado mudar
  useEffect(() => {
    // Só busca dados se o modal estiver aberto
    if (isOpen) {
      setLoading(true);
      
      // Limpa o histórico anterior e define o nome do drone
      setEntregasHistorico([]);
      
      const selectedDrone = drones.find(d => d.id == droneSelecionadoId);
      setNomeDrone(selectedDrone ? selectedDrone.nome : 'Todos os Drones');


      axios.get("http://localhost:8080/entregas/listar")
        .then(response => {
          // 1. Filtra por entregas que foram concluídas (e.dataEntrega)
          let entregasFiltradas = response.data.filter(e => e.dataEntrega);

          // 2. Se um drone foi selecionado, filtra pelo ID do drone
          if (droneSelecionadoId) {
            entregasFiltradas = entregasFiltradas.filter(
              e => e.drone.id == droneSelecionadoId 
            );
          }

          setEntregasHistorico(entregasFiltradas);
        })
        .catch(error => {
          console.error(`Erro ao buscar histórico:`, error);
          alert("Não foi possível carregar o histórico de entregas.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!isOpen) {
        // Limpa o estado quando o modal fecha
        setEntregasHistorico([]);
        setDroneSelecionadoId(''); // Reseta o select
        setNomeDrone('Todos');
    }
  }, [isOpen, droneSelecionadoId, drones]); // Depende do ID selecionado e do estado do modal


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">
          Histórico de Entregas - **{nomeDrone}**
        </h3>
        
        {/* Dropdown de Seleção de Drone */}
        <div className="mb-4">
          <label htmlFor="drone-select" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Drone:
          </label>
          <select
            id="drone-select"
            className="border p-2 w-full rounded shadow-sm focus:ring-purple-500 focus:border-purple-500"
            value={droneSelecionadoId}
            onChange={(e) => setDroneSelecionadoId(e.target.value)}
          >
            <option value="">Todos os Drones</option>
            {drones.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome} (ID: {d.id})
              </option>
            ))}
          </select>
        </div>
        {/* Fim do Dropdown */}

        {loading ? (
          <p>Carregando histórico...</p>
        ) : entregasHistorico.length === 0 ? (
          <p className="text-gray-500">Nenhuma entrega concluída encontrada para o filtro atual.</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {entregasHistorico.map(entrega => (
              <li key={entrega.id} className="border-b pb-2">
                <p className="font-semibold text-gray-700">Pedido #{entrega.pedido.id} | Drone: {entrega.drone.nome}</p>
                <p className="text-sm">
                  **Origem: Base** ➝ Destino: ({entrega.pedido.localEntregaX}, {entrega.pedido.localEntregaY})
                </p>
                <p className="text-xs text-gray-600">
                  Peso: {entrega.pedido.pesoPacote}kg | Finalizada em: {new Date(entrega.dataEntrega).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}