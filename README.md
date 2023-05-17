<h1 align="center">
   Motors Shop Back-end
</h1>

Esta é uma api com o objetivo de gerenciar um e-commerce de venda de automóveis, onde possui as funcionalidades de CRUD de usuários(endereço), posters(imagens), e comentários.

## Tabela de Conteúdos

- [Linguagens e tecnologias utilizadas](#1-Linguagens-e-tecnologias-utilizadas)
- [Diagrama DER](#2-diagrama-der)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
  - [Rodar servidor localmente](#34-rodar-o-servidor)
- [Endpoints](#4-endpoints)
- [Time de Desenvolvimento](#5-time-de-desenvolvimento)

## 1. Linguagens e tecnologias utilizadas

Visão geral do projeto, um pouco das tecnologias usadas.

<a href="https://www.typescriptlang.org" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="typescript"  src="https://skills.thijs.gg/icons?i=typescript"/> </a>
<a href="https://nodejs.org/en" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="Node.js"  src="https://nodejs.org/static/images/logo.svg"/> </a>
<a href="https://zod.dev/" target="_blank"> <img src="https://zod.dev/logo.svg" alt="zod" style="width: 40px; max-width:100%; height: 40px;"/></a>
<a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" style="width: 40px; max-width:100%; height: 40px;"/></a>
<a href="https://expressjs.com/pt-br/" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="Express js"  src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png"/> </a>
<a href="https://www.postgresql.org/" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="Postgresql"  src="https://www.postgresql.org/media/img/about/press/elephant.png"/> </a>
<a href="https://typeorm.io/" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="Typeorm"  src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png"/> </a>
<a href="https://nodemailer.com/about/" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="Nodemailer"  src="https://nodemailer.com/nm_logo_200x136.png"/> </a>

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en)
- [Zod](https://zod.dev/)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [cors](https://www.npmjs.com/package/cors)
- [mailgen](https://www.npmjs.com/package/mailgen)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

#### URL base da aplicação rodando localmente: http://localhost:3099

#### URL base do deploy da aplicação: https://motorshop-api.onrender.com

---

## 2. Diagrama DER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama DER da API representando as relações entre as tabelas do banco de dados.

<p align="center">
  <img src="https://images2.imgbox.com/d1/08/lsxwY6Qu_o.png" width="700" height="400" object-fit=contain />
</p>

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Faça um clone do projeto na sua máquina:

```shell
git clone git@github.com:E-Commerce-M6/back_end.git
```

Entre na pasta do arquivo que clonou:

```shell
code .
```

Instale as dependências:

```shell
yarn
```

ou

```shell
npm i
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo .env copiando o formato do arquivo .env.example e o preencha de acordo:

```shell
cp .env.example .env
```

### 3.3. Migrations

Execute as migrations com o comando:

```shell
yarn typeorm migration:run -d src/data-source.ts
```

ou

```shell
npm run typeorm migration:run -- -d src/data-source.ts
```

### 3.4. Rodar o servidor

Para rodar localmente `(porta 3099)` execute o comando:

```shell
yarn dev
```

ou

```shell
npm run dev
```

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-Users)
- [Login](#2-Login)
- [ResetPassword](#3-ResetPassword)
- [Posters](#4-Posters)
- [Comments](#5-Comments)

---

<h4 align="center"><strong>🚨 Importante 🚨</strong></h4>
Todas as rotas que recebem um <strong>id</strong> como parâmetro estão sujeitas a verificação do formato desse id. Não sendo um <strong>uuid</strong> será retornado um erro.

| Código do Erro  | Descrição    |
| --------------- | ------------ |
| 400 Bad Request | "Invalid id" |

## 1. **Users**

[ Voltar para o topo ](#tabela-de-conteúdos)

[Retornar aos Endpoints](#4-endpoints)

### Endpoints

| Método | Rota                    | Descrição                                                     |
| ------ | ----------------------- | ------------------------------------------------------------- |
| POST   | /users                  | Criação de um usuário.                                        |
| GET    | /users/profile          | Lista o usuário logado.                                       |
| GET    | /users/:user_id/posters | Lista os posters de um usuário.                               |
| PATCH  | /users/:user_id         | Editar as informações do usuário usando seu ID como parâmetro |
| DELETE | /users/:user_id         | Deletar usuário usando seu ID como parâmetro                  |

---

### 1.1. **Criação de Usuário**

[Retornar aos Endpoints](#4-endpoints)

### `POST /users`

### Exemplo de Request:

```
POST /users
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```form
{
	"name":"Teste",
	"email":"teste@hotmail.com",
	"password":"123456",
	"cpf": "12345678999",
	"phone": "123456789012",
	"birth_date": "10/05/1998",
	"is_seller": true,
	"description": "este é um teste bem testado........",
	"address": {
		"zip_code":"12345678",
		"state": "SP",
		"city": "São Paulo",
		"street": "Uma rua ",
		"number": "25",
		"complement": "ultima casa da rua"
	}
}
```

### Exemplo de Response:

```
201 CREATED
```

```
{
	"id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
	"name": "Teste",
	"email": "teste@hotmail.com",
	"cpf": "12345678999",
	"phone": "123456789012",
	"birth_date": "10/05/1998",
	"is_seller": true,
	"description": "este é um teste bem testado........",
	"address": {
		"id": "852a9cec-04b0-4d70-b7f0-03fad94c3f28",
		"zip_code": "12345678",
		"state": "SP",
		"city": "São Paulo",
		"street": "Uma rua ",
		"number": "25",
		"complement": "ultima casa da rua"
	},
	"createdAt": "2023-05-04T00:01:15.445Z",
	"updatedAt": "2023-05-04T00:01:15.445Z",
	"deletedAt": null
}
```

O campo password não é retornado, os campos is_saller (possui o valor false como default), updatedAt, createdAt e id (do tipo uuid é gerado automaticamente no banco de dados) não são passados na requisição mas são retornados na reposta.

### Possíveis Erros:

| Código do Erro | Descrição                   |
| -------------- | --------------------------- |
| 409 Conflict   | "Email or CPF already used" |

---

### 1.2. **Listando Usuário logado**

[Retornar aos Endpoints](#4-endpoints)

### `GET /users/profile`

### Exemplo de Request:

```
GET /users
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Proteção:

- O usuário precisa estar logado.

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
  "name": "Teste",
  "email": "teste@hotmail.com",
  "cpf": "12345678999",
  "phone": "123456789012",
  "birth_date": "1998-05-10",
  "is_seller": true,
  "description": "este é um teste bem testado........",
  "address": {
    "id": "852a9cec-04b0-4d70-b7f0-03fad94c3f28",
    "zip_code": "12345678",
    "state": "SP",
    "city": "São Paulo",
    "street": "Uma rua ",
    "number": "25",
    "complement": "ultima casa da rua"
  },
  "createdAt": "2023-05-04T00:01:15.445Z",
  "updatedAt": "2023-05-04T00:01:15.445Z",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | "Invalid token" |

---

### 1.3. **Listar posters de um usuário**

[Retornar aos Endpoints](#4-endpoints)

### `GET /users/:user_id/posters`

### Exemplo de Request:

```
GET /users/8e52f59c-6702-49ab-b1d7-c1d4685cd4ba/posters
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: None
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| user_id   | string | Identificador único do usuário |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "prev": null,
  "next": null,
  "count": 0,
  "sellerData": {
    "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
    "name": "Teste",
    "email": "teste@hotmail.com",
    "cpf": "12345678999",
    "phone": "123456789012",
    "birth_date": "1998-05-10",
    "is_seller": true,
    "description": "Este é um teste bem testado...",
    "address": {
      "id": "852a9cec-04b0-4d70-b7f0-03fad94c3f28",
      "zip_code": "12345678",
      "state": "SP",
      "city": "São Paulo",
      "street": "Uma rua ",
      "number": "25",
      "complement": "ultima casa da rua"
    },
    "createdAt": "2023-05-04T00:01:15.445Z",
    "updatedAt": "2023-05-04T00:01:15.445Z",
    "deletedAt": null
  },
  "data": []
}
```

### Possíveis Erros:

| Código do Erro | Descrição   |
| -------------- | ----------- |
| 404 Not Found  | "Not found" |

---

### 1.4. **Editar usuário logado**

### `PATCH /users/:user_id`

### Exemplo de Request:

```
PATCH /users/8e52f59c-6702-49ab-b1d7-c1d4685cd4ba
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Proteção:

- O usuário precisa estar logado.

- O usuário precisa ser o dono da conta.

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| user_id   | string | Identificador único do usuário |

### Corpo da Requisição:

```json
{
  "name": "Teste 2"
}
```

Todos os campos são opcionais. Campos que não podem ser editados: id, createdAt, updatedAt, deletedAt.

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
  "name": "Teste 2",
  "email": "teste@hotmail.com",
  "cpf": "12345678999",
  "phone": "123456789012",
  "birth_date": "1998-05-10",
  "is_seller": true,
  "description": "este é um teste bem testado........",
  "address": {
    "id": "852a9cec-04b0-4d70-b7f0-03fad94c3f28",
    "zip_code": "12345678",
    "state": "SP",
    "city": "São Paulo",
    "street": "Uma rua ",
    "number": "25",
    "complement": "ultima casa da rua"
  },
  "createdAt": "2023-05-04T00:01:15.445Z",
  "updatedAt": "2023-05-04T00:36:14.533Z",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | "Invalid token" |
| 404 Not Found    | "Not found"     |

---

### 1.5. **Deletar usuário logado**

[Retornar aos Endpoints](#4-endpoints)

### `DELETE /users/:user_id`

### Exemplo de Request:

```
DELETE/users/8e52f59c-6702-49ab-b1d7-c1d4685cd4ba
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Proteção:

- O usuário precisa estar logado.

- O usuário precisa ser o dono da conta.

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| user_id   | string | Identificador único do usuário |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 NO CONTENT
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | "Invalid token" |
| 404 Not Found    | "Not found"     |

---

## 2. **Login**

[ Voltar para o topo ](#tabela-de-conteúdos)

[Retornar aos Endpoints](#4-endpoints)

### Endpoints

| Método | Rota   | Descrição                |
| ------ | ------ | ------------------------ |
| POST   | /login | Autenticação do usuário. |

### `POST /login`

### Exemplo de Request:

```
POST /login
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "email": "teste@hotmail.com",
  "password": "123456"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1NlbGxlciI6dHJ1ZSwiaWF0IjoxNjgzMTU5NDg4LCJleHAiOjE2ODMyNDU4ODgsInN1YiI6IjhlNTJmNTljLTY3MDItNDlhYi1iMWQ3LWMxZDQ2ODVjZDRiYSJ9.wGdRMvnqTJGGJZz2vfviYzBl_x8tHsxr3dlDxKFYiKE"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                      |
| --------------- | ---------------------------------------------- |
| 400 Bad Request | "email": ["Required"],"password": ["Required"] |
| 403 Forbidden   | "Password or email incorrect"                  |

---

## 3. **ResetPassword**

[ Voltar para o topo ](#tabela-de-conteúdos)

[Retornar aos Endpoints](#4-endpoints)

### Endpoints

| Método | Rota                       | Descrição                                                                 |
| ------ | -------------------------- | ------------------------------------------------------------------------- |
| POST   | /resetPassword             | Envia um email para o email cadastrado com um token para o reset da senha |
| PATCH  | /resetPassword/:resetToken | Faz o update da senha                                                     |

### 3.1. **Envio do email com o resetToken**

[Retornar aos Endpoints](#4-endpoints)

### `POST /resetPassword`

### Exemplo de Request:

```
POST /resetPasword
Host: https://motorshop-api.onrender.com
Authorization: none
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "email": "teste@hotmail.com"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "token send!"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad request | "email": ["Required"] |
| 404 Not Found   | "User not found!"     |

---

### 3.2. **Reset da senha**

[Retornar aos Endpoints](#4-endpoints)

### `PATCH /resetPassword/:resetToken`

### Exemplo de Request:

```
PATCH /resetPassword/:resetToken
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: None
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                   |
| ---------- | ------ | --------------------------- |
| resetToken | string | Token para o reset da senha |

### Exemplo de Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Password change with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                           |
| ---------------- | ----------------------------------- |
| 401 Unauthorized | "Token expired, make a new request" |
| 401 Unauthorized | "Invalid token"                     |
| 404 Not Found    | "User not found"                    |

---

## 4. **Posters**

[ Voltar para o topo ](#tabela-de-conteúdos)

[Retornar aos Endpoints](#4-endpoints)

### Endpoints

| Método | Rota                | Descrição                                               |
| ------ | ------------------- | ------------------------------------------------------- |
| POST   | /posters            | Criação de um poster                                    |
| GET    | /posters            | Lista todos os posters ativos                           |
| GET    | /posters/filters    | Lista todos as características dos posters para filtros |
| PATCH  | /posters/:poster_id | Editar as informações de um poster                      |
| DELETE | /posters/:poster_id | Deleta um poster                                        |

---

### 4.1. **Criação de um poster**

[Retornar aos Endpoints](#4-endpoints)

### `POST /posters`

### Exemplo de Request:

```
POST /posters
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: multipart/form-data
```

### Proteção:

- O usuário precisa estar logado.

### Exemplo de Corpo da Requisição:

```json
posterData: {
  "brand": "Citroën",
	"model": "C4 CACTUS Rip Curl 1.6 16V Flex Aut.",
	"year": "2020",
	"fuel_type": "flex",
	"kilometers": 190,
	"color": "verde",
	"fipe_price": 1120770,
	"price": 1120770,
	"description": "descricao",
	"is_published": false,
},
[
  {
    "fieldname": "image",
    "originalname": "c4-cactus-cidade-1.jpg",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "upload",
    "filename": "c4-cactus-cidade-1.jpg",
    "path": "upload\\c4-cactus-cidade-1.jpg",
    "size": 20429
  },
  {
    "fieldname": "image",
    "originalname": "citroen-c4-cactus-2022 (4)-2.jpg",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "upload",
    "filename": "citroen-c4-cactus-2022 (4)-2.jpg",
    "path": "upload\\citroen-c4-cactus-2022 (4)-2.jpg",
    "size": 75988
  },
  {
    "fieldname": "image",
    "originalname": "images-3.jpg",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "upload",
    "filename": "images-3.jpg",
    "path": "upload\\images-3.jpg",
    "size": 75988
  }
]
```

### Exemplo de Response:

```
201 CREATED
```

```json
{
  "brand": "Citroën",
  "model": "C4 CACTUS Rip Curl 1.6 16V Flex Aut.",
  "year": "2020",
  "fuel_type": "flex",
  "kilometers": 190,
  "color": "verde",
  "fipe_price": 1120770,
  "price": 1120770,
  "description": "descricao",
  "is_published": false,
  "id": "14247b99-0dd6-46da-9f39-ce5748d62db1",
  "createdAt": "2023-05-15T19:13:08.274Z",
  "updatedAt": "2023-05-15T19:13:08.274Z",
  "images": [
    {
      "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177981/dk3c56fwrh6qpbpe7bda.jpg"
    },
    {
      "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177984/j2qgxlxzruovtdjcqhra.jpg"
    },
    {
      "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177985/zvrpotki4irstsiobjre.jpg"
    }
  ]
}
```

O campo image é do tipo File image/\*\* e podem ser enviadas varias imagens ao fazer a criação. Os campos id, createdAt e updatedAt são gerados automaticamente na criação. O campo is_published possui valor default false.

### Possíveis Erros:

| Código do Erro   | Descrição                                                                                                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 Bad Request  | {"brand": ["Required"],"model": ["Required"],"year": ["Required"],"fuel_type": ["Required"],"kilometers": ["Required"],"color": ["Required"],"fipe_price": ["Required"],"price": ["Required"],"description": ["Required"],"images": ["Required"]} |
| 400 Bad Request  | "Expected posterData object"                                                                                                                                                                                                                      |
| 401 Unauthorized | "Invalid token"                                                                                                                                                                                                                                   |
| 403 Forbidden    | "Must be a seller to perform this action"                                                                                                                                                                                                         |

---

### 4.2. **Listando posters**

[Retornar aos Endpoints](#4-endpoints)

### `GET /posters`

### Exemplo de Request:

```
GET /posters
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: None
```

### Query params

- model
- priceMAX
- priceMIN
- fuel
- kmMAX
- kmMIN
- brand
- year
- color
- published
- page
- perPage

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "prev": null,
  "next": null,
  "count": 1,
  "data": [
    {
      "brand": "Citroën",
      "model": "C4 CACTUS Rip Curl 1.6 16V Flex Aut.",
      "year": "2020",
      "fuel_type": "flex",
      "kilometers": 190,
      "color": "verde",
      "fipe_price": 1120770,
      "price": 1120770,
      "description": "descricao",
      "is_published": false,
      "id": "14247b99-0dd6-46da-9f39-ce5748d62db1",
      "createdAt": "2023-05-15T19:13:08.274Z",
      "updatedAt": "2023-05-15T19:13:08.274Z",
      "images": [
        {
          "id": 1,
          "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177981/dk3c56fwrh6qpbpe7bda.jpg"
        },
        {
          "id": 2,
          "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177984/j2qgxlxzruovtdjcqhra.jpg"
        },
        {
          "id": 3,
          "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177985/zvrpotki4irstsiobjre.jpg"
        }
      ],
      "user": {
        "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
        "name": "Teste 2",
        "email": "teste@hotmail.com",
        "cpf": "12345678999",
        "phone": "123456789012",
        "birth_date": "1998-05-10",
        "is_seller": true,
        "description": "este é um teste bem testado........",
        "createdAt": "2023-05-04T00:01:15.445Z",
        "updatedAt": "2023-05-04T23:25:35.434Z",
        "deletedAt": null
      }
    },
    ...
  ]
}
```

---

### 4.3. **Listando posters filters**

[Retornar aos Endpoints](#4-endpoints)

### `GET /posters/filters`

### Exemplo de Request:

```
GET /posters/filters
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: None
```

### Query params

- model
- priceMAX
- priceMIN
- fuel
- kmMAX
- kmMIN
- brand
- year
- color
- published

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "brands": ["Citroën", "Ford"],
  "models": ["C4 CACTUS Rip Curl 1.6 16V Flex Aut."],
  "colors": ["verde"],
  "years": ["2020", "2021"],
  "fuel_types": ["flex"]
}
```

---

### 4.4. **Editar poster**

[Retornar aos Endpoints](#4-endpoints)

### `PATCH /posters/:poster_id`

### Exemplo de Request:

```
PATCH /posters/14247b99-0dd6-46da-9f39-ce5748d62db1
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: multipart/form-data
```

### Proteção:

- O usuário precisa estar logado.

- O usuário precisa ser o dono do poster.

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                     |
| --------- | ------ | ----------------------------- |
| poster_id | string | Identificador único do poster |

### Corpo da Requisição:

```json
posterData: {
  "price": 1220770
},
[
  {
    "fieldname": "image",
    "originalname": "images-3.jpg",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "upload",
    "filename": "images-3.jpg",
    "path": "upload\\images-3.jpg",
    "size": 75988
  }
]

```

Todos os campos são opcionais. Campos que não podem ser editados: id, createdAt, updatedAt.

### Exemplo de Response:

```
200 OK
```

```json
{
  "brand": "Citroën",
  "model": "C4 CACTUS Rip Curl 1.6 16V Flex Aut.",
  "year": "2020",
  "fuel_type": "flex",
  "kilometers": 190,
  "color": "verde",
  "fipe_price": 1120770,
  "price": 1220770,
  "description": "descricao",
  "is_published": false,
  "id": "14247b99-0dd6-46da-9f39-ce5748d62db1",
  "createdAt": "2023-05-15T19:13:08.274Z",
  "updatedAt": "2023-05-16T14:17:44.645Z",
  "images": [
    {
      "url": "https://res.cloudinary.com/dqyc6s637/image/upload/v1684177981/dk3c56fwrh6qpbpe7bda.jpg"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                 |
| ---------------- | ----------------------------------------- |
| 401 Unauthorized | "Invalid token"                           |
| 404 Not Found    | "Poster not found"                        |
| 403 Forbidden    | "Must be a seller to perform this action" |
| 403 Forbidden    | "Must be owner to perform this action"    |

---

### 4.5. **Deletar poster**

[Retornar aos Endpoints](#4-endpoints)

### `DELETE /posters/:poster_id`

### Exemplo de Request:

```
DELETE /posters/791d43aa-dca0-47c3-9141-4b91819225f3
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Proteção:

- O usuário precisa estar logado.

- O usuário precisa ser o dono do poster.

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                     |
| --------- | ------ | ----------------------------- |
| poster_id | string | Identificador único do poster |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 NO CONTENT
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição                                 |
| ---------------- | ----------------------------------------- |
| 401 Unauthorized | "Invalid token"                           |
| 403 Forbidden    | "Must be a seller to perform this action" |
| 403 Forbidden    | "Must be owner to perform this action"    |
| 404 Not Found    | "Poster not found"                        |

---

## 5. **Comments**

[ Voltar para o topo ](#tabela-de-conteúdos)

[Endpoints](#4-endpoints)

### Endpoints

| Método | Rota                         | Descrição                               |
| ------ | ---------------------------- | --------------------------------------- |
| POST   | /posters/:poster_id/comments | Criação de um comentário                |
| GET    | /posters/:poster_id/comments | Lista todos os comentários de um poster |
| PATCH  | /comments/:comment_id        | Edita um comentário do usuário logado   |
| DELETE | /comments/:comment_id        | Deleta um comentário do usuário logado  |

---

### 5.1. **Criação de comment**

[Retornar aos Endpoints](#4-endpoints)

### `POST /posters/:poster_id/comments`

### Exemplo de Request:

```
POST /posters/791d43aa-dca0-47c3-9141-4b91819225f2/comments
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Proteção:

- O usuário precisa estar logado.

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                     |
| --------- | ------ | ----------------------------- |
| poster_id | string | Identificador único do poster |

### Exemplo de Corpo da Requisição:

```json
{
  "content": "Pode pagar no pix ?"
}
```

### Exemplo de Response:

```
201 CREATED
```

```json
{
  "content": "Pode pagar no pix ?",
  "id": "9e2da4a9-322c-41f5-a8eb-5793748d1979",
  "user": {
    "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
    "name": "Teste 2",
    "email": "teste@hotmail.com",
    "cpf": "12345678999",
    "phone": "123456789012",
    "birth_date": "1998-05-10",
    "is_seller": true,
    "description": "este é um teste bem testado........",
    "createdAt": "2023-05-04T00:01:15.445Z",
    "updatedAt": "2023-05-04T23:25:35.434Z",
    "deletedAt": null
  },
  "createdAt": "2023-05-05T21:38:37.575Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição               |
| ---------------- | ----------------------- |
| 400 Bad Request  | "content": ["Required"] |
| 401 Unauthorized | "Invalid token"         |
| 404 Not Found    | "Poster not found"      |

---

### 5.2. **Listar comments de um poster**

[Retornar aos Endpoints](#4-endpoints)

### `GET /posters/:poster_id/comments`

### Exemplo de Request:

```
POST /posters/791d43aa-dca0-47c3-9141-4b91819225f2/comments
Host: https://motorshop-api.onrender.com
Authorization: None
Content-type: None
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                     |
| --------- | ------ | ----------------------------- |
| poster_id | string | Identificador único do poster |

### Exemplo de Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "content": "Pode pagar no pix ?",
    "id": "eedfa7fc-d35a-4cb4-ae06-ec8a31cbb514",
    "user": {
      "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
      "name": "Teste 2",
      "email": "teste@hotmail.com",
      "cpf": "12345678999",
      "phone": "123456789012",
      "birth_date": "1998-05-10",
      "is_seller": true,
      "description": "este é um teste bem testado........",
      "createdAt": "2023-05-04T00:01:15.445Z",
      "updatedAt": "2023-05-04T23:25:35.434Z",
      "deletedAt": null
    },
    "createdAt": "2023-05-05T21:44:09.371Z"
  },
  ...
]
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | "Poster not found" |

---

### 5.3. **Editar comment**

[Retornar aos Endpoints](#4-endpoints)

### `PATCH /comments/:comment_id`

### Exemplo de Request:

```
PATCH /comments/93ba7ee7-cd0c-4b45-aa18-b42b155c102b
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Proteção:

- O usuário precisa estar logado.

- O usuário precisa ser o dono do comentário.

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                         |
| ---------- | ------ | --------------------------------- |
| comment_id | string | Identificador único do comentário |

### Corpo da Requisição:

```json
{
  "content": "Pode pagar no pix sim"
}
```

Todos os campos são opcionais. Campos que não podem ser editados: id, createdAt.

### Exemplo de Response:

```
200 OK
```

```json
{
  "content": "Pode pagar no pix sim",
  "id": "93ba7ee7-cd0c-4b45-aa18-b42b155c102b",
  "user": {
    "id": "8e52f59c-6702-49ab-b1d7-c1d4685cd4ba",
    "name": "Teste 2",
    "email": "teste@hotmail.com",
    "cpf": "12345678999",
    "phone": "123456789012",
    "birth_date": "1998-05-10",
    "is_seller": true,
    "description": "este é um teste bem testado........",
    "createdAt": "2023-05-04T00:01:15.445Z",
    "updatedAt": "2023-05-04T23:25:35.434Z",
    "deletedAt": null
  },
  "createdAt": "2023-05-15T17:39:12.068Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 401 Unauthorized | "Invalid token"     |
| 404 Not Found    | "Comment not found" |

---

### 4.5. **Delete comment**

[Retornar aos Endpoints](#4-endpoints)

### `DELETE /comments/:comment_id`

### Exemplo de Request:

```
DELETE/comments/93ba7ee7-cd0c-4b45-aa18-b42b155c102b
Host: https://motorshop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Proteção:

- O usuário precisa estar logado.

- O usuário precisa ser o dono do comentário.

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                         |
| ---------- | ------ | --------------------------------- |
| comment_id | string | Identificador único do comentário |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 NO CONTENT
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 401 Unauthorized | "Invalid token"     |
| 404 Not Found    | "Comment not found" |

---

## 5. Time de Desenvolvimento

[ Voltar para o topo ](#tabela-de-conteúdos)

<br>

<div style="display: flex; justify-content:space-between; width:100%; flex-wrap:wrap" >
<div align="center" style="margin-bottom:30px">
<h4 align="center">Jalles Batista</h4>
    <a href="https://github.com/jallesbatista"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/jallesbatista/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Guilherme Felipe Castro</h4>
    <a href="https://github.com/Guilherme-GFC"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/guilherme-gfc/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Felipe Nogueira</h4>
    <a href="https://github.com/Flipsy1"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/felipe-nogueira-vieira/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Rafael Gomes</h4>
    <a href="https://github.com/rafaelsantos7520"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/rafaelsantos7520/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Nicolly Alves</h4>
    <a href="https://github.com/NicollyAlves"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/nicollyalves/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Lucas Lara</h4>
    <a href="https://github.com/lucastdelara"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/lucastlara/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
</div>
