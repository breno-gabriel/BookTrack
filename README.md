# BookTrack

## Sobre

 A aplicação "BookTrack", um sistema de gerenciamento de
leituras que permite a um usuário registrar e acompanhar livros que deseja ler, está lendo
ou já leu. 

## Executando o projeto 

Para executar o projeto, será necessário seguir os seguintes passos: 

1. Dirija-se ao diretorio ***server*** e instale as depêndencias através do comando `npm install`
2. Na pasta ***server***, execute o comando `docker compose up` para criar o banco de dados (o arquivo ***docker-compose.yml*** deve estar dentro do diretorio ***server***)
3. execute o comando **npm run migrate**
4. Em outro terminal, dirija-se novamente a pasta ***service*** e execute o comando `npm run start:dev` para iniciar o servidor
5. Em um novo terminal, dirija-se ao diretório ***client*** e execute o comando `npm install` para instalar as dependências. Em seguida, no mesmo terminal, execute o comando `npm run dev`

Ao seguir esses passos, tanto o frontend quanto o backend deverão estar funcionando.

OBS: Além de seguir os passos acima, é necessário criar um arquivo .env no diretorio de client e outro no diretorio de server 

## client .env 

```
VITE_API_URL=http://localhost:3000

```

## server .env 

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/booktrack
PORT=3000 
SECRET="shhhh é segredo"
CORS_ORIGIN=http://localhost:5173

```

---
## 🐳 **Configuração Docker**
```yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: booktrack-db
    environment:
      POSTGRES_DB: booktrack
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

