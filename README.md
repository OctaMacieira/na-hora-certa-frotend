# Na Hora Certa - Sistema de Aluguel de Salas

Aplicação frontend para gestão de salas comerciais para aluguel, desenvolvida em **Vue 3** com Composition API.

---

## 🚀 Início Rápido

### Instalar Dependências
```bash
npm install
```

### Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em **http://localhost:5173** 🎉

---

## 📁 Estrutura do Projeto

```
na-hora-certa-frontend/
│
├── src/
│   ├── main.js                   # Entry point da aplicação
│   ├── App.vue                   # Componente raiz
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   ├── AppHeader.vue        # Header compartilhado
│   │   └── AppFooter.vue        # Footer compartilhado
│   │
│   ├── views/                    # Páginas/Rotas
│   │   ├── Home.vue             # Lista de salas
│   │   ├── About.vue            # Quem somos
│   │   ├── RegisterRoom.vue     # Cadastro de sala
│   │   └── RoomDetails.vue      # Detalhes da sala
│   │
│   ├── router/                   # Configuração de rotas
│   │   └── index.js             # Vue Router
│   │
│   ├── composables/              # Lógica reutilizável
│   │   └── useRoomService.js    # Serviço de API
│   │
│   └── assets/                   # Recursos estáticos
│       └── styles.css           # Estilos globais
│
├── index.html                    # HTML principal
├── vite.config.js               # Configuração do Vite
└── package.json                  # Dependências
```

---

## 📋 Funcionalidades

### 1. Homepage (`/`)
- Grade responsiva com cards de salas disponíveis
- Cada card exibe: bairro, endereço, valor mensal e características
- Clique no card para ver detalhes completos

### 2. Quem Somos (`/quem-somos`)
- Descrição do serviço prestado
- Missão da empresa
- Lista de serviços oferecidos

### 3. Cadastrar Sala (`/cadastrar-sala`)
- Formulário completo com validação
- Busca automática de endereço via CEP (ViaCEP)
- Integração com API backend

### 4. Detalhes da Sala (`/sala/:id`)
- Visualização completa de informações
- Breakdown de custos
- Grade de características

---

## 🛠️ Tecnologias

- **Vue 3** - Framework progressivo
- **Vue Router** - Roteamento SPA
- **Composition API** - Padrão moderno
- **Vite** - Build tool ultrarrápido
- **JavaScript ES6+**
- **HTML5/CSS3**

---

## 📋 Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `Home.vue` | Lista de salas |
| `/quem-somos` | `About.vue` | Sobre a empresa |
| `/cadastrar-sala` | `RegisterRoom.vue` | Cadastro |
| `/sala/:id` | `RoomDetails.vue` | Detalhes |

---

## 🔌 Integração com Backend

Configure a URL da API em `src/composables/useRoomService.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
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

## ✅ Componentes

Os componentes foram implementados como Single File Components (SFC):

```vue
<!-- No App.vue -->
<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>
```

**Editar componentes:**
- Header: `src/components/AppHeader.vue`
- Footer: `src/components/AppFooter.vue`

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
- Footer fixo

---

## 🔧 Scripts NPM

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- API backend rodando

### Passos

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar a URL da API:**
   - Edite `src/composables/useRoomService.js`
   - Ajuste `API_BASE_URL` para o endereço do backend

3. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

4. **Acessar:**
   - Abra `http://localhost:5173` no navegador

---

## 🏗️ Build de Produção

```bash
# Gerar build
npm run build

# Preview do build
npm run preview
```

Arquivos otimizados são gerados na pasta `dist/`

---

## 🐛 Troubleshooting

### Rodar a aplicação preferencialmente em uma distribuição Linux, seja OS ou Subsistema WSL.
### Erro: "npm: não pode ser carregado"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
npm run dev
```

### Porta em uso
O Vite escolherá automaticamente a próxima porta disponível (5174, 5175, etc.)

### Módulos não encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```


```python
# FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 💡 Dicas de Desenvolvimento

- **Parar servidor:** `CTRL+C`
- **HMR:** Mudanças aparecem instantaneamente
- **Vue DevTools:** Instale a extensão do navegador
- **Dados mock:** Disponíveis quando API não está rodando
- **ViaCEP:** Busca de CEP usa API pública gratuita

---

## 📱 Compatibilidade

- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ Dispositivos móveis (iOS e Android)

---

## 🏗️ Arquitetura

### Single File Components (SFC)
Cada componente contém:
- `<template>` - HTML
- `<script>` - JavaScript (Composition API)
- `<style>` - CSS (scoped ou global)

### Composition API
- Melhor organização do código
- Reutilização de lógica com composables
- TypeScript-friendly
- Performance otimizada

---

## 📦 Dependências

### Principais
- **Vue 3** - Framework
- **Vue Router** - Roteamento
- **Vite** - Build tool

Execute `npm install` para instalar

---

## 📝 Notas

- Validações no frontend são complementares às do backend
- Sempre valide dados no servidor
- Dados sensíveis devem ser protegidos no backend
- Use Vue DevTools para debugging

---

**Desenvolvido com Vue 3 + Vite** ⚡
