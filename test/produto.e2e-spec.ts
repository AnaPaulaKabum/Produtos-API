import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { produtosLista, produtosListaEntity } from '../src/database/mock/produto.mock';

describe('ProdutoController (e2e)', () => {
  let app: INestApplication;

  let produtoConsulta = {
      query: jest.fn().mockResolvedValue(produtosListaEntity),
      findOne: jest.fn().mockResolvedValue(produtosListaEntity[0]),
      save: jest.fn().mockResolvedValue(produtosListaEntity[0]),
      delete: jest.fn().mockResolvedValue(undefined)
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider('PRODUTO_REPOSITORY')
    .useValue(produtoConsulta)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

    it('/produtos (GET) : Retorno 200', async () => {
      return request(app.getHttpServer())
        .get('/produtos')
        .then((result) => {
          expect(result.statusCode).toEqual(200);
          expect(result.body).toEqual(produtosListaEntity);
        });
    });

    it('/produtos/id (GET) : Retorno 200', async () => {
      return request(app.getHttpServer())
        .get('/produtos/1')
        .then((result) => {
          expect(result.statusCode).toEqual(200);
          expect(result.body).toEqual(produtosListaEntity[0]);
        });
    });

    it('/produtos/id (DELETE) : Retorno 200', async () => {
      return request(app.getHttpServer())
        .delete('/produtos/1')
        .then((result) => {
          expect(result.statusCode).toEqual(200);
          expect(result.body).toBeUndefined;
        });
    });

    it('/produtos/id (POST) : Retorno 200', async () => {

      jest.spyOn(produtoConsulta,'findOne').mockReturnValueOnce(null);

      const novoProduto = {  
                            "codigo":"Livro77",
                            "nome": "C#",
                            "preco":20,
                            "qtde":100}

      return request(app.getHttpServer())
        .post('/produtos')
        .send(novoProduto)
        .then((result) => {
         expect(result.statusCode).toEqual(201);
         expect(result.body).toEqual(produtosLista[0]);
        });
    });

    it('/produtos/id (PUT) : Retorno 200', async () => {

      const alterarProduto = 
      {
            "id" : 3,
            "codigo":"Livro775",
            "nome": "C#",
            "preco":20,
            "qtde":100
      }

      return request(app.getHttpServer())
        .put('/produtos')
        .send(alterarProduto)
        .then((result) => {
         expect(result.statusCode).toEqual(200);
         expect(result.body).toEqual(produtosListaEntity[0]);
        });
    });
});
