# Na Hora Certa - Sistema de Aluguel de Salas

Aplicação frontend para gestão de salas comerciais para aluguel, desenvolvida em **Angular.js 1.8.2**.

---

## 🚀 Início Rápido

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Iniciar o Servidor
```bash
npm start
```

O navegador abrirá automaticamente em **http://localhost:8000** 🎉

---

## 📁 Estrutura do Projeto

```
na-hora-certa-frontend/
│
├── frontend/                      # ✅ Aplicação Angular.js
│   ├── index.html                # Página principal com ng-app
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   ├── header.html          # Header compartilhado
│   │   └── footer.html          # Footer compartilhado
│   │
│   ├── views/                    # Templates das páginas
│   │   ├── home.html            # Lista de salas
│   │   ├── about.html           # Quem somos
│   │   ├── register-room.html   # Cadastro de sala
│   │   └── room-details.html    # Detalhes da sala
│   │
│   ├── js/                       # JavaScript Angular.js
│   │   ├── app.js               # Configuração e rotas
│   │   │
│   │   ├── directives/          # Diretivas customizadas
│   │   │   └── layoutDirectives.js  # Header/Footer como diretivas
│   │   │
│   │   ├── controllers/         # Controllers das páginas
│   │   │   ├── homeController.js
│   │   │   ├── aboutController.js
│   │   │   ├── registerRoomController.js
│   │   │   └── roomDetailsController.js
│   │   │
│   │   └── services/            # Serviços (API calls)
│   │       └── roomService.js
│   │
│   └── styles/                   # Estilos CSS
│       └── styles.css           # CSS unificado
│
├── package.json                  # Dependências do projeto
└── README.md                     # Este arquivo
```

---

## 📋 Funcionalidades

### 1. Homepage (`#!/home`)
- Grade responsiva com até 6 cards de salas disponíveis
- Cada card exibe:
  - **Bairro** (destaque principal)
  - **Endereço completo**
  - **Valor mensal** (condomínio + IPTU)
  - Informações adicionais (tamanho, banheiros, vaga)
- Clique no card para ver detalhes completos

### 2. Quem Somos (`#!/quem-somos`)
- Descrição do serviço prestado
- Missão da empresa
- Lista de serviços oferecidos
- CTAs para ações principais

### 3. Cadastrar Sala (`#!/cadastrar-sala`)
- Formulário completo com:
  - CEP (com busca automática via ViaCEP)
  - Endereço completo
  - Tamanho (m²)
  - Taxa de condomínio e IPTU
  - Número de banheiros
  - Checkboxes (vaga, recepção, consultório, documentos)
- Validação de campos obrigatórios
- Integração com API backend

### 4. Detalhes da Sala (`#!/sala/:id`)
- Visualização completa de todas as informações
- Breakdown de custos
- Grade de características
- Botão de contato

---

## 🛠️ Tecnologias Utilizadas

- **Angular.js 1.8.2** (via CDN)
- **Angular Route 1.8.2** (via CDN)
- **HTML5/CSS3**
- **JavaScript ES5**
- **http-server** (servidor de desenvolvimento)

---

## 📋 Rotas Disponíveis

| Rota | Template | Controller | Descrição |
|------|----------|------------|-----------|
| `#!/home` | `views/home.html` | HomeController | Lista de salas |
| `#!/quem-somos` | `views/about.html` | AboutController | Sobre a empresa |
| `#!/cadastrar-sala` | `views/register-room.html` | RegisterRoomController | Cadastro |
| `#!/sala/:id` | `views/room-details.html` | RoomDetailsController | Detalhes |

---

## 🔌 Integração com Backend

O serviço `RoomService` está configurado para comunicação com API backend:

```javascript
// Configurar em: frontend/js/services/roomService.js
var API_BASE_URL = 'http://localhost:8000/api';
```

### Endpoints Disponíveis

```
GET    /api/rooms          # Lista todas as salas
GET    /api/rooms/:id      # Detalhes de uma sala
POST   /api/rooms          # Cadastrar nova sala
PUT    /api/rooms/:id      # Atualizar sala
DELETE /api/rooms/:id      # Deletar sala
```

### Modelo de Dados (Room)

```python
class Room:
    id: str
    zip_code: str
    address: str
    size: int
    documents_ok: bool
    condominium_fee: float
    iptu: float
    number_of_bathrooms: int
    has_parking_space: bool
    has_reception: bool
    doctors_office: bool
```

