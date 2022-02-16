import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ErrorResponse } from "../errorResponse";
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
     }
}
