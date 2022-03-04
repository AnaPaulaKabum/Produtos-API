import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosServices } from '../../services/produtos.service';
import { ProdutosController } from './produtos.controller';
import { produtoAlterar, produtoNovo, produtosLista } from '../../database/mock/produto.mock';
import { NotFoundException } from '@nestjs/common';

describe('ProdutosController', () => {

  let produtosController: ProdutosController;
  let  produtosService: ProdutosServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        {
        provide: ProdutosServices,
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

    produtosController = module.get<ProdutosController>(ProdutosController);
    produtosService = module.get<ProdutosServices>(ProdutosServices);
  });

  describe('obterTodos()', () => {
    it('Deve retorna todos os produtos', async () => {

      //ACT = o que gostaria de testar;
      const resultado = await produtosController.obterTodos();

     //Assert realiza o teste
      expect(resultado).toEqual(produtosLista);
    });

    it('Deve chamar uma vez o service.', async () => {
      await produtosController.obterTodos();
      expect(produtosService.obterTodos).toHaveBeenCalledTimes(1);
    });

    it('Espera um throw exectipion se o service quebrar.',async () =>{

      jest.spyOn(produtosService, 'obterTodos').mockRejectedValueOnce(Error()); 
      expect(produtosController.obterTodos()).rejects.toThrowError();
    });
  });

  describe('obterUm()', () => {
    it('Deve retorna um produto pelo id', async () => {

      const id = 1;

      const result = await produtosController.obterUm(id);

      expect(result).toEqual(produtosLista[0]);
      
    });

    it('Deve chamar a camada de services', async () => {

      const id = 1;

      await produtosController.obterUm(id);
      expect(produtosService.obterUm).toHaveBeenCalledTimes(1);
    });

    it('Espera retorna um erroMensagem"', async () => {

      const id = 1;
      jest.spyOn(produtosService, 'obterUm').mockRejectedValueOnce(new NotFoundException(`Produto ${id} não foi encontrado`));
      await expect(produtosController.obterUm(id)).rejects.toThrow();
    });

    it('Espera um throw exectipion se o service quebrar.',async () =>{

      const id = 10;
      jest.spyOn(produtosService, 'obterUm').mockRejectedValueOnce(Error()); 
      expect(produtosController.obterUm(id)).rejects.toThrowError();
    });
  });

  describe('criar()', () => {
    it('Deve criar um Produto', async () => {

      const resultado = await produtosController.criar(produtoNovo);
      expect(resultado).toEqual(produtoNovo);      
    });

    it('Deve chamar a camada de services', async () => {

      await produtosController.criar(produtoNovo);
      expect(produtosService.criar).toHaveBeenCalledTimes(1); 
    });

    it('Espera um throw exectipion se o service quebrar.',async () =>{

      const id = 10;
      jest.spyOn(produtosService, 'criar').mockRejectedValueOnce(Error()); 
      expect(produtosController.criar(produtoNovo)).rejects.toThrowError();
    });

    //todo:
    //E se passar um produto igual?

  });

  describe('alterar()', () => {
    it('Deve alterar um Produto"', async () => {

      const resultado = await produtosController.alterar(produtoAlterar);
      expect(resultado).toEqual(produtoAlterar);
    });

    it('Deve chamar a camada de services', async () => {

      await produtosController.alterar(produtoAlterar);
      expect(produtosService.alterar).toHaveBeenCalledTimes(1); 
    });

    it('Espera um throw exectipion se o service quebrar.',async () =>{

      jest.spyOn(produtosService, 'alterar').mockRejectedValueOnce(Error()); 
      expect(produtosController.alterar(produtoAlterar)).rejects.toThrowError();
    });
  });

  describe('Apagar()', () => {
    it('Deve apagar um Produto e retornar undefined', async () => {

      const id = 1;
      const resultado = await produtosController.apagar(id);
      expect(resultado).toBeUndefined();
      expect(produtosService.apagar).toHaveBeenCalledTimes(1);
      expect(produtosController.obterUm).toHaveBeenCalled;
    });

    it('Deve chamar obterum() e apagar() do services', async () => {

      const id = 1;
      await produtosController.apagar(id);
      expect(produtosController.obterUm).toHaveBeenCalled;
      expect(produtosService.apagar).toHaveBeenCalledTimes(1);
    });

    it('Espera falhar se a camada de services ocorrer um throw', async () => {

      jest.spyOn(produtosService,'apagar').mockResolvedValueOnce(new Error());
      expect(produtosController.obterUm).rejects.toThrow();
    });
  });
});
