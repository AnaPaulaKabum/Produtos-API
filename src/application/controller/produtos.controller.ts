import { Body, Controller, Delete, Get, Param,ParseIntPipe,Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProdutoRepository } from "src/database/remote/repository/produtoRepository";
import { ProdutosServices } from "../../services/produtos.service";
import { ProdutoDto } from "../../shared/ProdutoDto";
import { produtoResponseMappear } from "../mapper/produtoResponseMappear";
import { ProdutoAlterarRequest } from "../Request/produtoAlterarRequest";
import { ProdutoCriarRequest } from "../Request/produtoCriarRequest";


@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController{

    private produtosServices: ProdutosServices

    constructor(repository: ProdutoRepository){


        this.produtosServices = new ProdutosServices(repository);
    }

    @Get()
    @ApiOperation({ summary: 'Lista de todos os produtos' })
    async obterTodos(): Promise<Array<ProdutoDto>> { 
        return await this.produtosServices.obterTodos();
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'Cria um novo produto' })
    async criar(@Body() produto: ProdutoCriarRequest):Promise <ProdutoDto>{

        const resultado =  produtoResponseMappear.mapCriarDTO(produto);
         return await this.produtosServices.criar(resultado);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Recupera produto pelo ID' })
    @ApiResponse({status: 200,description: 'Produto encontrado',type: ProdutoDto})
    async obterUm(@Param('id', ParseIntPipe) id: number):Promise<any>{
        
        return await this.produtosServices.obterUm(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    async apagar(@Param('id', ParseIntPipe) id: number) :Promise<any> {
        return await this.produtosServices.apagar(id);
    }

    @Put()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'Altera um produto' })
    async alterar(@Body() produto: ProdutoAlterarRequest): Promise<ProdutoDto>{

        const resultado =  produtoResponseMappear.mapAlterarDTO(produto);
        return await this.produtosServices.alterar(resultado);
    }
}