import { ProdutoEntity } from "../entity/produto.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository as IRepositorio} from "../../../core/base/repository";
import { ProdutoDto } from "../../../shared/ProdutoDto";
import { ProdutoMapper } from "../mappear/produtoMappear";
import { EntityRepository, Repository } from "typeorm";
import { ErrorHttp } from "../../../application/Error/errorHttp";

@EntityRepository(ProdutoEntity)
export class ProdutoRepository extends Repository<ProdutoEntity> implements IRepositorio <ProdutoDto>{

    private mappear: ProdutoMapper

    constructor(){
        super();
        this.mappear = new ProdutoMapper();
    }

    async obterTodos():Promise<ProdutoDto[]>{

        let resultado = [];

        try {
            const produtos = await this.query(`select * from produto`);
    
            for(let i = 0; i < produtos.length; i = i + 1 ) {
                resultado.push(this.mappear.mapTo(produtos[i]));
            }
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return  resultado;
    }

    async obterUm(id:number):Promise<ProdutoDto>{

        const resultado = await this.findOne({where: [{id:id}]})

        if (!resultado){

            throw new NotFoundException(`Produto ${id} não foi encontrado`);
        }

        return this.mappear.mapTo(resultado);
    }

    async criar(data: ProdutoDto):Promise<ProdutoDto>{

        const resultadoConsulta = await this.findOne({where: [{codigo:data.codigo}]})

        if (resultadoConsulta){
            throw ErrorHttp.recursoCadastrado('Produto',resultadoConsulta.id);
        }

        let produtoEnt = this.mappear.mapFrom(data);
        let resultado =  await this.save(produtoEnt);

        return this.mappear.mapTo(resultado);
    }

    async alterar(data: ProdutoDto): Promise<ProdutoDto>{

        const resultado = await this.findOne({id:data.id});

        if (!resultado){

            throw new NotFoundException(`Produto ${data.id} não foi encontrado`);
        }

        resultado.codigo = data.codigo;
        resultado.nome = data.nome;
        resultado.preco = data.preco;
        resultado.qtde = data.qtde;

        await this.save(resultado);

        return resultado;
    }

    async apagar(id: number): Promise<void> {
        
        const resultado = await this.findOne({id:id});

        if (!resultado){
            throw new NotFoundException(`Produto ${id} não foi encontrado`);
        }

        try {           
            await this.delete(resultado);

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        
        return ;
    }
}