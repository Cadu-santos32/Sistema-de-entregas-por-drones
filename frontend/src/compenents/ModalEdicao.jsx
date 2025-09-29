import React from 'react';

export default function ModalEdicao({ 
  isModalOpen, 
  editingType, 
  items, 
  selectedItemId, 
  editFormData, 
  selecionarItemParaEdicao, 
  setEditFormData, 
  salvarEdicao, 
  setIsModalOpen, 
  setSelecionando 
}) {
  if (!isModalOpen) return null;
    
  const nomeItem = editingType === 'drone' ? "Drone" : "Pedido";
  const itemSendoEditado = selectedItemId ? items.find(item => item.id == selectedItemId) : null;

  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full flex justify-center items-center ">
        <div className='fixed w-screen h-screen bg-black opacity-30 z-10 '></div>
      <div className="bg-white p-6 rounded shadow-xl w-96 z-20">
        <h2 className="text-xl font-bold mb-4">Editar {nomeItem}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o {nomeItem}:</label>
          <select
            className="border p-2 w-full"
            onChange={selecionarItemParaEdicao}
            value={selectedItemId || ''}
          >
            <option value="">-- Escolha para editar --</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {editingType === 'drone' ? item.nome : `${item.origem} ➝ ${item.destino} (${item.peso}kg)`}
              </option>
            ))}
          </select>
        </div>

        {itemSendoEditado && (
          <form onSubmit={salvarEdicao} className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2">Dados de Edição</h3>
            
            {/* Campos de Edição de DRONE */}
            {editingType === 'drone' && (
              <>
                <input
                  className="border p-2 w-full"
                  placeholder="Nome do Drone"
                  value={editFormData.nome || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                  required
                />
                <input
                  className="border p-2 w-full"
                  placeholder="Carga Máxima (kg)"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={editFormData.cargaMax || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, cargaMax: e.target.value })}
                  required
                />
                <input
                  className="border p-2 w-full"
                  placeholder="Distância Máxima (km)"
                  type="number"
                  min="1"
                  step="1"
                  value={editFormData.kmMax || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, kmMax: e.target.value })}
                  required
                />
              </>
            )}

            {/* Campos de Edição de PEDIDO */}
            {editingType === 'pedido' && (
              <>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-2 py-1 rounded text-sm transition duration-300 w-1/2 
                      ${setSelecionando.value === 'origemEdit' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    onClick={() => setSelecionando("origemEdit")}
                  >
                    Origem: {editFormData.origem || 'Selecionar'}
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-1 rounded text-sm transition duration-300 w-1/2 
                      ${setSelecionando.value === 'destinoEdit' ? 'bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                    onClick={() => setSelecionando("destinoEdit")}
                  >
                    Destino: {editFormData.destino || 'Selecionar'}
                  </button>
                </div>
                <input
                  className="border p-2 w-full"
                  placeholder="Peso (kg)"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={editFormData.peso || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, peso: e.target.value })}
                  required
                />
                <select
                  className="border p-2 w-full"
                  value={editFormData.prioridade || 'Normal'}
                  onChange={(e) => setEditFormData({ ...editFormData, prioridade: e.target.value })}
                >
                  <option>Normal</option>
                  <option>Alta</option>
                  <option>Urgente</option>
                </select>
              </>
            )}

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-2 pt-3">
              <button
                type="button"
                onClick={() => { setIsModalOpen(false); setSelecionando(null); }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}