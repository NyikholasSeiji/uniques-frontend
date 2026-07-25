# UniqueS (US)

## 📌 Sobre o projeto

O **UniqueS (US)** é um projeto de uma plataforma web focada em **skincare personalizado**, inspirado em modelos modernos de experiência digital como a Manual, porém com identidade própria e direcionado para cuidados com a pele.

A proposta do sistema é criar uma experiência simples, elegante e personalizada, onde o usuário responde um **questionário sobre sua pele**, e com base nas respostas, o sistema apresenta **produtos específicos recomendados para aquela condição**.

---

# 🎯 Objetivo

Desenvolver uma aplicação web capaz de:

- Coletar informações do usuário através de um formulário
- Identificar necessidades específicas da pele
- Exibir produtos recomendados com base nas respostas
- Criar uma experiência semelhante a uma consultoria digital de skincare

---

# 💡 Conceito da marca

## Nome: UniqueS

### Significado

- **US** → abreviação da marca
- **Unique** → exclusivo
- **S** → Skin

A ideia da marca é transmitir:

- Exclusividade
- Autocuidado
- Personalização
- Elegância
- Confiança

---

# 🎨 Identidade visual

O estilo visual do projeto será:

- Minimalista
- Clean
- Sofisticado
- Moderno
- Foco em luxo discreto

---

# 🛠 Tecnologias

## Front-end

- React
- Vite
- Tailwind CSS
- React Router
- Axios

---

# ✅ Funcionalidades

- Landing page com apresentação do produto
- Cadastro e login de usuário (autenticação via JWT)
- Perfil do usuário: editar nome e condições de pele, trocar senha e excluir conta
- Rotas protegidas para páginas que exigem autenticação
- Questionário de skincare e resultados *(em desenvolvimento)*

---

# 📁 Estrutura do projeto

```
src/
├── components/   # Componentes compartilhados (Navbar, Footer, ProtectedRoute...)
├── context/      # Contextos globais (AuthContext)
├── pages/        # Páginas da aplicação (Login, Register, Profile, Landing...)
├── services/     # Chamadas à API (api.ts, auth.ts, users.ts)
├── types/        # Tipos TypeScript compartilhados
└── utils/        # Funções utilitárias
```

O front-end consome uma API REST (back-end Spring Boot) para autenticação e gerenciamento de usuários.

---

# 🚀 Como rodar o projeto

## Pré-requisitos

- Node.js 18+
- O back-end da aplicação rodando (por padrão em `http://localhost:8080/api`)

## Passos

```bash
# instalar dependências
npm install

# configurar a URL da API (opcional, padrão é http://localhost:8080/api)
# crie um arquivo .env na raiz do projeto:
echo "VITE_API_URL=http://localhost:8080/api" > .env

# rodar em modo de desenvolvimento
npm run dev

# build de produção
npm run build

# preview do build de produção
npm run preview
```

---

# 👨‍💻 Autor

Desenvolvido por **Nyikholas Seiji**.