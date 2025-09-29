import React, { useState, useEffect } from 'react'
import axios from 'axios'; 

export default function PedidoForm({ pedido, setPedido, setSelecionando, atribuicoes, abrirModalSelecao, onCadastroSucesso }) {
  
  const parseCoordinates = (coordString) => {
    const [x, y] = coordString.split(',').map(c => Number(c.trim()));
    return { x, y };
  };


      const[pedidos, setPedidos] = useState([]);
  
      useEffect(() => {
          axios.get("http://localhost:8080/pedido/listar")
          .then((result) => {
              setPedidos(result.data)    
          }).catch((err) => {
              console.error("Erro ao buscar drones", err)
          });
      }, []); 

  const handleCadastrarPedido = (e) => {
    e.preventDefault();
    const peso = Number(pedido.peso);
    if (isNaN(peso) || peso <= 0) {
        alert("Peso deve ser um número positivo.");
        return;
    }

    const origemCoords = { x: 0, y: 0 }; 
    const destinoCoords = parseCoordinates(pedido.destino);

    if (isNaN(destinoCoords.x) || isNaN(destinoCoords.y)) {
        alert("Destino inválido. Por favor, selecione um ponto válido no mapa.");
        return;
    }
    const objPedidoParaAPI = {
        localEntregaX: destinoCoords.x, 
        localEntregaY: destinoCoords.y,
        pesoPacote: Number(peso),
        prioridade: pedido.prioridade || "Selecione"
    };

    axios.post("http://localhost:8080/pedido/criar", objPedidoParaAPI)
    .then((response) => {
        alert("Pedido cadastrado com sucesso!");
        
        window.location.reload()

        setPedido({ id: null, origem: "", destino: "", peso: "", prioridade: "" });
        
        setSelecionando(null); 

        if (onCadastroSucesso) {
            onCadastroSucesso();
        }
    })
    .catch((error) => {
        console.error("Erro ao cadastrar o pedido: ", error.response ? error.response.data : error.message);
        alert("Erro ao cadastrar o pedido. Verifique o console.");
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
        Cadastrar Pedido
      
      </h2>
      <form onSubmit={handleCadastrarPedido} className="space-y-2">
        <div className="flex gap-2 justify-between">
          
          <button
            type="button"
            className={`px-2 py-1 rounded text-sm transition duration-300 w-1/2
              ${pedido.selecionando === 'destino' ? 'bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
            onClick={() => setSelecionando("destino")} 
          >
            {pedido.destino ? `Destino: ${pedido.destino}` : "Selecionar Destino"}
          </button>
        </div>
        <input
          className="border p-2 w-full"
          placeholder="Peso (kg)"
          type="number"
          min="0.1"
          step="0.1"
          value={pedido.peso}
          onChange={(e) => setPedido({ ...pedido, peso: e.target.value })}
          required
        />
        <select
          className="border p-2 w-full"
          value={pedido.prioridade}
          onChange={(e) => setPedido({ ...pedido, prioridade: e.target.value })}
        >
        <option value="">Selecione a prioridade</option>
        <option value="MEDIA">Media</option>
        <option value="ALTA">Alta</option>
        <option value="BAIXA">Baixa</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
          Adicionar Pedido
        </button>
      </form>

      <ul className="mt-4 text-sm">
        <li className="font-bold border-b pb-1 mb-1">Pedidos Cadastrados:</li>
        {pedidos.map((p) => (
          <li key={p.id} className={`${atribuicoes.some(a => a.pedido.id === p.id) ? 'line-through text-gray-500' : ''}`}>
            {p.origem} ➝ {p.destino} | **{p.peso}kg** ({p.prioridade})
          </li>
        ))}
      </ul>
    </div>
  );
}