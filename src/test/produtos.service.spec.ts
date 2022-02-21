import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { ProdutoEntity } from '../core/domain/entites/produto.entity';
import { ErrorResponse } from '../errorResponse';
import { ProdutosServices } from '../services/produtos.service';
import {produtosLista,produtoNovo,produtoAlterar,produtoApagar} from '../data/mock/produto.mock';

describe('ProdutosService', () => {

  let produtosService: ProdutosServices;
  let produtoRepositorio: Repository<ProdutoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosServices,
        { provide: getModelToken(ProdutoEntity),
        useValue:{
          findAll: jest.fn().mockResolvedValue(produtosLista),
          findByPk: jest.fn().mockResolvedValue(produtosLista[0]),
          create: jest.fn().mockResolvedValue(produtoNovo),
          update: jest.fn().mockResolvedValue(produtoAlterar),
          destroy: jest.fn().mockResolvedValue(undefined),
        }
      }
    ],
    }).compile();

    produtosService = module.get<ProdutosServices>(ProdutosServices);
    produtoRepositorio = module.get<Repository<ProdutoEntity>>(getModelToken(ProdutoEntity));

  });

  describe('obterTodos', () => {
    it('Retorna todos os produtos"', async () => {

      //ACT = o que gostaria de testar;
      const resultado = await produtosService.obterTodos();

     //Assert realiza o teste
      expect(resultado).toEqual(produtosLista);
    });
  });

  describe('obterUm', () => {
    it('Deve retorna apenas um produto"', async () => {

      const pos = 0;

      const result = await produtosService.obterUm(pos);

      expect(result).toEqual(produtosLista[pos]);
    });
  });

  describe('criar', () => {
    it('Criar um Produto"', async () => {

      //Arrange = Atribuição de um objeto.
      const body = new ProdutoEntity({codigo: "LV005", nome: "Novo Produto", preco:99.90});

      //ACT = o que gostaria de testar;
      const resultado = await produtosService.criar(body);

     //Assert realiza o teste
      expect(resultado).toEqual(produtoNovo);
    });
  });

  describe('alterar', () => {
    it('Alterar um Produto"', async () => {

      const body = new ProdutoEntity({codigo: "LV003", nome: "Alterar Produto", preco:99.90,qtde:100});

      const resultado = await produtosService.alterar(body);

      expect(resultado).toEqual(produtoAlterar[1][0]);
    });

    it('Ao tentar alterar um Produto, não devera encontrar e deve criar."', async () => {

      const body  = new ProdutoEntity({codigo: "LV005", nome: "Novo Produto", preco:99.90, qtde:100});

      jest.spyOn(produtoRepositorio, 'update').mockResolvedValueOnce([0,[]])

      const resultado = await produtosService.alterar(body);

      expect(resultado).toEqual(produtoNovo);

    });
  });

  describe('Apagar', () => {
    it('Deletar um Produto"', async () => {

      const produtoApagar  = new ProdutoEntity({id: 5,codigo: "LV005", nome: "Novo Produto", preco:99.90,qtde:0});

      const resultado = await produtosService.apagar(produtoApagar);
      expect(resultado).toEqual(produtoApagar.id);
      expect(produtoRepositorio.destroy).toHaveBeenCalled;
    });

    it('Mensagem de erro ao tentar deletar um produto"', async () => {

      const produtoApagar  = new ProdutoEntity({id: 5,codigo: "LV005", nome: "Novo Produto", preco:99.90,qtde:100});
      const errorResponse = new ErrorResponse(102, `Nao e possivel deletar um produto com quantidade ${produtoApagar.id}`);

      const resultado = await produtosService.apagar(produtoApagar);
      expect(resultado).toEqual(errorResponse);
    });
  });
});
