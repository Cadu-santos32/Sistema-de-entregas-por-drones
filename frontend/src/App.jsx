import React, { useState, useEffect } from "react";
import axios from "axios";
import { calcularDistancia, parsePos } from "./utils/utils";
import ModalHistorico from "./compenents/ModalHistorico";

import DroneForm from "./compenents/DroneForm";
import PedidoForm from "./compenents/PedidoForm";
import AtribuicaoForm from "./compenents/AtribuicaoForm";
import Mapa from "./compenents/Mapa";
import ModalEdicao from "./compenents/ModalEdicao";

export default function SistemaEntrega() {
  const [drones, setDrones] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [atribuicoes, setAtribuicoes] = useState([]);
  const [droneSelecionado, setDroneSelecionado] = useState(null);

  const abrirModalHistorico = () => { 
    setIsHistoricoModalOpen(true); 
  };

  const fecharModalEdicao = () => {
    setIsEdicaoModalOpen(false);
    setSelectedItemId(null);
    setEditFormData({});
    setEditingType(null);
    setSelecionando(null);
  };

      useEffect(() => {
        axios.get("http://localhost:8080/drone/listartodos")
        .then((result) => {
            setDrones(result.data)    
        }).catch((err) => {
            console.error("Erro ao buscar drones", err)
        });
    }, []); 

    useEffect(() => {
        axios.get("http://localhost:8080/pedido/listar")
        .then((result) => {
            setPedidos(result.data)    
        }).catch((err) => {
            console.error("Erro ao buscar pedidos", err)
        });
    }, []); 

    
    useEffect(() => {
        axios.get("http://localhost:8080/entregas/listar")
        .then((result) => {
            setAtribuicoes(result.data)    
        }).catch((err) => {
            console.error("Erro ao buscar entregas", err)
        });
    }, []);


  const [drone, setDrone] = useState({ nome: "", cargaMax: "", kmMax: "" });
  const [pedido, setPedido] = useState({
    id: null,
    origem: "",
    destino: "",
    peso: "",
    prioridade: "Normal",
  });
  const [atribuicao, setAtribuicao] = useState({ pedido: "", drone: "" });
  const [selecionando, setSelecionando] = useState(null);

  const [simulacao, setSimulacao] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const [editingType, setEditingType] = useState(null); 
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({}); 
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isHistoricoModalOpen, setIsHistoricoModalOpen] = useState(false)

  const linhas = 5;
  const colunas = 5;
  const matriz = Array.from({ length: linhas }, (_, y) =>
    Array.from({ length: colunas }, (_, x) => ({ x, y }))
  );

  const cadastrarDrone = (e) => {
    e.preventDefault();
    if (isNaN(Number(drone.cargaMax)) || isNaN(Number(drone.kmMax)) || Number(drone.cargaMax) <= 0 || Number(drone.kmMax) <= 0) {
        alert("Carga Máxima e Distância Máxima devem ser números positivos.");
        return;
    }
    setDrones([...drones, { 
        ...drone, 
        id: Date.now(), 
        cargaMax: Number(drone.cargaMax), 
        kmMax: Number(drone.kmMax) 
    }]);
    setDrone({ nome: "", cargaMax: "", kmMax: "" });
  };

  const cadastrarPedido = (e) => {
    e.preventDefault();
    if (!pedido.origem || !pedido.destino) {
      alert("Escolha origem e destino no mapa antes de cadastrar!");
      return;
    }
    if (isNaN(Number(pedido.peso)) || Number(pedido.peso) <= 0) {
        alert("Peso deve ser um número positivo.");
        return;
    }
    setPedidos([...pedidos, { 
        ...pedido, 
        id: Date.now(),
        peso: Number(pedido.peso)
    }]);
    setPedido({ id: null, origem: "", destino: "", peso: "", prioridade: "Normal" });
  };

  const atribuirEntrega = (e) => {
    e.preventDefault();
    const pedidoSelecionado = pedidos.find((p) => p.id == atribuicao.pedido);
    const droneSelecionado = drones.find((d) => d.id == atribuicao.drone);

    if (pedidoSelecionado && droneSelecionado) {
        const jaAtribuido = atribuicoes.some(a => a.pedido.id === pedidoSelecionado.id);
        if (jaAtribuido) {
             alert("Este pedido já foi atribuído!");
             return;
        }
        
        if (pedidoSelecionado.peso > droneSelecionado.cargaMax) {
            alert(`ATENÇÃO: O peso do pedido (${pedidoSelecionado.peso}kg) excede a capacidade máxima do drone ${droneSelecionado.nome} (${droneSelecionado.cargaMax}kg).`);
            return;
        }

        const distanciaNecessaria = calcularDistancia(pedidoSelecionado.origem, pedidoSelecionado.destino);
        if (distanciaNecessaria > droneSelecionado.kmMax) {
            alert(`ATENÇÃO: A distância do pedido é ${distanciaNecessaria}km, o que excede o alcance máximo do drone ${droneSelecionado.nome} (${droneSelecionado.kmMax}km).`);
            return;
        }

        setAtribuicoes([
            ...atribuicoes,
            { pedido: pedidoSelecionado, drone: droneSelecionado, id: Date.now(), distancia: distanciaNecessaria },
        ]);
        setAtribuicao({ pedido: "", drone: "" });
    }
  };

  const abrirModalSelecao = (type) => {
    setEditingType(type);
    setSelectedItemId(null);
    setEditFormData({});
    setIsEdicaoModalOpen(true);
  };
  
  const selecionarItemParaEdicao = (e) => {
    const id = e.target.value;
    setSelectedItemId(id);
    if (id) {
        let item;
        if (editingType === 'drone') {
            item = drones.find(d => d.id == id);
        } else {
            item = pedidos.find(p => p.id == id);
        }
        setEditFormData(item);
    } else {
        setEditFormData({});
    }
  }

  const salvarEdicao = (e) => {
    e.preventDefault();
    if (!selectedItemId) return;

    if (editingType === 'drone') {
        if (isNaN(Number(editFormData.cargaMax)) || isNaN(Number(editFormData.kmMax)) || Number(editFormData.cargaMax) <= 0 || Number(editFormData.kmMax) <= 0) {
            alert("Carga Máxima e Distância Máxima devem ser números positivos.");
            return;
        }

        setDrones(drones.map(d => 
            d.id == selectedItemId ? { 
                ...editFormData, 
                cargaMax: Number(editFormData.cargaMax), 
                kmMax: Number(editFormData.kmMax) 
            } : d
        ));
    } else { 
        if (!editFormData.origem || !editFormData.destino) {
            alert("Origem e destino são obrigatórios.");
            return;
        }
        if (isNaN(Number(editFormData.peso)) || Number(editFormData.peso) <= 0) {
            alert("Peso deve ser um número positivo.");
            return;
        }

        setPedidos(pedidos.map(p => 
            p.id == selectedItemId ? { 
                ...editFormData, 
                peso: Number(editFormData.peso) 
            } : p
        ));
    }

    setIsModalOpen(false);
    setSelectedItemId(null);
    setEditFormData({});
    setEditingType(null);
  };


  const selecionarCelula = (x, y) => {
    const pos = `${x},${y}`;

    if (!isModalOpen && selecionando === "origem") {
      setPedido({ ...pedido, origem: pos });
      setSelecionando(null);
    } else if (!isModalOpen && selecionando === "destino") {
      setPedido({ ...pedido, destino: pos });
      setSelecionando(null);
    } 
    else if (isModalOpen && editingType === 'pedido' && selecionando === "origemEdit") {
        setEditFormData({ ...editFormData, origem: pos });
        setSelecionando(null);
    } else if (isModalOpen && editingType === 'pedido' && selecionando === "destinoEdit") {
        setEditFormData({ ...editFormData, destino: pos });
        setSelecionando(null);
    }
  };

  const iniciarEntrega = () => {
    if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
        return; 
    }

    if (atribuicoes.length === 0) {
        alert("Não há entregas atribuídas para iniciar a simulação.");
        return;
    }

    const atribuicoesPendentes = atribuicoes.filter(a =>
        !simulacao.some(s => s.drone === a.drone.nome && s.entregue)
    );
    