---

## ✅ Componentes Reutilizáveis

### Header e Footer Componentizados

Os componentes foram implementados como diretivas Angular.js:

```html
<!-- No index.html -->
<app-header></app-header>
<main><div ng-view></div></main>
<app-footer></app-footer>
```

**Para modificar:**
- Header: `frontend/components/header.html`
- Footer: `frontend/components/footer.html`

Mudanças aparecem automaticamente em todas as páginas! ✨

---

## 🎨 Design

### Paleta de Cores
- **Primária:** Azul (#2563eb)
- **Secundária:** Cinza (#64748b)
- **Sucesso:** Verde (#10b981)
- **Erro:** Vermelho (#ef4444)

### Características
- Design responsivo (mobile-first)
- Grid adaptativo
- Efeitos hover nos cards
- Validação visual de formulários
- Mensagens de feedback
- Footer fixo

---

## 🔧 Scripts NPM

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor na porta 8000 |
| `npm run serve` | Alias para `npm start` |

---

## 🎯 Métodos Alternativos de Execução

### Método 2: Python
```bash
cd frontend
python -m http.server 8000
```

### Método 3: VS Code Live Server
1. Instale a extensão "Live Server"
2. Clique com botão direito em `frontend/index.html`
3. Selecione "Open with Live Server"

### Método 4: Direto no Navegador
Abra `frontend/index.html` (pode ter limitações de CORS)

---

## 🐛 Troubleshooting

### Erro: "npm: não pode ser carregado"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
npm start
```

### Erro: "http-server não encontrado"
```bash
npm install http-server --save-dev
npm start
```

### Porta 8000 já está em uso
Edite `package.json` e mude `-p 8000` para `-p 3000`

### CORS Errors
Configure o backend para aceitar requisições do frontend:

```python
# Exemplo com FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 💡 Dicas de Desenvolvimento

- **Para parar o servidor:** Pressione `CTRL+C`
- **Hot reload:** Mudanças aparecem automaticamente (sem cache)
- **Dados mock:** Controllers incluem dados mock quando API não está disponível
- **ViaCEP:** Sistema de busca de CEP usa API pública gratuita

---

## 📱 Compatibilidade

- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ Dispositivos móveis (iOS e Android)

---

## 📝 Notas Importantes

- ✅ Projeto 100% Angular.js (sem Angular moderno)
- ✅ Header e Footer são componentes reutilizáveis via diretivas
- ✅ Todos os caminhos são relativos à pasta `frontend/`
- ✅ Estrutura limpa e organizada
- ✅ Validações no frontend são complementares às do backend
- ✅ Sempre valide dados no servidor

---

## 🚀 Próximos Passos

1. ✅ ~~Estrutura organizada~~
2. ✅ ~~Header/Footer componentizados~~
3. ⏳ Implementar API backend em Python
4. ⏳ Adicionar upload de imagens das salas
5. ⏳ Sistema de autenticação/login
6. ⏳ Filtros e busca na homepage
7. ⏳ Dashboard administrativo

---

## 🎉 Status do Projeto

**✅ Projeto organizado e pronto para desenvolvimento!**

- ✅ Estrutura de arquivos organizada
- ✅ Componentes reutilizáveis implementados
- ✅ Caminhos corrigidos
- ✅ CSS centralizado
- ✅ Documentação completa
- ✅ Projeto 80% menor (arquivos não utilizados removidos)

---

**Desenvolvido com Angular.js 1.8.2** 🎯

## 🚀 Estrutura do Projeto

```
frontend/
├── index.html                 # Arquivo principal da aplicação
├── js/
│   ├── app.js                # Configuração do Angular e rotas
│   ├── services/
│   │   └── roomService.js    # Service para comunicação com API
│   └── controllers/
│       ├── homeController.js           # Controller da homepage
│       ├── aboutController.js          # Controller da página Quem Somos
│       ├── registerRoomController.js   # Controller do cadastro de salas
│       └── roomDetailsController.js    # Controller dos detalhes da sala
├── views/
│   ├── home.html             # Template da homepage
│   ├── about.html            # Template da página Quem Somos
│   ├── register-room.html    # Template do formulário de cadastro
│   └── room-details.html     # Template dos detalhes da sala
└── styles/
    └── styles.css            # Estilos unificados da aplicação
```

## 📋 Funcionalidades

### 1. Homepage (/)
- Grade responsiva com até 6 cards de salas disponíveis
- Cada card exibe:
  - **Bairro** (destaque principal)
  - **Endereço completo** (segundo destaque)
  - **Valor mensal** (terceiro destaque)
  - Informações adicionais (tamanho, banheiros, vaga)
- Clique no card para ver detalhes completos

### 2. Quem Somos (/quem-somos)
- Descrição do serviço prestado
- Missão da empresa
- Lista de serviços oferecidos
- CTAs para ações principais

### 3. Cadastrar Sala (/cadastrar-sala)
- Formulário completo baseado no modelo Room:
  - CEP (com busca automática de endereço via ViaCEP)
  - Endereço completo
  - Tamanho (m²)
  - Taxa de condomínio
  - IPTU
  - Número de banheiros
  - Possui vaga de estacionamento (checkbox)
  - Possui recepção (checkbox)
  - Adequado para consultório médico (checkbox)
  - Documentação em ordem (checkbox)
- Validação de campos obrigatórios
- Integração com API backend

### 4. Detalhes da Sala (/sala/:id)
- Visualização completa de todas as informações da sala
- Breakdown de custos (condomínio + IPTU)
- Grade de características
- Botão de contato

## 🎨 Design

- **Paleta de cores:**
  - Primária: Azul (#2563eb)
  - Secundária: Cinza (#64748b)
  - Sucesso: Verde (#10b981)
  - Erro: Vermelho (#ef4444)

- **Componentes unificados:**
  - Cabeçalho sticky com logo e menu
  - Botões padronizados (primary, secondary, back)
  - Cards com efeito hover
  - Formulários com validação visual
  - Mensagens de feedback (sucesso/erro)
  - Footer fixo

- **Responsivo:**
  - Mobile-first design
  - Grid adaptativo
  - Menu colapsável em mobile

## 🔌 Integração com Backend

O serviço `RoomService` está configurado para fazer chamadas à API backend em Python:

```javascript
// URL base configurável
var API_BASE_URL = 'http://localhost:8000/api';

// Endpoints disponíveis:
GET    /api/rooms          # Lista todas as salas
GET    /api/rooms/:id      # Detalhes de uma sala
POST   /api/rooms          # Cadastrar nova sala
PUT    /api/rooms/:id      # Atualizar sala
DELETE /api/rooms/:id      # Deletar sala
```

### Modelo de Dados (Room)

```python
class Room:
    id: str
    zip_code: str
    address: str
    size: int
    documents_ok: bool
    condominium_fee: float
    iptu: float
    number_of_bathrooms: int
    has_parking_space: bool
    has_reception: bool
    doctors_office: bool
```

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno
- Servidor HTTP local (ex: Live Server do VS Code)
- API backend rodando (Python)

### Passos

1. **Abrir o projeto:**
   - Navegue até a pasta `frontend`

2. **Configurar a URL da API:**
   - Edite o arquivo `js/services/roomService.js`
   - Ajuste a variável `API_BASE_URL` para o endereço do seu backend

3. **Iniciar servidor local:**
   - Com VS Code: Clique com botão direito no `index.html` → "Open with Live Server"
   - Ou use qualquer servidor HTTP local:
     ```bash
     python -m http.server 8080
     ```

4. **Acessar a aplicação:**
   - Abra o navegador em `http://localhost:8080` (ou porta configurada)

## 📦 Dependências

- **Angular.js 1.8.2** (via CDN)
- **Angular Route 1.8.2** (via CDN)

Não há necessidade de `npm install` - todas as dependências são carregadas via CDN.

## 🔧 Configurações Adicionais

### CORS
Certifique-se de que seu backend Python permite requisições CORS da origem do frontend:

```python
# Exemplo com FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Dados Mock
Os controllers incluem dados mock para desenvolvimento/testes quando a API não está disponível. Isso permite desenvolver o frontend independentemente do backend.

## 📱 Compatibilidade

- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ Dispositivos móveis (iOS e Android)

## 🎯 Próximos Passos

1. Implementar API backend em Python
2. Adicionar upload de imagens das salas
3. Sistema de autenticação/login
4. Filtros e busca na homepage
5. Sistema de favoritos
6. Integração com sistema de mensagens
7. Dashboard administrativo

## 📝 Notas

- O sistema de busca de CEP usa a API pública ViaCEP
- Dados sensíveis devem ser protegidos no backend
- Validações no frontend são complementares às do backend
- Sempre valide dados no servidor

---

**Desenvolvido com Angular.js** 🎯
