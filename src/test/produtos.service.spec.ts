import { Test, TestingModule } from '@nestjs/testing';
import { ErrorResponse } from '../errorResponse';
import { ProdutosServices } from '../services/produtos.service';
import {produtosLista,produtoNovo,produtoAlterar,produtoApagar} from '../data/mock/produto.mock';
import { ProdutoRepository} from '../core/repositories/produto.repository';
import { ProdutoDto } from '../shared/ProdutoDto';


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

  describe('obterTodos', () => {
    it('Retorna todos os produtos"', async () => {

      //ACT = o que gostaria de testar;
      const resultado = await produtosService.obterTodos();

      console.log("Teste"+resultado);

     //Assert realiza o teste
      expect(resultado).toEqual(produtosLista);
    });
  });

  describe('obterUm', () => {
    it('Deve retorna apenas um produto"', async () => {

      const pos = 0;

      const resultado = await produtosService.obterUm(pos);

      expect(resultado).toEqual(produtosLista[pos]);
    });
  });

  describe('criar', () => {
    it('Criar um Produto"', async () => {

      //Arrange = Atribuição de um objeto.
      const body = new ProdutoDto(null, "LV005", "Novo Produto",99.90,15);

      //ACT = o que gostaria de testar;
      const resultado = await produtosService.criar(body);

     //Assert realiza o teste
      expect(resultado).toEqual(produtoNovo);
    });
  });

  describe('alterar', () => {
    it('Alterar um Produto"', async () => {

      const body = new ProdutoDto(2,"LV006", "Alterar Produto",99.90,100);

      const resultado = await produtosService.alterar(body);

      expect(resultado).toEqual(produtoAlterar);
      expect(resultado.id).toEqual(produtoAlterar.id);
    });

   /* it('Ao tentar alterar um Produto, não devera encontrar e deve criar."', async () => {

      const body  = new ProdutoDto(null,"LV005", "Novo Produto", 99.90, 100);

      jest.spyOn(produtoRepositorio, 'alterar').mockResolvedValueOnce({})

      const resultado = await produtosService.alterar(body);

      expect(resultado).toEqual(produtoNovo);

    });*/
  });

  describe('Apagar', () => {
    it('Deletar um Produto"', async () => {

      const produtoApagar  = new ProdutoDto(3,"LV007", "Apagar Produto", 99.90,100);

      const resultado = await produtosService.apagar(produtoApagar);
      expect(resultado).toEqual(undefined);
      expect(produtoRepositorio.apagar).toHaveBeenCalled;
    });

    /*it('Mensagem de erro ao tentar deletar um produto"', async () => {

      const produtoApagar  = new ProdutoDto(4,"LV007", "Apagar Produto", 99.90,100);
      const errorResponse = new ErrorResponse(102, `Nao e possivel deletar um produto com quantidade ${produtoApagar.id}`);

      const resultado = await produtosService.apagar(produtoApagar);
      expect(resultado).toEqual(errorResponse);
    });*/
  });
});
