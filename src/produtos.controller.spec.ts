import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { Produto } from './produto.model';
import { ProdutosController } from './produtos.controller';
import { ProdutosServices } from './produtos.service';

const sequelize = new Sequelize({ validateOnly: true });
sequelize.addModels([Produto]);

const produtosLista: Array<Produto> =[
  new Produto({codigo: "LV001", nome: "Livro C#", preco:15.90}),
  new Produto({codigo: "LV002", nome: "Livro Python", preco:25.90}),
  new Produto({codigo: "LV003", nome: "Livro PHP", preco:35.90}),
  new Produto({codigo: "LV004", nome: "Livro JavaScript", preco:40})
]

const produtoNovo  = new Produto({codigo: "LV005", nome: "Novo Produto", preco:99.90});
const produtoAlterar  = new Produto({codigo: "LV005", nome: "Alterar Produto", preco:99.90});

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
          apagar: jest.fn().mockResolvedValue(true)
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
    });
  });

  describe('criar', () => {
    it('Criar um Produto"', async () => {

      //Arrange = Atribuição de um objeto.
      const body = new Produto({codigo: "LV005", nome: "Novo Produto", preco:99.90});

      //ACT = o que gostaria de testar;
      const resultado = await produtosController.criar(body);

     //Assert realiza o teste
      expect(resultado).toEqual(produtoNovo);
    });
  });

  describe('alterar', () => {
    it('Alterar um Produto"', async () => {

      const body  = new Produto({codigo: "LV005", nome: "Alterar Produto", preco:99.90});

      const resultado = await produtosController.alterar(body);

      expect(resultado).toEqual(produtoAlterar);
    });
  });

  describe('Apagar', () => {
    it('Deletar um Produto"', async () => {

      const id  = 2;

      const resultado = await produtosController.apagar(id);

      expect(resultado).toEqual(true);
    });
  });
});
