import { Injectable } from "@nestjs/common";
import { Produto } from "./produto.model";

@Injectable()
export class ProdutosServices{

    produtos : Array<Produto> = [
       /* new Produto("LIV001","Livro TDD e BDD na prática",29.90),
        new Produto("LIV002","Livro Iniciando com Flutter",39.90),
        new Produto("LIV003","Inteligencia artificial na pratica",29.90)*/
    ];

    obterTodos():Array<Produto>{

        return this.produtos;
    }

    obterUm(id:number):Produto{

        return this.produtos[0];
    }

    criar(produto: Produto){
        this.produtos.push(produto);
    }

    alterar(produto: Produto): Produto{
        return produto;
    }

    apagar(id:number){
        this.produtos.pop();
     }

}

function InjectTable() {
    throw new Error("Function not implemented.");
}
