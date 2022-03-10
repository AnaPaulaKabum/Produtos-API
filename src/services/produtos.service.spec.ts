import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosServices } from './produtos.service';
import {produtosLista,produtoNovo,produtoAlterar} from '../database/mock/produto.mock';
import { ProdutoRepository } from '../database/remote/repository/produtoRepository';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

describe('ProdutosService', () => {

  let produtosService: ProdutosServices;
  let produtoRepositorio: ProdutoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:  [ ProdutosServices,
          { provide: ProdutoRepository,
          useValue:{
            obterTodos: jest.fn().mockResolvedValue(produtosLista),
            obterUm: jest.fn().mockResolvedValue(produtosLista[0]),
            criar: jest.fn().mockResolvedValue(produtoNovo),
            alterar: jest.fn().mockResolvedValue(produtoAlterar),
            apagar: jest.fn().mockResolvedValue(undefined)
          }
      }
    ],
    }).compile();

    produtosService = module.get<ProdutosServices>(ProdutosServices);
    produtoRepositorio = module.get<ProdutoRepository>(ProdutoRepository);
  });

  describe('obterTodos()', () => {

    it('Se o Repository falhar, deverá retornar um throw', async () => {

      jest.spyOn(produtoRepositorio,'obterTodos').mockRejectedValue(new InternalServerErrorException());
      await expect(produtosService.obterTodos()).rejects.toThrow(new InternalServerErrorException());
    });

    it('Não deve lançar excessão se o repositorio retornar. ', async () => {

      await expect(produtosService.obterTodos()).resolves.not.toThrow();
    })

    it('Retorna todos os produtos', async () => {

      const resultado = await produtosService.obterTodos();
      expect(resultado).toEqual(produtosLista);
    });
  });

  describe('obterUm()', () => {
    it('Deve retorna apenas um produto', async () => {

      const pos = 0;
      const resultado = await produtosService.obterUm(pos);
      expect(resultado).toEqual(produtosLista[pos]);
    });

    it('Deverá passar o mesmo retorno do services para o repositorio. ', async () => {

      const id = 1;
      await produtosService.obterUm(id);
      expect(produtoRepositorio.obterUm).toBeCalledWith(id);
     });

     it('Não deve lançar excessão se o repositorio retornar. ', async () => {

      const id = 1;
      await expect(produtosService.obterUm(id)).resolves.not.toThrow();
    });
  });

  describe('criar()', () => {
    it('Criar um Produto()', async () => {

      const resultado = await produtosService.criar(produtoNovo);
      expect(resultado).toEqual(produtoNovo);
    });

    it('Deverá passar o mesmo retorno do services para o repositorio. ', async () => {

      await produtosService.criar(produtoNovo);
      expect(produtoRepositorio.criar).toBeCalledWith(produtoNovo);
     });

     it('Não deve lançar excessão se o repositorio retornar. ', async () => {
       
      await expect(produtosService.criar(produtoNovo)).resolves.not.toThrow();
    });
  });

  describe('alterar()', () => {
    it('Alterar um Produto"', async () => {

      const resultado = await produtosService.alterar(produtoAlterar);

      expect(resultado).toEqual(produtoAlterar);
      expect(resultado.id).toEqual(produtoAlterar.id);
    });

    it('Deverá passar o mesmo retorno do services para o repositorio. ', async () => {

      await produtosService.alterar(produtoAlterar);
      expect(produtoRepositorio.alterar).toBeCalledWith(produtoAlterar);
     });

     it('Não deve lançar excessão se o repositorio retornar. ', async () => {
       
      await expect(produtosService.alterar(produtoAlterar)).resolves.not.toThrow();
    });
  });

  describe('Apagar', () => {
    it('Deletar um Produto', async () => {

      const id = 1;
      const resultado = await produtosService.apagar(id);
      expect(resultado).toEqual(undefined);
      expect(produtoRepositorio.apagar).toHaveBeenCalled;
    });

    it('Deverá passar o mesmo retorno do services para o repositorio. ', async () => {

      const id = 1;
      await produtosService.apagar(id);
      expect(produtoRepositorio.apagar).toBeCalledWith(id);
     });

     it('Não deve lançar excessão se o repositorio retornar. ', async () => {
       
      const id = 1;
      await expect(produtosService.apagar(id)).resolves.not.toThrow();
    });
  });
});
