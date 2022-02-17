import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { ErrorResponse } from '../errorResponse';
import { Produto } from './produto.model';
import { ProdutosController } from '../presentation/produtos.controller';
import { ProdutosServices } from '../services/produtos.service';

const sequelize = new Sequelize({ validateOnly: true });
sequelize.addModels([Produto]);

const produtosLista: Array<Produto> =[
  new Produto({codigo: "LV001", nome: "Livro C#", preco:15.90,qtde:100}),
  new Produto({codigo: "LV002", nome: "Livro Python", preco:25.90,qtde:100}),
  new Produto({codigo: "LV003", nome: "Livro PHP", preco:35.90,qtde:100}),
  new Produto({codigo: "LV004", nome: "Livro JavaScript", preco:40,qtde:100})
]

const produtoNovo  = new Produto({codigo: "LV005", nome: "Novo Produto", preco:99.90, qtde: 100});
const produtoAlterar  = new Produto({codigo: "LV006", nome: "Alterar Produto", preco:99.90,qtde: 100});
const produtoApagar  = new Produto({codigo: "LV007", nome: "Apagar Produto", preco:99.90,qtde: 100});

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

  describe('obterTodos', () => {
    it('Deve retorna todos os produtos"', async () => {

      //ACT = o que gostaria de testar;
      const resultado = await produtosController.obterTodos();

     //Assert realiza o teste
      expect(resultado).toEqual(produtosLista);
      //chamar a camada de services uma vez.
      expect(produtosService.obterTodos).toHaveBeenCalledTimes(1);
    });

    it('Espera um throw exectipion',async () =>{

      //Arrange
      jest.spyOn(produtosService, 'obterTodos').mockRejectedValueOnce(Error()); 

      //Assert
      expect(produtosController.obterTodos()).rejects.toThrowError();
    });
  });

  describe('obterUm', () => {
    it('Deve retorna apenas um produto"', async () => {

      const pos = 0;
      const result = await produtosController.obterUm(pos);

      expect(result).toEqual(produtosLista[pos]);
      expect(produtosService.obterUm).toHaveBeenCalledTimes(1);
    });

    it('Deve retorna um erroMensagem"', async () => {

      const id = 10;
      const errorResponse = new ErrorResponse(101, `Nao foi encontrado o produto com codigo ${id}`);

      jest.spyOn(produtosService, 'obterUm').mockReturnValueOnce(null)
      const result = await produtosController.obterUm(id);
      expect(result).toEqual(errorResponse);
      expect(produtosService.obterUm).toHaveBeenCalledTimes(1);
    });
  });

  describe('criar', () => {
    it('Criar um Produto"', async () => {

      //Arrange = Atribuição de um objeto.
      const body = new Produto({codigo: "LV005", nome: "Novo Produto", preco:99.90, qtde:100});

      //ACT = o que gostaria de testar;
      const resultado = await produtosController.criar(body);

     //Assert realiza o teste
      expect(resultado).toEqual(produtoNovo);
      expect(produtosService.criar).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('alterar', () => {
    it('Alterar um Produto"', async () => {

      const body  = new Produto({codigo: "LV005", nome: "Alterar Produto", preco:99.90});

      const resultado = await produtosController.alterar(body);

      expect(resultado).toEqual(produtoAlterar);
      expect(produtosService.alterar).toHaveBeenCalledTimes(1);
    });
  });

  describe('Apagar', () => {
    it('Deletar um Produto"', async () => {

      const id = 0;
      const resultado = await produtosController.apagar(id);
      expect(resultado).toBeUndefined();
      expect(produtosService.apagar).toHaveBeenCalledTimes(1);
      expect(produtosController.obterUm).toHaveBeenCalled;
    });

    it('Retornar mensagem que não foi encontrado o Produto"', async () => {

      const id = 10;
      const errorResponse = new ErrorResponse(101, `Nao foi encontrado o produto com codigo ${10}`);

      jest.spyOn(produtosService, 'obterUm').mockResolvedValue(undefined);

      const resultado = await produtosController.apagar(id);

      expect(resultado).toEqual(errorResponse);
      expect(produtosController.obterUm).toHaveBeenCalled;
    });
  });
});
