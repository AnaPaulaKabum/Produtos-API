import { Injectable } from "@nestjs/common";
import { ProdutoRepository } from "../database/remote/repository/produtoRepository";
import { ProdutoDto } from "../shared/ProdutoDto";

@Injectable()
export class ProdutosServices{

    constructor(private readonly repository: ProdutoRepository ) {};
    
    async obterTodos(): Promise<ProdutoDto[]>{ 

        return await this.repository.obterTodos(); 
    }
   
    async criar(produtoDTO :ProdutoDto):Promise<ProdutoDto>{
        
        return  this.repository.criar(produtoDTO);
    }

    async obterUm(id:number):Promise<ProdutoDto>{

        return await this.repository.obterUm(id);            
    }

    async apagar(id:number): Promise<any>{

        await this.repository.apagar(id);
     }

     async alterar(produto: ProdutoDto): Promise<ProdutoDto>{

        return await this.repository.alterar(produto);
     } 
}
