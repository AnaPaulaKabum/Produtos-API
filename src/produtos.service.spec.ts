import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { Produto } from './produto.model';
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

describe('ProdutosService', () => {

  let produtosService: ProdutosServices;
  let produtoRepositorio: Repository<Produto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosServices,
        { provide: getModelToken(Produto),
        useValue:{
          findAll: jest.fn().mockResolvedValue(produtosLista),
          findByPk: jest.fn().mockResolvedValue(produtosLista[0]),
          create: jest.fn().mockResolvedValue(produtoNovo),
          update: jest.fn().mockResolvedValue(produtoAlterar),
          destroy: jest.fn()
        }
      }
    ],
    }).compile();

    produtosService = module.get<ProdutosServices>(ProdutosServices);
    produtoRepositorio = module.get<Repository<Produto>>(getModelToken(Produto));

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
      const body = new Produto({codigo: "LV005", nome: "Novo Produto", preco:99.90});

      //ACT = o que gostaria de testar;
      const resultado = await produtosService.criar(body);

     //Assert realiza o teste
      expect(resultado).toEqual(produtoNovo);
    });
  });

  describe('alterar', () => {
    it('Alterar um Produto"', async () => {

      const body  = new Produto({codigo: "LV005", nome: "Alterar Produto", preco:99.90});

      const resultado = await produtosService.alterar(body);

      expect(resultado).toEqual(produtoAlterar);
    });
  });

 /* describe('Apagar', () => {
    it('Deletar um Produto"', async () => {

      const id  = 2;

      const resultado = await produtosService.apagar(id);
      expect(produtoRepositorio.destroy).toHaveBeenCalled;
      expect(resultado).toEqual(true);
    });
  });*/
});
