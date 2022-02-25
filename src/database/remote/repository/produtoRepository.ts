import { ProdutoEntity } from "../entity/produto.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository as IRepositorio} from "../../../core/base/repository";
import { ProdutoDto } from "../../../shared/ProdutoDto";
import { ProdutoMapper } from "../mappear/produtoMappear";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProdutoEntity)
export class ProdutoRepository extends Repository<ProdutoEntity> implements IRepositorio <ProdutoDto>{

    private mappear: ProdutoMapper

    //conexão com o banco
    constructor(){
        super();
        this.mappear = new ProdutoMapper();
    }

    async obterTodos():Promise<ProdutoDto[]>{

        const produtos = await this.query(`select * from produto`);
       // this.c

        let resultado = [];
        for(let i = 0; i < produtos.length; i = i + 1 ) {
            resultado.push(this.mappear.mapTo(produtos[i]));
        }

        return  resultado;
    }

    async obterUm(id:number):Promise<ProdutoDto>{

        const resultado = await this.find({where: [{id:id}]})
        return this.mappear.mapTo(resultado[0]);
    }

    async criar(data: ProdutoDto):Promise<ProdutoDto>{

        let produtoEnt = this.mappear.mapFrom(data);

        let resultado =  await this.save(produtoEnt);
        return this.mappear.mapTo(resultado);
    }

    async alterar(data: ProdutoDto): Promise<ProdutoDto>{

        const result = await this.findOne({id:data.id});

        result.codigo = data.codigo;
        result.nome = data.nome;
        result.preco = data.preco;
        result.qtde = data.qtde;

        await this.save(result);

        return result;
    }

    async apagar(id: number): Promise<void> {

        const resultado = await this.findOne({id:id});

        this.delete(resultado);
        return ;
    }
}