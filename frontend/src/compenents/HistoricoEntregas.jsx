import React from 'react';

export default function HistoricoEntregas({ drones, abrirModalHistorico }) {

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Histórico por Drone</h2>
      
      {drones.length === 0 ? (
        <p className="text-gray-500">Nenhum drone cadastrado.</p>
      ) : (
        <ul className="space-y-2">
          {drones.map((drone) => (
            <li 
              key={drone.id} 
              className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">{drone.nome}</span>
              <button 
                onClick={() => abrirModalHistorico(drone)} // Passa o objeto drone completo
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
              >
                Ver Entregas
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}