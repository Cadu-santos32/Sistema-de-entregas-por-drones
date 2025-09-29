import React from 'react';

export default function Mapa({ 
  matriz, 
  linhas, 
  colunas, 
  pedido, 
  selecionando, 
  simulacao, 
  selecionarCelula,
  isModalOpen,
  editFormData
}) {
  return (
    <div className="p-4 bg-white rounded shadow flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Mapa</h2>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${colunas}, 80px)`,
          gridTemplateRows: `repeat(${linhas}, 80px)`,
        }}
      >
        {matriz.map((linha, y) =>
          linha.map((celula, x) => {
            const pos = `${x},${y}`;
            
            const isOrigem = !isModalOpen ? pedido.origem === pos : (editFormData.origem === pos);
            const isDestino = !isModalOpen ? pedido.destino === pos : (editFormData.destino === pos);
            const droneNaCelula = simulacao.find(d => d.x === x && d.y === y && !d.entregue);
            const entregueAqui = simulacao.find(d => d.entregue && d.destinoX === x && d.destinoY === y);


            let content = `${x},${y}`;
            let cellClass = "";

            if (isOrigem) {
                cellClass = "bg-green-400 text-white";
                content = "Origem";
            }
            if (isDestino) {
                cellClass = "bg-red-400 text-white";
                content = "Destino";
            }
            if (droneNaCelula) {
                cellClass = "bg-yellow-500 text-white font-bold animate-pulse";
                content = droneNaCelula.drone;
            } else if (entregueAqui) {
                cellClass = "bg-green-600 text-white font-bold";
                content = "ENTREGUE";
            }

            const isSelecting = selecionando === 'origem' || selecionando === 'destino' || selecionando === 'origemEdit' || selecionando === 'destinoEdit';

            const activeOrigem = isModalOpen ? editFormData.origem : pedido.origem;
            const activeDestino = isModalOpen ? editFormData.destino : pedido.destino;

            if ((selecionando === "origem" || selecionando === "origemEdit") && pos === activeOrigem) {
                cellClass = "bg-green-500 text-white border-4 border-green-700";
            }
            if ((selecionando === "destino" || selecionando === "destinoEdit") && pos === activeDestino) {
                cellClass = "bg-red-500 text-white border-4 border-red-700";
            }

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => selecionarCelula(x, y)}
                className={`w-20 h-20 border flex flex-col items-center justify-center text-sm cursor-pointer
                  ${cellClass}
                  ${isSelecting ? "border-2 border-dashed border-blue-500" : ""}
                `}
              >
                {content}
                {droneNaCelula && <span className="text-xs">({droneNaCelula.destinoX},{droneNaCelula.destinoY})</span>}
              </div>
            );
          })
        )}
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Origem: {isModalOpen && editFormData.origem ? editFormData.origem : pedido.origem || "não definida"} | Destino: {isModalOpen && editFormData.destino ? editFormData.destino : pedido.destino || "não definido"}
      </p>
    </div>
  );
}