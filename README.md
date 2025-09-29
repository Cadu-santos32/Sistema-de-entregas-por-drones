# 🚀 Sistema de Gerenciamento de Entregas por Drone

Este projeto é um sistema de gerenciamento de entregas que permite o cadastro de drones e pedidos, a atribuição de entregas, e a simulação visual do processo em um mapa de matriz.

**Tecnologias Principais:**

* Frontend: React + Tailwind CSS
* Backend: Java / Spring Boot

---

## ⚙️ Guia de Inicialização do Projeto

Para rodar o projeto, você precisará configurar o ambiente Java (Backend) e Node.js (Frontend).

### 📋 Pré-requisitos

Certifique-se de que as seguintes ferramentas estão instaladas:

| Ferramenta                 | Versão mínima |
| -------------------------- | ------------- |
| Java Development Kit (JDK) | 17            |
| Node.js & npm              | 18+           |

---

### 1️⃣ Iniciar o Backend (Java / Spring Boot)

O backend é a API que gerencia os dados de Drones, Pedidos e Atribuições.

1. Navegue até o diretório raiz do projeto Backend:

```bash
cd backend
```

2. Execute o comando para iniciar a aplicação Spring Boot usando Maven:

```bash
./mvnw spring-boot:run
```

> O servidor estará rodando em [http://localhost:8080/](http://localhost:8080/)

---

### 2️⃣ Iniciar o Frontend (React)

O frontend é a interface de usuário, onde toda a interação com o sistema acontece.

1. Navegue até o diretório do projeto React:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação React:

```bash
npm run dev
```

> O aplicativo será aberto no navegador em [http://localhost:5173/](http://localhost:5173/)

---

## 💻 Manual de Utilização do Software

O fluxo de uso é intuitivo e sequencial: **Cadastrar → Atribuir → Simular**.

### 1️⃣ Cadastrar Drones e Pedidos

| Ação             | Local                         | Detalhes                                                                                                                                          |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cadastrar Drone  | Formulário "Cadastrar Drone"  | Preencha o Nome, Carga Máxima (kg) e Distância Máxima (km).                                                                                       |
| Cadastrar Pedido | Formulário "Cadastrar Pedido" | 1. Defina o Peso (kg) e a Prioridade.<br>2. Clique em "Selecionar Destino" e depois em uma célula no Mapa Matriz para definir o ponto de entrega. |

---

### 2️⃣ Atribuir Entregas

Após o cadastro, ligue um Pedido a um Drone:

1. Na seção **"Atribuir Entrega"**, selecione um Pedido e um Drone disponível.
2. Clique em **"Atribuir Entrega"**.

> O sistema realizará validações automáticas:

* O peso do pedido não pode exceder a carga máxima do drone.
* A distância da entrega não pode exceder o alcance máximo do drone.

---

### 3️⃣ Simulação de Voo

Após atribuir, clique em **"Iniciar Simulação"**:

* Os drones aparecerão no Mapa Matriz e iniciarão o movimento da origem ao destino.
* O botão muda para **"Parar Simulação"**, permitindo pausar o processo.
* Use **"Resetar Simulação"** para limpar o mapa e preparar novas entregas.

---

## 💡 Recursos de Manutenção e Desenvolvimento

### Edição de Dados

O sistema permite a edição de Drones e Pedidos:

1. Clique em **"Editar Drone"** ou **"Editar Pedido"**.
2. Selecione o item a ser modificado na lista.
3. Preencha o formulário de edição (coordenadas de pedidos podem ser redefinidas no mapa).
4. Clique em **"Salvar Alterações"**.

---

### Acesso ao Banco de Dados (H2 Console)

O projeto utiliza **H2 Database**, um banco de dados em memória útil para desenvolvimento.

1. Com o Backend rodando ([http://localhost:8080/](http://localhost:8080/)), acesse:

```
http://localhost:8080/h2-console
```

2. Conecte-se usando as credenciais do `application.properties`:

```
jdbc:h2:mem:testdb
User: sa
```

3. Inspecione e manipule as tabelas: `DRONE`, `PEDIDO`, `ENTREGA`.

---

### Funções Chave do Componente `SistemaEntrega.jsx`

| Função                    | Finalidade                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `abrirModalSelecao(type)` | Prepara o estado para abrir o Modal de Edição, definindo se é 'drone' ou 'pedido'.                                          |
| `selecionarCelula(x, y)`  | Captura o clique no mapa e salva a coordenada (Origem ou Destino) para o Pedido.                                            |
| `salvarEdicao(e)`         | Realiza as validações e atualiza o estado da lista de drones ou pedidos com os novos dados.                                 |
| `iniciarEntrega()`        | Configura o `setInterval` para animar o movimento dos drones no mapa, tratando o estado inicial e a conclusão das entregas. |

---
