import { ProdutoEntity } from "../../core/domain/entites/produto.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Repository } from "../../core/base/repository";

@Injectable()
export class ProdutoRepositoryBD extends Repository <ProdutoEntity>{

    //conexão com o banco
    constructor(@InjectModel(ProdutoEntity) private repository: typeof ProdutoEntity){
        super();
    }

    async obterTodos():Promise<ProdutoEntity[]>{

        return  this.repository.findAll();
    }

    async obterUm(id:number):Promise<ProdutoEntity>{

        return this.repository.findByPk(id);
    }

    async criar(data: ProdutoEntity):Promise<ProdutoEntity>{

        return await this.repository.create(
            {id:data.id,
            codigo:data.codigo,
            nome:data.nome,
            preco:data.preco,
            qtde:data.qtde}); 
    }

    async alterar(data: ProdutoEntity): Promise<ProdutoEntity>{

        const resultado = await this.repository.update<ProdutoEntity>({id:data.id,
            codigo:data.codigo,
            nome:data.nome,
            preco:data.preco,
            qtde:data.qtde},
            {
                where: {
                         id: data.id
                        } 
        });
           
     if (resultado[0] > 0){

         return data;
     }

     return new ProdutoEntity();
    }

    apagar(id: number): Promise<void> {
        this.repository.destroy({where: { id: id } });
        return ;
    }
}