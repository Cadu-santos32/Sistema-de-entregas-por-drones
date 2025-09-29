# 🚀 Sistema de Gerenciamento de Entregas por Drone

Este projeto é um **sistema de gerenciamento de entregas** que permite o cadastro de drones e pedidos, a atribuição de entregas, e a simulação visual do processo em um mapa de matriz.

**Tecnologias Principais:**
- Frontend: React + Tailwind CSS (Vite)
- Backend: Java 17+ / Spring Boot
- Banco de Dados: H2 (em memória)

---

## ⚙️ Guia de Inicialização do Projeto

Para rodar o projeto, você precisará configurar o ambiente Java (Backend) e Node.js (Frontend).

### 📋 Pré-requisitos

- **Java Development Kit (JDK) 17 ou superior**
- **Node.js e npm** (para o frontend)

---

### 1️⃣ Iniciar o Backend (Java/Spring Boot)

O backend é responsável pela **API de gerenciamento de Drones, Pedidos e Atribuições**.

1. Navegue até o diretório raiz do backend.
2. Execute o comando Maven:

```bash
./mvnw spring-boot:run
O servidor estará rodando em http://localhost:8080/

2️⃣ Iniciar o Frontend (React + Vite)
O frontend é a interface onde toda a interação com o sistema acontece.

Navegue até o diretório do frontend, por exemplo:

bash
Copiar código
cd frontend
Instale as dependências:

bash
Copiar código
npm install
Inicie a aplicação React:

bash
Copiar código
npm start
O aplicativo será aberto no navegador em http://localhost:3000/

💻 Manual de Utilização do Software
O fluxo de uso é intuitivo: Cadastrar → Atribuir → Simular.

1️⃣ Cadastrar Drones e Pedidos
Ação	Local	Detalhes
Cadastrar Drone	Formulário "Cadastrar Drone"	Preencha o Nome, Carga Máxima (kg) e Distância Máxima (km)
Cadastrar Pedido	Formulário "Cadastrar Pedido"	1. Defina Peso (kg) e Prioridade
2. Clique em "Selecionar Destino" e depois em uma célula no Mapa Matriz para definir o ponto de entrega

2️⃣ Atribuir Entregas
Na seção "Atribuir Entrega", selecione um Pedido e um Drone disponível.

Clique em "Atribuir Entrega".

O sistema realiza validações:

O peso do pedido não pode exceder a carga máxima do drone.

A distância da entrega não pode exceder o alcance máximo do drone.

3️⃣ Simulação de Voo
Clique em "Iniciar Simulação".

Os drones aparecerão no Mapa Matriz e se moverão da origem ao destino.

O botão muda para "Parar Simulação", permitindo pausar.

Use "Resetar Simulação" para limpar o mapa e preparar novas entregas.

💡 Recursos de Manutenção e Desenvolvimento
Edição de Dados
O sistema permite edição de Drones e Pedidos a qualquer momento:

Clique em "Editar Drone" ou "Editar Pedido".

Selecione o item na lista.

Preencha o formulário com os novos dados.

Clique em "Salvar Alterações".

Acesso ao Banco de Dados (H2 Console)
O projeto utiliza H2 Database (em memória).

Com o backend rodando, acesse o console H2 em:

http://localhost:8080/h2-console

Conecte-se usando as credenciais definidas no application.properties (ex: jdbc:h2:mem:testdb, user sa).

Você pode inspecionar e manipular as tabelas DRONE, PEDIDO e ENTREGA diretamente via SQL.

Funções Chave do SistemaEntrega.jsx
Função	Finalidade
abrirModalSelecao(type)	Prepara o estado para abrir o Modal de Edição (drone ou pedido)
selecionarCelula(x, y)	Captura o clique no mapa e salva a coordenada (Origem ou Destino) para o Pedido
salvarEdicao(e)	Realiza validações e atualiza o estado da lista de drones ou pedidos com os novos dados
iniciarEntrega()	Configura setInterval para animar o movimento dos drones no mapa, tratando o estado inicial e a conclusão das entregas