```

## Rotas da aplicação 

A presente aplicação é composta pelas seguinte rotas: 

### Rotas de Autenticação (`/auth`)
- **`POST /auth/login`**
  - Rota responsável por enviar o email e senha do usuário para verificação. Em caso positivo, retorna um **token JWT**, que deve ser incluído no header `Authorization` das demais requisições (exceto `/auth/register`).
  - Corpo da requisição (Request Body):
    ```json
    {
      "email": "usuario@exemplo.com",
      "password": "senha123"
    }
    ```

- **`POST /auth/register`**
  - Rota para cadastro de novos usuários. Valida os dados e, se aprovados, os armazena no banco de dados.
  - Corpo da requisição:
    ```json
    {
      "name": "Nome do Usuário",
      "email": "usuario@exemplo.com",
      "password": "senha123"
    }
    ```

---

### Rotas de Livros (`/books`)
- **`POST /books/create`**
  - Rota protegida por token. Cria um novo livro associado ao usuário autenticado.
  - Corpo da requisição:
    ```json
    {
      "title": "Título do Livro",
      "author": "Autor",
      "status": "Status da leitura (Quero Ler | Lendo | Lido)",
      "rating": "Avaliação da leitura (apenas com status 'Lido'). Valor entre 1 e 5"
    }
    ```

- **`GET /books/`**
  - Lista **todos os livros** disponíveis.

- **`GET /books/:id`**
  - Retorna os detalhes de um livro específico pelo ID.

- **`PUT /books/update/:id`**
  - Atualiza os dados de um livro existente (apenas se pertencer ao usuário autenticado).
  - Corpo da requisição:
    ```json
    {
      "title": "Título do Livro",
      "author": "Autor",
      "status": "Status da leitura (Quero Ler | Lendo | Lido)",
      "rating": "Avaliação da leitura (apenas com status 'Lido'). Valor entre 1 e 5"
    }
    ```

- **`GET /books/user/:id`**
  - Lista todos os livros associados a um usuário específico (pelo ID do usuário).

- **`DELETE /books/delete/:id`**
  - Remove um livro do sistema através de seu id (apenas se pertencer ao usuário autenticado).

- **`GET /books/export_csv/:id`**
  - Gera um arquivo CSV com os dados dos livros do usuário autenticado.

---

### Rotas de Usuário (`/user`)
- **`GET /user/`**
  - Retorna as informações de todos os usuarios cadastrados.

- **`GET /user/:id`**
  - Retorna informações a respeito de um usuário específico.

---

# Estrutura do projeto 

## 📂 Visão Geral do Projeto

```
booktrack/
├── client/          # Frontend (React)
├── server/          # Backend (Node.js/Express)
└── README.md
```

---

## 🖥️ **Frontend (React)**
```
client/
├── public/          
├── src/
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/       # Páginas da aplicação
│   │   ├── home.jsx
│   │   ├── loginPage.jsx
|   |   ├── signUp.jsx
│   │   └── notFoundPage.jsx
|   ├──  utils 
|   ├── App.css 
│   ├── App.jsx
|   ├── index.css 
│   └── main.jsx
├── package.json
└── vite.config.js   # Configuração do Vite
```

A estrutura do frontend é apresentado a seguir: 

- **`components/`**: Contém os componentes reutilizáveis da interface.
- **`pages/`**: Armazena as páginas da aplicação, cada uma responsável por uma rota específica.
- **`utils/`**: Funções auxiliares para reutilização de lógica.
- **`App.jsx`**: Componente raiz onde as rotas são definidas.
- **`main.jsx`**: Arquivo principal onde o React é iniciado.

Essa estrutura modular facilita a organização, manutenção e escalabilidade da aplicação.

---

## 🖥️ **Backend (Node.js)**
```
server/
├── src/
|   ├── config
|   |     └── jwt.ts
│   ├── controllers/   # Lógica das rotas
│   │   ├── authController.ts
|   |   ├── userController.ts 
│   │   └── bookController.ts
|   ├── db/ # Configurações do banco de dados 
|   |   ├── index.ts 
│   │   └── schema.ts
|   ├── dto/
|   |   ├── book.ts 
│   │   └── user.ts
│   ├── middlewares/   # Middlewares
│   │   └── authMiddleware.ts
|   ├── repositories/ # Acesso ao banco de dados 
|   |   ├── bookRepository.ts
|   |   ├── userRepository.ts 
│   │   └── bookRoutes.js
│   ├── routes/        # Definição de rotas
│   │   ├── authRoutes.ts
|   |   ├── userRoutes.ts 
│   │   └── bookRoutes.ts
|   ├── service/ #Lógica de negocio 
|   |    ├── authService.ts
|   |    ├── authService.ts
|   |    └── bookService.ts
│   └── app.js         # Aplicação principal
├── .env  # Variáveis de ambiente
├── .gitignore
├── package-lock.json
├── docker-compose.yml
├── drizzle.config.ts         
├── package.json
└── Dockerfile
```

A aplicação segue uma arquitetura em camadas, o que facilita a organização, manutenção e escalabilidade do código. Cada camada tem uma responsabilidade bem definida:

1. Routes: Responsável por mapear as rotas da aplicação e direcioná-las para os métodos correspondentes nas controllers.
2. Controller: Gerencia as requisições e respostas HTTP. Atua como intermediária entre as rotas e os serviços da aplicação.
3. Service: Contém a lógica de negócio da aplicação. É onde ficam as regras que definem o comportamento do sistema.
4. Repository: Responsável pela comunicação com o banco de dados, realizando consultas, inserções, atualizações e deleções.

Além disso, também temos: 

- Middleware: Intercepta requisições e respostas para aplicar funcionalidades como autenticação, validação, tratamento de erros, entre outros.
- Db: Contém a configuração e inicialização do banco de dados. Neste projeto, foi utilizado o Drizzle ORM.
- Dto: Agrupa os Data Transfer Objects (DTOs) usados para tipar e validar os dados transferidos entre as camadas da aplicação. Aqui estão definidos os DTOs de usuários e livros.

## Versão em produção. 

A aplicação também está disponível no render. 

https://booktrack-1-6nij.onrender.com/

Usuario apra teste: 

email bgml@cin.ufpe.br
senha: 123456789

OBS: A primeira requisição deve demorar pelo menos 50 segundos. Isso porque a plataforma coloca o servidor em hibernação após um périodo de inatividade. 
OBS: Caso nao seja possivel cadastrar o usuario pelo frontend, busque adiciona-lo pelo deploy da API. 

Link da API: https://booktrack-tj2q.onrender.com

Juntanto com os deatalhes das rotas, o caminho seria algo como https://booktrack-tj2q.onrender.com/auth/register


## 📚 Recursos Adicionais

- [Documentação React](https://react.dev)
- [Documentação Express](https://expressjs.com/)
- [Padrões REST](https://restfulapi.net/)
