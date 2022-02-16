import { Body, Controller, Delete, Get, Param,Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Produto } from "./produto.model";
import { ProdutosServices } from "./produtos.service";

@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController{

    constructor(private produtosServices: ProdutosServices){      
    }

    @Get()
    @ApiOperation({ summary: 'Lista de todos os produtos' })
    async obterTodos(): Promise<Array<Produto>>{
        return this.produtosServices.obterTodos();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Recupera produto pelo ID' })
    @ApiResponse({status: 200,description: 'Produto encontrado',type: Produto,})
    async obterUm(@Param('id') id: number):Promise<Produto>
    {
        return this.produtosServices.obterUm(id);
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo produto' })
    async criar(@Body() produto: Produto):Promise<Produto>{
        return this.produtosServices.criar(produto);
    }

    @Put()
    @ApiOperation({ summary: 'Altera um produto' })
    async alterar(@Body() produto: Produto): Promise<[number,Produto[]]>{
        return this.produtosServices.alterar(produto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    async apagar(@Param('id') id: number):Promise<void> {
       this.produtosServices.apagar(id);
    }
}