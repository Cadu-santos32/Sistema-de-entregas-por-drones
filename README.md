🚀 Sistema de Gerenciamento de Entregas por Drone
Este projeto é um sistema de gerenciamento de entregas que permite o cadastro de drones e pedidos, a atribuição de entregas, e a simulação visual do processo em um mapa de matriz.

Tecnologias Principais: Frontend (React com Tailwind CSS) e Backend (Java/Spring Boot).

⚙️ Guia de Inicialização do Projeto
Para rodar o projeto, você precisará configurar o ambiente Java (Backend) e Node.js (Frontend).

📋 Pré-requisitos
Certifique-se de que as seguintes ferramentas estão instaladas em sua máquina:

Java Development Kit (JDK): Versão 17 ou superior.

Node.js e npm: Para gerenciar o Frontend.

1. Iniciar o Backend (Java/Spring Boot)
O backend é a API que gerencia os dados de Drones, Pedidos e Atribuições.

Navegue até o diretório raiz do seu projeto Backend.

Execute o comando para iniciar a aplicação Spring Boot:

Ferramenta	Comando
Usando Maven	./mvnw spring-boot:run
Usando Gradle	./gradlew bootRun

Exportar para as Planilhas
O servidor estará rodando em http://localhost:8080/.

2. Iniciar o Frontend (React)
O frontend é a interface de usuário onde toda a interação com o sistema acontece.

Navegue até o diretório do seu projeto React (ex: cd frontend).

Instale as dependências:

Bash

npm install
Inicie a aplicação React:

Bash

npm start
O aplicativo será aberto no seu navegador, geralmente em http://localhost:3000/.

💻 Manual de Utilização do Software
O fluxo de uso é intuitivo e sequencial: Cadastrar → Atribuir → Simular.

1. Cadastrar Drones e Pedidos
Ação	Local	Detalhes
Cadastrar Drone	Formulário 'Cadastrar Drone'	Preencha o Nome, Carga Máxima (kg) e Distância Máxima (km).
Cadastrar Pedido	Formulário 'Cadastrar Pedido'	1. Defina o Peso (kg) e a Prioridade. 2. Clique em "Selecionar Destino" e depois em uma célula no Mapa Matriz para definir o ponto de entrega.

Exportar para as Planilhas
2. Atribuir Entregas
Após o cadastro, você precisa ligar um Pedido a um Drone:

Na seção "Atribuir Entrega", selecione um Pedido e um Drone disponível.

Clique em "Atribuir Entrega".

O sistema realiza validações e impedirá a atribuição se:

O peso do pedido exceder a carga máxima do drone.

A distância da entrega exceder o alcance máximo do drone.

3. Simulação de Voo
Após atribuir, clique em "Iniciar Simulação".

Os drones aparecerão no Mapa Matriz e iniciarão o movimento da origem ao destino.

O botão muda para "Parar Simulação", permitindo pausar o processo.

Use "Resetar Simulação" para limpar o mapa e preparar para novas entregas.

💡 Recursos de Manutenção e Desenvolvimento
Edição de Dados
O sistema permite a edição de Drones e Pedidos a qualquer momento:

Clique em "Editar Drone" ou "Editar Pedido".

Selecione o item a ser modificado na lista.

Preencha o formulário de edição (coordenadas de pedidos podem ser redefinidas no mapa).

Clique em "Salvar Alterações".

Acesso ao Banco de Dados (H2 Console)
O projeto usa o H2 Database, um banco de dados em memória útil para desenvolvimento.

Com o Backend rodando (http://localhost:8080/), acesse o console H2 em:

http://localhost:8080/h2-console
Conecte-se usando as credenciais do seu application.properties (ex: jdbc:h2:mem:testdb, User sa).

Você pode inspecionar e manipular os dados das tabelas (DRONE, PEDIDO, ENTREGA) diretamente por comandos SQL.

Funções Chave do SistemaEntrega.jsx
O componente pai gerencia os estados principais e as lógicas de negócio:

Função	Finalidade
abrirModalSelecao(type)	Prepara o estado para abrir o Modal de Edição, definindo se é 'drone' ou 'pedido'.
selecionarCelula(x, y)	Captura o clique no mapa e salva a coordenada (Origem ou Destino) para o Pedido.
salvarEdicao(e)	Realiza as validações e atualiza o estado da lista de drones ou pedidos com os novos dados.
iniciarEntrega()	Configura o setInterval para animar o movimento dos drones no mapa, tratando o estado inicial e a conclusão das entregas.
