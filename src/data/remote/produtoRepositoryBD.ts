import { ProdutoEntity } from "../../core/domain/entites/produto.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Repository } from "../../core/base/repository";
import { ProdutoDto } from "../../shared/ProdutoDto";
import { ProdutoMapper } from "../../core/domain/mappers/ProdutoMappear";

@Injectable()
export class ProdutoRepositoryBD extends Repository <ProdutoDto>{

    //conexão com o banco
    constructor(@InjectModel(ProdutoEntity) private repository: typeof ProdutoEntity,
    private mappear: ProdutoMapper){
        super();
    }

    async obterTodos():Promise<ProdutoDto[]>{

        const produtos = await this.repository.findAll();

        let resultado = [];
        for(let i = 0; i < produtos.length; i = i + 1 ) {
            resultado.push(this.mappear.mapTo(produtos[i]));
        }

        return  resultado;
    }

    async obterUm(id:number):Promise<ProdutoDto>{

        const resultado = await this.repository.findByPk(id);
        return this.mappear.mapTo(resultado);
    }

    async criar(data: ProdutoDto):Promise<ProdutoDto>{

        const resultado =  await this.repository.create(
            {id:data.id,
            codigo:data.codigo,
            nome:data.nome,
            preco:data.preco,
            qtde:data.qtde}); 

        return this.mappear.mapTo(resultado);
    }

    async alterar(data: ProdutoDto): Promise<ProdutoDto>{

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