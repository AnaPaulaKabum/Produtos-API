<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://swagger.io/tools/swagger-ui/" target="blank"><img src="https://sequelize.org/v6/manual/asset/logo.png" width="150" alt="Swagger Logo" /></a>
  <a href="https://sequelize.org/v6/" target="blank"><img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" width="320" alt="Swagger Logo" /></a>
</p>

## Description

CRUD de produtos utilizando NestJS [Nest](https://github.com/nestjs/nest).

## Organization 

Application ➔ Services ➔ Core ➔ Data

src
  - Application
      - Controller: Recebem as requisições.
  - Services
  - core
      - base: toda classe de abstração e interface.
      - domain: Entidades e Mappers
      - repositories:
  - data
      - cache-memory: Repositorio na memoria
      - remote repositorio de banco de dados
      - mock: repositorio para testes.
  - shared: Criação de Enums, DTOs e Exception filters

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

Favor configurar o arquivo .env com o banco de dados.
