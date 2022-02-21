import { Injectable } from "@nestjs/common";
import { ProdutoMapper } from "../core/domain/mappers/ProdutoMappear";
import { ProdutoRepository } from "../core/repositories/produto.repository";
import { ProdutoDto } from "src/shared/ProdutoDto";


@Injectable()
export class ProdutosServices{

    private produtoMapper: ProdutoMapper;

    constructor(private readonly repository: ProdutoRepository ) {
        this.produtoMapper = new ProdutoMapper();
    }
    
    async obterTodos(): Promise<ProdutoDto[]>{ 

        return await this.repository.obterTodos(); 
    }
   
    async criar(produtoDTO :ProdutoDto):Promise<ProdutoDto>{

        const produto = await this.produtoMapper.mapFrom(produtoDTO);
        const novoProduto = await this.repository.criar(produto);
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

        const produtoAlterar = this.produtoMapper.mapFrom(produto);
        const alterarProduto = await this.repository.alterar(produtoAlterar);

        return  this.produtoMapper.mapTo(alterarProduto); 
        
     } 
}
