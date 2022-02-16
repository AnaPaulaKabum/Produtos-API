import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RespondeError } from "src/errorResponse";
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

        const consutlaProduto = this.produtoModel.findByPk(id);

        if (consutlaProduto)
            return consutlaProduto;
    }

    async criar(produto: Produto):Promise<Produto>{
        return this.produtoModel.create(produto);
        
    }

    async alterar(produto: Produto): Promise<Produto>{

        const resultado = this.produtoModel.update(produto,{
                            where: {
                                id: produto.id
                            } 
        });

        if (resultado[0] > 0){ return resultado[1][0];
        }

        return await this.criar(produto);
    }

    async apagar(produto:Produto): Promise<any>{

        if (produto.qtde === 0 ){

            this.produtoModel.destroy({where: { id: produto.id } });
            return produto;
        } 
        return new RespondeError(102, `Nao e possivel deletar um produto com quantidade ${produto.id}`);
     }
}
