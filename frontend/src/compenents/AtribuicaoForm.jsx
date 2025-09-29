import React, { useEffect, useState } from "react";
import axios from "axios";



export default function AtribuicaoForm({ 
  atribuicao, setAtribuicao, resetarSimulacao, parsePos,
  atribuicoes, setAtribuicoes, pedidos, drones,
  simulacao, iniciarEntrega, intervalId 
}) {

    const calcularDistancia = (drone, pedido) => {
        const dx = pedido.localEntregaX - drone.localizacaoAtualX;
        const dy = pedido.localEntregaY - drone.localizacaoAtualY;
        return Math.sqrt(dx * dx + dy * dy).toFixed(2);
    };
 
    const atribuirEntrega = async (e) => {
  e.preventDefault();
  const pedidoSelecionado = pedidos.find((p) => p.id == atribuicao.pedido);
  const droneSelecionado = drones.find((d) => d.id == atribuicao.drone);

  if (pedidoSelecionado && droneSelecionado) {
    
    if (pedidoSelecionado.dataEntrega !== null && pedidoSelecionado.dataEntrega !== undefined) {
        alert("Este pedido já foi entregue e não pode ser reatribuído!");
        return;
    }


    const jaAtribuido = atribuicoes.some(a => a.pedido.id === pedidoSelecionado.id);
    if (jaAtribuido) {
        alert("Este pedido já foi atribuído!");
        return;
    }


    if (pedidoSelecionado.pesoPacote > droneSelecionado.cargaMax) {
    alert(`ATENÇÃO: O peso do pedido (${pedidoSelecionado.pesoPacote}kg) excede a capacidade máxima do drone ${droneSelecionado.nome} (${droneSelecionado.cargaMax}kg).`);
    return;
    }


    const distanciaNecessaria = calcularDistancia(droneSelecionado, pedidoSelecionado);

    if (distanciaNecessaria > droneSelecionado.capacidadeMaxKm) {
    alert(`ATENÇÃO: A distância do pedido é ${distanciaNecessaria}km, o que excede o alcance máximo do drone ${droneSelecionado.nome} (${droneSelecionado.capacidadeMaxKm}km).`);
    return;
    }
    

    try {
        const response = await axios.post(
            `http://localhost:8080/entregas/criar?droneId=${droneSelecionado.id}&pedidoId=${pedidoSelecionado.id}`
        );

        const entregaSalva = response.data;

        setAtribuicoes([
            ...atribuicoes,
            { 
            pedido: pedidoSelecionado, 
            drone: droneSelecionado, 
            id: entregaSalva.id, 
            distancia: distanciaNecessaria 
            },
        ]);
        setAtribuicao({ pedido: "", drone: "" });
        alert("Entrega atribuída com sucesso!");
        window.location.reload()
    } catch (error) {
        console.error("Erro ao salvar entrega:", error);
        alert("Erro ao salvar entrega no backend.");
    }
}
};

    return (
    <div className="p-4 bg-white rounded shadow">
  <div className="mt-4">
        <button
            className={`px-4 py-2 rounded text-white ${intervalId ? 'bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            onClick={iniciarEntrega}
            disabled={!atribuicoes.length && simulacao.every(d => d.entregue)}
        >
            {intervalId ? 'Parar Simulação' : 'Iniciar Entrega'}
        </button>
        <button
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={resetarSimulacao}
        >
            Resetar Simulação
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-4">Atribuir Entrega</h2>
      <form onSubmit={atribuirEntrega} className="space-y-2">
<select
          className="border p-2 w-full"
          value={atribuicao.pedido}
          onChange={(e) => setAtribuicao({ ...atribuicao, pedido: e.target.value })}
          required
        >
          <option value="">Selecione o Pedido</option>
          {pedidos.map((p) => (
            <option 
              key={p.id} 
              value={p.id} 
disabled={atribuicoes.some(a => a.pedido.id === p.id)}
            >
              ({p.pesoPacote}KG) ➝ ({p.localEntregaX},{p.localEntregaY})
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={atribuicao.drone}
          onChange={(e) => setAtribuicao({ ...atribuicao, drone: e.target.value })}
          required
        >
          <option value="">Selecione o Drone</option>
          {drones.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome} (Máx: {d.cargaMax}kg, {d.capacidadeMaxKm}km)
            </option>
          ))}
        </select>

        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">
          Atribuir
        </button>
      </form>

      <ul className="mt-4 text-sm">
        <li className="font-bold border-b pb-1 mb-1">Entregas Atribuídas:</li>
        {atribuicoes.map((a) => {
        const simulacaoState = simulacao.find(s => {
        if (!a.pedido.destino) return false;
        const [destX, destY] = parsePos(a.pedido.destino);
        return s.drone === a.drone.nome && s.destinoX === destX && s.destinoY === destY;
        });
        // ALTERAÇÃO AQUI: Se não houver simulacaoState, o status é uma string vazia ("")
          const status = simulacaoState 
            ? (simulacaoState.entregue ? "✅ Concluída" : `... em ${simulacaoState.x},${simulacaoState.y}`) 
            : ""; // Removido "⏳ Pendente"

          return (
            <li key={a.id} className={`${simulacaoState && simulacaoState.entregue ? 'text-green-700' : ''}`}>
              Pedido: Base ➝ [{a.pedido.localEntregaX}, {a.pedido.localEntregaY}] ({a.pedido.pesoPacote}kg) | Drone: **{a.drone.nome}** | Dist: {a.distancia}km {status ? `(${status})` : ''}
            </li>
          );
        })}
      </ul>
      
      
    </div>
  );
}