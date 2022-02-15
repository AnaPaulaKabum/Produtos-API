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
          obterUm: jest.fn(),
          criar: jest.fn(),
          alterar: jest.fn(),
          apagar: jest.fn()
        }
      }
    ],
    }).compile();

    produtosController = module.get<ProdutosController>(ProdutosController);
    produtosService = module.get<ProdutosServices>(ProdutosServices);
  });

  describe('obterTodos', () => {
    it('deve retorna todos os produtos"', async () => {

      //ACT = o que gostaria de testar;
      const result = await produtosController.obterTodos();

      console.log('Teste:'+result[0].nome);

     // jest.spyOn(produtosService, 'obterTodos').mockImplementation(async() => result);

      expect(result).toEqual(produtosLista);
    });
  });
});
