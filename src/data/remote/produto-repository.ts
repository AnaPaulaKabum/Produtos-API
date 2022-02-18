import { ProdutoEntity } from "src/core/domain/entites/produto.model";
import { RepositoryRemote } from "./repositoy-remote";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";


@Injectable()
export class ProdutoRepository extends RepositoryRemote<ProdutoEntity>{

    constructor(@InjectModel(ProdutoEntity) private produtoModel: typeof ProdutoEntity){
        super(produtoModel)    
    }

}