const estadoInicial = atribuicoesPendentes.map((a) => {
    let origemX, origemY;
    
    if (a.pedido.origem) {
        [origemX, origemY] = parsePos(a.pedido.origem);
    } else {
        [origemX, origemY] = a.drone.localizacaoAtualX !== undefined && a.drone.localizacaoAtualY !== undefined 
            ? [a.drone.localizacaoAtualX, a.drone.localizacaoAtualY]
            : [0, 0];
    }
    
 
    const destinoX = a.pedido.localEntregaX; 
    const destinoY = a.pedido.localEntregaY;

    return {
        drone: a.drone.nome,
        x: origemX,
        y: origemY,
        destinoX: destinoX,
        destinoY: destinoY,
        entregue: false,
    };
})
    
    const dronesEmMovimentoAnterior = simulacao.filter(d => !d.entregue);
    setSimulacao([...estadoInicial, ...dronesEmMovimentoAnterior]);


    if (estadoInicial.length === 0 && dronesEmMovimentoAnterior.length === 0) {
        alert("Todas as entregas atribuídas já foram concluídas.");
        return;
    }

    const newInterval = setInterval(() => {
      setSimulacao((prev) => {
        const novoEstado = prev.map((d) => {
          if (d.entregue) return d;

          let newX = d.x;
          let newY = d.y;

          if (d.x < d.destinoX) newX++;
          else if (d.x > d.destinoX) newX--;
          else if (d.y < d.destinoY) newY++;
          else if (d.y > d.destinoY) newY--;

          const chegou = newX === d.destinoX && newY === d.destinoY;

          return { ...d, x: newX, y: newY, entregue: chegou };
        });

        const todosEntregues = novoEstado.every((d) => d.entregue);

        if (todosEntregues) {
          clearInterval(newInterval);
          setIntervalId(null);
          alert("Todas as entregas concluídas!");
        }

        return novoEstado;
      });
    }, 500);

    setIntervalId(newInterval);
  };

  const resetarSimulacao = () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    setSimulacao([]);
    setIntervalId(null);
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Gestão de Entregas</h1>
      <button 
        onClick={() => abrirModalHistorico(null)} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mb-6"
      >
        Visualizar Histórico de Entregas Concluídas
      </button>
      <div className="grid grid-cols-2 gap-6">
        {/* Mapa Matriz */}
        <Mapa 
            matriz={matriz}
            linhas={linhas}
            colunas={colunas}
            pedido={pedido}
            selecionando={selecionando}
            simulacao={simulacao}
            selecionarCelula={selecionarCelula}
            isModalOpen={isEdicaoModalOpen}
            editFormData={editFormData}
        />

        {/* Coluna da direita */}
        <div className="grid grid-cols-1 gap-6">
          
          <DroneForm 
            drone={drone}
            setDrone={setDrone}
            cadastrarDrone={cadastrarDrone}
            drones={drones}
            abrirModalSelecao={abrirModalSelecao}
          />

          <PedidoForm 
            pedido={pedido}
            setPedido={setPedido}
            cadastrarPedido={cadastrarPedido}
            pedidos={pedidos}
            setSelecionando={setSelecionando}
            atribuicoes={atribuicoes}
            abrirModalSelecao={abrirModalSelecao}
          />

<AtribuicaoForm 
  atribuicao={atribuicao}
  setAtribuicao={setAtribuicao}
  atribuirEntrega={atribuirEntrega}
  atribuicoes={atribuicoes}
  setAtribuicoes={setAtribuicoes}
  pedidos={pedidos}
  drones={drones}
  simulacao={simulacao}            
  iniciarEntrega={iniciarEntrega}  
  intervalId={intervalId}          
  resetarSimulacao={resetarSimulacao}
  parsePos={parsePos}
/>
        </div>
      </div>
      
      <ModalHistorico 
        isOpen={isHistoricoModalOpen}
        onClose={fecharModalEdicao}
        drones={drones}
      />
    </div>
  );
}