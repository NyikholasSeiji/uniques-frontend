# UniqueS Front-end

Front-end da plataforma **UniqueS**, desenvolvido por **Nyikholas Seiji**.

O **UniqueS (US)** é uma plataforma web voltada para uma experiência personalizada de skincare. A proposta é oferecer uma interface moderna e intuitiva onde o usuário poderá responder um questionário sobre sua pele e, com base nas respostas, receber recomendações de produtos adequados às suas necessidades.

O projeto adota uma identidade visual **minimalista**, **clean** e **moderna**, priorizando uma boa experiência do usuário e uma navegação simples.

---

## Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- JWT Authentication

---

## Requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js 18 ou superior
- npm
- Back-end da aplicação em execução

---

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Entre na pasta do projeto:

```bash
cd uniques-frontend
```

Instale as dependências:

```bash
npm install
```

---

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080/api
```

Caso a variável não seja definida, a aplicação utilizará a URL configurada no projeto.

---

## Executando a aplicação

Servidor de desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Visualizar o build localmente:

```bash
npm run preview
```

---

## Estrutura do Projeto

```text
src/
├── components/
├── context/
├── pages/
├── services/
├── types/
├── utils/
└── main.tsx
```

---

## Funcionalidades

- Landing Page
- Cadastro de usuários, com condições de pele opcionais
- Login com autenticação JWT
- Rotas protegidas (apenas autenticados) e públicas exclusivas (redireciona usuários já logados)
- Logout automático em caso de sessão expirada/token inválido
- Gerenciamento de perfil: editar nome e condições de pele, trocar senha e excluir conta
- Exibição do papel do usuário (cliente/administradora)
- Campos de senha com opção de mostrar/ocultar e confirmação
- Consumo de API REST utilizando Axios
- Questionário de skincare *(em desenvolvimento)*

---

## API

O front-end consome uma API REST desenvolvida em **Spring Boot**.

URL padrão:

```text
http://localhost:8080/api
```

A URL pode ser alterada através da variável de ambiente:

```env
VITE_API_URL=<url-da-api>
```

---

## Scripts

| Comando | Descrição |
|----------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build para produção |
| `npm run preview` | Executa o build localmente |
| `npm run lint` | Executa o ESLint (caso configurado) |

---

## Autor

Desenvolvido por **Nyikholas Seiji**.
