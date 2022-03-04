import { Body, Controller, Delete, Get, Param,ParseIntPipe,Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProdutosServices } from "../../services/produtos.service";
import { ProdutoDto } from "../../shared/ProdutoDto";


@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController{

    constructor(private produtosServices: ProdutosServices){}

    @Get()
    @ApiOperation({ summary: 'Lista de todos os produtos' })
    async obterTodos(): Promise<Array<ProdutoDto>> { 
        return await this.produtosServices.obterTodos();
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo produto' })
    async criar(@Body() produto: ProdutoDto):Promise <ProdutoDto>{
         return await this.produtosServices.criar(produto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Recupera produto pelo ID' })
    @ApiResponse({status: 200,description: 'Produto encontrado',type: ProdutoDto})
    async obterUm(@Param('id', ParseIntPipe) id: number):Promise<any>
    {
        return await this.produtosServices.obterUm(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um produto' })
    async apagar(@Param('id', ParseIntPipe) id: number) :Promise<any> {
        return await this.produtosServices.apagar(id);
    }

    @Put()
    @ApiOperation({ summary: 'Altera um produto' })
    async alterar(@Body() produto: ProdutoDto): Promise<ProdutoDto>{
        return this.produtosServices.alterar(produto);
    }
}