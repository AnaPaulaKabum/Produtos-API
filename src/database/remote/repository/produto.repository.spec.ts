import { Type } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { produtosLista } from '../../../database/mock/produto.mock';
import { ProdutoEntity } from '../entity/produto.entity';
import { ProdutoRepository } from './produtoRepository';

describe('ProdutosService', () => {
  


  let produtoRepositorio: ProdutoRepository;
  let model : typeof ProdutoEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoRepository,
        { provide: getModelToken(ProdutoEntity),
        useValue:{
          findAll: jest.fn().mockResolvedValue(produtosLista)
         /* findByPk: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          destroy: jest.fn()*/
        }
      }
    ],
    }).compile();

    produtoRepositorio = module.get(ProdutoRepository);
    model = module.get<typeof ProdutoEntity>(getModelToken(ProdutoEntity));
  });

  describe('obterTodos', () => {
    it('Retorna todos os produtos"', async () => {

      //ACT = o que gostaria de testar;
     // const resultado = await produtoRepositorio.obterTodos();

     //Assert realiza o teste
      //expect(resultado).toEqual(produtosLista);
    });
  });

});