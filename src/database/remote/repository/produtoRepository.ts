import { ProdutoEntity } from "../entity/produto.entity";
import { Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository as IRepositorio} from "../../../core/base/repository";
import { ProdutoDto } from "../../../shared/ProdutoDto";
import { ProdutoMapper } from "../mappear/produtoMappear";
import { Repository } from "typeorm";
import { ErrorHttp } from "../../../application/Error/errorHttp";

export class ProdutoRepository implements IRepositorio <ProdutoDto>{

    private mappear: ProdutoMapper

    constructor(@Inject('PRODUTO_REPOSITORY')
    private produtoRepository: Repository<ProdutoEntity>,){
        this.mappear = new ProdutoMapper();
    }

    async obterTodos():Promise<ProdutoDto[]>{

        let resultado = [];

        try {
            const produtos = await this.produtoRepository.query(`select * from produto`);
    
            for(let i = 0; i < produtos.length; i = i + 1 ) {
                resultado.push(this.mappear.mapTo(produtos[i]));
            }
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return  resultado;
    }

    async obterUm(id:number):Promise<ProdutoDto>{

        const resultado = await this.produtoRepository.findOne({where: [{id:id}]})

        if (!resultado){

            throw new NotFoundException(`Produto ${id} não foi encontrado`);
        }

        return this.mappear.mapTo(resultado);
    }

    async criar(data: ProdutoDto):Promise<ProdutoDto>{

        const resultadoConsulta = await this.produtoRepository.findOne({where: [{codigo:data.codigo}]})

        if (resultadoConsulta){
            throw ErrorHttp.recursoCadastrado('Produto',resultadoConsulta.id);
        }

        let produtoEnt = this.mappear.mapFrom(data);
        let resultado =  await this.produtoRepository.save(produtoEnt);

        return this.mappear.mapTo(resultado);
    }

    async alterar(data: ProdutoDto): Promise<ProdutoDto>{

        const resultado = await this.produtoRepository.findOne({id:data.id});

        if (!resultado){

            throw new NotFoundException(`Produto ${data.id} não foi encontrado`);
        }

        resultado.codigo = data.codigo;
        resultado.nome = data.nome;
        resultado.preco = data.preco;
        resultado.qtde = data.qtde;

        await this.produtoRepository.save(resultado);

        return resultado;
    }

    async apagar(id: number): Promise<void> {
        
        const resultado = await this.produtoRepository.findOne({id:id});

        if (!resultado){
            throw new NotFoundException(`Produto ${id} não foi encontrado`);
        }

        try {           
            await this.produtoRepository.delete(resultado);

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        
        return ;
    }
}