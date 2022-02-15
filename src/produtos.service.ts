import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Produto } from "./produto.model";

@Injectable()
export class ProdutosServices{

    constructor(
        @InjectModel(Produto)
        private produtoModel : typeof Produto)
    {}

    async obterTodos():Promise<Produto[]>{
        return  this.produtoModel.findAll();
    }

    async obterUm(id:number):Promise<Produto>{

        return this.produtoModel.findByPk(id);
    }

    async criar(produto: Produto):Promise<Produto>{
        return this.produtoModel.create(produto);
        
    }

    async alterar(produto: Produto): Promise<[number,Produto[]]>{
        return this.produtoModel.update(produto,{
           where: {
               id: produto.id
           } 
        });
    }

    async apagar(id:number): Promise<void>{
       const produto  = await this.obterUm(id);
        this.produtoModel.destroy({where: {
            id: produto.id
        } });

     }
}
