import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";
import { ProdutoEntity } from "src/core/domain/entites/produto.model";
import { ProdutoCreateMapper } from "src/core/domain/mappers/ProdutoCreateMappear";
import { ProdutoRepository } from "src/core/repositories/produto.repository";
import { ProdutoCreateDto } from "src/shared/ProdutoCreateDto";


@Injectable()
export class ProdutosServices{

    private produtoCreateMapper: ProdutoCreateMapper;

    constructor(private readonly repository: ProdutoRepository) {
        this.produtoCreateMapper = new ProdutoCreateMapper();
    }

    async obterTodos(): Promise<ProdutoEntity[]>{ 

        return await this.repository.obterTodos(); 
    }

    async criar(produto :ProdutoEntity):Promise<ProdutoEntity>{

         return await this.repository.criar(produto);

    }

    async obterUm(id:number):Promise<ProdutoEntity>{

        return await this.repository.obterUm(id);
       
    }

    async apagar(produto:ProdutoEntity): Promise<any>{

        this.repository.apagar(produto.id);
     }

     async alterar(produto: ProdutoEntity): Promise<ProdutoEntity>{
        return await this.repository.alterar(produto);
     }
  
   
    /*constructor(
        @InjectModel(Produto)
        private produtoModel : typeof Produto)
    {}*/




/*
    async criar(produto: Produto):Promise<Produto>{

        return this.produtoModel.create(produto);        
    }

    async alterar(produto: Produto): Promise<Produto>{

        const resultado = await this.produtoModel.update(produto,{
                        where: {
                                id: produto.id
                               } 
        });

        if (resultado[0] > 0){ 
            return resultado[1][0];
        }

        return await this.criar(produto);
    }

    async apagar(produto:Produto): Promise<any>{

        if (produto.qtde === 0 ){
            this.produtoModel.destroy({where: { id: produto.id } });
            return produto.id;
        } 
        return new ErrorResponse(102, `Nao e possivel deletar um produto com quantidade ${produto.id}`);
     }*/
}
