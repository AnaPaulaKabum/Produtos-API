import { InternalServerErrorException, NotFoundException, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHttp } from '../../../application/Error/errorHttp';
import { produtoAlterar, produtoCadastrado, produtoCriado, produtoNovo, produtosLista, produtosListaEntity } from '../../../database/mock/produto.mock';
import { ProdutoRepository } from './produtoRepository';

describe('ProdutosService', () => {

  let produtoRepositorio: ProdutoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoRepository],
    }).compile();

    produtoRepositorio = module.get(ProdutoRepository);

    produtoRepositorio.query = jest.fn().mockResolvedValue(produtosListaEntity);
    produtoRepositorio.findOne = jest.fn().mockResolvedValue(produtosListaEntity[0]);
    produtoRepositorio.save = jest.fn().mockResolvedValue(produtosListaEntity[0]);
    produtoRepositorio.delete = jest.fn().mockResolvedValue(undefined);
  });

  describe('obterTodos()', () => {

    it('Se o repostiroy falhar devera retornar um erro.', async () => {

      jest.spyOn(produtoRepositorio,'query').mockRejectedValueOnce(new InternalServerErrorException());
      await expect(produtoRepositorio.obterTodos()).rejects.toThrow();
     });

     it('Se não possuir nenhum produto retorna []', async () => {

      jest.spyOn(produtoRepositorio,'query').mockResolvedValueOnce({});
      const resultado = await produtoRepositorio.obterTodos();
      expect(resultado).toEqual([]);
     });

    it('Deve chamar o metodo query pelo menos uma vez', async () => {
     
      await produtoRepositorio.obterTodos();
      expect(produtoRepositorio.query).toBeCalledTimes(1);
     });

    it('Deve retorna todos os produtos', async () => {

     const resultado = await produtoRepositorio.obterTodos();
     expect(resultado).toEqual(produtosListaEntity);
    });
  });

  describe('obterUm()', () => {

    it('Se o repostiroy falhar devera retornar um erro.', async () => {

      const id = 10;
      jest.spyOn(produtoRepositorio,'findOne').mockRejectedValueOnce(new InternalServerErrorException());
      await expect(produtoRepositorio.obterUm(id)).rejects.toThrow();
     });

     it('Se nao possuir o produto, devera retornar um throw', async () => {

      const id = 10;
      jest.spyOn(produtoRepositorio,'findOne').mockReturnValueOnce(undefined);
      await expect(produtoRepositorio.obterUm(id)).rejects.toThrow(new NotFoundException(`Produto ${id} não foi encontrado`));
      });

      it('Deve chamar o metodo findOne pelo menos uma vez', async () => {
     
        const id = 1;
        await produtoRepositorio.obterUm(id);
        expect(produtoRepositorio.findOne).toBeCalledTimes(1);
      });

     it('Se encontrar o produto devera retornar', async () => {

      const id = 1;
      const resultado = await produtoRepositorio.obterUm(id);
      expect(resultado).toEqual(produtosListaEntity[0]);
      });
    });

    describe('criar()', () => {

      it('Se o repostiroy falhar devera retornar um erro.', async () => {

        jest.spyOn(produtoRepositorio,'save').mockRejectedValueOnce(new InternalServerErrorException());
        await expect(produtoRepositorio.criar(produtoNovo)).rejects.toThrow();
      });

      it('Se buscar um produto já cadastrado, devera ocorrer um erro.', async () => {
     
        jest.spyOn(produtoRepositorio,'findOne').mockResolvedValueOnce(produtoCadastrado);

        await expect(produtoRepositorio.criar(produtosLista[0])).rejects.toThrow(ErrorHttp.recursoCadastrado('Produto',produtoCadastrado.id))
      });

      it('Deve chamar o metodo save, findOne pelo menos uma vez', async () => {

        jest.spyOn(produtoRepositorio,'findOne').mockResolvedValueOnce(undefined);
        await produtoRepositorio.criar(produtoNovo);
        expect(produtoRepositorio.save).toBeCalledTimes(1);
        expect(produtoRepositorio.findOne).toBeCalledTimes(1);
        });
      
        it('Se criar o produto, deverá retornar', async () => {

          jest.spyOn(produtoRepositorio,'findOne').mockResolvedValueOnce(undefined);
          jest.spyOn(produtoRepositorio,'save').mockResolvedValueOnce(produtoCriado);
          const resultado = await produtoRepositorio.criar(produtoNovo);
          expect(resultado).toEqual(produtoCriado);
          });  
    });

    describe('apagar()', () => {

      it('Se o repostiroy falhar devera retornar um erro.', async () => {

        const id = 1;
        jest.spyOn(produtoRepositorio,'delete').mockRejectedValueOnce(new Error());
        await expect(produtoRepositorio.apagar(id)).rejects.toThrow();
      });

      it('Deve chamar o metodo delete e o findOne pelo menos uma vez', async () => {
     
        const id = 1;
        await produtoRepositorio.apagar(id);
        expect(produtoRepositorio.findOne).toBeCalledTimes(1);
        expect(produtoRepositorio.delete).toBeCalledTimes(1);
       });

       it('Devera retornar um erro, caso tentar apagar um produto que não exista', async () => {
     
        const id = 1;
        jest.spyOn(produtoRepositorio,'findOne').mockResolvedValueOnce(undefined);
        expect(produtoRepositorio.apagar(id)).rejects.toThrow(new NotFoundException(`Produto ${id} não foi encontrado`));
       });

       it('Devera retornar undefined caso conseguir apagar o produto', async () => {
     
        const id = 1;
        const resultado =  await produtoRepositorio.apagar(id);
        expect(resultado).toBeUndefined;
       });
    });

    describe('alterar()', () => {

      it('Se o repostiroy falhar devera retornar um erro.', async () => {
  
        const id = 10;
        jest.spyOn(produtoRepositorio,'save').mockRejectedValueOnce(new InternalServerErrorException());
        await expect(produtoRepositorio.alterar(produtoAlterar)).rejects.toThrow();
       });
      });

      it('Deve chamar o metodo save e o findOne pelo menos uma vez', async () => {
     
        await produtoRepositorio.alterar(produtoAlterar);
        expect(produtoRepositorio.findOne).toBeCalledTimes(1);
        expect(produtoRepositorio.save).toBeCalledTimes(1);
      });

      it('Se alterar um produto que não exista, deverá retornar um erro.', async () => {
     
        jest.spyOn(produtoRepositorio,'findOne').mockReturnValueOnce(undefined);
        await expect(produtoRepositorio.alterar(produtoAlterar)).rejects.toThrow(
          new NotFoundException(`Produto ${produtoAlterar.id} não foi encontrado`));
      });

      it('Deve alterar o produto se encontrar', async () => {
     
        const resultado = await produtoRepositorio.alterar(produtoAlterar);
        expect(resultado).toEqual(produtoAlterar);
      });
});