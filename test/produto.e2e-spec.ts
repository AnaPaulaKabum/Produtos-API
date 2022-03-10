import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProdutoRepository } from '../src/database/remote/repository/produtoRepository';

describe('ProdutoController (e2e)', () => {
  let app: INestApplication;

  let produtoRepository = { obterTodos: () => ['teste'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(ProdutoRepository)
    .useValue(produtoRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/produtos (GET) :', () => {
    return request(app.getHttpServer())
      .get('/produtos')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(['teste']);
      });

  });

});
