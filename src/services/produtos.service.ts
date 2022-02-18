import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "src/core/domain/entites/produto.model";
import { ProdutoMapper } from "src/core/domain/mappers/ProdutoMappear";
import { ProdutoRepositoryCacheMemory } from "src/data/cache-memory/produtoRepository-cache-memory";
import { ProdutoDto } from "src/shared/ProdutoDto";


@Injectable()
export class ProdutosServices{

    private produtoMapper: ProdutoMapper;

    constructor(private readonly repository: ProdutoRepositoryCacheMemory<ProdutoEntity> ) {
        this.produtoMapper = new ProdutoMapper();
    }
    
    async obterTodos(): Promise<ProdutoDto[]>{ 

        return await this.repository.obterTodos(); 
    }
   
    async criar(produto :ProdutoDto):Promise<ProdutoDto>{

        const novoProduto = await this.repository.criar(this.produtoMapper.mapFrom(produto));
         return  this.produtoMapper.mapTo(novoProduto);
    }

    async obterUm(id:number):Promise<ProdutoDto>{

        const consultaProduto = await this.repository.obterUm(id);
        return  this.produtoMapper.mapTo(consultaProduto);       
    }

    async apagar(produto:ProdutoDto): Promise<any>{

        await this.repository.apagar(produto.id);
     }

     async alterar(produto: ProdutoDto): Promise<ProdutoDto>{

        console.log('produtoDTO'+produto)
        const alterarProduto = await this.repository.alterar(this.produtoMapper.mapFrom(produto));
        console.log('alterarProduto'+alterarProduto)


        return  this.produtoMapper.mapTo(alterarProduto); 
        
     } 
}
