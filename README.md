<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://swagger.io/tools/swagger-ui/" target="blank"><img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" width="320" alt="Swagger Logo" /></a>
</p>

## Description

CRUD de produtos utilizando NestJS [Nest](https://github.com/nestjs/nest).

## Organization 

Application ➔ Services ➔ Database
Nucleo : Services

src
  - Application
      - Controller: Recebem as requisições.
      - Error: Mensagens patrões de error.
      - Mappear: converte Request em DTO.
  - Services: Regras de negocios
  - core
      - base: toda classe de abstração e interface.
  - database:
      - cache-memory: Repositorio na memoria (necessário refatorar)
      - remote: repositorio de banco de dados com typeORM
          - entity: entidades do banco de dados
          - mappers: Mapeamento de DTO para Entitys do banco
          - providers: Providers dos bancos.
          - repositories repositorio conectando ao banco.
      - mock: Lista e constantes para testes.
  
  - shared: Criação de Enums, DTOs. (Podendo ser vistas por todas as camadas)


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Configuration

Favor configurar o arquivo .env com o banco de dados, com os seguintes campos:

process.env.HOST =
PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE=
